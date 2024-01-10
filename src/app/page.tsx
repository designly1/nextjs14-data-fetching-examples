import React from 'react';
import Link from '@/components/Link';

export default function MainPage() {
	return (
		<div className="m-auto w-full max-w-xl flex flex-col gap-6 border-2 rounded-xl p-4 md:p-8">
			<h1 className="text-2xl md:text-3xl font-bold">Next.js 14 Data Fetching Examples</h1>
			<Link className="btn btn-primary" href="/server-example">
				Server Fetching Example
			</Link>
			<Link className="btn btn-secondary" href="/client-example">
				Client Fetching Example
			</Link>
		</div>
	);
}
