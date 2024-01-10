import React from 'react';
import { Link as L } from 'nextjs13-progress';

/**
 * 
 * This is a wrapper around the Next.js Link component.
 * temporary hack until nextjs13-progress is updated to support TypeScript 5
 */

interface LinkProps {
	href: string;
	className?: string;
	target?: string;
	children: React.ReactNode;
}

export default function Link(props: LinkProps) {
	return <L {...props} />;
}
