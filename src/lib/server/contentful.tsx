import { Entry, EntryCollection, createClient } from 'contentful';

import {
	I_Song,
	I_SongItem,
	I_SongDetails,
	I_Album,
	I_AlbumDetails,
	I_AlbumItem,
} from '@/interfaces/contentful.interfaces';

type ContentfulConfig = {
	space: string;
	accessToken: string;
};

const clientConfig: ContentfulConfig = {
	space: process.env.CONTENTFUL_SPACE_ID!,
	accessToken: process.env.CONTENTFUL_TOKEN!,
};

const client = createClient(clientConfig);

interface LinkObject {
	'en-US': {
		sys: {
			type: string;
			linkType: string;
			id: string;
		};
	};
}

export function createLinkObject(id: string): LinkObject {
	return {
		'en-US': {
			sys: {
				type: 'Link',
				linkType: 'Entry',
				id: id,
			},
		},
	};
}

export async function getEntry(contentType: string, slug: string) {
	const entries = await client.getEntries({
		content_type: contentType,
		'fields.slug': slug,
	});
	if (entries.items.length > 0) return entries;
	console.log(`Error getting Entries.`);
}

export async function getSlugs(contentType: string) {
	const entries = await client.getEntries({
		content_type: contentType,
		select: ['fields.slug'],
	});
	if (entries.items) {
		let slugs: string[] = [];
		entries.items.forEach((entry: any) => {
			slugs.push(entry.fields.slug);
		});
		return slugs;
	}
	console.log(`Error getting Entries for.`);
}

export async function getSongs(skip?: number, limit?: number) {
	const config: any = {
		content_type: 'song',
		order: '-fields.releaseDate,fields.trackNumber',
	};
	if (skip !== null) config.skip = skip;
	if (limit !== null) config.limit = limit;

	const entries = await client.getEntries(config);
	if (entries.items) {
		//@ts-ignore
		return entries.items as I_Song[];
	}
	console.log(`Error getting Entries.`);
}

export async function getSong(slug: string) {
	const entries = await client.getEntries({
		content_type: 'song',
		'fields.slug': slug,
	});

	// @ts-ignore
	if (entries.items.length > 0) return entries.items[0] as I_Song;
	console.log(`Error getting Entries.`);
}

export async function getAlbums(skip?: number, limit?: number) {
	const config: any = {
		content_type: 'album',
		order: '-fields.releaseDate',
	};
	if (skip !== null) config.skip = skip;
	if (limit !== null) config.limit = limit;

	const entries = await client.getEntries(config);
	if (entries.items) {
		//@ts-ignore
		return entries.items as I_Album[];
	}
	console.log(`Error getting Entries.`);
}

export async function getAlbum(slug: string) {
	const entries = await client.getEntries({
		content_type: 'album',
		'fields.slug': slug,
	});

	// @ts-ignore
	if (entries.items.length > 0) return entries.items[0] as I_Album;
	console.log(`Error getting Entries.`);
}

export function mapAlbums(albums: I_Album[]) {
	return albums.map(album => {
		return {
			id: album.sys.id,
			title: album.fields.title,
			slug: album.fields.slug,
			releaseDate: album.fields.releaseDate,
			genre: album.fields.genre?.fields.name ?? '',
		} as I_AlbumItem;
	}) as I_AlbumItem[];
}

export function mapAlbumDetails(album: I_Album) {
	return {
		id: album.sys.id,
		title: album.fields.title,
		slug: album.fields.slug,
		releaseDate: album.fields.releaseDate,
		genre: album.fields.genre?.fields.name ?? '',
		artist: album.fields.artist?.fields.name ?? '',
		soundCloudUrl: album.fields.soundCloudUrl,
		createdAt: album.sys.createdAt,
		updatedAt: album.sys.updatedAt,
	} as I_AlbumDetails;
}

