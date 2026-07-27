import { useRef, useState } from 'react'
import { CloseIcon, ImageIcon } from '../components/icons'

const MAX_DIMENSION = 1000

function downscaleToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not read image'))
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height))
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export default function PhotoWidget({ photo, onChange, palette: p }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState(null)

  async function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      setError('Drop an image file')
      return
    }
    try {
      const dataUrl = await downscaleToDataUrl(file)
      setError(null)
      onChange(dataUrl)
    } catch {
      setError('Could not load that image')
    }
  }

  const wrapStyle = { flex: 1, minHeight: 0, borderRadius: '12px', overflow: 'hidden', position: 'relative' }
  const dropStyle = {
    flex: 1,
    minHeight: 0,
    borderRadius: '12px',
    border: '1.5px dashed ' + (dragOver ? p.accent : p.inputBorder),
    background: dragOver ? p.chip : p.inputBg,
    color: p.muted,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    textAlign: 'center',
    padding: '10px',
  }
  const removeBtnStyle = {
    position: 'absolute',
    top: '6px',
    right: '6px',
    border: 'none',
    background: 'rgba(0,0,0,.45)',
    color: '#fff',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
  }

  if (photo) {
    return (
      <div style={wrapStyle}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <button aria-label="Remove photo" style={removeBtnStyle} onClick={() => onChange(null)}>
          <CloseIcon />
        </button>
      </div>
    )
  }

  return (
    <div
      style={dropStyle}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        handleFile(e.dataTransfer.files?.[0])
      }}
    >
      <ImageIcon />
      <span>{error || 'Drop a photo here, or click to browse'}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  )
}
