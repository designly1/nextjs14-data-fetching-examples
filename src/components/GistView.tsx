'use client';

import React from 'react';
import Gist from 'react-gist';
import DisableBodyScroll from './DisableBodyScroll';

import { FaTimes } from 'react-icons/fa';

interface Props {
	id: string;
	setShow: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
}

export default function GistView(props: Props) {
	const { id, setShow } = props;

	return (
		<>
			<div className="fixed inset-0 bg-base-100 flex py-20">
				<button className="link-primary absolute top-4 right-4 text-4xl" onClick={() => setShow(false)}>
					<FaTimes />
				</button>
				<div
					className="w-full max-w-7xl bg-base-200 rounded-lg shadow-2xl mx-auto overflow-y-auto"
					style={{
						height: '80vh',
					}}
				>
					<Gist id={id} />
				</div>
			</div>
			<DisableBodyScroll />
		</>
	);
}
