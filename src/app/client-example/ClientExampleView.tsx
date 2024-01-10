'use client';

import React, { useState } from 'react';
import Link from '@/components/Link';
import BoxLoader from '@/components/BoxLoader';
import SongCard from '@/components/SongCard';
import GistView from '@/components/GistView';

import useSwr from 'swr';
import fetchSongs from '@/lib/server/fetchSongs';

import { LuRefreshCcw } from 'react-icons/lu';
import { BiCodeAlt } from 'react-icons/bi';

export default function ClientExampleView() {
	const { data: songs, isLoading, isValidating, mutate } = useSwr('songs', fetchSongs);
	const [showCode, setShowCode] = useState(false);

	if (isLoading) {
		return <BoxLoader message="Loading songs..." />;
	}

	if (!songs) {
		return <div className="m-auto text-error">Failed to load songs</div>;
	}

	return (
		<>
			<div className="m-auto w-full max-w-7xl grid grid-cols-4 gap-6 py-10 px-4 2xl:px-0">
				<h1 className="text-2xl font-bold col-span-4 text-center">Client Example</h1>
				<div className="col-span-4 flex items-center justify-center gap-4">
					<Link className="btn btn-primary" href="/">
						Go Back
					</Link>
					<button className="btn btn-secondary" onClick={() => mutate()}>
						<div className="w-6 flex items-center justify-center">
							{isValidating ? <div className="loading loading-ring"></div> : <LuRefreshCcw />}
						</div>
						Refresh
					</button>
					<button className="btn btn-secondary" onClick={() => setShowCode(!showCode)}>
						<BiCodeAlt />
						Show Code
					</button>
				</div>
				{songs.map((song, i) => (
					<SongCard key={i} song={song} />
				))}
			</div>
			{showCode ? <GistView id="743c990310fc7e06af21a3d5673e72c7" setShow={setShowCode} /> : null}
		</>
	);
}
