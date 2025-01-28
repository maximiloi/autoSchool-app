import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
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
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
