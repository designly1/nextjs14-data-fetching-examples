import React from 'react';
import BoxLoader from '@/components/BoxLoader';

import dynamic from 'next/dynamic';
const ClientExampleView = dynamic(() => import('./ClientExampleView'), {
	loading: () => <BoxLoader />,
	ssr: false,
});

export default function ClientExamplePage() {
	return <ClientExampleView />;
}
