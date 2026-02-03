import { CartProvider } from 'components/cart/cart-context';
import NavbarIntegrated from '@/components/custom/NavbarIntegrated';
import { WelcomeToast } from 'components/welcome-toast';
// import N8nChatWidget from '@/components/N8nChatWidget';
import { PageProgress } from '@/components/ui/page-progress';
import { WebVitals } from '@/components/web-vitals';
import { GeistSans } from 'geist/font/sans';
import { getCart, getCollections } from 'lib/shopify';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { baseUrl } from 'lib/utils';
import localFont from 'next/font/local';

const belleza = localFont({
  src: '../fonts/Belleza-Regular.ttf',
  variable: '--font-belleza',
});

const moderat = localFont({
  src: '../fonts/Moderat-Black.ttf',
  variable: '--font-moderat',
});

const siteName = process.env.SITE_NAME || 'servigreen | Tu vivero online'; // Aseguramos un valor por defecto

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: { // Usamos la variable siteName segura
    default: siteName,
    template: `%s | ${siteName}`
  },
  icons: {
    icon: '/favicon.jpg',
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg'
  },
  robots: {
    follow: true,
    index: true
  }
};

export const viewport = {
  themeColor: '#2d7a3e'
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();
  const collections = await getCollections();

  return (
    <html lang="es" className={`${GeistSans.variable} ${belleza.variable} ${moderat.variable}`}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <CartProvider cartPromise={cart}>
          <WebVitals />
          <PageProgress />
          <NavbarIntegrated collections={collections} />
          <main className="pt-[118px]">
            {children}
            <Toaster closeButton />
            <WelcomeToast />
            {/* <N8nChatWidget /> */}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
