export default function WeatherWidget() {
  const wrapStyle = { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1 }
  const tempStyle = { fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight,400)', fontSize: '30px', margin: '0 0 2px' }
  const mutedStyle = { fontSize: '12px', margin: 0, opacity: 0.65 }

  return (
    <div style={wrapStyle}>
      <p style={tempStyle}>72°</p>
      <p style={mutedStyle}>Partly cloudy, Austin</p>
    </div>
  )
}
