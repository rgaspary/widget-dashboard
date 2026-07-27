import { widgetShellStyle } from '../lib/layout'
import { CloseIcon } from './icons'

export default function WidgetCard({ widget, title, viewport, palette: p, isActive, onDragPointerDown, onResizePointerDown, onRemove, children }) {
  const style = widgetShellStyle({ w: widget, viewport, palette: p, isActive })
  const canResize = viewport === 'desktop'
  const canDrag = viewport === 'desktop'

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
    cursor: canDrag ? 'grab' : 'default',
    touchAction: 'none',
  }
  const titleStyle = {
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '.04em',
    textTransform: 'uppercase',
    opacity: 0.6,
    margin: 0,
  }
  const removeBtnStyle = {
    border: 'none',
    background: 'transparent',
    color: p.muted,
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '6px',
    display: 'grid',
    placeItems: 'center',
  }
  const resizeHandleStyle = {
    position: 'absolute',
    width: '16px',
    height: '16px',
    right: '4px',
    bottom: '4px',
    cursor: 'nwse-resize',
    opacity: 0.35,
    backgroundImage: 'repeating-linear-gradient(135deg, currentColor 0 1.5px, transparent 1.5px 4px)',
    touchAction: 'none',
  }

  return (
    <div style={style}>
      <div style={headerStyle} onPointerDown={canDrag ? onDragPointerDown : undefined}>
        <p style={titleStyle}>{title}</p>
        <button aria-label="Remove widget" style={removeBtnStyle} onClick={onRemove} onPointerDown={(e) => e.stopPropagation()}>
          <CloseIcon />
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>{children}</div>
      {canResize && <div style={resizeHandleStyle} onPointerDown={onResizePointerDown} />}
    </div>
  )
}
