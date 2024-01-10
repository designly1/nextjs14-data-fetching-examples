import React from 'react';
import BoxLoader from '@/components/BoxLoader';

import dynamic from 'next/dynamic';
const ServerExampleCodeView = dynamic(() => import('./ServerExampleCodeView'), {
	loading: () => <BoxLoader message="Loading UI..." />,
	ssr: false,
});

export default function ServerExampleCodePage() {
	return <ServerExampleCodeView />;
}
