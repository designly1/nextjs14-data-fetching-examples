import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Next13NProgress } from 'nextjs13-progress';
import GitHubButton from '@/components/GitHubButton';
import Header from './Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Next.js 14 Data Fetching Examples | Designly',
	description: 'Next.js 14 Data Fetching Examples | Designly',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<GitHubButton />
				<div className="flex flex-col min-h-screen bg-base-300 text-base-content">
					<Header />
					{children}
				</div>
				<Next13NProgress color="#29D" />
			</body>
		</html>
	);
}
