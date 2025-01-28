import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Car, ChevronUp, Plus, User2 } from 'lucide-react';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className='flex gap-4 items-end'>
          <Car className='size-8' />
          <h2 className='font-bold'>ООО "КАО"</h2>
        </div>
        {/* TODO <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Группы</SidebarGroupLabel>
          <SidebarGroupAction title='Добавить группу'>
            <Plus /> <span className='sr-only'>Добавить группу</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={1}>
                <SidebarMenuButton asChild>
                  <a href='#'>1</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key={2}>
                <SidebarMenuButton asChild>
                  <a href='#'>2 вечерняя</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key={3}>
                <SidebarMenuButton asChild>
                  <a href='#'>3 выходной</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
