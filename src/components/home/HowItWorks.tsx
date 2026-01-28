import { Link } from 'react-router-dom';
import { FileCheck, ShieldCheck, Truck } from 'lucide-react';

const STEPS = [
    {
        id: "01",
        icon: FileCheck,
        title: "Submit Credentials",
        description: "Select your equipment and submit your professional CDL details for verification."
    },
    {
        id: "02",
        icon: ShieldCheck,
        title: "Get Approved",
        description: "Our team verifies your documents for safety and compliance standards quickly."
    },
    {
        id: "03",
        icon: Truck,
        title: "Schedule Pickup",
        description: "Choose your pickup date and get ready to hit the road with your rental."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Rent Your Trailer in 3 Easy Steps</h3>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        We've streamlined our rental process to get you on the road faster.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 relative z-10">
                    {STEPS.map((step, index) => (
                        <div key={step.id} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                                <step.icon size={32} />
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-gray-900">
                                {step.title}
                            </h4>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                                {step.description}
                            </p>

                            {/* Connector Line (Desktop Only) */}
                            {index !== STEPS.length - 1 && (
                                <div className="hidden md:block absolute top-[2rem] left-[calc(16.666%+2rem)] w-[calc(33.333%-4rem)] h-px bg-gray-200 -z-10"
                                    style={{ left: `calc(${33.333 * (index + 1) - 16.666}% + 3rem)` }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/rentals"
                        className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-lg font-bold uppercase tracking-wide transition-colors shadow-lg hover:shadow-xl"
                    >
                        Start Your Rental
                    </Link>
                </div>
            </div>
        </section>
    );
}
