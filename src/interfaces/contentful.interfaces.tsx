export interface I_SongItem {
	id: string;
	title: string;
	slug: string;
	releaseDate: string;
	duration: string;
	genre: string;
}

export interface I_SongDetails extends I_SongItem {
	soundCloudUrl: string;
	spotifyUrl: string;
	appleMusicUrl: string;
	deezerUrl: string;
	youTubeVideoUrl: string;
	amazonMusicUrl: string;
	createdAt: string;
	updatedAt: string;
}

export interface I_Song {
	metadata: I_Metadata;
	sys: I_System;
	fields: I_SongFields;
}

export interface I_AlbumItem {
	id: string;
	title: string;
	slug: string;
	releaseDate: string;
	genre: string;
}

export interface I_AlbumDetails extends I_AlbumItem {
	artist: string;
	soundCloudUrl: string;
	createdAt: string;
	updatedAt: string;
}

export interface I_Album {
	metadata: I_Metadata;
	sys: I_System;
	fields: I_AlbumsFields;
}

export interface I_AlbumsFields {
	title: string;
	slug: string;
	genre: I_Genre;
	artist: I_Artist;
	releaseDate: string;
	soundCloudUrl: string;
}

interface I_Metadata {
	tags: any[];
}

interface I_System {
	space: I_Link;
	id: string;
	type: string;
	createdAt: string;
	updatedAt: string;
	environment: I_Link;
	revision: number;
	contentType: I_Link;
	locale: string;
}

interface I_Link {
	sys: {
		type: string;
		linkType: string;
		id: string;
	};
}

interface I_SongFields {
	title: string;
	slug: string;
	artist: I_Artist;
	genre?: I_Genre;
	releaseDate: string;
	duration: string;
	soundCloudUrl: string;
	spotifyUrl?: string;
	appleMusicUrl?: string;
	deezerUrl?: string;
	youTubeVideoUrl?: string;
	amazonMusicUrl?: string;
}

interface I_Artist {
	metadata: I_Metadata;
	sys: I_System;
	fields: I_ArtistFields;
}

interface I_ArtistFields {
	name: string;
	slug: string;
	image: I_Image;
	bio: string;
	url: string;
}

interface I_Image {
	metadata: I_Metadata;
	sys: I_System;
	fields: I_ImageFields;
}

interface I_ImageFields {
	title: string;
	description: string;
	file: I_FileDetails;
}

interface I_FileDetails {
	url: string;
	details: {
		size: number;
		image: {
			width: number;
			height: number;
		};
	};
	fileName: string;
	contentType: string;
}

interface I_Genre {
	metadata: I_Metadata;
	sys: I_System;
	fields: {
		name: string;
	};
}
