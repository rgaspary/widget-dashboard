export const WIDGET_DEFS = {
  links: { title: 'Links', w: 4, h: 7 },
  search: { title: 'Search', w: 4, h: 3 },
  weather: { title: 'Weather', w: 2, h: 3 },
  clock: { title: 'Clock', w: 2, h: 3 },
  todo: { title: 'To-do', w: 4, h: 5 },
  calendar: { title: 'Calendar', w: 4, h: 5 },
  notes: { title: 'Notes', w: 4, h: 4 },
  photo: { title: 'Photo', w: 4, h: 4 },
}

export const WIDGET_ORDER = ['links', 'search', 'weather', 'clock', 'todo', 'calendar', 'notes', 'photo']

export const DEFAULT_LAYOUT = [
  { id: 'w-links', type: 'links', x: 0, y: 0, w: 4, h: 7 },
  { id: 'w-search', type: 'search', x: 4, y: 0, w: 4, h: 3 },
  { id: 'w-weather', type: 'weather', x: 4, y: 3, w: 2, h: 3 },
  { id: 'w-clock', type: 'clock', x: 6, y: 3, w: 2, h: 3 },
  { id: 'w-todo', type: 'todo', x: 8, y: 0, w: 4, h: 4 },
  { id: 'w-calendar', type: 'calendar', x: 8, y: 4, w: 4, h: 4 },
  { id: 'w-notes', type: 'notes', x: 0, y: 7, w: 4, h: 4 },
  { id: 'w-photo', type: 'photo', x: 4, y: 6, w: 4, h: 4 },
]

export const DEFAULT_LINKS = [
  { id: 'l1', title: 'Figma', url: 'https://figma.com', icon: '🔗' },
  { id: 'l2', title: 'Gmail', url: 'https://mail.google.com', icon: '📧' },
  { id: 'l3', title: 'Notion', url: 'https://notion.so', icon: '📝' },
]

export const DEFAULT_TODOS = [
  { id: 't1', text: 'Review PR feedback', done: false },
  { id: 't2', text: 'Water the plants', done: true },
  { id: 't3', text: 'Book dentist', done: false },
]

export const CALENDAR_ITEMS = [
  { time: '10:00', title: 'Design sync' },
  { time: '1:30', title: '1:1 with Sam' },
  { time: '5:00', title: 'Yoga' },
]

export const EMOJI_CHOICES = ['🔗', '⭐', '📌', '💻', '📧', '📝', '🎨', '📊']

export const STORAGE_KEY = 'widget-dashboard-v1'
export const PHOTO_STORAGE_KEY = 'widget-dashboard-photos-v1'
export const COLS_DESKTOP = 12
export const COLS_TABLET = 2
export const ROW_H = 64
export const GAP = 16

const PALETTES = {
  organic: {
    light: {
      bg: 'var(--color-bg)',
      text: 'var(--color-text)',
      cardBg: '#fff',
      cardBorder: 'transparent',
      shadow: '0 1px 2px rgba(46,43,37,.14)',
      muted: 'var(--color-neutral-700)',
      accent: 'var(--color-accent)',
      accentText: '#fff',
      chip: 'var(--color-accent-100)',
      chip2: 'var(--color-accent-200)',
      pillBg: 'var(--color-neutral-100)',
      pillBorder: 'var(--color-neutral-200)',
      inputBg: 'var(--color-neutral-100)',
      inputBorder: 'var(--color-neutral-200)',
      blur: '',
    },
    dark: {
      bg: '#241d17',
      text: '#f2e9dc',
      cardBg: '#2f251d',
      cardBorder: '#3c2f24',
      shadow: 'none',
      muted: '#c9bba9',
      accent: 'var(--color-accent)',
      accentText: '#fff',
      chip: '#3c2f24',
      chip2: '#4a3a2c',
      pillBg: '#2f251d',
      pillBorder: '#3c2f24',
      inputBg: '#3c2f24',
      inputBorder: '#4a3a2c',
      blur: '',
    },
  },
  minimal: {
    light: {
      bg: '#fbfaf8',
      text: '#1f1d1c',
      cardBg: '#fff',
      cardBorder: '#e7e3dc',
      shadow: 'none',
      muted: '#6b655a',
      accent: '#1f1d1c',
      accentText: '#fff',
      chip: '#f7f5f1',
      chip2: '#efece6',
      pillBg: '#fff',
      pillBorder: '#e6e2db',
      inputBg: '#f7f5f1',
      inputBorder: '#e7e3dc',
      blur: '',
    },
    dark: {
      bg: '#17181a',
      text: '#f2f1ee',
      cardBg: '#1f2023',
      cardBorder: '#2b2c30',
      shadow: 'none',
      muted: '#9a978f',
      accent: '#f2f1ee',
      accentText: '#17181a',
      chip: '#26272b',
      chip2: '#2f3034',
      pillBg: '#1f2023',
      pillBorder: '#2b2c30',
      inputBg: '#26272b',
      inputBorder: '#2f3034',
      blur: '',
    },
  },
  glass: {
    light: {
      bg: 'linear-gradient(150deg,#f7d9c4 0%,#f0b9a8 42%,#e59a8f 78%,#c67139 100%)',
      text: '#2c1810',
      cardBg: 'rgba(255,255,255,.32)',
      cardBorder: 'rgba(255,255,255,.55)',
      shadow: '0 8px 32px rgba(0,0,0,.10)',
      muted: 'rgba(44,24,16,.65)',
      accent: '#a8501f',
      accentText: '#fff',
      chip: 'rgba(255,255,255,.28)',
      chip2: 'rgba(255,255,255,.45)',
      pillBg: 'rgba(255,255,255,.4)',
      pillBorder: 'rgba(255,255,255,.6)',
      inputBg: 'rgba(255,255,255,.32)',
      inputBorder: 'rgba(255,255,255,.55)',
      blur: 'blur(18px)',
    },
    dark: {
      bg: 'linear-gradient(150deg,#3a3550 0%,#5b4a6b 42%,#7a5b62 78%,#c67139 100%)',
      text: '#fff',
      cardBg: 'rgba(255,255,255,.10)',
      cardBorder: 'rgba(255,255,255,.22)',
      shadow: '0 8px 32px rgba(0,0,0,.18)',
      muted: 'rgba(255,255,255,.72)',
      accent: '#f2b16a',
      accentText: '#3a2410',
      chip: 'rgba(255,255,255,.08)',
      chip2: 'rgba(255,255,255,.18)',
      pillBg: 'rgba(255,255,255,.12)',
      pillBorder: 'rgba(255,255,255,.25)',
      inputBg: 'rgba(255,255,255,.12)',
      inputBorder: 'rgba(255,255,255,.25)',
      blur: 'blur(18px)',
    },
  },
}

export function palette(theme, dark) {
  return PALETTES[theme][dark ? 'dark' : 'light']
}
