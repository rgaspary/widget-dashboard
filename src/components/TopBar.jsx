import { MoonIcon, PlusIcon, SunIcon } from './icons'
import AddWidgetMenu from './AddWidgetMenu'

const THEMES = [
  { id: 'minimal', label: 'Minimal', swatch: '#fbfaf8' },
  { id: 'glass', label: 'Glass', swatch: 'linear-gradient(150deg,#5b4a6b,#c67139)' },
  { id: 'organic', label: 'Organic', swatch: '#c67139' },
]

export default function TopBar({
  theme,
  onThemeChange,
  dark,
  onToggleMode,
  greeting,
  todayLabel,
  palette: p,
  isGlass,
  addMenuOpen,
  onToggleAddMenu,
  onCloseAddMenu,
  hiddenTypes,
  onAddWidget,
}) {
  const topBarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '28px clamp(16px,4vw,40px) 10px',
  }
  const greetStyle = {
    fontFamily: 'var(--font-heading)',
    fontWeight: 'var(--font-heading-weight,400)',
    fontSize: 'clamp(22px,3vw,30px)',
    lineHeight: 1.25,
    margin: 0,
    paddingTop: '4px',
  }
  const dateStyle = { fontSize: '13px', margin: '3px 0 0', opacity: 0.65 }
  const controlsRowStyle = { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }
  const pillsWrapStyle = {
    display: 'flex',
    gap: '6px',
    padding: '4px',
    borderRadius: '999px',
    background: p.pillBg,
    border: '1px solid ' + p.pillBorder,
    backdropFilter: p.blur,
  }
  const pillBase = { width: '22px', height: '22px', borderRadius: '50%', border: '2px solid transparent', cursor: 'pointer', padding: 0, boxSizing: 'border-box' }
  const modeToggleStyle = {
    width: '48px',
    height: '26px',
    borderRadius: '999px',
    position: 'relative',
    cursor: 'pointer',
    border: '1px solid ' + p.pillBorder,
    padding: 0,
    background: p.pillBg,
    backdropFilter: p.blur,
  }
  const modeKnobStyle = {
    position: 'absolute',
    top: '2px',
    left: dark ? '24px' : '2px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: p.cardBg === '#fff' ? '#fff' : isGlass ? 'rgba(255,255,255,.9)' : p.cardBg,
    display: 'grid',
    placeItems: 'center',
    color: p.text,
    transition: 'left .2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,.2)',
  }
  const addWidgetBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: '999px',
    padding: '9px 16px',
    fontSize: '13px',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    background: p.accent,
    color: p.accentText,
    fontFamily: 'var(--font-body)',
  }

  return (
    <div style={topBarStyle}>
      <div>
        <h1 style={greetStyle}>{greeting}</h1>
        <p style={dateStyle}>{todayLabel}</p>
      </div>
      <div style={controlsRowStyle}>
        <div style={pillsWrapStyle}>
          {THEMES.map((t) => (
            <button
              key={t.id}
              title={t.label}
              style={{ ...pillBase, background: t.swatch, borderColor: theme === t.id ? p.text : 'transparent' }}
              onClick={() => onThemeChange(t.id)}
            />
          ))}
        </div>
        <button aria-label="Toggle dark mode" style={modeToggleStyle} onClick={onToggleMode}>
          <span style={modeKnobStyle}>{dark ? <MoonIcon /> : <SunIcon />}</span>
        </button>
        <div style={{ position: 'relative' }}>
          <button style={addWidgetBtnStyle} onClick={onToggleAddMenu}>
            <PlusIcon />
            Add widget
          </button>
          <AddWidgetMenu open={addMenuOpen} onClose={onCloseAddMenu} hiddenTypes={hiddenTypes} onAdd={onAddWidget} palette={p} />
        </div>
      </div>
    </div>
  )
}
