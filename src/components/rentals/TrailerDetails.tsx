import { useEffect, useRef, useState } from 'react';
import type { Trailer } from "../../hooks/useTrailers";
import { Info, Truck, Calendar } from "lucide-react";

interface TrailerDetailsProps {
    trailer: Trailer;
    onClose: () => void;
    arrowLeft?: string;
}

export default function TrailerDetails({ trailer, onClose, arrowLeft }: TrailerDetailsProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [currentImage, setCurrentImage] = useState(trailer.image);

    const images = trailer.allImages && trailer.allImages.length > 0 ? trailer.allImages : [trailer.image];

    useEffect(() => {
        setCurrentImage(trailer.image);
    }, [trailer.id, trailer.image]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (ref.current) {
                ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [trailer.id]);

    return (
        <div ref={ref} className="bg-[#111111] text-white rounded-xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in-up mt-6 mb-6 relative">
            <div
                className="absolute top-0 -translate-x-1/2 -mt-2.5 transition-all duration-500 ease-out"
                style={{ left: arrowLeft || '50%' }}
            >
                <div className="w-6 h-6 bg-[#111111] border-l border-t border-white/10 rotate-45 transform" />
            </div>

            <div className="flex flex-col lg:flex-row h-full">
                {/* Left: Gallery */}
                <div className="lg:w-1/2 bg-black/50 p-4 lg:border-r border-white/10 flex flex-col gap-4">
                    {/* Main Image */}
                    <div className="h-[350px] w-full rounded-lg overflow-hidden relative bg-[#0a0a0a] border border-white/5">
                        <img
                            src={currentImage}
                            alt={trailer.name}
                            className="w-full h-full object-contain"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                            Available Now
                        </div>
                    </div>

                    {/* Thumbnail Selector */}
                    {images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(img)}
                                    className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${currentImage === img
                                        ? "border-primary opacity-100"
                                        : "border-transparent opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Info */}
                <div className="lg:w-1/2 p-8 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tight mb-2">{trailer.name}</h2>
                            <p className="text-gray-400 font-medium">{trailer.type}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-white">{trailer.price}</p>
                        </div>
                    </div>

                    <div className="space-y-6 mb-8 flex-grow">
                        {/* Description */}
                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                                <Info size={16} /> Description
                            </h4>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                {trailer.description || "No detailed description available for this unit. Please contact us for more information."}
                            </p>
                        </div>

                        {/* Specs Grid */}
                        {trailer.specs && trailer.specs.length > 0 && (
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                                    <Truck size={16} /> Specifications
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {trailer.specs.map((spec, i) => (
                                        <div key={i} className="bg-white/5 rounded px-3 py-2 text-sm text-gray-200 border border-white/5 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {spec}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                        <a
                            href={trailer.ezRentOutLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 bg-primary hover:bg-primary-hover text-white text-center py-3.5 rounded-lg font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
                        >
                            <Calendar size={18} /> Rent This Unit
                        </a>
                        <button
                            onClick={onClose}
                            className="px-6 py-3.5 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 font-bold uppercase transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
