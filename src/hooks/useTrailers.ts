import { useState, useEffect } from 'react';
import MOCK_API_RESPONSE from '../data/full_mock_data.json';

export interface Trailer {
    id: string;
    name: string;
    type: 'Road Trailer' | 'Storage Trailer' | 'Flatbed';
    image: string;
    price: string;
    description: string;
    ezRentOutLink: string;
}


// Let's use a nice semi-truck image as requested
const GENERIC_TRAILER = "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80";

const mapAssetToTrailer = (asset: any, subdomain: string): Trailer => {
    // Try to find a valid image URL
    const validImage = asset.image_url || asset.image || asset.display_image || (asset.images && asset.images.length > 0 ? asset.images[0].url : null);

    // Use generic image if the found image is the 'no-image' placeholder
    const finalImage = (!validImage || validImage.includes('no-image')) ? GENERIC_TRAILER : validImage;

    // Construct description
    let desc = asset.description || asset.name;
    if (asset.Year && asset.Model) {
        desc = `${asset.Year} ${asset.Model} - ${desc}`;
    }

    return {
        id: asset.id || asset.sequence_num || `mock-${Math.random()}`,
        name: asset.name,
        type: mapCategory(asset.group_name),
        image: finalImage,
        price: asset.rental_prices?.monthly ? (asset.rental_prices.monthly === "0.0" ? "Call for pricing" : `$${asset.rental_prices.monthly}/mo`) : "Call for pricing",
        description: desc,
        ezRentOutLink: `https://${subdomain}.ezrentout.com/item/view/${asset.sequence_num || asset.id}`
    };
};

// Generate Mock Trailers from the imported data
const MOCK_TRAILERS: Trailer[] = MOCK_API_RESPONSE.assets.map(asset =>
    mapAssetToTrailer(asset, import.meta.env.VITE_EZRENTOUT_SUBDOMAIN || 'fleetcotrailers')
);

export function useTrailers(page: number = 1) {
    const [trailers, setTrailers] = useState<Trailer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);




    useEffect(() => {
        const fetchTrailers = async () => {
            setLoading(true);
            const subdomain = import.meta.env.VITE_EZRENTOUT_SUBDOMAIN;
            const token = import.meta.env.VITE_EZRENTOUT_TOKEN;

            console.log(`Hooks: Fetching page ${page}...`);

            // Check if mock data should be used
            if (!subdomain || !token || subdomain === 'your-subdomain') {
                // Emulate pagination for mock data
                const PAGE_SIZE = 24;
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
                const mappedTrailers: Trailer[] = assetsArray.map((asset: any) => mapAssetToTrailer(asset, subdomain));

                setTrailers(mappedTrailers);
                setError(null);

            } catch (err) {
                console.warn("Fetch failed (likely CORS on live site), falling back to mock data:", err);

                // Fallback to Mock Data
                const PAGE_SIZE = 24;
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


