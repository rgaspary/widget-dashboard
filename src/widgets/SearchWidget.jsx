import { SearchIcon } from '../components/icons'

export default function SearchWidget({ query, onChange, palette: p }) {
  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '999px',
    padding: '9px 14px',
    background: p.inputBg,
    border: '1px solid ' + p.inputBorder,
    color: p.text,
  }
  const inputStyle = { border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', color: p.text, flex: 1, fontFamily: 'var(--font-body)' }

  function onKeyDown(e) {
    if (e.key === 'Enter' && query.trim()) {
      window.open('https://www.google.com/search?q=' + encodeURIComponent(query.trim()), '_blank', 'noopener')
    }
  }

  return (
    <div style={rowStyle}>
      <SearchIcon />
      <input value={query} onChange={(e) => onChange(e.target.value)} onKeyDown={onKeyDown} placeholder="Search the web…" style={inputStyle} />
    </div>
  )
}
