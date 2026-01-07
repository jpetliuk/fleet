import { useState, useEffect } from 'react';

export interface Trailer {
    id: string;
    name: string;
    type: 'Road Trailer' | 'Storage Trailer' | 'Flatbed';
    image: string;
    price: string;
    description: string;
    ezRentOutLink: string;
}

export function useTrailers(page: number = 1) {
    const [trailers, setTrailers] = useState<Trailer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);


    // Let's use a nice semi-truck image as requested
    const GENERIC_TRAILER = "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80";

    useEffect(() => {
        const fetchTrailers = async () => {
            setLoading(true);
            const subdomain = import.meta.env.VITE_EZRENTOUT_SUBDOMAIN;
            const token = import.meta.env.VITE_EZRENTOUT_TOKEN;

            console.log(`Hooks: Fetching page ${page}...`);

            // Check if mock data should be used
            if (!subdomain || !token || subdomain === 'your-subdomain') {
                // Emulate pagination for mock data
                const PAGE_SIZE = 6;
                const start = (page - 1) * PAGE_SIZE;
                const paginatedMock = MOCK_TRAILERS.slice(start, start + PAGE_SIZE);
                setTrailers(paginatedMock);
                setTotalPages(Math.ceil(MOCK_TRAILERS.length / PAGE_SIZE));
                setLoading(false);
                return;
            }

            try {
                // Construct URL based on environment
                // In DEV: Use local proxy (/api/ezrentout) to handle CORS
                // In PROD: Use direct URL (requires API to support CORS)
                const baseUrl = import.meta.env.DEV
                    ? '/api/ezrentout'
                    : `https://${subdomain}.ezrentout.com`;

                const fetchUrl = `${baseUrl}/assets.api?show_image_urls=true&include_custom_fields=true&page=${page}`;
                console.log("Fetching URL:", fetchUrl);

                const response = await fetch(fetchUrl, {
                    headers: { 'token': token }
                });

                if (!response.ok) {

                    throw new Error(`API Error ${response.status}`);
                }

                const json = await response.json();


                // Handle Total Pages
                if (json.total_pages && typeof json.total_pages === 'number') {
                    setTotalPages(json.total_pages);
                }

                // Extract Assets
                let assetsArray: any[] = [];
                if (Array.isArray(json)) assetsArray = json;
                else if (json.assets) assetsArray = json.assets;
                else if (json.fixed_assets) assetsArray = json.fixed_assets;
                else {
                    const key = Object.keys(json).find(k => Array.isArray(json[k]));
                    if (key) assetsArray = json[key];
                }

                // Map Assets
                const mappedTrailers: Trailer[] = assetsArray.map((asset: any) => {
                    // Try to find a valid image URL from various potential API fields
                    // EZRentOut API might use 'image_url', 'image', 'display_image', or nested 'images' array
                    const validImage = asset.image_url || asset.image || asset.display_image || (asset.images && asset.images.length > 0 ? asset.images[0].url : null);

                    // Debug first item's image detection
                    if (asset === assetsArray[0]) {
                        console.log("Debug Image Detection (First Asset):", {
                            name: asset.name,
                            foundImage: validImage,
                            raw_image_url: asset.image_url,
                            raw_image: asset.image,
                            raw_images_array: asset.images
                        });
                    }

                    return {
                        id: asset.id || asset.sequence_num,
                        name: asset.name,
                        type: mapCategory(asset.group_name),
                        // Use actual image or generic fallback
                        image: validImage && validImage !== '' ? validImage : GENERIC_TRAILER,
                        price: "Call for pricing",
                        description: asset.description || asset.name,
                        ezRentOutLink: `https://${subdomain}.ezrentout.com/item/view/${asset.sequence_num || asset.id}`
                    };
                });

                setTrailers(mappedTrailers);
                setError(null);

            } catch (err) {
                console.warn("Fetch failed (likely CORS on live site), falling back to mock data:", err);

                // Fallback to Mock Data
                const PAGE_SIZE = 6;
                const start = (page - 1) * PAGE_SIZE;
                const paginatedMock = MOCK_TRAILERS.slice(start, start + PAGE_SIZE);
                setTrailers(paginatedMock);
                setTotalPages(Math.ceil(MOCK_TRAILERS.length / PAGE_SIZE));
                setError(null);
            } finally {
                setLoading(false);
            }
        };

        fetchTrailers();
    }, [page]); // Re-run when page changes

    return { trailers, loading, error, totalPages };
}

function mapCategory(groupName: string): Trailer['type'] {
    if (!groupName) return 'Road Trailer';
    const lower = groupName.toLowerCase();
    if (lower.includes('storage')) return 'Storage Trailer';
    if (lower.includes('flatbed')) return 'Flatbed';
    return 'Road Trailer';
}

const MOCK_TRAILERS: Trailer[] = [
    {
        id: '1',
        name: '53\' Dry Van',
        type: 'Road Trailer',
        price: 'Call for pricing',
        image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80',
        description: 'Standard 53ft dry van perfect for palletized freight. Watertight and road-ready.',
        ezRentOutLink: '#'
    },
    {
        id: '2',
        name: 'Reefer Trailer',
        type: 'Road Trailer',
        price: 'Call for pricing',
        image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80',
        description: 'Temperature controlled units for perishable goods transport.',
        ezRentOutLink: '#'
    },
    {
        id: '3',
        name: '40\' Storage Container',
        type: 'Storage Trailer',
        price: 'Call for pricing',
        image: 'https://images.unsplash.com/photo-1566576912906-25433d76e33f?auto=format&fit=crop&q=80',
        description: 'Secure, ground-level storage solution for construction sites or retail inventory.',
        ezRentOutLink: '#'
    },
    {
        id: '4',
        name: 'Flatbed',
        type: 'Flatbed',
        price: 'Call for pricing',
        image: 'https://images.unsplash.com/photo-1605218427306-651c6c0b378c?auto=format&fit=crop&q=80',
        description: 'Heavy duty flatbed for oversized loads and construction equipment.',
        ezRentOutLink: '#'
    },
    {
        id: '5',
        name: '28\' Pup Trailer',
        type: 'Road Trailer',
        price: 'Call for pricing',
        image: 'https://images.unsplash.com/photo-1625216834114-1188177ba7f2?auto=format&fit=crop&q=80',
        description: 'Short maneuverable trailer for local city deliveries.',
        ezRentOutLink: '#'
    },
    {
        id: '6',
        name: 'Drop Deck',
        type: 'Flatbed',
        price: 'Call for pricing',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80',
        description: 'Specialized flatbed for tall cargo transport.',
        ezRentOutLink: '#'
    }
];
