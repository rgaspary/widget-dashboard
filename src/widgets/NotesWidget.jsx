import { useEffect, useRef, useState } from 'react'
import { classifyLine, formatInline, toggleCheckbox } from '../lib/markdown'
import { CheckIcon } from '../components/icons'

const MONO_FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

function InlineContent({ text, palette: p }) {
  return formatInline(text).map((seg) => {
    if (typeof seg === 'string') return seg
    switch (seg.type) {
      case 'bold':
        return (
          <strong key={seg.key} style={{ fontWeight: 700 }}>
            {seg.text}
          </strong>
        )
      case 'italic':
        return (
          <em key={seg.key} style={{ fontStyle: 'italic' }}>
            {seg.text}
          </em>
        )
      case 'strike':
        return (
          <span key={seg.key} style={{ textDecoration: 'line-through', opacity: 0.75 }}>
            {seg.text}
          </span>
        )
      case 'code':
        return (
          <code
            key={seg.key}
            style={{ fontFamily: MONO_FONT, background: p.inputBg, border: '1px solid ' + p.inputBorder, borderRadius: '4px', padding: '1px 4px', fontSize: '12px' }}
          >
            {seg.text}
          </code>
        )
      case 'link':
        return (
          <a
            key={seg.key}
            href={seg.href}
            target="_blank"
            rel="noreferrer"
            style={{ color: p.accent, textDecoration: 'underline' }}
            onClick={(e) => e.stopPropagation()}
          >
            {seg.text}
          </a>
        )
      default:
        return null
    }
  })
}

function headingStyle(level) {
  if (level === 1) return { fontSize: '18px', fontWeight: 700, margin: '4px 0 2px' }
  if (level === 2) return { fontSize: '16px', fontWeight: 700, margin: '3px 0 2px' }
  return { fontSize: '14px', fontWeight: 700, margin: '2px 0 1px' }
}

function LineView({ raw, onClick, onToggleCheckbox, palette: p }) {
  const info = classifyLine(raw)
  const rowStyle = {
    minHeight: '19px',
    padding: '1px 2px',
    borderRadius: '4px',
    cursor: 'text',
    fontSize: '13px',
    lineHeight: 1.5,
    color: p.text,
    fontFamily: 'var(--font-body)',
    wordBreak: 'break-word',
  }

  if (info.type === 'empty') return <div style={rowStyle} onClick={onClick} />

  if (info.type === 'heading') {
    return (
      <div style={{ ...rowStyle, ...headingStyle(info.level) }} onClick={onClick}>
        <InlineContent text={info.content} palette={p} />
      </div>
    )
  }

  if (info.type === 'blockquote') {
    return (
      <div style={{ ...rowStyle, borderLeft: '3px solid ' + p.accent, paddingLeft: '10px', color: p.muted, fontStyle: 'italic' }} onClick={onClick}>
        <InlineContent text={info.content} palette={p} />
      </div>
    )
  }

  if (info.type === 'checkbox') {
    return (
      <div style={{ ...rowStyle, display: 'flex', alignItems: 'flex-start', gap: '8px' }} onClick={onClick}>
        <button
          aria-label="Toggle done"
          onClick={(e) => {
            e.stopPropagation()
            onToggleCheckbox()
          }}
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '5px',
            flex: 'none',
            marginTop: '2px',
            border: '1.5px solid ' + p.muted,
            background: info.checked ? p.accent : 'transparent',
            color: p.accentText,
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {info.checked && <CheckIcon />}
        </button>
        <span style={{ textDecoration: info.checked ? 'line-through' : 'none', opacity: info.checked ? 0.55 : 1 }}>
          <InlineContent text={info.content} palette={p} />
        </span>
      </div>
    )
  }

  if (info.type === 'bullet' || info.type === 'ordered') {
    const marker = info.type === 'bullet' ? '•' : info.marker
    return (
      <div style={{ ...rowStyle, display: 'flex', alignItems: 'flex-start', gap: '6px' }} onClick={onClick}>
        <span style={{ display: 'inline-block', minWidth: '16px', flex: 'none', color: p.muted }}>{marker}</span>
        <span>
          <InlineContent text={info.content} palette={p} />
        </span>
      </div>
    )
  }

  return (
    <div style={rowStyle} onClick={onClick}>
      <InlineContent text={info.content} palette={p} />
    </div>
  )
}

