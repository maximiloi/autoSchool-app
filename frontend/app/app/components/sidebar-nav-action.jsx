import Link from 'next/link';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { UserRoundPlus, BookPlus } from 'lucide-react';

// This is sample data.
const data = {
  navAction: [
    {
      title: 'Добавить ученика',
      url: '/app/create/student/',
      icon: UserRoundPlus,
    },
    {
      title: 'Добавить группу',
      url: '/app/create/group/',
      icon: BookPlus,
    },
  ],
};

export default function NavAction({ actions = data.navAction, ...props }) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {actions.map((action) => (
            <SidebarMenuItem key={action.title}>
              <SidebarMenuButton asChild size="sm">
                <Link href={action.url}>
                  <action.icon />
                  <span>{action.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
