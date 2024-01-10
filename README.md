Welcome to the cutting-edge world of web development! In this blog post, we will delve into the exciting realm of data fetching paradigms in Next.js 14, a popular React framework that has been revolutionizing how developers build user interfaces and handle data. With the introduction of server components and enhanced data fetching techniques, Next.js 14 offers developers more flexibility and power in building dynamic, efficient, and scalable web applications.

We will focus on two key data fetching paradigms that are pivotal to modern web development:

1. **Fetching in a Server Component Using a Server Action**: This paradigm leverages the server-side capabilities of Next.js to fetch data. We'll explore how server components can efficiently retrieve data directly from the server, bypassing the need for client-side fetching and thus improving performance and reducing bandwidth usage.
    
2. **Fetching in a Client Component Using a Server Action in Combination with SWR**: In contrast to the first paradigm, this approach involves fetching data in client components. We'll discuss how to utilize server actions in combination with Stale-While-Revalidate (SWR), a strategy that provides a smooth user experience by immediately showing cached data (stale), then updating it with fresh data from the server (revalidate). This method is ideal for dynamic data that changes frequently, ensuring that users always have the most up-to-date information.

The code samples in this tutorial are from a demo project I created. The full code is available on GitHub (links at the bottom).

## Server-side Fetching

In Next.js 14, server-side fetching optimizes data management and enhances user experience, especially when handling heavy UI components. Let's explore this through an example:

#### The `page.tsx` Component

- **Functionality**: `page.tsx` initiates the data fetching process. It imports a server action, `fetchSongs()`, which fetches data from the server, reducing client-side load.
- **Loading Component**: While data is being fetched, `loading.tsx` displays a "Loading songs" message, keeping users informed about the process.

```jsx
// page.tsx
import React from 'react';
import BoxLoader from '@/components/BoxLoader';

import dynamic from 'next/dynamic';
const ServerExampleView = dynamic(() => import('./ServerExampleView'), {
	loading: () => <BoxLoader message="Loading UI..." />,
});

import fetchSongs from '@/lib/server/fetchSongs';

export default async function ServerExamplePage() {
	const songs = await fetchSongs();

	return <ServerExampleView songs={songs} />;
}
```

```jsx
// loading.tsx
import React from 'react';
import BoxLoader from '@/components/BoxLoader';

export default function LoadingDeployments() {
	return <BoxLoader message="Loading songs..." />;
}
```
#### Dynamic Rendering with Next.js

- **Transition Phases**: After fetching data, we use Next.js's `dynamic` to transition from the loading message to displaying the songs. During this, users see a "Loading UI" message, essential for heavy UI components.
- **Performance Benefits**: This server-side fetching, combined with dynamic rendering, significantly improves performance. It ensures faster load times and a responsive UI, enhancing the overall user experience.

```jsx
// ServerExampleView.tsx
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
```

This is a powerful approach for efficient data management and optimized UI rendering. This technique is particularly valuable for applications with complex UI components, offering a seamless and responsive user experience.

## Client-side Fetching

Next.js 14 not only excels in server-side data fetching but also provides robust client-side fetching capabilities. This section will illustrate how to effectively use client components in combination with SWR (Stale-While-Revalidate) for dynamic data handling. Unlike the server-side example, here the fetching process occurs directly within the client component.

#### Setting Up the Client Component

Our example utilizes a client component, which we clearly distinguish by placing a 'use client' directive at the top of the file. This directive signals Next.js to treat this component specifically for client-side operations.

- **Dynamic Component Loading**: Similar to the server-side example, we employ Next.js's `dynamic` to load our client view. This dynamic loading is key in managing the rendering process based on the data availability.
    
- **Integrating SWR**: The unique aspect of this client-side approach is the integration of SWR for fetching data. SWR is a strategy that first shows cached (stale) data, then updates it with fresh data from the server (revalidate). In our case, it calls the server action directly within the client component, handling data fetching and updating seamlessly.

