import { useState, useEffect, useRef, useCallback } from 'react';
import '../../styles/Services.css'; // reuses wave + fish animation CSS

import fishImg from '../../assets/fish.png';
import thanneermukkom from '../../assets/Destination/Thanneermukkom.avif';
import kuttanadu from '../../assets/Destination/kuttanadu.avif';
import kainakari from '../../assets/Destination/Kainakari.avif';

const destinations = [
    {
        img: thanneermukkom,
        title: 'Thanneermukkom Bund',
        description: 'A majestic bund that divides the vast Vembanad Lake, offering panoramic vistas of shimmering waters and verdant paddy fields.',
    },
    {
        img: kuttanadu,
        title: 'Kuttanadu',
        description: "Kerala's rice bowl, where endless emerald paddy fields stretch beneath vast skies and winding waterways.",
    },
    {
        img: kainakari,
        title: 'Kainakari Terminal',
        description: 'A tranquil backwater village where lush green landscapes embrace serene canals and authentic Kerala life.',
    },
];


const N = destinations.length;                               // 3
const looped = [...destinations, ...destinations, ...destinations]; // 9 items (triple copy)

/** Returns visible item count based on viewport — matching OwlCarousel responsive config */
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

const Destination = () => {
    const visibleCount = useVisibleCount();
    const posRef = useRef(N);           // mutable position — avoids stale closures
    const [pos, setPos] = useState(N);         // drives rendering (starts at middle copy)
    const [animated, setAnimated] = useState(true);
    const autoRef = useRef(null);
    const snapRef = useRef(null);
    const touchStartRef = useRef(null);
    const mouseDownRef = useRef(false);


    // ── geometry ──────────────────────────────────────────────────────────────
    // Track width = (looped.length / visibleCount) × container width
    // Each card  = (100 / looped.length)% of the track
    // translateX = -(pos / looped.length) × 100%
    const TRACK_W = `${(looped.length / visibleCount) * 100}%`;
    const CARD_W = `${(100 / looped.length).toFixed(6)}%`;
    const translateX = `${(-(pos / looped.length) * 100).toFixed(6)}%`;

    const dotIdx = ((pos % N) + N) % N; // which real destination is "active"

    // ── snap: after transition, jump back to middle copy if we left it ────────
    const scheduleSnap = useCallback(() => {
        clearTimeout(snapRef.current);
        snapRef.current = setTimeout(() => {
            const p = posRef.current;
            if (p >= N * 2) {
                const c = p - N;
                posRef.current = c;
                setAnimated(false);
                setPos(c);
                requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
            } else if (p < N) {
                const c = p + N;
                posRef.current = c;
                setAnimated(false);
                setPos(c);
                requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
            }
        }, 520); // just after 0.5 s transition
    }, []);

    // ── autoplay (3 000 ms) ───────────────────────────────────────────────────
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
        startAuto(); // reset the 3 s timer
    }, [startAuto]);

    // ── swipe handlers ────────────────────────────────────────────────────────
    const handleTouchStart = (e) => {
        touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartRef.current === null) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStartRef.current - touchEnd;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                const next = posRef.current + 1;
                posRef.current = next;
                setAnimated(true);
                setPos(next);
                scheduleSnap();
            } else {
                const prev = posRef.current - 1;
                posRef.current = prev;
                setAnimated(true);
                setPos(prev);
                scheduleSnap();
            }
            startAuto();
        }
        touchStartRef.current = null;
    };

    const handleMouseDown = (e) => {
        mouseDownRef.current = true;
        touchStartRef.current = e.clientX;
    };

    const handleMouseUp = (e) => {
        if (!mouseDownRef.current) return;
        const mouseEnd = e.clientX;
        const diff = touchStartRef.current - mouseEnd;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                const next = posRef.current + 1;
                posRef.current = next;
                setAnimated(true);
                setPos(next);
                scheduleSnap();
            } else {
                const prev = posRef.current - 1;
                posRef.current = prev;
                setAnimated(true);
                setPos(prev);
                scheduleSnap();
            }
            startAuto();
        }
        mouseDownRef.current = false;
        touchStartRef.current = null;
    };

    const handleMouseLeave = () => {
        mouseDownRef.current = false;
        touchStartRef.current = null;
    };


    // ── render ────────────────────────────────────────────────────────────────
    return (
        <article className="max-w-full overflow-hidden">
            <section className="pt-4 pb-32 bg-warm-beige relative" id="destinations">

                {/* Animated Fish — 8 fish, varied sizes/speeds */}
                <div className="absolute top-0 left-0 w-full z-40 h-64 overflow-hidden pointer-events-none">
                    {[
                        { top: '8px', size: 'w-12', opacity: 0.80, dur: '25s', outerDelay: '-5s', innerDelay: '0s' },
                        { top: '64px', size: 'w-8', opacity: 0.60, dur: '35s', outerDelay: '-15s', innerDelay: '-2s' },
                        { top: '40px', size: 'w-16', opacity: 0.40, dur: '45s', outerDelay: '-25s', innerDelay: '-4s' },
                        { top: '24px', size: 'w-10', opacity: 0.70, dur: '30s', outerDelay: '-8s', innerDelay: '-1s' },
                        { top: '80px', size: 'w-6', opacity: 0.50, dur: '20s', outerDelay: '-10s', innerDelay: '-3s' },
                        { top: '52px', size: 'w-14', opacity: 0.35, dur: '50s', outerDelay: '-30s', innerDelay: '-6s' },
                        { top: '16px', size: 'w-9', opacity: 0.65, dur: '28s', outerDelay: '-18s', innerDelay: '-1.5s' },
                        { top: '96px', size: 'w-7', opacity: 0.45, dur: '38s', outerDelay: '-22s', innerDelay: '-3.5s' },
                    ].map((f, i) => (
                        <div
                            key={i}
                            className={`fish absolute left-0 ${f.size}`}
                            style={{ top: f.top, opacity: f.opacity, animationDuration: f.dur, animationDelay: f.outerDelay }}
                        >
                            <img
                                src={fishImg}
                                className="fish-inner w-full h-auto"
                                style={{ animationDelay: f.innerDelay }}
                                width="48" height="24"
                                alt="Icon of a swimming fish in Kerala backwaters"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                <div className="max-w-[1400px] mx-auto px-6">

                    {/* Heading */}
                    <div className="mb-20 text-center">
                        <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.8em] text-primary/60 uppercase block mt-7">
                            CURATED JOURNEYS
                        </span>
                        <h2 className="text-2xl lg:text-4xl  text-royal-blue/80 mt-5">
                            Enchanting Waterways
                        </h2>
                    </div>

                    {/* Carousel track */}
                    <div className="overflow-hidden pb-8">
                        <div
                            className="touch-pan-y"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                display: 'flex',
                                width: TRACK_W,
                                transform: `translateX(${translateX})`,
                                transition: animated ? 'transform 0.5s ease-in-out' : 'none',
                                cursor: 'grab',
                                userSelect: 'none',
                            }}
                        >

                            {looped.map((dest, i) => (
                                <div
                                    key={i}
                                    style={{ width: CARD_W, flexShrink: 0 }}
                                    className="px-3"
                                >
                                    <div className="relative overflow-hidden rounded-2xl aspect-[3/4] group">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${dest.img})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                                            <h3 className="text-white text-2xl lg:text-3xl font-light mb-3">
                                                {dest.title}
                                            </h3>
                                            <p className="text-white/80 text-sm lg:text-[15px] font-light leading-relaxed  max-w-xs">
                                                {dest.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots — one per real destination */}
                    <div className="flex justify-center gap-2 mt-4">
                        {destinations.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToDot(i)}
                                aria-label={`Go to ${destinations[i].title}`}
                                className={`rounded-full transition-all duration-300 ${i === dotIdx
                                    ? 'w-5 h-[7px] bg-[#eebd2b]'
                                    : 'w-[7px] h-[7px] bg-neutral-400/60 hover:bg-neutral-400'
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
                            <path id="gentle-wave-dest"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave-dest" x="48" y="3" fill="#fdfaf5" />
                        </g>
                    </svg>
                </div>
            </section>
        </article>
    );
};

export default Destination;
