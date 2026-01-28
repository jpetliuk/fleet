import { useState, useEffect } from 'react';
import MOCK_API_RESPONSE from '../data/full_mock_data.json';

export interface Trailer {
    id: string;
    name: string;
    type: 'Road Trailer' | 'Storage Trailer' | 'Flatbed';
    image: string;
    allImages: string[];
    price: string;
    description: string;
    ezRentOutLink: string;
    specs: string[];
}


// Let's use a nice semi-truck image as requested
const GENERIC_TRAILER = "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80";

const getTrueKey = (obj: any): string | null => {
    if (!obj) return null;
    for (const key in obj) {
        if (obj[key] === "true" && key !== 'N/A' && key !== 'Other' && key !== 'False') {
            return key;
        }
    }
    return null;
};

const mapAssetToTrailer = (asset: any, subdomain: string): Trailer => {
    // Try to find a valid image URL
    const validImage = asset.image_url || asset.image || asset.display_image || (asset.images && asset.images.length > 0 ? asset.images[0].url : null);

    // Use generic image if the found image is the 'no-image' placeholder
    const finalImage = (!validImage || validImage.includes('no-image')) ? GENERIC_TRAILER : validImage;

    // Collect all images for the gallery
    const allImages = [finalImage];
    if (asset.images && Array.isArray(asset.images)) {
        asset.images.forEach((img: any) => {
            if (img.url && img.url !== finalImage && !img.url.includes('no-image')) {
                allImages.push(img.url);
            }
        });
    }
    // If we still only have one image, maybe duplicate it or add placeholders for the "gallery" feel if requested, 
    // but for now let's stick to real data or just the one.

    // Construct description
    let desc = asset.description || asset.name;
    if (asset.Year && asset.Model) {
        desc = `${asset.Year} ${asset.Model} - ${desc}`;
    }

    // Extract Specs
    const specs: string[] = [];

    const length = getTrueKey(asset.Length);
    if (length) specs.push(length);

    const ride = getTrueKey(asset.Ride);
    if (ride) specs.push(ride);

    const doors = getTrueKey(asset.Doors);
    if (doors) specs.push(`${doors} Door`);

    const roof = getTrueKey(asset.Roof);
    if (roof) specs.push(`${roof} Roof`);

    const walls = getTrueKey(asset.Walls);
    if (walls) specs.push(`${walls} Walls`);

    if (asset.Vin) specs.push(`VIN: ${asset.Vin}`);
    if (asset.Year) specs.push(`Year: ${asset.Year}`);


    return {
        id: asset.id || asset.sequence_num || `mock-${Math.random()}`,
        name: asset.name,
        type: mapCategory(asset.group_name),
        image: finalImage,
        allImages: allImages,
        price: asset.rental_prices?.monthly ? (asset.rental_prices.monthly === "0.0" ? "Call for pricing" : `$${asset.rental_prices.monthly}/mo`) : "Call for pricing",
        description: desc,
        ezRentOutLink: `https://${subdomain}.ezrentout.com/item/view/${asset.sequence_num || asset.id}`,
        specs: specs
    };
};



// Cache keys
const CACHE_KEY = 'fleetco_trailers_data';
const CACHE_TIMESTAMP_KEY = 'fleetco_trailers_timestamp';
const CACHE_DURATION = 60 * 60 * 1000; // 1 Hour in milliseconds

export function useTrailers(page: number = 1) {
    const [trailers, setTrailers] = useState<Trailer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);

    const PAGE_SIZE = 18;

    useEffect(() => {
        const loadTrailers = async () => {
            setLoading(true);

            // 1. Check Local Cache
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cachedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);
            const now = Date.now();

            if (cachedData && cachedTime && (now - parseInt(cachedTime) < CACHE_DURATION)) {
                console.log("Using cached data (Valid for 1 hour)");
                const allTrailers = JSON.parse(cachedData);
                paginateAndSet(allTrailers);
                setLoading(false);
                return;
            }

            // 2. Fetch Fresh Data (if cache invalid/missing)
            console.log("Cache expired or missing. Fetching fresh data...");
            const subdomain = import.meta.env.VITE_EZRENTOUT_SUBDOMAIN;
            const token = import.meta.env.VITE_EZRENTOUT_TOKEN;

            // Use Fallback if no credentials (likely live site)
            if (!subdomain || !token || subdomain === 'your-subdomain') {
                useFallbackData();
                return;
            }

            try {
                const allAssets: any[] = [];
                let currentPage = 1;
                let totalApiPages = 1;
                const baseUrl = import.meta.env.DEV ? '/api/ezrentout' : `https://${subdomain}.ezrentout.com`;

                // Initial fetch to get total pages and first batch
                // We'll just loop until we get everything or hit a limit
                do {
                    console.log(`Fetching API page ${currentPage}...`);
                    const response = await fetch(`${baseUrl}/assets.api?show_image_urls=true&include_custom_fields=true&page=${currentPage}`, {
                        headers: { 'token': token }
                    });

                    if (!response.ok) throw new Error(`API Error ${response.status}`);

                    const json = await response.json();

                    // Normalize assets array
                    let pageAssets: any[] = [];
                    if (Array.isArray(json)) pageAssets = json;
                    else if (json.assets) pageAssets = json.assets;
                    else pageAssets = []; // Handle edge cases

                    if (pageAssets.length === 0) break; // Stop if no assets returned

                    allAssets.push(...pageAssets);

                    // Update loop vars
                    if (json.total_pages) totalApiPages = json.total_pages;
                    currentPage++;

                } while (currentPage <= totalApiPages && currentPage <= 20); // Safety limit of 20 pages

                // Process and Cache
                const mappedTrailers = allAssets.map(asset => mapAssetToTrailer(asset, subdomain));

                localStorage.setItem(CACHE_KEY, JSON.stringify(mappedTrailers));
                localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());

                paginateAndSet(mappedTrailers);
                setError(null);

            } catch (err) {
                console.warn("API Fetch failed, using fallback:", err);
                useFallbackData();
            } finally {
                setLoading(false);
            }
        };

        // Helper to slice data for current page
        const paginateAndSet = (allData: Trailer[]) => {
            const start = (page - 1) * PAGE_SIZE;
            const paginated = allData.slice(start, start + PAGE_SIZE);
            setTrailers(paginated);
            setTotalPages(Math.ceil(allData.length / PAGE_SIZE));
        };

        // Helper to load mock data
        const useFallbackData = () => {
            console.log("Loading fallback mock data...");
            const subdomain = import.meta.env.VITE_EZRENTOUT_SUBDOMAIN || 'fleetcotrailers';
            // Map the imported JSON data
            // @ts-ignore
            const allMockTrailers = MOCK_API_RESPONSE.assets.map(asset => mapAssetToTrailer(asset, subdomain));
            paginateAndSet(allMockTrailers);
        };

        loadTrailers();
    }, [page]);

    return { trailers, loading, error, totalPages };
}

function mapCategory(groupName: string): Trailer['type'] {
    if (!groupName) return 'Road Trailer';
    const lower = groupName.toLowerCase();
    if (lower.includes('storage')) return 'Storage Trailer';
    if (lower.includes('flatbed')) return 'Flatbed';
    return 'Road Trailer';
}


