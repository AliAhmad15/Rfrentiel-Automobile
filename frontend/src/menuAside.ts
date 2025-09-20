import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/brands/brands-list',
    label: 'Brands',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCar' in icon ? icon['mdiCar' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_BRANDS'
  },
  {
    href: '/datasets/datasets-list',
    label: 'Datasets',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFolder' in icon ? icon['mdiFolder' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_DATASETS'
  },
  {
    href: '/generations/generations-list',
    label: 'Generations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCar' in icon ? icon['mdiCar' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_GENERATIONS'
  },
  {
    href: '/images/images-list',
    label: 'Images',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiImage' in icon ? icon['mdiImage' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_IMAGES'
  },
  {
    href: '/models/models-list',
    label: 'Models',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCar' in icon ? icon['mdiCar' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_MODELS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
