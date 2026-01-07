
import { Globe2, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Benefits() {
    return (
        <div className="bg-white py-12 border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-gray-100 rounded-full">
                            <Globe2 className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Serving since 1969</h3>
                            <p className="text-sm text-gray-600 font-medium">Trusted by the Southeast for over 50 years</p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-gray-100 rounded-full">
                            <ShieldCheck className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Full Service Maintenance</h3>
                            <p className="text-sm text-gray-600 font-medium">We maintain what we rent on-site</p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-gray-100 rounded-full">
                            <HeartHandshake className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Flexible Terms</h3>
                            <p className="text-sm text-gray-600 font-medium">Scale your fleet up or down instantly</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
