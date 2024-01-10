'use server';

import { getSong, mapSongDetails } from './contentful';

export default async function fetchSong(slug: string) {
	try {
		const song = await getSong(slug);
		if (!song) throw new Error('Failed to fetch song');

		return mapSongDetails(song);
	} catch (err: any) {
		console.error(err);
		throw new Error('Failed to fetch song');
	}
}
