import '../../styles/Services.css';
import { useState, useEffect, useRef, useCallback } from 'react';

const serviceItems = [
    { icon: 'spa', title: 'Ayurvedic Spa', description: 'In-room traditional massage treatments.' },
    { icon: 'kayaking', title: 'Village Tours', description: 'Authentic local backwater village excursions.' },
    { icon: 'restaurant', title: 'Private Chef', description: 'Traditional Kerala cuisine prepared live to your taste.' },
    { icon: 'doorbell', title: 'Butler Service', description: 'Dedicated concierge 24/7 during your stay.' },
];

const N = serviceItems.length;
// Triple the array so we can scroll infinitely in both directions
const looped = [...serviceItems, ...serviceItems, ...serviceItems];

/** Returns how many cards are visible based on viewport width */
const useVisibleCount = () => {
    const [count, setCount] = useState(1);
    useEffect(() => {
        const update = () => {
            if (window.innerWidth >= 1024) setCount(3);
            else if (window.innerWidth >= 768) setCount(2);
            else setCount(1);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return count;
};

const Services = () => {
    const visibleCount = useVisibleCount();
    const posRef = useRef(N);          // actual position (avoids stale closures)
    const [pos, setPos] = useState(N);        // drives rendering
    const [animated, setAnimated] = useState(true);
    const autoRef = useRef(null);
    const snapRef = useRef(null);
    const touchStartRef = useRef(null);


    // ── geometry ──────────────────────────────────────────────────────────────
    // Track is (looped.length / visibleCount) × the container width.
    // Each card takes (100 / looped.length)% of the track.
    // translateX offset = -(pos / looped.length) × 100%
    const TRACK_W = `${(looped.length / visibleCount) * 100}%`;
    const CARD_W = `${(100 / looped.length).toFixed(6)}%`;
    const translateX = `${(-(pos / looped.length) * 100).toFixed(6)}%`;

    // Dot highlights the real item regardless of which copy is showing
    const dotIdx = ((pos % N) + N) % N;

    // ── snap helper ───────────────────────────────────────────────────────────
    const scheduleSnap = useCallback(() => {
        clearTimeout(snapRef.current);
        snapRef.current = setTimeout(() => {
            const p = posRef.current;
            if (p >= N * 2) {
                const corrected = p - N;
                posRef.current = corrected;
                setAnimated(false);
                setPos(corrected);
                // Re-enable transition after two rAF ticks (one frame gap)
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => setAnimated(true))
                );
            } else if (p < N) {
                const corrected = p + N;
                posRef.current = corrected;
                setAnimated(false);
                setPos(corrected);
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => setAnimated(true))
                );
            }
        }, 520); // slightly longer than the 0.5s CSS transition
    }, []);

    // ── start/restart autoplay ────────────────────────────────────────────────
    const startAuto = useCallback(() => {
        clearInterval(autoRef.current);
        autoRef.current = setInterval(() => {
            const next = posRef.current + 1;
            posRef.current = next;
            setAnimated(true);
            setPos(next);
            scheduleSnap();
        }, 3000);
    }, [scheduleSnap]);

    useEffect(() => {
        startAuto();
        return () => {
            clearInterval(autoRef.current);
            clearTimeout(snapRef.current);
        };
    }, [startAuto]);

    // ── dot click ─────────────────────────────────────────────────────────────
    const goToDot = useCallback((dotIndex) => {
        clearTimeout(snapRef.current);
        const target = N + dotIndex;
        posRef.current = target;
        setAnimated(true);
        setPos(target);
        startAuto(); // reset the 3s timer
    }, [startAuto]);

    // ── swipe handlers ────────────────────────────────────────────────────────
    const handleTouchStart = (e) => {
        touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (!touchStartRef.current) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStartRef.current - touchEnd;

        if (Math.abs(diff) > 50) { // minimum swipe distance
            if (diff > 0) {
                // Swiped left -> next
                const next = posRef.current + 1;
                posRef.current = next;
                setAnimated(true);
                setPos(next);
                scheduleSnap();
            } else {
                // Swiped right -> prev
                const prev = posRef.current - 1;
                posRef.current = prev;
                setAnimated(true);
                setPos(prev);
                scheduleSnap();
            }
            startAuto(); // reset autoplay
        }
        touchStartRef.current = null;
    };


    // ── render ────────────────────────────────────────────────────────────────
    return (
        <article className="max-w-full overflow-hidden">
            <section
                className="pt-24 md:pt-32 pb-20 bg-background-light dark:bg-background-dark relative"
                id="services"
            >
                <div className="max-w-[1200px] mx-auto px-6">

                    {/* Heading */}
                    <div className="mb-16 text-center">
                        <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.8em] text-primary/60 uppercase block mb-4">
                            EXCLUSIVITY
                        </span>
                        <h2 className="text-2xl lg:text-4xl text-royal-blue/80">
                            Bespoke Services
                        </h2>
                    </div>

                    {/* Carousel track */}
                    <div className="overflow-hidden">
                        <div
                            className="touch-pan-y"
                            style={{
                                display: 'flex',
                                width: TRACK_W,
                                transform: `translateX(${translateX})`,
                                transition: animated ? 'transform 0.5s ease-in-out' : 'none',
                            }}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >


                            {looped.map((service, i) => (
                                <div
                                    key={i}
                                    style={{ width: CARD_W, flexShrink: 0 }}
                                    className="px-3"
                                >
                                    <div className="text-center flex flex-col items-center justify-center gap-5 p-10 bg-white rounded-3xl  duration-300 min-h-[230px]">
                                        <span className="material-symbols-outlined text-royal-blue text-[42px] font-extralight">
                                            {service.icon}
                                        </span>
                                        <div>
                                            <h4 className="text-[12px] tracking-[0.18em] uppercase mb-3 text-neutral-800 font-bold">
                                                {service.title}
                                            </h4>
                                            <p className="text-neutral-400 text-base leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots — one per real item */}
                    <div className="flex justify-center gap-2 mt-8">
                        {serviceItems.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToDot(i)}
                                aria-label={`Go to ${serviceItems[i].title}`}
                                className={`rounded-full transition-all duration-300 ${i === dotIdx
                                    ? 'w-5 h-[7px] bg-[#eebd2b]'
                                    : 'w-[7px] h-[7px] bg-neutral-300 hover:bg-neutral-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Wave */}
                <div className="absolute bottom-[-20px] md:bottom-[-50px] left-0 w-full z-30 overflow-hidden">
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 40" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave-services"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave-services" x="48" y="3" fill="#f2eee3" />
                        </g>
                    </svg>
                </div>
            </section>
        </article>
    );
};

export default Services;
