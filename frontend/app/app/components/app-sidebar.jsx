'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { UsersRound, BookUser } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';

import SidebarCompanyInfo from './sidebar-company-info';
import NavGroups from './sidebar-nav-groups';
import NavAction from './sidebar-nav-action';
import NavUser from './sidebar-nav-user';

// This is sample data.
const data = {
  groups: [
    {
      title: 'Активные Группы',
      url: '/',
      icon: UsersRound,
      isActive: true,
      items: [
        {
          title: '187',
          url: '/app/group/',
        },
        {
          title: '189',
          url: '/app/group/',
        },
        {
          title: '167',
          url: '/app/group/',
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
};

export default function AppSidebar() {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const session = useSession();
  const { toast } = useToast();

  useEffect(() => {
    if (session.status === 'authenticated' && session.data?.user?.email) {
      setUser(session.data.user);
      fetch(`/api/company/${session.data.user.companyId}`)
        .then((res) => res.json())
        .then((data) => setCompany(data))
        .catch((error) => {
          console.error('Ошибка загрузки данных компании:', error);
          toast({
            title: 'Ошибка',
            description: 'Не удалось загрузить данные компании.',
            status: 'error',
          });
        });
    }
  }, [session]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarCompanyInfo name={company ? company.shortName : null} />
      </SidebarHeader>
      <SidebarSeparator className="my-4" />
      <SidebarContent>
        <NavGroups groups={data.groups} />
        <SidebarSeparator className="my-4 mt-auto" />
        <NavAction />
      </SidebarContent>
      <SidebarSeparator className="my-4" />
      <SidebarFooter>
        <NavUser user={user} companyName={company ? company.shortName : null} />
      </SidebarFooter>
    </Sidebar>
  );
}
