
export default function Steps() {
    return (
        <div className="py-20 bg-[#F9F9F7]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-16 text-gray-800">Rent Your Trailer in 3 Easy Steps</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-12">

                        <div className="relative pl-8 border-l-2 border-gray-200 hover:border-primary transition-colors group">
                            <span className="text-xs font-bold text-primary mb-2 block uppercase tracking-wider">01</span>
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">Select Your Trailer</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Select the right trailer that best suits your needs from our extensive fleet of dry vans, reefers, and flatbeds.
                            </p>
                        </div>

                        <div className="relative pl-8 border-l-2 border-gray-200 hover:border-primary transition-colors group">
                            <span className="text-xs font-bold text-primary mb-2 block uppercase tracking-wider">02</span>
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">Choose Rental Start Date</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Whether you need a trailer for a day, a week, or longer, Fleetco provides flexible rental terms to suit your business needs.
                            </p>
                        </div>

                        <div className="relative pl-8 border-l-2 border-gray-200 hover:border-primary transition-colors group">
                            <span className="text-xs font-bold text-primary mb-2 block uppercase tracking-wider">03</span>
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">Hit the Road</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Once you've selected your trailer and rental start date, come on in to meet Mr. Gil and get ready to hit the road.
                            </p>
                        </div>

                    </div>

                    <div className="relative h-[600px] w-full bg-gray-200 rounded-sm overflow-hidden shadow-2xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3257.076840656068!2d-80.89966192426935!3d35.26667197272365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a11756540001%3A0xc36e300184b2591!2sFleetco%20Inc!5e0!3m2!1sen!2sus!4v1714595200000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                            title="Fleetco Location"
                        />
                        <div className="absolute inset-0 pointer-events-none border-4 border-white/20 pointer-events-none"></div>
                    </div>

                </div>
            </div>
        </div>
    );
}
