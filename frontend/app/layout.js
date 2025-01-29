import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';

import { AppSidebar } from '@/components/app-sidebar';

import './globals.css';

export const metadata = {
  title: 'ООО "КАО" | Автошкола',
  description: 'Приложение для автошколы',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ru'>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarInset>
              <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                <div className='flex items-center gap-2 px-4'>
                  <SidebarTrigger className='-ml-1' />
                  <Separator orientation='vertical' className='mr-2 h-4' />
                </div>
              </header>
            </SidebarInset>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
