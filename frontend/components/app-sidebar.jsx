import { Car, UsersRound, BookUser } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar';

import { SidebarCompanyInfo } from './sidebar-company-info';
import { NavGroups } from './sidebar-nav-groups';

// This is sample data.
const data = {
  user: {
    name: 'Игорь',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  company: {
    name: 'ООО "КАО"',
    logo: Car,
  },
  groups: [
    {
      title: 'Активные Группы',
      url: '#',
      icon: UsersRound,
      isActive: true,
      items: [
        {
          title: '187',
          url: '#',
        },
        {
          title: '189',
          url: '#',
        },
        {
          title: '167',
          url: '#',
        },
      ],
    },
    {
      title: 'Архивные Группы',
      url: '#',
      icon: BookUser,
      isActive: false,
      items: [
        {
          title: '186',
          url: '#',
        },
        {
          title: '185',
          url: '#',
        },
        {
          title: '187',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarCompanyInfo company={data.company} />
      </SidebarHeader>
      <SidebarSeparator className='my-4' />
      <SidebarContent>
        <NavGroups groups={data.groups} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
