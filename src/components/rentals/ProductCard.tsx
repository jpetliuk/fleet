import type { Trailer } from "../../hooks/useTrailers";
import { Gauge, Check } from 'lucide-react';

interface ProductCardProps {
    trailer: Trailer;
}

export default function ProductCard({ trailer }: ProductCardProps) {
    return (
        <div className="bg-[#1A1A1A] rounded-xl overflow-hidden flex flex-col group cursor-pointer border border-white/5 hover:border-gray-600 transition-all h-full">
            {/* Header */}
            <div className="p-4 md:p-5 relative z-10">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">{trailer.name}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3">{trailer.type} Trailer</p>

                {/* Features Icons Row - Simplified */}
                <div className="flex gap-3 mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                        <Gauge size={12} />
                        <span>Standard</span>
                    </div>
                </div>
            </div>

            {/* Image */}
            <div className="relative h-48 -mt-4 mb-2 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent z-10" />
                <img
                    src={trailer.image}
                    alt={trailer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80";
                    }}
                />
            </div>

            {/* Footer Content */}
            <div className="mt-auto p-5 pt-0 relative z-10">
                <p className="text-gray-400 text-xs mb-4 line-clamp-2 h-8 leading-tight">
                    {trailer.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-[10px] text-[#00ff9d] font-semibold uppercase tracking-wide">
                    <Check size={12} />
                    <span>Multiple Units Available</span>
                </div>

                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                    <span className="text-sm font-bold text-white">{trailer.price}</span>

                    <a
                        href={trailer.ezRentOutLink}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-full transition-colors uppercase tracking-wide"
                    >
                        Rent Now
                    </a>
                </div>
            </div>
        </div>
    );
}
