import { CheckIcon, CloseIcon } from '../components/icons'

export default function TodoWidget({ todos, newText, onNewTextChange, onAdd, onToggle, onRemove, palette: p }) {
  const listStyle = { display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minHeight: 0, overflow: 'auto' }
  const inputStyle = {
    border: '1px solid ' + p.inputBorder,
    background: p.inputBg,
    borderRadius: '10px',
    padding: '7px 10px',
    fontSize: '12.5px',
    color: p.text,
    outline: 'none',
    marginTop: '6px',
    fontFamily: 'var(--font-body)',
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && newText.trim()) onAdd()
  }

  return (
    <div style={listStyle}>
      {todos.map((t) => (
        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', padding: '4px 0' }}>
          <button
            aria-label="Toggle done"
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '5px',
              flex: 'none',
              border: '1.5px solid ' + p.muted,
              background: t.done ? p.accent : 'transparent',
              color: p.accentText,
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
            onClick={() => onToggle(t.id)}
          >
            {t.done && <CheckIcon />}
          </button>
          <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.55 : 1 }}>{t.text}</span>
          <button
            aria-label="Remove task"
            style={{ border: 'none', background: 'transparent', color: p.muted, cursor: 'pointer', padding: '2px', opacity: 0.45, display: 'grid', placeItems: 'center' }}
            onClick={() => onRemove(t.id)}
          >
            <CloseIcon size={11} />
          </button>
        </div>
      ))}
      <input value={newText} onChange={(e) => onNewTextChange(e.target.value)} onKeyDown={onKeyDown} placeholder="Add a task…" style={inputStyle} />
    </div>
  )
}
