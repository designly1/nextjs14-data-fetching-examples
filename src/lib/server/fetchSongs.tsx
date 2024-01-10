'use server';

import { getSongs, mapSongs } from './contentful';

import { I_SongItem } from '@/interfaces/contentful.interfaces';

export default async function fetchSongs(): Promise<I_SongItem[]> {
	try {
		// simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const songs = await getSongs();
		if (!songs) throw new Error('Failed to fetch songs');

		return mapSongs(songs);
	} catch (err: any) {
		console.error(err);
		throw new Error('Failed to fetch songs');
	}
}
