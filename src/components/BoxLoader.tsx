import React from 'react';

interface Props {
	message?: string;
	lightMode?: boolean;
}

export default function BoxLoader(props: Props) {
	const { message = 'Loading...', lightMode = false } = props;
	return (
		<div className="m-auto border-2 p-6 flex items-center justify-center">
			<div className="flex items-center gap-2">
				<div className={`loading loading-bars ${lightMode ? 'text-white' : ''}`}></div>
				<span className={`text-xl ${lightMode ? 'text-white' : ''}`}>{message}</span>
			</div>
		</div>
	);
}
