import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import boat6 from '../../assets/Boat/boat6.avif';

const Introduction = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <article className="max-w-full overflow-hidden">
            <section className="bg-[#F7F3EB] pt-8 md:pt-12 pb-40 overflow-hidden relative" id="experience">

                {/* Background Watermark Title */}
                <div
                    className="absolute inset-0 flex items-start justify-center lg:pt-8 pointer-events-none select-none opacity-[0.03]">
                    <span
                        className="text-[12rem] lg:text-[24rem] font-bold text-royal-blue tracking-tighter leading-none whitespace-nowrap">Galilea</span>
                </div>

                {/* Studio Metadata Decor (Bolder) */}
                <div className="max-w-[1400px] mx-auto px-6 lg:px-20 relative z-10">
                    {/* Sub-heading/Intro Line */}
                    <div className="mb-12 lg:mb-20 text-center reveal-on-scroll">
                        <span
                            className="text-[10px] lg:text-[12px] font-bold tracking-[0.8em] text-primary/60 uppercase block mb-4">STORIES
                            THAT FLOAT</span>
                        <h2 className="text-2xl lg:text-4xl text-royal-blue/80">The Galilea way of water
                            living
                        </h2>
                        <div className="w-16 h-[1px] bg-royal-blue/20 mx-auto mt-8"></div>
                    </div>
                    {/* Top Image (Horizontal) */}
                    <div className="mb-[-40px] md:mb-[-120px] reveal-on-scroll">
                        <div className="aspect-[21/9] w-full bg-cover bg-center rounded-sm shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                            style={{ backgroundImage: `url(${boat6})` }}>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start justify-between mt-0">
                        {/* Left: Floating Title Card */}
                        <div className="w-[100%] mx-auto lg:w-[380px] lg:mx-0 relative reveal-on-scroll mt-10 lg:mt-32 transform-gpu"
                            style={{ transitionDelay: "200ms" }}>
                            <div
                                className="bg-royal-blue py-6 px-8 md:p-12 text-center text-white shadow-xl border border-white/10 relative z-20">
                                <span
                                    className="text-[10px] md:text-[11px] font-bold tracking-[0.5em] uppercase mb-3 md:mb-4 block text-white/70">WELCOME
                                    TO</span>
                                <h2 className="text-3xl md:text-5xl font-light mb-4 md:mb-6 tracking-tight text-primary">
                                    Galilea
                                    <br className="hidden md:block" /> Houseboat
                                </h2>
                                <div className="w-12 h-[1px] bg-white/20 mx-auto mb-4 md:mb-6"></div>
                                <span
                                    className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-white/50">ESTABLISHED
                                    2013</span>
                            </div>
                        </div>

                        {/* Right: Content Area */}
                        <div className="w-full lg:w-[650px] mt-20 lg:mt-32 relative reveal-on-scroll transform-gpu"
                            style={{ transitionDelay: "400ms" }}>
                            {/* Vertical Text Sidebar */}
                            <div className="hidden lg:block absolute left-[-80px] top-48 h-full">
                                <div className="sticky top-40 flex items-center gap-4 origin-left -rotate-90">
                                    <div className="w-12 h-[1px] bg-royal-blue/30"></div>
                                    <span
                                        className="text-[10px] font-extrabold tracking-[0.5em] text-royal-blue uppercase whitespace-nowrap">OUR
                                        STORY</span>
                                </div>
                            </div>

                            {/* Story Card */}
                            <div className="bg-white p-8 md:p-14 border border-white/20 shadow-sm">
                                <p
                                    className="text-[16px] md:text-[20px] text-[#4A4A4A] leading-[1.8] mb-8 first-letter:text-4xl first-letter:font-bold first-letter:text-royal-blue first-letter:mr-[-4px]">
                                    Welcome to Galilea Houseboats, the ultimate luxury backwater experience in Kerala.
                                    Our
                                    service is renowned for offering unparalleled luxury amenities reminiscent of
                                    star-rated
                                    hotels, earning us the prestigious title of the floating palaces of Kerala. Prepare
                                    to
                                    indulge in the epitome of luxury and comfort as you embark on a journey with us.
                                </p>
                                <p className="text-[16px] md:text-[20px] text-[#4A4A4A] leading-[1.8] mb-8">
                                    Choose from our selection of exclusive luxury houseboats, each meticulously designed
                                    to
                                    provide you with a memorable and exotic experience. Whether you desire a soothing
                                    gaze
                                    at
                                    the sunset, a tranquil retreat on our upper decks, or a productive session in our
                                    conference
                                    rooms, we have the amenities to cater to your every need.
                                </p>
                                <p className="text-[16px] md:text-[20px] text-[#4A4A4A] leading-[1.8] mb-12">
                                    At Galilea Luxury Houseboats, your safety and comfort are our top priorities. We
                                    provide
                                    our
                                    own private docking bay to securely park our boats. Our on-board facilities include
                                    gourmet
                                    dining, spa areas, and personalized service, offering a secluded oasis where you can
                                    unwind
                                    and rejuvenate. It&#39;s an experience that rivals a private island retreat.
                                </p>

                                <Link to="/about" className="inline-flex items-center gap-4 group">
                                    <span
                                        className="text-[12px] font-bold tracking-[0.3em] text-royal-blue uppercase group-hover:text-[#1E3A8A] transition-colors">READ
                                        MORE ABOUT US</span>

                                    <span
                                        className="material-symbols-outlined text-xs text-royal-blue group-hover:text-[#1E3A8A] transition-colors">east</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default Introduction;
