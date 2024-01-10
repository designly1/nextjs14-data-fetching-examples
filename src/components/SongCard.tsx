'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SongPlayer from './SongPlayer';

import { FaPlay } from 'react-icons/fa';

import { I_SongItem } from '@/interfaces/contentful.interfaces';

const SongCard = (props: { song: I_SongItem }) => {
	const { song } = props;

	const [selectedSong, setSelectedSong] = useState('');
	const [showPlayer, setShowPlayer] = useState(false);

	const handlePlay = (slug: string) => {
		setSelectedSong(slug);
		setShowPlayer(true);
	};

	return (
		<>
			<div className="card bordered shadow-lg col-span-4 md:col-span-2 2xl:col-span-1 bg-base-200">
				<Image
					className="w-full"
					src={`https://cdn.designly.biz/jaysudo/music/${song.slug}/img.jpg`}
					alt={song.title}
					width={300}
					height={300}
				/>
				<div className="card-body">
					<div className="flex flex-col gap-2">
						<div className="text-xl font-bold">{song.title}</div>
						<div className="flex items-center justify-between w-full">
							<div className="text-sm text-gray-500">{song.duration}</div>
							<button className="btn btn-primary" onClick={() => handlePlay(song.slug)}>
								<FaPlay />
							</button>
						</div>
					</div>
				</div>
			</div>
			{showPlayer ? <SongPlayer slug={selectedSong} show={showPlayer} setShow={setShowPlayer} /> : null}
		</>
	);
};

export default SongCard;