export async function getAlbumTracks(album: string) {
	const config: any = {
		content_type: 'song',
		order: 'fields.trackNumber',
		'fields.album.sys.contentType.sys.id': 'album',
		'fields.album.fields.title[match]': album,
	};

	const entries = await client.getEntries(config);
	if (entries.items) {
		return entries.items;
	}
	console.log(`Error getting Entries.`);
}

export async function getPostsMeta(skip?: number, limit?: number) {
	const config: any = {
		content_type: 'blogPost',
		select: 'sys,fields.title,fields.slug,fields.publishDate,fields.thumb,fields.coverImage,fields.excerpt,fields.tags',
		order: '-fields.publishDate',
	};
	if (skip !== null) config.skip = skip;
	if (limit !== null) config.limit = limit;

	const entries = await client.getEntries(config);
	if (entries.items) {
		return entries.items;
	}
	console.log(`Error getting Entries.`);
}

export async function getPosts(skip?: number, limit?: number, ignoreSlug?: string) {
	const config: any = {
		content_type: 'blogPost',
		order: '-fields.publishDate',
	};
	if (skip !== null) config.skip = skip;
	if (limit !== null) config.limit = limit;
	if (ignoreSlug) config['fields.slug[ne]'] = ignoreSlug;

	const entries = await client.getEntries(config);
	if (entries.items) {
		return entries.items;
	}
	console.log(`Error getting Entries.`);
}

export async function getPostsBySlug(skip?: number, limit?: number, slug?: string) {
	const config: any = {
		content_type: 'blogPost',
		order: '-fields.publishDate',
	};
	if (skip !== null) config.skip = skip;
	if (limit !== null) config.limit = limit;
	if (slug) {
		config['fields.category.sys.contentType.sys.id'] = 'blogCategory';
		config['fields.category.fields.slug'] = slug;
	}

	const entries = await client.getEntries(config);
	if (entries.items) {
		return entries.items;
	}
	console.log(`Error getting Entries.`);
}

export async function getCategories() {
	const config: any = {
		content_type: 'blogCategory',
		order: 'fields.name',
	};

	const entries = await client.getEntries(config);
	if (entries.items) {
		return entries.items;
	}
	console.log(`Error getting Entries.`);
}

export function contentfulImageData(imgObj: any) {
	return {
		url: 'https:' + imgObj.fields.file.url,
		alt: imgObj.fields.title,
		description: imgObj.fields.description,
	};
}

export function contentfulDate(str: string): string {
	const dateAr = str.split('-');
	const newDate = `${dateAr[1]}/${dateAr[2]}/${dateAr[0]}`;
	const date = new Date(newDate);
	const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
	return date.toLocaleDateString('en-US', options);
}

export const mapSong = (song: I_Song) => {
	const songItem: I_SongItem = {
		id: song.sys.id,
		title: song.fields.title,
		slug: song.fields.slug,
		releaseDate: song.fields.releaseDate,
		genre: song.fields.genre?.fields.name ?? '',
		duration: song.fields.duration,
	};
	return songItem;
};

export const mapSongDetails = (song: I_Song) => {
	const songItem: I_SongDetails = {
		id: song.sys.id,
		title: song.fields.title,
		slug: song.fields.slug,
		releaseDate: song.fields.releaseDate,
		genre: song.fields.genre?.fields.name ?? '',
		duration: song.fields.duration,
		soundCloudUrl: song.fields.soundCloudUrl,
		spotifyUrl: song.fields?.spotifyUrl ?? '',
		appleMusicUrl: song.fields?.appleMusicUrl ?? '',
		deezerUrl: song.fields?.deezerUrl ?? '',
		youTubeVideoUrl: song.fields?.youTubeVideoUrl ?? '',
		amazonMusicUrl: song.fields?.amazonMusicUrl ?? '',
		createdAt: song.sys.createdAt,
		updatedAt: song.sys.updatedAt,
	};
	return songItem;
};

export const mapSongs = (songs: I_Song[]) => {
	return songs.map(mapSong);
};