function LineEditor({ value, onChange, onKeyDown, onBlur, inputRef, palette: p }) {
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  })

  return (
    <textarea
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\r\n?/g, '\n'))}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      rows={1}
      style={{
        display: 'block',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        width: '100%',
        resize: 'none',
        overflow: 'hidden',
        fontSize: '13px',
        lineHeight: 1.5,
        color: p.text,
        fontFamily: 'var(--font-body)',
        padding: '1px 2px',
        borderRadius: '4px',
        minHeight: '19px',
      }}
    />
  )
}

export default function NotesWidget({ value, onChange, palette: p }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [draft, setDraft] = useState('')
  const inputRef = useRef(null)
  const suppressBlurRef = useRef(false)

  const lines = value === '' ? [''] : value.split('\n')

  useEffect(() => {
    if (editingIndex === null || !inputRef.current) return
    inputRef.current.focus()
    const len = inputRef.current.value.length
    inputRef.current.setSelectionRange(len, len)
  }, [editingIndex])

  function commitLine(index, newRaw) {
    const next = [...lines]
    next[index] = newRaw
    onChange(next.join('\n'))
  }

  function startEditing(index) {
    setDraft(lines[index])
    setEditingIndex(index)
  }

  function handleToggleCheckbox(index) {
    onChange(lines.map((l, j) => (j === index ? toggleCheckbox(l) : l)).join('\n'))
  }

  function handleKeyDown(e, index) {
    if (e.key === 'Enter') {
      e.preventDefault()
      suppressBlurRef.current = true
      const next = [...lines]
      next[index] = draft
      if (index === lines.length - 1) next.push('')
      onChange(next.join('\n'))
      setDraft('')
      setEditingIndex(index + 1)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      suppressBlurRef.current = true
      commitLine(index, draft)
      setEditingIndex(null)
    } else if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault()
      suppressBlurRef.current = true
      commitLine(index, draft)
      setDraft(lines[index - 1])
      setEditingIndex(index - 1)
    } else if (e.key === 'ArrowDown' && index < lines.length - 1) {
      e.preventDefault()
      suppressBlurRef.current = true
      commitLine(index, draft)
      setDraft(lines[index + 1])
      setEditingIndex(index + 1)
    } else if (e.key === 'Backspace' && draft === '' && index > 0) {
      e.preventDefault()
      suppressBlurRef.current = true
      const prevRaw = lines[index - 1]
      const merged = [...lines]
      merged.splice(index - 1, 2, prevRaw)
      onChange(merged.join('\n'))
      setDraft(prevRaw)
      setEditingIndex(index - 1)
    }
  }

  function handleBlur(index) {
    if (suppressBlurRef.current) {
      suppressBlurRef.current = false
      return
    }
    commitLine(index, draft)
    setEditingIndex(null)
  }

  const containerStyle = {
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'text',
    borderRadius: '6px',
    background: editingIndex !== null ? p.inputBg : 'transparent',
  }

  // Clicking anywhere in the widget's body — including blank space below the
  // last line — should behave like clicking into a textarea, not a dead zone.
  // Only fires when the click didn't already land on (and get handled by) a
  // specific line/button, so it doesn't fight per-line click targeting.
  function handleContainerClick(e) {
    if (e.target === e.currentTarget) startEditing(0)
  }

  if (value === '' && editingIndex === null) {
    return (
      <div style={containerStyle} onClick={handleContainerClick}>
        <div
          onClick={() => startEditing(0)}
          style={{
            minHeight: '19px',
            padding: '1px 2px',
            fontSize: '13px',
            lineHeight: 1.5,
            color: p.muted,
            opacity: 0.7,
            cursor: 'text',
            fontFamily: 'var(--font-body)',
          }}
        >
          Jot something down…
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle} onClick={handleContainerClick}>
      {lines.map((raw, i) =>
        editingIndex === i ? (
          <LineEditor
            key={i}
            value={draft}
            onChange={setDraft}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onBlur={() => handleBlur(i)}
            inputRef={inputRef}
            palette={p}
          />
        ) : (
          <LineView key={i} raw={raw} onClick={() => startEditing(i)} onToggleCheckbox={() => handleToggleCheckbox(i)} palette={p} />
        )
      )}
    </div>
  )
}
