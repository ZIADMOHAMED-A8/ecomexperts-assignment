export const STORAGE_KEY = 'wyze-bundle-builder'

export function getInitialSelection() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return {
    activeVariants: {
      'cam-v4': 'white',
      'cam-pan-v3': 'white',
      'cam-floodlight-v2': 'white',
      'battery-cam-pro': 'white',
    },
    quantities: {
      'cam-v4:white': 1,
      'cam-pan-v3:white': 2,
      'motion-sensor': 2,
      'sense-hub': 1,
      'microsd-card': 2,
      'cam-unlimited': 1,
    },
  }
}
