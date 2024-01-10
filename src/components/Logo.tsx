import React from 'react';
import Image from 'next/image';

import logo from '@/assets/svg/designly-logo-trans.svg';

interface Props {
	width?: number;
}

const origWidth = 300;
const origHeight = 100;

export default function Logo(props: Props) {
	const { width = origWidth } = props;
	const height = (origHeight / origWidth) * width;

	return <Image src={logo} alt="Designly" width={width} height={height} />;
}
