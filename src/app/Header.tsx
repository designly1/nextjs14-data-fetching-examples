import React from 'react';
import Link from '@/components/Link';
import Logo from '@/components/Logo';

export default function Header() {
	return (
		<header className="flex items-center gap-6 py-3 px-4 bg-base-200">
			<Link href="/">
				<Logo width={200} />
			</Link>
            <Link className="link-primary" href="https://designly.biz" target="_blank">Visit Designly.biz</Link>
			<Link className="link-primary" href="https://blog.designly.biz" target="_blank">Visit Designly Blog</Link>
		</header>
	);
}
