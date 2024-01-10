import React from 'react';
import BoxLoader from '@/components/BoxLoader';

import dynamic from 'next/dynamic';
const ServerExampleView = dynamic(() => import('./ServerExampleView'), {
	loading: () => <BoxLoader message="Loading UI..." />,
});

import fetchSongs from '@/lib/server/fetchSongs';

export default async function ServerExamplePage() {
	const songs = await fetchSongs();

	return <ServerExampleView songs={songs} />;
}
