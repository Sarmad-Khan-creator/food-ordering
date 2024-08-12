import { CookieIcon, LayoutDashboard, Users } from 'lucide-react';

export type SidebarLinks = {
  title: string;
  link: string;
  icon: JSX.Element;
};

export const adminLinks: SidebarLinks[] = [
  {
    title: 'Dashboard',
    link: '/admin/dashboard',
    icon: <LayoutDashboard />,
  },
  {
    title: 'Users',
    link: '/admin/users',
    icon: <Users />,
  },
  {
    title: 'Food',
    link: '/admin/food',
    icon: <CookieIcon />,
  },
];

export const roles = ['USER', 'ADMIN'];
