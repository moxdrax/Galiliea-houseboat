import { useState, useEffect, useRef, useCallback } from 'react';

const reviewsData = [
    { name: 'Srilakshmi V', stars: 5, text: '"Service was excellent. Staffs were good. Awesome food and friendly behaviour. Good guidance and clean rooms."' },
    { name: 'Gunjan Jain', stars: 5, text: '"Our experience on the houseboat was amazing. The staff was so cooperative and helpful. It felt like we are at home, it was so comfortable. The food was also delicious."' },
    { name: 'Vikas VASDEVANI', stars: 5, text: '"Very nice house boat, Must experience, pure veg food served on demand, very nice cooking, hospitality was superb, nice people and overall very gud house boat to experience with..."' },
    { name: 'Priya Jacob', stars: 5, text: '"Excellent house boat with great food and very hospitable crew. Would highly recommend"' },
    { name: 'George Thomas', stars: 5, text: '"Great experience and good service"' },
];

const N = reviewsData.length;                               // 5
const looped = [...reviewsData, ...reviewsData, ...reviewsData]; // 15 items

const AUTOPLAY_MS = 4000;
const TRANSITION_MS = 500;

const TRACK_W = `${looped.length * 100}%`;                  // "1500%"
const CARD_W = `${(100 / looped.length).toFixed(6)}%`;     // "6.666667%" of track = 100% of container

const Reviews = () => {
    const posRef = useRef(N);       // actual current position — avoids stale closures
    const [pos, setPos] = useState(N);    // drives render
    const [animated, setAnimated] = useState(true);
    const [dotIdx, setDotIdx] = useState(0);    // visible dot
    const autoRef = useRef(null);
    const snapRef = useRef(null);
    const touchStartRef = useRef(null);


    const translateX = `${(-(pos / looped.length) * 100).toFixed(6)}%`;

    // ── snap: after transition ends, jump back to middle copy if needed ────────
    const scheduleSnap = useCallback(() => {
        clearTimeout(snapRef.current);
        snapRef.current = setTimeout(() => {
            const p = posRef.current;
            let corrected = p;
            if (p >= N * 2) corrected = p - N;
            else if (p < N) corrected = p + N;

            if (corrected !== p) {
                posRef.current = corrected;
                setAnimated(false);
                setPos(corrected);
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => setAnimated(true))
                );
            }
        }, TRANSITION_MS + 20); // slightly after transition ends
    }, []);

    // ── autoplay ──────────────────────────────────────────────────────────────
    const startAuto = useCallback(() => {
        clearInterval(autoRef.current);
        autoRef.current = setInterval(() => {
            const next = posRef.current + 1;
            posRef.current = next;
            setAnimated(true);
            setPos(next);
            setDotIdx(((next % N) + N) % N);
            scheduleSnap();
        }, AUTOPLAY_MS);
    }, [scheduleSnap]);

    useEffect(() => {
        startAuto();
        return () => {
            clearInterval(autoRef.current);
            clearTimeout(snapRef.current);
        };
    }, [startAuto]);

    // ── dot click ─────────────────────────────────────────────────────────────
    const goToDot = useCallback((i) => {
        clearTimeout(snapRef.current);
        const target = N + i;
        posRef.current = target;
        setAnimated(true);
        setPos(target);
        setDotIdx(i);
        startAuto();
    }, [startAuto]);

    // ── swipe handlers ────────────────────────────────────────────────────────
    const handleTouchStart = (e) => {
        touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (!touchStartRef.current) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStartRef.current - touchEnd;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                const next = posRef.current + 1;
                posRef.current = next;
                setAnimated(true);
                setPos(next);
                setDotIdx(((next % N) + N) % N);
                scheduleSnap();
            } else {
                const prev = posRef.current - 1;
                posRef.current = prev;
                setAnimated(true);
                setPos(prev);
                setDotIdx(((prev % N) + N) % N);
                scheduleSnap();
            }
            startAuto();
        }
        touchStartRef.current = null;
    };


    return (
        <article className="max-w-full overflow-hidden">
            <section className="pt-6 pb-24 md:pb-24 bg-soft-cream dark:bg-background-dark relative" id="reviews">
                <div className="max-w-[1400px] mx-auto px-6">

                    {/* Heading */}
                    <div className="text-center mb-10">
                        <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.8em] text-primary/60 uppercase block mb-4">
                            TESTIMONIALS
                        </span>
                        <h2 className="text-2xl lg:text-4xl font-serif text-royal-blue/80">
                            What Our Guests Say
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
                                transition: animated ? `transform ${TRANSITION_MS}ms ease-in-out` : 'none',
                            }}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >


                            {looped.map((review, i) => (
                                <div
                                    key={i}
                                    style={{ width: CARD_W, flexShrink: 0 }}
                                    className="px-4"
                                >
                                    <div
                                        className="p-12 md:p-16 bg-[#FCFAF7] dark:bg-neutral-900 rounded-2xl min-h-[320px] flex flex-col justify-center items-center text-center max-w-4xl mx-auto"
                                        style={{
                                            border: '1px solid rgba(238, 189, 43, 0.2)',
                                            boxShadow: 'inset 0 0 40px rgba(248, 241, 229, 0.5)',
                                        }}
                                    >
                                        {/* Stars */}
                                        <div className="flex justify-center gap-1 mb-8">
                                            {Array.from({ length: review.stars }).map((_, si) => (
                                                <span
                                                    key={si}
                                                    className="material-symbols-outlined text-primary"
                                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                                >
                                                    star
                                                </span>
                                            ))}
                                        </div>

                                        {/* Review text */}
                                        <p className="text-xl md:text-2xl font-serif  text-neutral-600 dark:text-neutral-300 mb-10 leading-relaxed max-w-3xl">
                                            {review.text}
                                        </p>

                                        {/* Name */}
                                        <p className="font-serif font-bold text-[#181611] dark:text-white tracking-widest text-[11px] uppercase">
                                            {review.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8 pb-8">
                        {reviewsData.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToDot(i)}
                                aria-label={`Go to review ${i + 1}`}
                                className={`rounded-full transition-all duration-300 ${dotIdx === i
                                    ? 'bg-primary w-6 h-2.5'
                                    : 'bg-neutral-300 w-2.5 h-2.5 hover:bg-neutral-400'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Write a review CTA */}
                    <div className="text-center mt-12 relative z-40">
                        <a
                            href="https://share.google/NHgHKT8JPISUEBIyW"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1a2a5e] to-[#2d4a9e] text-white px-10 py-4 rounded-xl font-bold text-[11px] tracking-[0.25em] transition-all duration-300 uppercase shadow-[0_4px_20px_rgba(30,58,138,0.3)] hover:shadow-[0_8px_30px_rgba(30,58,138,0.5)] hover:scale-105 hover:from-[#1e3a8a] hover:to-[#3b5fc2]"
                        >
                            Write a Review on Google
                        </a>
                    </div>

                </div>
            </section>
        </article>
    );
};

export default Reviews;