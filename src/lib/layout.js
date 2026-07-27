import { COLS_DESKTOP, GAP, ROW_H } from '../theme'

export function viewportFor(width) {
  return width < 640 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
}

export function colsFor(viewport) {
  return viewport === 'tablet' ? 2 : COLS_DESKTOP
}

export function gridMetrics(containerWidth, cols) {
  const colWidth = (containerWidth - GAP * (cols - 1)) / cols
  return { colWidth, rowH: ROW_H, gap: GAP }
}

/** Order widgets top-left to bottom-right — used on tablet/mobile where the
 *  desktop drag grid collapses into a single flow. */
export function sortByPosition(widgets) {
  return [...widgets].sort((a, b) => a.y - b.y || a.x - b.x)
}

export function widgetShellStyle({ w, viewport, palette: p, isActive }) {
  const radiusLg = 'var(--radius-lg, 16px)'
  const base = {
    position: 'relative',
    background: p.cardBg,
    backdropFilter: p.blur,
    border: '1px solid ' + p.cardBorder,
    borderRadius: radiusLg,
    padding: '14px 16px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  }

  if (viewport === 'mobile') {
    return {
      ...base,
      width: '100%',
      minHeight: w.h * ROW_H * 0.6 + 'px',
      marginBottom: '16px',
      boxShadow: p.shadow,
    }
  }
  if (viewport === 'tablet') {
    return {
      ...base,
      gridColumn: 'span ' + (w.w >= 6 ? 2 : 1),
      gridRow: 'span ' + w.h,
      boxShadow: isActive ? '0 20px 45px rgba(0,0,0,.25)' : p.shadow,
      zIndex: isActive ? 30 : 1,
      transition: isActive ? 'none' : 'box-shadow .2s ease',
    }
  }
  return {
    ...base,
    gridColumn: w.x + 1 + ' / span ' + w.w,
    gridRow: w.y + 1 + ' / span ' + w.h,
    boxShadow: isActive ? '0 20px 45px rgba(0,0,0,.25)' : p.shadow,
    zIndex: isActive ? 30 : 1,
    transition: isActive ? 'none' : 'box-shadow .2s ease',
  }
}

export function gridContainerStyle(viewport, cols) {
  if (viewport === 'mobile') {
    return { padding: '8px clamp(16px,4vw,40px) 40px', display: 'flex', flexDirection: 'column' }
  }
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(' + cols + ', 1fr)',
    gridAutoRows: ROW_H + 'px',
    gap: GAP + 'px',
    gridAutoFlow: viewport === 'tablet' ? 'row dense' : 'row',
    margin: '8px clamp(16px,4vw,40px) 40px',
  }
}
