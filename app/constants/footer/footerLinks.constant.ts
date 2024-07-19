import type { NavigationLink } from '~/types/navigation/navigationLink.type'

export const FOOTER_LINKS = [
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
