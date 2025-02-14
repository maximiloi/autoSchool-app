'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSession } from 'next-auth/react';
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

const mockCompanyData = {
  shortName: `Добавить компанию`,
};

export default function AppSidebar() {
  const [company, setCompany] = useState(null);
  const [groups, setGroups] = useState(null);
  const session = useSession();
  const { toast } = useToast();

  const fetchCompanyData = useCallback(
    async (companyId) => {
      if (!companyId) {
        setCompany(mockCompanyData);
        return;
      }

      try {
        const [companyRes, groupsRes] = await Promise.all([
          fetch(`/api/company/${companyId}`).then((res) => res.json()),
          fetch(`/api/group/${companyId}`).then((res) => res.json()),
        ]);

        setCompany(companyRes);
        setGroups(groupsRes);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить данные.',
          status: 'error',
        });
      }
    },
    [toast],
  );

  useEffect(() => {
    if (session.status === 'authenticated' && session.data?.user?.email) {
      fetchCompanyData(session.data.user.companyId);
    }
  }, [session, fetchCompanyData]);

  const user = useMemo(() => session.data?.user || null, [session]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarCompanyInfo name={company?.shortName || null} />
      </SidebarHeader>
      <SidebarSeparator className="my-4" />
      <SidebarContent>
        <NavGroups groups={groups || []} />
        <SidebarSeparator className="my-4 mt-auto" />
        <NavAction />
      </SidebarContent>
      <SidebarSeparator className="my-4" />
      <SidebarFooter>
        <NavUser user={user} companyName={company?.shortName || null} />
      </SidebarFooter>
    </Sidebar>
  );
}
