import React from 'react';
import Link from '@/components/Link';
import SongCard from '@/components/SongCard';

import { I_SongItem } from '@/interfaces/contentful.interfaces';

import { BiCodeAlt } from 'react-icons/bi';

interface Props {
	songs: I_SongItem[];
}

export default function ServerExampleView(props: Props) {
	const { songs } = props;
	return (
		<div className="m-auto w-full max-w-7xl grid grid-cols-4 gap-6 py-10 px-4 2xl:px-0">
			<h1 className="text-2xl font-bold col-span-4 text-center">Server Example</h1>
			<div className="col-span-4 flex items-center justify-center gap-4">
				<Link className="btn btn-primary" href="/">
					Go Back
				</Link>
				<Link className="btn btn-secondary" href="/server-example/code">
					<BiCodeAlt />
					Show Code
				</Link>
			</div>
			{songs.map((song, i) => (
				<SongCard key={i} song={song} />
			))}
		</div>
	);
}
