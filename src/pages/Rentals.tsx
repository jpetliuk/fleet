
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/rentals/ProductCard';
import { useTrailers } from '../hooks/useTrailers';
import { Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

type Category = 'All' | 'Road Trailer' | 'Storage Trailer' | 'Flatbed';

export default function Rentals() {
    const [page, setPage] = useState(1);
    const { trailers, loading, error, totalPages } = useTrailers(page);
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');

    const filteredTrailers = trailers.filter(trailer =>
        selectedCategory === 'All' ? true : trailer.type === selectedCategory
    );

    return (
        <Layout>
            {/* ... keeping hero section unchanged ... */}
            <div className="bg-[#111111] pt-32 pb-20 px-4 border-b border-white/10 relative overflow-hidden">
                <div className="container mx-auto relative z-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-white text-5xl font-black uppercase tracking-tighter mb-4">Our <br /><span className="text-gray-500">Rentals</span></h1>
                        <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
                            Choose from a variety of rental trailers in this category including dry vans, reefers, and flatbeds.
                            Whether you are looking for short-term fixes or long-term leasing, we have the fleet.
                        </p>
                    </div>
                    {/* Decorative truck image */}
                    <img
                        src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80"
                        className="hidden lg:block absolute right-0 bottom-[-50px] w-[500px] opacity-20 sepia grayscale mix-blend-overlay"
                    />
                </div>
            </div>

            {/* Filters Toolbar */}
            <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    {/* Top Row: Categories */}
                    <div className="flex gap-8 text-sm font-bold text-gray-500 mb-4 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'All', label: 'Trailers' },
                            { id: 'Road Trailer', label: 'Road Trailers' },
                            { id: 'Storage Trailer', label: 'Storage Trailers' },
                            { id: 'Flatbed', label: 'Flatbeds' }
                        ].map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id as Category)}
                                className={clsx(
                                    "whitespace-nowrap transition-colors pb-1 border-b-2",
                                    selectedCategory === category.id
                                        ? "text-primary border-primary"
                                        : "border-transparent hover:text-black"
                                )}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* Bottom Row: Sort & Filter Pills */}
                    <div className="flex flex-wrap gap-3 items-center">
                        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-xs font-bold text-gray-700 transition-colors">
                            Lowest price <ChevronDown size={14} />
                        </button>
                        <button className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-xs font-bold transition-colors">
                            <Filter size={14} /> Filters
                        </button>
                        <div className="h-6 w-px bg-gray-200 mx-2" />
                        <button className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 px-3 py-1.5 rounded-full text-xs font-medium transition-colors">
                            + Liftgate
                        </button>
                        <button className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 px-3 py-1.5 rounded-full text-xs font-medium transition-colors">
                            + Air Ride
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="bg-[#F5F5F5] min-h-screen py-8">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-lg text-center max-w-2xl mx-auto">
                            <p className="font-bold mb-2">Unable to load inventory</p>
                            <p className="text-sm font-mono">{error}</p>
                            <p className="text-xs mt-4 text-gray-500">Check console for full technical details.</p>
                        </div>
                    ) : filteredTrailers.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <p>No trailers found in this category.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {filteredTrailers.map((trailer) => (
                                    <ProductCard key={trailer.id} trailer={trailer} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-2 mt-8">
                                {/* Prev */}
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="p-2 rounded bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {/* Page Numbers */}
                                {(() => {
                                    const pages = [];
                                    if (totalPages <= 7) {
                                        for (let i = 1; i <= totalPages; i++) pages.push(i);
                                    } else {
                                        if (page <= 4) pages.push(1, 2, 3, 4, 5, '...', totalPages);
                                        else if (page >= totalPages - 3) pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                                        else pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
                                    }
                                    return pages.map((p, i) => (
                                        typeof p === 'number' ? (
                                            <button
                                                key={i}
                                                onClick={() => setPage(p)}
                                                className={clsx(
                                                    "w-8 h-8 flex items-center justify-center rounded text-sm font-bold transition-colors",
                                                    page === p
                                                        ? "bg-primary text-white"
                                                        : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-600"
                                                )}
                                            >
                                                {p}
                                            </button>
                                        ) : (
                                            <span key={i} className="text-gray-400 px-1 font-bold">...</span>
                                        )
                                    ));
                                })()}

                                {/* Next */}
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page >= totalPages}
                                    className="p-2 rounded bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>


        </Layout>
    );
}
