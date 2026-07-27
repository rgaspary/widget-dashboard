import { useState } from 'react'
import { faviconUrl, hostOf } from '../lib/links'
import { CloseIcon, PlusIcon } from '../components/icons'

function LinkRow({ link, onRemove, palette: p }) {
  const [faviconFailed, setFaviconFailed] = useState(false)
  const favicon = faviconUrl(link.url)
  const showFavicon = favicon && !faviconFailed

  const rowStyle = { display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 8px', borderRadius: '10px', background: p.chip, textDecoration: 'none', color: p.text, marginBottom: '4px' }
  const iconWrapStyle = { width: '26px', height: '26px', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '14px', flex: 'none', background: p.chip2, position: 'relative', overflow: 'hidden' }

  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" style={rowStyle}>
      <span style={iconWrapStyle}>
        {showFavicon ? (
          <img src={favicon} alt="" style={{ width: '16px', height: '16px' }} onError={() => setFaviconFailed(true)} />
        ) : (
          <span>{link.icon}</span>
        )}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
        <span style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{link.title}</span>
        <span style={{ fontSize: '11px', opacity: 0.55 }}>{hostOf(link.url)}</span>
      </span>
      <button
        aria-label="Remove link"
        style={{ border: 'none', background: 'transparent', color: p.muted, cursor: 'pointer', padding: '4px', display: 'grid', placeItems: 'center', opacity: 0.5 }}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onRemove(link.id)
        }}
      >
        <CloseIcon size={12} />
      </button>
    </a>
  )
}

export default function LinksWidget({ links, onRemove, onAddClick, palette: p }) {
  const addRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    borderRadius: '10px',
    border: '1.5px dashed currentColor',
    opacity: 0.65,
    fontSize: '12.5px',
    fontWeight: 700,
    marginTop: 'auto',
    cursor: 'pointer',
    background: 'transparent',
    color: p.text,
    fontFamily: 'var(--font-body)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'auto' }}>
      {links.map((link) => (
        <LinkRow key={link.id} link={link} onRemove={onRemove} palette={p} />
      ))}
      <button style={addRowStyle} onClick={onAddClick}>
        <PlusIcon size={13} />
        Add link
      </button>
    </div>
  )
}
