'use client';

import React from 'react';
import GistView from '@/components/GistView';

import { useRouter } from 'nextjs13-progress';

export default function ServerExampleCodeView() {
	const router = useRouter();

	const handleClose = () => {
		router.push('/server-example');
	};

	return <GistView id="304920660e1141f9ef2787c3ce11780d" setShow={handleClose} />;
}
