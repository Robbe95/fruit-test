export interface Icons {}

export const icons = {
  alertCircle: import('@base/icons/AlertCircleIcon.vue'),
  arrowDown: import('@base/icons/ArrowDownIcon.vue'),
  arrowLeft: import('@base/icons/ArrowLeftIcon.vue'),
  arrowRight: import('@base/icons/ArrowRightIcon.vue'),
  arrowUp: import('@base/icons/ArrowUpIcon.vue'),
  arrowUpDown: import('@base/icons/ArrowUpDownIcon.vue'),
  calendar: import('@base/icons/CalendarIcon.vue'),
  cart: import('@base/icons/CartIcon.vue'),
  checkmark: import('@base/icons/CheckmarkIcon.vue'),
  checkmarkCircle: import('@base/icons/CheckmarkCircleIcon.vue'),
  chevronDown: import('@base/icons/ChevronDownIcon.vue'),
  chevronLeft: import('@base/icons/ChevronLeftIcon.vue'),
  chevronRight: import('@base/icons/ChevronRightIcon.vue'),
  chevronUp: import('@base/icons/ChevronUpIcon.vue'),
  close: import('@base/icons/CloseIcon.vue'),
  eye: import('@base/icons/EyeIcon.vue'),
  eyeSlash: import('@base/icons/EyeSlashIcon.vue'),
  facebook: import('@base/icons/FacebookIcon.vue'),
  filterLines: import('@base/icons/FilterLinesIcon.vue'),
  instagram: import('@base/icons/InstagramIcon.vue'),
  linkedIn: import('@base/icons/LinkedInIcon.vue'),
  minus: import('@base/icons/MinusIcon.vue'),
  plus: import('@base/icons/PlusIcon.vue'),
  profile: import('@base/icons/ProfileIcon.vue'),
  search: import('@base/icons/SearchIcon.vue'),
  trash: import('@base/icons/TrashIcon.vue'),
  twitter: import('@base/icons/TwitterIcon.vue'),
  warning: import('@base/icons/WarningIcon.vue'),
} as const

export type AllIcons = typeof icons
export function extendIcons(customIcons: Icons): void {
  Object.assign(icons, customIcons)
}

export type Icon = keyof AllIcons
