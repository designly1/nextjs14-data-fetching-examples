import React from 'react';
import ModalRoot from '@/components/modals/ModalRoot';

interface Props {
	url: string;
	className?: string;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AppleMusic(props: Props) {
	const { url, className, show, setShow } = props;

	return (
		<ModalRoot show={show} setShow={setShow}>
			<div className="w-full max-w-2xl">
				<iframe
					allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
					height="450"
					className="w-full max-w-2xl overflow-hidden rounded-xl"
					sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
					src={url}
				></iframe>
				<button
					className="mt-4 btn w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
					onClick={() => setShow(false)}
				>
					Close
				</button>
			</div>
		</ModalRoot>
	);
}
