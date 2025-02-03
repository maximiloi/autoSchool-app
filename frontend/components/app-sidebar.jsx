import { Car, UsersRound, BookUser, UserRoundPlus, BookPlus } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar';

import SidebarCompanyInfo from './sidebar-company-info';
import NavGroups from './sidebar-nav-groups';
import NavAction from './sidebar-nav-action';

// This is sample data.
const data = {
  company: {
    name: 'ООО "КАО"',
    logo: Car,
  },
  groups: [
    {
      title: 'Активные Группы',
      url: '/',
      icon: UsersRound,
      isActive: true,
      items: [
        {
          title: '187',
          url: '/group/',
        },
        {
          title: '189',
          url: '/group/',
        },
        {
          title: '167',
          url: '/group/',
        },
      ],
    },
    {
      title: 'Архивные Группы',
      url: '/',
      icon: BookUser,
      isActive: false,
      items: [
        {
          title: '186',
          url: '/group/',
        },
        {
          title: '185',
          url: '/group/',
        },
        {
          title: '187',
          url: '/group/',
        },
      ],
    },
  ],
  navAction: [
    {
      title: 'Добавить ученика',
      url: '/create/student/',
      icon: UserRoundPlus,
    },
    {
      title: 'Добавить группу',
      url: '/create/group/',
      icon: BookPlus,
    },
  ],
};

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarCompanyInfo company={data.company} />
      </SidebarHeader>
      <SidebarSeparator className="my-4" />
      <SidebarContent>
        <NavGroups groups={data.groups} />
        <SidebarSeparator className="my-4 mt-auto" />
        <NavAction actions={data.navAction} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
