import { EMOJI_CHOICES } from '../theme'

export default function LinkModal({ open, onClose, title, url, icon, onTitleChange, onUrlChange, onIconChange, onSubmit, palette: p, dark, isGlass }) {
  if (!open) return null

  const backdropStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 50, animation: 'fadeIn .15s ease' }
  const modalStyle = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 51,
    width: 'min(420px, calc(100vw - 32px))',
    background: dark && isGlass ? 'rgba(40,32,50,.7)' : p.cardBg,
    backdropFilter: p.blur || 'blur(6px)',
    border: '1px solid ' + p.cardBorder,
    borderRadius: 'var(--radius-lg, 16px)',
    boxShadow: '0 24px 70px rgba(0,0,0,.35)',
    padding: '26px',
    color: p.text,
    animation: 'popIn .18s ease',
    boxSizing: 'border-box',
  }
  const titleStyle = { fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight,400)', fontSize: '20px', margin: '0 0 4px' }
  const subStyle = { fontSize: '12.5px', opacity: 0.6, margin: '0 0 18px' }
  const fieldWrapStyle = { marginBottom: '14px' }
  const labelStyle = { display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.03em', opacity: 0.55, marginBottom: '6px' }
  const emojiRowStyle = { display: 'flex', gap: '8px', flexWrap: 'wrap' }
  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '12px',
    padding: '11px 13px',
    fontSize: '13px',
    border: '1px solid ' + p.inputBorder,
    background: p.inputBg,
    color: p.text,
    outline: 'none',
    fontFamily: 'var(--font-body)',
  }
  const actionsStyle = { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }
  const ghostBtnStyle = { border: '1px solid ' + p.pillBorder, background: 'transparent', color: p.text, borderRadius: '999px', padding: '10px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }
  const primaryBtnStyle = { border: 'none', background: p.accent, color: p.accentText, borderRadius: '999px', padding: '10px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }

  return (
    <>
      <div style={backdropStyle} onClick={onClose} />
      <div style={modalStyle}>
        <p style={titleStyle}>Add a link</p>
        <p style={subStyle}>Pin a site to your Links widget.</p>

        <div style={fieldWrapStyle}>
          <label style={labelStyle}>Icon</label>
          <div style={emojiRowStyle}>
            {EMOJI_CHOICES.map((em) => (
              <button
                key={em}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '16px',
                  border: em === icon ? '1.5px solid ' + p.accent : '1.5px solid transparent',
                  background: em === icon ? p.chip : p.chip2,
                  cursor: 'pointer',
                }}
                onClick={() => onIconChange(em)}
              >
                {em}
              </button>
            ))}
          </div>
        </div>

        <div style={fieldWrapStyle}>
          <label style={labelStyle}>Title</label>
          <input value={title} onChange={(e) => onTitleChange(e.target.value)} placeholder="Figma" style={inputStyle} />
        </div>

        <div style={fieldWrapStyle}>
          <label style={labelStyle}>URL</label>
          <input value={url} onChange={(e) => onUrlChange(e.target.value)} placeholder="https://figma.com" style={inputStyle} />
        </div>

        <div style={actionsStyle}>
          <button style={ghostBtnStyle} onClick={onClose}>
            Cancel
          </button>
          <button style={primaryBtnStyle} onClick={onSubmit}>
            Add link
          </button>
        </div>
      </div>
    </>
  )
}
