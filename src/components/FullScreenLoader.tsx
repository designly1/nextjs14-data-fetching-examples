import React from 'react';

export default function FullScreenLoader() {
	return (
		<div className="fixed inset-0 bg-black/80 flex items-center justify-center text-white">
			<div className="loading loading-spinner w-[200px]"></div>
		</div>
	);
}
