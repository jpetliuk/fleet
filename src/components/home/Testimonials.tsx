
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
    {
        id: 1,
        text: "Gil and his staff were great...They were the only company willing to work with O/O. Thanks for all of your help",
        author: "Roy H."
    },
    {
        id: 2,
        text: "Fast, friendly, and courteous. Gil is a gem and great to do business with.",
        author: "Harold G."
    },
    {
        id: 3,
        text: "Gil was and is readily available to assist and provide a very competitive fee.",
        author: "David M."
    },
    {
        id: 4,
        text: "Efficient, professional, and reliable. Fleetco made our logistics much easier to manage.",
        author: "Robert L."
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left Column: Testimonials */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                What Our Clients<br />Say
                            </h2>
                        </div>

                        <div className="relative">
                            <div className="mb-8 min-h-[220px]">
                                <blockquote className="text-xl md:text-2xl font-normal text-gray-800 leading-snug mb-8">
                                    "{TESTIMONIALS[currentIndex].text}"
                                </blockquote>
                                <div>
                                    <cite className="not-italic text-lg font-bold text-gray-900">
                                        {TESTIMONIALS[currentIndex].author}
                                    </cite>
                                </div>
                            </div>

                            {/* Navigation Controls */}
                            <div className="flex items-center justify-between mt-12">
                                <button
                                    onClick={handlePrevious}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
                                    aria-label="Previous testimonial"
                                >
                                    <ChevronLeft className="w-8 h-8 text-gray-600" />
                                </button>

                                {/* Dots */}
                                <div className="flex space-x-3">
                                    {TESTIMONIALS.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                                ? 'bg-gray-800 scale-125'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                                }`}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
                                    aria-label="Next testimonial"
                                >
                                    <ChevronRight className="w-8 h-8 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Google Maps */}
                    <div className="relative h-[500px] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3257.076840656068!2d-80.89966192426935!3d35.26667197272365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a11756540001%3A0xc36e300184b2591!2sFleetco%20Inc!5e0!3m2!1sen!2sus!4v1714595200000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                            title="Fleetco Location"
                        />
                        {/* Optional Overlay to match the 'card' look if needed, but the iframe is self-contained */}
                    </div>

                </div>
            </div>
        </section>
    );
}
