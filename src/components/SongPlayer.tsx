'use client';

import React from 'react';
import FullScreenLoader from './FullScreenLoader';

import dynamic from 'next/dynamic';
const Spotify = dynamic(() => import('./Players/Spotify'), {
	loading: () => <FullScreenLoader />,
});
const SoundCloud = dynamic(() => import('./Players/SoundCloud'), {
	loading: () => <FullScreenLoader />,
});

import fetchSong from '@/lib/server/fetchSong';
import useSWR from 'swr';

interface Props {
	slug: string;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
}

export default function SongPlayer(props: Props) {
	const { slug, show, setShow } = props;
	const { data: song, error, isLoading } = useSWR(slug, fetchSong);

	if (isLoading) {
		return <FullScreenLoader />;
	}

	if (!song) return <div className="m-auto text-error">Failed to load song</div>;

	if (song.spotifyUrl) {
		return <Spotify show={show} url={song.spotifyUrl} setShow={setShow} />;
	} else {
		return <SoundCloud show={show} url={song.soundCloudUrl} setShow={setShow} />;
	}
}
