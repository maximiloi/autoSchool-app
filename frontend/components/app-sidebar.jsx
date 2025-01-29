import {
  Car,
  UsersRound,
  BookUser,
  UserRoundPlus,
  BookPlus,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar';

import { SidebarCompanyInfo } from './sidebar-company-info';
import { NavGroups } from './sidebar-nav-groups';
import { NavAction } from './sidebar-nav-action';

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
  navAction: [
    {
      title: 'Добавить ученика',
      url: '#',
      icon: UserRoundPlus,
    },
    {
      title: 'Добавить группу',
      url: '#',
      icon: BookPlus,
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
        <SidebarSeparator className='my-4 mt-auto' />
        <NavAction actions={data.navAction} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
