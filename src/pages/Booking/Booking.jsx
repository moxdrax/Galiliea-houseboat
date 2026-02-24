import { useEffect } from 'react';
import boat9 from '../../assets/Boat/boat9.avif';
import '../../styles/Hero.css';
import img from '../../assets/booking.jpeg';
const PAGE_TITLE = 'Make Your Reservation | Galilea Houseboat Alleppey';
const PAGE_DESCRIPTION = 'Experience the ultimate Kerala backwater voyage. Reserve your private stay on Galilea Houseboat through our professional booking concierge.';

const Booking = () => {
    useEffect(() => {
        document.title = PAGE_TITLE;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', PAGE_DESCRIPTION);
        window.scrollTo(0, 0);
    }, []);

    const inputLabelClass = "text-[12px] font-bold text-royal-blue dark:text-white uppercase mb-2 block";
    const inputFieldClass = "w-full bg-white border-0 focus:ring-2 focus:ring-primary/50 rounded-md py-3 px-4 text-sm text-royal-blue dark:text-white transition-all duration-300 placeholder:text-royal-blue/30 outline-none shadow-inner";
    const today = new Date().toISOString().split('T')[0];

    return (
        <article className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* ── Fixed Background Image & Overlay ── */}
            <div className="absolute inset-0 z-0">
                <img
                    src={img}
                    alt="Luxury Houseboat Background"
                    className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-royal-blue/60 mix-blend-multiply" />
            </div>

            <div className="container mx-auto px-6 relative z-10 py-24">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">

                    {/* ── Left Side: The Reservation Card ── */}
                    <div className="w-full max-w-md animate-fade-in-up">
                        <div className="bg-white p-8 md:p-12 rounded-lg shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                            <form className="space-y-6">
                                <div>
                                    <label className={inputLabelClass} htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter your name"
                                        className={inputFieldClass}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={inputLabelClass} htmlFor="check-in">Arrival Date</label>
                                        <input
                                            type="date"
                                            id="check-in"
                                            min={today}
                                            className={inputFieldClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={inputLabelClass} htmlFor="rooms">Rooms</label>
                                        <div className="relative">
                                            <select id="rooms" className={`${inputFieldClass} appearance-none pr-8`}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none text-lg">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={inputLabelClass} htmlFor="adults">Adults</label>
                                        <input
                                            type="number"
                                            id="adults"
                                            className={inputFieldClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={inputLabelClass} htmlFor="children">Children</label>
                                        <input
                                            type="number"
                                            id="children"
                                            className={inputFieldClass}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-royal-blue text-white font-bold py-4 rounded-md transition-all duration-300 transform hover:-translate-y-0.5">
                                        Check availability
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* ── Right Side: Bold Typography ── */}
                    <div className="flex-1 text-center lg:text-left text-white max-w-2xl reveal-up">
                        <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-tight leading-tight mb-8 drop-shadow-lg">
                            MAKE YOUR RESERVATION
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed drop-shadow-md">
                            Experience the serene backwaters of Alleppey on the luxuriously appointed Galilea Houseboat. From traditional Kerala delicacies to tailored voyages, we curate every moment for your perfect escape.
                        </p>
                    </div>

                </div>
            </div>
        </article>
    );
};

export default Booking;
