import { WIDGET_DEFS } from '../theme'

export default function AddWidgetMenu({ open, onClose, hiddenTypes, onAdd, palette: p }) {
  if (!open) return null

  const overlayStyle = { position: 'fixed', inset: 0, zIndex: 40 }
  const menuStyle = {
    position: 'absolute',
    right: 0,
    top: 'calc(100% + 8px)',
    zIndex: 41,
    background: p.cardBg,
    backdropFilter: p.blur,
    border: '1px solid ' + p.cardBorder,
    borderRadius: 'var(--radius-lg, 16px)',
    boxShadow: '0 12px 32px rgba(0,0,0,.18)',
    padding: '8px',
    minWidth: '160px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    animation: 'popIn .15s ease',
  }
  const menuItemStyle = {
    textAlign: 'left',
    border: 'none',
    background: 'transparent',
    color: p.text,
    fontSize: '13px',
    fontFamily: 'var(--font-body)',
    padding: '9px 10px',
    borderRadius: '10px',
    cursor: 'pointer',
  }
  const emptyStyle = {
    fontSize: '12.5px',
    opacity: 0.55,
    margin: hiddenTypes.length ? '4px 8px 2px' : '4px 10px',
  }

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={menuStyle}>
        {hiddenTypes.map((type) => (
          <button key={type} style={menuItemStyle} onClick={() => onAdd(type)}>
            + {WIDGET_DEFS[type].title}
          </button>
        ))}
        <p style={emptyStyle}>{hiddenTypes.length ? 'All set — drag to rearrange.' : 'All widgets are on your board.'}</p>
      </div>
    </>
  )
}
