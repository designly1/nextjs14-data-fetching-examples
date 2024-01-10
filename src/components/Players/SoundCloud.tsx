import React from 'react';
import ModalRoot from '@/components/modals/ModalRoot';
import Embed from 'react-embed';

interface Props {
	url: string;
	className?: string;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SoundCloud(props: Props) {
	const { url, className, show, setShow } = props;

	return (
		<ModalRoot show={show} setShow={setShow}>
			<div className="w-full max-w-2xl">
				<Embed url={url} />
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
