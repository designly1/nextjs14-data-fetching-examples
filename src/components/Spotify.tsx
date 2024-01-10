import React from 'react'

interface Props {
    url: string;
    className?: string;
}

export default function Spotify(props: Props) {
    const { url, className } = props;


    const classes = [
        'rounded-xl',
        'border-0',
    ];

    if (className) {
        classes.push(className);
    }

    return (
        <iframe
            className={classes.join(' ')}
            src={url}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>
    )
}
