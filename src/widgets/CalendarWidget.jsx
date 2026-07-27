export default function CalendarWidget({ items, palette: p }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minHeight: 0, overflow: 'auto' }}>
      {items.map((ev, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'baseline', fontSize: '12px', padding: '3px 0' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', flex: 'none', marginTop: '4px', background: p.accent }} />
          <span style={{ fontWeight: 700, opacity: 0.7, flex: 'none' }}>{ev.time}</span>
          <span>{ev.title}</span>
        </div>
      ))}
    </div>
  )
}
