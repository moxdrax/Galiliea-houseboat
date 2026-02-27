import { useState, useEffect, useRef } from 'react';
import '../../styles/Hero.css';

// Image Imports
import boat9 from '../../assets/Boat/boat9.avif';
import boat1 from '../../assets/Boat/boat1.avif';
import boat4 from '../../assets/Boat/boat4.avif';
import boat5 from '../../assets/Boat/boat5.avif';
import boat6 from '../../assets/Boat/boat6.avif';
import boat8 from '../../assets/Boat/boat8.avif';
import upperdeck from '../../assets/Boat/upperdeck.avif';
import dining1 from '../../assets/Boat/dining1.avif';
import dining2 from '../../assets/Boat/dining2.avif';
import room1 from '../../assets/Boat/room1.avif';
import room2 from '../../assets/Boat/room2.avif';
import toilet from '../../assets/Boat/toilet.avif';
// import sceneries1 from '../../assets/Boat/sceneries1.avif';
// import sceneries2 from '../../assets/Boat/sceneries2.avif';

/* ─── SEO constants ─────────────────────────────────────────────────── */
const PAGE_TITLE = 'Gallery | Galilea Houseboat – Visual Journey through Kerala Backwaters';
const PAGE_DESCRIPTION = 'Explore the visual beauty of Galilea Houseboat through our gallery. See our luxury interiors, traditional Kettuvallam architecture, and stunning sceneries of Alleppey backwaters.';

const GALLERY_DATA = [
    { src: boat1, alt: 'Galilea Houseboat Exterior Front', category: 'exterior' },
    { src: boat6, alt: 'Galilea Houseboat Side View', category: 'exterior' },
    { src: boat8, alt: 'Galilea Houseboat Exterior Front', category: 'exterior' },
    { src: upperdeck, alt: 'Galilea Houseboat Upper Deck View', category: 'interiors' },
    { src: boat5, alt: 'Galilea Houseboat Interior View', category: 'interiors' },
    { src: boat4, alt: 'Galilea Houseboat Interior View', category: 'interiors' },
    { src: dining1, alt: 'Galilea Houseboat Dining Area', category: 'dining' },
    { src: dining2, alt: 'Galilea Houseboat Interior View', category: 'interiors' },
    { src: room1, alt: 'Galilea Houseboat Bedroom', category: 'rooms' },
    { src: room2, alt: 'Galilea Houseboat Bedroom', category: 'rooms' },
    { src: toilet, alt: 'Galilea Houseboat Bathroom', category: 'rooms' },
    // { src: sceneries1, alt: 'Galilea Houseboat Front View', category: 'sceneries' },
    // { src: sceneries2, alt: 'Galilea Houseboat Back View', category: 'sceneries' },
];

const CATEGORIES = [
    { id: 'all', label: 'ALL VIEWS' },
    { id: 'exterior', label: 'EXTERIOR' },
    { id: 'interiors', label: 'INTERIORS' },
    { id: 'dining', label: 'DINING' },
    { id: 'rooms', label: 'ROOMS' },
    // { id: 'sceneries', label: 'SCENERIES' },
];

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const carouselRef = useRef(null);

    useEffect(() => {
        document.title = PAGE_TITLE;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', PAGE_DESCRIPTION);
        window.scrollTo(0, 0);
    }, []);

    // Auto-scroll logic for mobile carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

                // If close to the end, jump back to start
                if (scrollLeft + clientWidth >= scrollWidth - 20) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll by approx one card width + gap
                    carouselRef.current.scrollBy({ left: clientWidth * 0.85, behavior: 'smooth' });
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [activeCategory]); // Re-start interval when category changes

    // Reset scroll position when category changes
    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({ left: 0 });
        }
    }, [activeCategory]);

    const filteredImages = activeCategory === 'all'
        ? GALLERY_DATA
        : GALLERY_DATA.filter(img => img.category === activeCategory);

    return (
        <article className="max-w-full overflow-hidden">
            {/* Hero */}
            <header className="relative h-[45vh] md:h-[70vh] w-full overflow-hidden mt-16">
                <div className="w-full h-full relative">
                    <img
                        src={boat9}
                        alt="Galilea Houseboat on the serene Kerala backwaters"
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-royal-blue/40">
                        <div className="text-center px-6">
                            <span
                                className="text-[10px] md:text-xs font-bold tracking-[0.8em] text-white/90 uppercase block mb-4 reveal-up"
                                style={{ animationDelay: '0.2s', opacity: 0 }}>
                                VISUAL JOURNEY
                            </span>
                            <h1
                                className="text-5xl md:text-8xl   text-white mb-6 drop-shadow-2xl reveal-up"
                                style={{ animationDelay: '0.2s', opacity: 0  }}>
                                Gallery
                            </h1>
                            <div className="flex items-center justify-center gap-4 fade-in-delayed">
                                <div className="w-24 h-[3px] bg-white/40" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Gallery Section */}
            <section className="py-24 bg-[#f2eee3] dark:bg-[#1a1814]" id="gallery">
                <div className="max-w-[1400px] mx-auto px-6">
                    {/* Category Tabs */}
                    <div className="mb-16 px-2">
                        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-10 mx-auto border-b border-primary/10">
                            {CATEGORIES.map(cat => (
                                <div key={cat.id} className="relative pb-4">
                                    <button
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`text-[10px] tracking-[0.3em] font-bold uppercase transition-colors duration-300 ${activeCategory === cat.id
                                            ? 'text-royal-blue'
                                            : 'text-neutral-400 dark:text-neutral-500 hover:text-royal-blue dark:hover:text-white'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                    {activeCategory === cat.id && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-all duration-300" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Carousel (Horizontal Scroll) */}
                    <div
                        ref={carouselRef}
                        className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-8 hide-scrollbar scroll-smooth"
                    >
                        {filteredImages.map((img, index) => (
                            <div
                                key={`mov-${img.src}-${index}`}
                                className="min-w-[85vw] snap-center aspect-[4/3] relative overflow-hidden rounded-xl bg-white shadow-md"
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                                    <p className="text-white   text-sm">
                                        {img.alt}
                                    </p>
                                </div> */}
                            </div>
                        ))}
                    </div>

                    {/* Desktop Gallery Grid */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
                        {filteredImages.map((img, index) => (
                            <div
                                key={`${img.src}-${index}`}
                                className="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fade-in"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white   text-base">
                                        {img.alt}
                                    </p>
                                </div> */}
                            </div>
                        ))}
                    </div>


                    {filteredImages.length === 0 && (
                        <div className="text-center py-20 text-neutral-400  ">
                            No images found in this category.
                        </div>
                    )}
                </div>
            </section>
        </article>
    );
};

export default Gallery;
