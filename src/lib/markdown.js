const CHECKBOX_RE = /^(\s{0,3})([-*+])\s\[([ xX])\]\s(.*)$/
const HEADING_RE = /^(#{1,6})\s+(.*)$/
const BLOCKQUOTE_RE = /^>\s?(.*)$/
const ORDERED_RE = /^(\s{0,3})(\d{1,9})([.)])\s(.*)$/
const BULLET_RE = /^(\s{0,3})([-*+])\s(.*)$/

export function classifyLine(raw) {
  if (raw.trim() === '') return { type: 'empty', level: 0, checked: false, marker: '', content: '' }

  let m = CHECKBOX_RE.exec(raw)
  if (m) return { type: 'checkbox', level: 0, checked: m[3].toLowerCase() === 'x', marker: m[1] + m[2] + ' [' + m[3] + '] ', content: m[4] }

  m = HEADING_RE.exec(raw)
  if (m) return { type: 'heading', level: m[1].length, checked: false, marker: m[1] + ' ', content: m[2] }

  m = BLOCKQUOTE_RE.exec(raw)
  if (m) return { type: 'blockquote', level: 0, checked: false, marker: '> ', content: m[1] }

  m = ORDERED_RE.exec(raw)
  if (m) return { type: 'ordered', level: 0, checked: false, marker: m[2] + m[3], content: m[4] }

  m = BULLET_RE.exec(raw)
  if (m) return { type: 'bullet', level: 0, checked: false, marker: m[2] + ' ', content: m[3] }

  return { type: 'paragraph', level: 0, checked: false, marker: '', content: raw }
}

const INLINE_RE = /`([^`]+)`|\*\*([^*]+)\*\*|~~([^~]+)~~|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g

export function formatInline(text) {
  const segments = []
  let lastIndex = 0
  let key = 0

  for (const m of text.matchAll(INLINE_RE)) {
    if (m.index > lastIndex) segments.push(text.slice(lastIndex, m.index))
    if (m[1] !== undefined) {
      segments.push({ key: key++, type: 'code', text: m[1] })
    } else if (m[2] !== undefined) {
      segments.push({ key: key++, type: 'bold', text: m[2] })
    } else if (m[3] !== undefined) {
      segments.push({ key: key++, type: 'strike', text: m[3] })
    } else if (m[4] !== undefined) {
      segments.push({ key: key++, type: 'italic', text: m[4] })
    } else if (m[5] !== undefined) {
      const href = m[6]
      if (/^https?:\/\//i.test(href)) {
        segments.push({ key: key++, type: 'link', text: m[5], href })
      } else {
        segments.push(m[0])
      }
    }
    lastIndex = m.index + m[0].length
  }
  if (lastIndex < text.length) segments.push(text.slice(lastIndex))

  return segments
}

export function toggleCheckbox(raw) {
  const info = classifyLine(raw)
  if (info.type !== 'checkbox') return raw
  const flipped = info.checked ? ' ' : 'x'
  return raw.replace(/\[([ xX])\]/, '[' + flipped + ']')
}
