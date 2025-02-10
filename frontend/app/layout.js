import { Toaster } from '@/components/ui/toaster';
import Providers from './providers';

import './globals.css';

export const metadata = {
  title: 'Автошкола',
  description: 'Приложение для автошколы',
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="ru">
      <body>
        <Providers session={session}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
