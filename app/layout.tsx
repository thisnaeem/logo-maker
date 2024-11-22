import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-plus-jakarta'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-plus-jakarta">
        {children}
      </body>
    </html>
  );
}
