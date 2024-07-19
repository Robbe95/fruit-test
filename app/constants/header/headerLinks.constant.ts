import type { NavigationLink } from '~/types/navigation/navigationLink.type'

export const HEADER_LINKS = [
  {
    title: 'Home',
    to: {
      name: 'index',
    },
  },
  {
    title: 'Login',
    to: {
      name: 'auth-login',
    },
  },
] satisfies NavigationLink[]