```jsx
'use client';
// ClientExampleView.tsx

import React, { useState } from 'react';
import Link from '@/components/Link';
import BoxLoader from '@/components/BoxLoader';
import SongCard from '@/components/SongCard';
import GistView from '@/components/GistView';

import useSwr from 'swr';
import fetchSongs from '@/lib/server/fetchSongs';

import { LuRefreshCcw } from 'react-icons/lu';
import { BiCodeAlt } from 'react-icons/bi';

export default function ClientExampleView() {
	const { data: songs, isLoading, isValidating, mutate } = useSwr('songs', fetchSongs);
	const [showCode, setShowCode] = useState(false);

	if (isLoading) {
		return <BoxLoader message="Loading songs..." />;
	}

	if (!songs) {
		return <div className="m-auto text-error">Failed to load songs</div>;
	}

	return (
		<>
			<div className="m-auto w-full max-w-7xl grid grid-cols-4 gap-6 py-10 px-4 2xl:px-0">
				<h1 className="text-2xl font-bold col-span-4 text-center">Client Example</h1>
				<div className="col-span-4 flex items-center justify-center gap-4">
					<Link className="btn btn-primary" href="/">
						Go Back
					</Link>
					<button className="btn btn-secondary" onClick={() => mutate()}>
						<div className="w-6 flex items-center justify-center">
							{isValidating ? <div className="loading loading-ring"></div> : <LuRefreshCcw />}
						</div>
						Refresh
					</button>
					<button className="btn btn-secondary" onClick={() => setShowCode(!showCode)}>
						<BiCodeAlt />
						Show Code
					</button>
				</div>
				{songs.map((song, i) => (
					<SongCard key={i} song={song} />
				))}
			</div>
			{showCode ? <GistView id="743c990310fc7e06af21a3d5673e72c7" setShow={setShowCode} /> : null}
		</>
	);
}
```

#### Conditional Rendering and User Experience

- **Loader Implementation**: As the SWR fetches the songs, we conditionally render a loader, displaying a "Loading Songs" message. This ensures that users are aware of the ongoing data fetching process.
    
- **Order of Loading Messages**: Interestingly, in this client-side fetching scenario, the user first encounters a "Loading UI" message while the component loads. Once the component is ready, the "Loading Songs" message appears during the data fetching phase. This sequence is the reverse of what we observed in the server-side example.
    

#### Performance Comparison

- **Experience and Load Time**: Upon testing, we observe that the user experience and load time between the server-side and client-side examples are quite similar. While the server-side approach might hold a slight advantage in certain scenarios, the client-side fetching with SWR provides a highly responsive and efficient data handling experience.

Client-side fetching in Next.js 14, particularly with the use of SWR and dynamic client components, offers a powerful and flexible approach for managing data in real-time. This method enhances the user experience by ensuring that the UI is always responsive and up-to-date with the latest data, making it a valuable tool in the modern web developer's arsenal.

---

## Embracing the Future of Data Fetching in Next.js 14

It's clear that Next.js offers powerful and versatile solutions for handling data in modern web applications. Through our examples of server-side and client-side fetching, we've seen how this framework adapts to different requirements, offering developers the flexibility to choose the most efficient approach based on their specific use case.

### Key Takeaways

- **Server-side vs. Client-side Fetching**: The server-side fetching approach, with its focus on performance and efficiency, is ideal for applications with heavy UI components. In contrast, client-side fetching using SWR offers a more dynamic and real-time data handling experience, especially beneficial for applications requiring frequent data updates.
    
- **Performance and User Experience**: Both paradigms provide excellent performance and user experience, with server-side fetching having a slight edge in load times. However, the choice between them should be based on the specific needs of your application and the nature of the data being handled.
    
- **Flexibility of Next.js 14**: These paradigms highlight the flexibility of Next.js 14 in catering to diverse development scenarios. Whether it's server-side efficiency or client-side dynamism, Next.js provides the tools to create responsive, efficient, and user-friendly web applications.
    

### Moving Forward

As web technologies continue to evolve, staying abreast of these advancements is crucial. Next.js 14, with its innovative data fetching techniques, stands at the forefront of this evolution, empowering developers to build more sophisticated and performant web applications.

We encourage you to experiment with these paradigms in your projects. Explore the possibilities, measure the performance impacts, and tailor your approach to best suit your application's needs. With Next.js 14, the future of web development is not just about building applications; it's about creating experiences that are as efficient as they are engaging.

---

## Links

1. [GitHub Repo](https://github.com/designly1/nextjs14-data-fetching-examples)
2. [Demo Site](https://nextjs14-data-fetching-examples.vercel.app/)

---

Thank you for taking the time to read my article and I hope you found it useful (or at the very least, mildly entertaining). For more great information about web dev, systems administration and cloud computing, please read the [Designly Blog](https://blog.designly.biz). Also, please leave your comments! I love to hear thoughts from my readers.

If you want to support me, please follow me on [Spotify](https://open.spotify.com/album/2fq9S51ULwPmRM6EdCJAaJ?si=USeZDsmYSKSaGpcrSJJsGg)!

Also, be sure to check out my new app called [Snoozle](https://snoozle.io)! It's an app that generates bedtime stories for kids using AI and it's completely free to use!

Looking for a web developer? I'm available for hire! To inquire, please fill out a [contact form](https://designly.biz/contact).