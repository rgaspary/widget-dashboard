export default function NotesWidget({ value, onChange, palette: p }) {
  const areaStyle = {
    flex: 1,
    border: 'none',
    background: 'transparent',
    outline: 'none',
    resize: 'none',
    fontSize: '13px',
    color: p.text,
    fontFamily: 'var(--font-body)',
    lineHeight: 1.5,
  }
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="Jot something down…" style={areaStyle} />
}
