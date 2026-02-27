import '../../styles/Hero.css';
import { useState, useEffect, useRef, useCallback } from 'react';

import boat1 from '../../assets/Boat/boat1.avif';
import boat6 from '../../assets/Boat/boat6.avif';
import boat4 from '../../assets/Boat/boat4.avif';

const heroSlides = [
    { src: boat1, alt: 'Galilea premium houseboat sailing on the Alleppey backwaters at golden hour, Kerala' },
    { src: boat6, alt: 'Scenic Kerala backwater view from the upper deck of Galilea Houseboat, Alleppey' },
    { src: boat4, alt: 'Lush Kerala backwater landscape seen from Galilea Houseboat during a sunset cruise' },
];

/* ─── SEO constants ─────────────────────────────────────────────────── */
const PAGE_TITLE = 'Home | Galilea Houseboat - Premium Houseboat Experience in Alleppey Backwaters, Kerala';
const PAGE_DESCRIPTION = 'Book the ultimate premium houseboat cruise in Alleppey, Kerala with Galilea Houseboat. Experience premium AC stays, authentic Kerala cuisine, and serene backwater views.';

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef(null);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, []);

    useEffect(() => {
        document.title = PAGE_TITLE;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', PAGE_DESCRIPTION);
    }, []);

    useEffect(() => {
        timerRef.current = setInterval(next, 5000);
        return () => clearInterval(timerRef.current);
    }, [next]);

    return (

        <article className="max-w-full overflow-hidden">
            <header className="relative h-[60vh] md:h-screen w-full overflow-hidden">
                {/* Slides */}
                <div className="absolute inset-0">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={index}
                            className="absolute inset-0 transition-opacity duration-1000"
                            style={{ opacity: index === current ? 1 : 0 }}
                        >
                            <div className="absolute inset-0 bg-black/30 z-10"></div>
                            {index === 0 ? (
                                /* LCP element — real <img> so the preload scanner picks it up */
                                <img
                                    src={slide.src}
                                    alt={slide.alt}
                                    className="w-full h-full object-cover"
                                    fetchPriority="high"
                                    loading="eager"
                                    decoding="sync"
                                />
                            ) : (
                                <img
                                    src={slide.src}
                                    alt={slide.alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Overlay content */}
                <div className="absolute inset-0 z-20 flex flex-col pointer-events-none">
                    <div className="flex-1 flex items-center justify-center mt-20">
                        <div className="text-center px-6 max-w-5xl pointer-events-auto">
                            <span
                                className="text-white font-bold tracking-[0.5em] text-[10px] md:text-[12px] uppercase mb-4 block drop-shadow-sm reveal-up"
                                style={{ animationDelay: "0.2s", opacity: 0 }}>KERALA
                                BACKWATERS</span>
                            <h1 className="text-5xl md:text-8xl   text-white mb-6 drop-shadow-2xl fade-in-delayed"
                                style={{ animationDelay: "0.2s" }}>
                                The Golden Voyage
                            </h1>
                        </div>
                    </div>
                    <div className="pb-24 sm:pb-32 lg:pb-40 flex justify-center">
                        <div className="hidden sm:flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto">
                            <a className="nav-link text-[10px] font-bold tracking-[0.2em] transition-colors text-white fade-in-delayed"
                                href="#fleet">
                                EXPLORE THE WATERWAY
                            </a>
                        </div>
                    </div>
                </div>

                {/* Wave */}
                <div className="absolute bottom-[-20px] left-0 w-full z-30 overflow-hidden">
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 40" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0" fill="#1E3A8A" />
                            <use xlinkHref="#gentle-wave" x="48" y="3" fill="#F7F3EB" />
                        </g>
                    </svg>
                </div>
            </header>
        </article>
    );
};

export default Hero;
