export default function ClockWidget({ time, date }) {
  const wrapStyle = { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1 }
  const bigStyle = { fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight,400)', fontSize: '30px', margin: '0 0 2px' }
  const mutedStyle = { fontSize: '12px', margin: 0, opacity: 0.65 }

  return (
    <div style={wrapStyle}>
      <p style={bigStyle}>{time}</p>
      <p style={mutedStyle}>{date}</p>
    </div>
  )
}
