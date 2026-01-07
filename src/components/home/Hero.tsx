

export default function Hero() {
    return (
        <div className="relative h-[600px] w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1599373976378-57d42530c332?auto=format&fit=crop&q=80")', // Semi Truck/Trailer image
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>

            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                <h1 className="text-white text-5xl md:text-6xl font-extrabold max-w-2xl leading-[1.1] mb-6">
                    Your go-to <br />
                    <span className="text-primary-fg">Trailer Rental</span> <br />
                    in the Southeast
                </h1>

                <div className="flex gap-4">
                    {/* Maybe search bar later, for now just matching visual roughly */}
                </div>
            </div>
        </div>
    );
}
