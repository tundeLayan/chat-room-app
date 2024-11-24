import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { TRPCProvider } from './_lib/trpc/Provider';

// import { TRPCProvider } from '@/lib/trpc/Provider';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'JUX',
    description: 'JUX Chat Room App',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <TRPCProvider>{children}</TRPCProvider>
            </body>
        </html>
    );
}
