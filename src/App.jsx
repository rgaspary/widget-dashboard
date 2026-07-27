import { useEffect, useMemo, useRef, useState } from 'react'
import TopBar from './components/TopBar'
import WidgetCard from './components/WidgetCard'
import LinkModal from './components/LinkModal'
import LinksWidget from './widgets/LinksWidget'
import SearchWidget from './widgets/SearchWidget'
import WeatherWidget from './widgets/WeatherWidget'
import ClockWidget from './widgets/ClockWidget'
import TodoWidget from './widgets/TodoWidget'
import CalendarWidget from './widgets/CalendarWidget'
import NotesWidget from './widgets/NotesWidget'
import PhotoWidget from './widgets/PhotoWidget'
import { colsFor, gridContainerStyle, gridMetrics, sortByPosition, viewportFor } from './lib/layout'
import {
  CALENDAR_ITEMS,
  COLS_DESKTOP,
  DEFAULT_LAYOUT,
  DEFAULT_LINKS,
  DEFAULT_TODOS,
  PHOTO_STORAGE_KEY,
  STORAGE_KEY,
  WIDGET_DEFS,
  WIDGET_ORDER,
  palette,
} from './theme'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function loadPhotos() {
  try {
    const raw = localStorage.getItem(PHOTO_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export default function App() {
  const saved = useState(loadState)[0]
  const gridRef = useRef(null)

  const [theme, setTheme] = useState(saved?.theme || 'glass')
  const [mode, setMode] = useState(saved?.mode || 'dark')
  const [widgets, setWidgets] = useState(saved?.widgets?.length ? saved.widgets : DEFAULT_LAYOUT)
  const [links, setLinks] = useState(saved?.links || DEFAULT_LINKS)
  const [todos, setTodos] = useState(saved?.todos || DEFAULT_TODOS)
  const [notesText, setNotesText] = useState(saved?.notesText || '')
  const [photos, setPhotos] = useState(loadPhotos)

  const [viewport, setViewport] = useState('desktop')
  const [containerWidth, setContainerWidth] = useState(1120)
  const [drag, setDrag] = useState(null)
  const [resize, setResize] = useState(null)
  const [addMenuOpen, setAddMenuOpen] = useState(false)
  const [linkModalOpen, setLinkModalOpen] = useState(false)
  const [linkTitle, setLinkTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [linkIcon, setLinkIcon] = useState('🔗')
  const [newTodoText, setNewTodoText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [now, setNow] = useState(new Date())

  // Persist board state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, mode, widgets, links, todos, notesText }))
    } catch {
      /* localStorage unavailable (private mode, quota) — dashboard still works this session */
    }
  }, [theme, mode, widgets, links, todos, notesText])

  // Photos persisted separately since data URLs can be large
  useEffect(() => {
    try {
      localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(photos))
    } catch {
      /* ignore quota errors — photo just won't survive a reload */
    }
  }, [photos])

  // Responsive viewport + grid column width
  useEffect(() => {
    function measure() {
      const w = window.innerWidth
      setViewport(viewportFor(w))
      const cw = gridRef.current ? gridRef.current.clientWidth : Math.min(w - 48, 1280)
      setContainerWidth(cw || 1120)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Clock / greeting tick
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(id)
  }, [])

  // Drag + resize pointer tracking
  useEffect(() => {
    if (!drag && !resize) return

    function onMove(e) {
      if (drag) {
        const { colWidth, rowH, gap } = gridMetrics(containerWidth, COLS_DESKTOP)
        const dCols = Math.round((e.clientX - drag.startX) / (colWidth + gap))
        const dRows = Math.round((e.clientY - drag.startY) / (rowH + gap))
        setWidgets((ws) =>
          ws.map((w) =>
            w.id === drag.id
              ? { ...w, x: Math.max(0, Math.min(COLS_DESKTOP - w.w, drag.origX + dCols)), y: Math.max(0, drag.origY + dRows) }
              : w
          )
        )
      } else if (resize) {
        const { colWidth, rowH, gap } = gridMetrics(containerWidth, COLS_DESKTOP)
        const dCols = Math.round((e.clientX - resize.startX) / (colWidth + gap))
        const dRows = Math.round((e.clientY - resize.startY) / (rowH + gap))
        setWidgets((ws) =>
          ws.map((w) =>
            w.id === resize.id
              ? { ...w, w: Math.max(2, Math.min(COLS_DESKTOP - w.x, resize.origW + dCols)), h: Math.max(2, resize.origH + dRows) }
              : w
          )
        )
      }
    }
    function onUp() {
      document.body.style.userSelect = ''
      setDrag(null)
      setResize(null)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [drag, resize, containerWidth])

  const dark = mode === 'dark'
  const p = palette(theme, dark)
  const isGlass = theme === 'glass'

  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const todayLabel = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
  const clockTime = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  const clockDate = now.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

  const present = useMemo(() => new Set(widgets.map((w) => w.type)), [widgets])
  const hiddenTypes = useMemo(() => WIDGET_ORDER.filter((t) => !present.has(t)), [present])

  const cols = colsFor(viewport)
  const orderedWidgets = viewport === 'desktop' ? widgets : sortByPosition(widgets)

  function onDragPointerDown(id) {
    return (e) => {
      if (viewport !== 'desktop') return
      e.preventDefault()
      const w = widgets.find((x) => x.id === id)
      document.body.style.userSelect = 'none'
      setDrag({ id, startX: e.clientX, startY: e.clientY, origX: w.x, origY: w.y })
    }
  }
  function onResizePointerDown(id) {
    return (e) => {
      e.preventDefault()
      e.stopPropagation()
      const w = widgets.find((x) => x.id === id)
      document.body.style.userSelect = 'none'
      setResize({ id, startX: e.clientX, startY: e.clientY, origW: w.w, origH: w.h })
    }
  }

  function addWidget(type) {
    const def = WIDGET_DEFS[type]
    const maxY = widgets.reduce((m, w) => Math.max(m, w.y + w.h), 0)
    const id = 'w-' + type + '-' + Date.now()
    setWidgets((ws) => [...ws, { id, type, x: 0, y: maxY, w: def.w, h: def.h }])
    setAddMenuOpen(false)
  }
  function removeWidget(id) {
    setWidgets((ws) => ws.filter((w) => w.id !== id))
  }

  function openLinkModal() {
    setLinkTitle('')
    setLinkUrl('')
    setLinkIcon('🔗')
    setLinkModalOpen(true)
    setAddMenuOpen(false)
  }
  function submitLink() {
    const title = linkTitle.trim()
    let url = linkUrl.trim()
    if (!title || !url) return
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url
    setLinks((ls) => [...ls, { id: 'l-' + Date.now(), title, url, icon: linkIcon }])
    setLinkModalOpen(false)
  }
  function removeLink(id) {
    setLinks((ls) => ls.filter((l) => l.id !== id))
  }

  function toggleTodo(id) {
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }
  function removeTodo(id) {
    setTodos((ts) => ts.filter((t) => t.id !== id))
  }
  function addTodo() {
    const text = newTodoText.trim()
    if (!text) return
    setTodos((ts) => [...ts, { id: 't-' + Date.now(), text, done: false }])
    setNewTodoText('')
  }

  function setPhoto(widgetId, dataUrl) {
    setPhotos((ph) => {
      const next = { ...ph }
      if (dataUrl) next[widgetId] = dataUrl
      else delete next[widgetId]
      return next
    })
  }

  const pageStyle = {
    minHeight: '100vh',
    background: p.bg,
    color: p.text,
    fontFamily: 'var(--font-body)',
    transition: 'background .35s ease, color .35s ease',
    boxSizing: 'border-box',
  }

  function renderWidgetBody(w) {
    switch (w.type) {
      case 'links':
        return <LinksWidget links={links} onRemove={removeLink} onAddClick={openLinkModal} palette={p} />
      case 'search':
        return <SearchWidget query={searchQuery} onChange={setSearchQuery} palette={p} />
      case 'weather':
        return <WeatherWidget />
      case 'clock':
        return <ClockWidget time={clockTime} date={clockDate} />
      case 'todo':
        return (
          <TodoWidget
            todos={todos}
            newText={newTodoText}
            onNewTextChange={setNewTodoText}
            onAdd={addTodo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            palette={p}
          />
        )
      case 'calendar':
        return <CalendarWidget items={CALENDAR_ITEMS} palette={p} />
      case 'notes':
        return <NotesWidget value={notesText} onChange={setNotesText} palette={p} />
      case 'photo':
        return <PhotoWidget photo={photos[w.id] || null} onChange={(dataUrl) => setPhoto(w.id, dataUrl)} palette={p} />
      default:
        return null
    }
  }

  return (
    <div style={pageStyle}>
      <TopBar
        theme={theme}
        onThemeChange={setTheme}
        dark={dark}
        onToggleMode={() => setMode(dark ? 'light' : 'dark')}
        greeting={greeting}
        todayLabel={todayLabel}
        palette={p}
        isGlass={isGlass}
        addMenuOpen={addMenuOpen}
        onToggleAddMenu={() => setAddMenuOpen((o) => !o)}
        onCloseAddMenu={() => setAddMenuOpen(false)}
        hiddenTypes={hiddenTypes}
        onAddWidget={addWidget}
      />

      <div ref={gridRef} style={gridContainerStyle(viewport, cols)}>
        {orderedWidgets.map((w) => (
          <WidgetCard
            key={w.id}
            widget={w}
            title={WIDGET_DEFS[w.type].title}
            viewport={viewport}
            palette={p}
            isActive={(drag && drag.id === w.id) || (resize && resize.id === w.id)}
            onDragPointerDown={onDragPointerDown(w.id)}
            onResizePointerDown={onResizePointerDown(w.id)}
            onRemove={() => removeWidget(w.id)}
          >
            {renderWidgetBody(w)}
          </WidgetCard>
        ))}
      </div>

      <LinkModal
        open={linkModalOpen}
        onClose={() => setLinkModalOpen(false)}
        title={linkTitle}
        url={linkUrl}
        icon={linkIcon}
        onTitleChange={setLinkTitle}
        onUrlChange={setLinkUrl}
        onIconChange={setLinkIcon}
        onSubmit={submitLink}
        palette={p}
        dark={dark}
        isGlass={isGlass}
      />
    </div>
  )
}
