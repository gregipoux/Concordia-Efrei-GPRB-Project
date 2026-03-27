export const intelFiles = [
  {
    id: 1,
    title: 'Golden Vault — Master Plan Overview',
    description:
      'Full breakdown of the vault entry strategy, guard schedules, escape routes and contingency protocols. Last updated by the_godfather. Do not share outside crew.',
    tags: ['Classified'],
    isPinned: true,
    author: 'the_godfather',
    authorInitials: 'TG',
    authorColor: 'bg-violet-500',
    date: 'Mar 3, 2026',
  },
  {
    id: 2,
    title: 'Guard Rotation Schedule — East Wing',
    description:
      'Guards rotate every 4 hours. Blind spot identified between 02:00–02:20. Window confirmed by shadow_fox on-site observation.',
    tags: ['Urgent', 'Recon'],
    isPinned: false,
    author: 'shadow_fox',
    authorInitials: 'SF',
    authorColor: 'bg-sky-500',
    date: 'Mar 1, 2026',
  },
  {
    id: 3,
    title: 'Vault Access Codes — Alpha Layer',
    description:
      'First layer digital codes obtained from inside contact. Expires in 72h. Use only on the night of operation. Do not log digitally.',
    tags: ['Classified'],
    isPinned: false,
    author: 'the_godfather',
    authorInitials: 'TG',
    authorColor: 'bg-violet-500',
    date: 'Mar 2, 2026',
  },
  {
    id: 4,
    title: 'Escape Route — Northern Docks',
    description:
      'Primary extraction point through northern docks. Boat confirmed available 01:00–03:00. Backup: river bridge crossing via ghost_rider.',
    tags: ['Recon'],
    isPinned: false,
    author: 'ghost_rider',
    authorInitials: 'GR',
    authorColor: 'bg-amber-500',
    date: 'Feb 28, 2026',
  },
  {
    id: 5,
    title: 'Security Camera Blind Spots Map',
    description:
      'Full layout of camera coverage gaps. Three dead zones identified on floors 2 and 3. Use stairwell B for vertical movement.',
    tags: ['Recon', 'Urgent'],
    isPinned: false,
    author: 'shadow_fox',
    authorInitials: 'SF',
    authorColor: 'bg-sky-500',
    date: 'Feb 25, 2026',
  },
  {
    id: 6,
    title: 'Inside Contact — Vault Manager Profile',
    description:
      'Background on internal asset. Schedule, habits, and leverage points documented. Handle with extreme discretion.',
    tags: ['Classified', 'Urgent'],
    isPinned: false,
    author: 'iron_wraith',
    authorInitials: 'IW',
    authorColor: 'bg-emerald-500',
    date: 'Feb 22, 2026',
  },
]

export const intelStats = [
  { label: 'TOTAL FILES', value: intelFiles.length, tone: 'operatives' },
  {
    label: 'CLASSIFIED',
    value: intelFiles.filter((f) => f.tags.includes('Classified')).length,
    tone: 'loot',
  },
  {
    label: 'URGENT',
    value: intelFiles.filter((f) => f.tags.includes('Urgent')).length,
    tone: 'use',
  },
  {
    label: 'PINNED',
    value: intelFiles.filter((f) => f.isPinned).length,
    tone: 'plan',
  },
]
