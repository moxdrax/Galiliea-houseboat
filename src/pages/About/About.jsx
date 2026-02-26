import { useEffect } from 'react';
import '../../styles/Hero.css';
import boat9 from '../../assets/Boat/boat9.avif';
import boat2 from '../../assets/Boat/boat2.avif';
import boat10 from '../../assets/Boat/boat10.avif';

/* ─── SEO constants ─────────────────────────────────────────────────── */
const PAGE_TITLE = 'About Us | Galilea Houseboat – Alleppey Kerala';
const PAGE_DESCRIPTION = 'Learn about Galilea Houseboat – our heritage, vision, and the traditional Kettuvallam craftsmanship that makes every Kerala backwater cruise an unforgettable luxury experience.';

/* ─── Data ──────────────────────────────────────────────────────────── */

const storyRows = [
    {
        tag: 'THE JOURNEY',
        heading: 'A Vision Carved in Teak',
        image: boat2,
        imageAlt: 'Galilea luxury houseboat gliding through Kerala backwaters',
        textFirst: false,         // image left, text right
        borderColor: 'border-royal-blue/10',
        paragraphs: [
            `Welcome to Galilea Houseboat, where luxury meets adventure on the serene waters of Kerala.
             Our houseboat service is renowned for offering unparalleled luxury amenities reminiscent of
             star-rated hotels, earning us the prestigious title of the floating palaces of Kerala.
             Prepare to indulge in the epitome of luxury and comfort as you embark on a journey with us.`,
            `Choose from our selection of exclusive luxury houseboats, each meticulously designed to
             provide you with a memorable and exotic experience. Whether you desire a soothing gaze at
             the sunset, a tranquil retreat on our upper decks, or a productive session in our conference
             rooms, we have the amenities to cater to your every need.`,
            `At Galilea Houseboat, your safety and comfort are our top priorities. We provide our own
             private docking bay to securely park our boats. Our on-board facilities include gourmet
             dining, spa areas, and personalized service, offering a secluded oasis where you can unwind
             and rejuvenate.`,
        ],
        imageHeight: 'h-[400px] lg:h-[500px]',
    },
    {
        tag: 'HERITAGE',
        heading: 'History of Kettuvallam',
        image: boat10,
        imageAlt: 'Traditional Kerala kettuvallam houseboat on the backwaters',
        textFirst: true,          // text left, image right
        borderColor: 'border-[#C5A059]/20',
        paragraphs: [
            <>The <span className="text-royal-blue ">Kettuvallam</span> (traditional rice barge) is a
                majestic symbol of Kerala's backwater heritage. Historically, these massive vessels were the
                primary mode of transport for carrying rice and spices from the fertile fields of Kuttanad
                to the port of Cochin.</>,
            `Built without a single nail, the planks of jackwood were held together with coir ropes and
             coated with caustic black resin made from boiled cashew kernels — a testament to ancient
             engineering that has withstood the test of time.`,
            `Today, the Kettuvallam has been reimagined as a floating luxury abode. While preserving the
             traditional hull and intricate knotting techniques, modern houseboats like Galilea offer
             state-of-the-art comforts, creating a seamless blend of history and hospitality.`,
        ],
        imageHeight: 'h-[400px] lg:h-[450px]',
    },
];

const pillars = [
    {
        icon: 'verified',
        title: 'Authenticity',
        desc: 'Honoring traditional Kerala craftsmanship and local culture in every detail of our service and design.',
    },
    {
        icon: 'star',
        title: 'Excellence',
        desc: 'Striving for perfection in gastronomy, hospitality, and safety to create an elite backwater experience.',
    },
    {
        icon: 'spa',
        title: 'Hospitality',
        desc: 'Personalized attention that anticipates every need, making our guests feel like royalty on the water.',
    },
];

/* ─── Component ─────────────────────────────────────────────────────── */

const About = () => {
    useEffect(() => {
        document.title = PAGE_TITLE;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', PAGE_DESCRIPTION);

        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="max-w-full overflow-hidden">
            {/* Hero */}
            <header className="relative h-[45vh] md:h-[70vh] w-full overflow-hidden mt-16 text-center">
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
                                OUR LEGACY
                            </span>
                            <h1
                                className="text-5xl md:text-8xl   text-white mb-6 drop-shadow-2xl reveal-up"
                                style={{ animationDelay: '0.2s' }}>
                                About Us
                            </h1>
                            <div className="flex items-center justify-center gap-4 fade-in-delayed">
                                <div className="w-24 h-[3px] bg-white/40" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Story rows */}
            <section className="bg-[#f2eee3] dark:bg-[#1a1814] py-24 md:py-32" id="about-content">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
                    {storyRows.map((row, i) => (
                        <div key={row.tag}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

                                {/* Text */}
                                <div className={`text-left ${row.textFirst ? 'order-1' : 'order-1 md:order-2'}`}>
                                    <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.4em] text-royal-blue/60 uppercase block mb-4">
                                        {row.tag}
                                    </span>
                                    <h2 className="text-3xl lg:text-5xl  text-royal-blue dark:text-white mb-8">
                                        {row.heading}
                                    </h2>
                                    <div className="space-y-6 text-[#555555] dark:text-neutral-400  leading-relaxed text-base md:text-lg">
                                        {row.paragraphs.map((p, pi) => <p key={pi}>{p}</p>)}
                                    </div>
                                </div>

                                {/* Image */}
                                <div className={`relative group ${row.textFirst ? 'order-2' : 'order-2 md:order-1'}`}>
                                    <div className={`absolute -inset-4 border ${row.borderColor} z-0 hidden md:block`} />
                                    <div className={`relative z-10 w-full ${row.imageHeight} overflow-hidden shadow-xl`}>
                                        <img src={row.image} alt={row.imageAlt} className="w-full h-full object-cover" loading="lazy" />
                                        <div className="absolute inset-0 bg-black/10" />
                                    </div>
                                </div>
                            </div>

                            {/* Divider between rows only */}
                            {i < storyRows.length - 1 && (
                                <div className="w-full h-px bg-[#C5A059]/30 my-24 md:my-32" />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Pillars */}
            <section className="py-24 md:py-32 bg-ivory dark:bg-[#151412] relative overflow-hidden" id="values">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <div className="text-center mb-20 text-center">
                        <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.4em] text-royal-blue/60 uppercase block mb-4">
                            PHILOSOPHY
                        </span>
                        <h2 className="text-3xl lg:text-5xl  text-royal-blue dark:text-white mb-8">
                            Pillars of Galilea
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {pillars.map((p) => (
                            <div key={p.title}
                                className="group bg-white dark:bg-white/5 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-neutral-100 dark:border-white/5">
                                <div className="w-20 h-20 mb-8 mx-auto flex items-center justify-center rounded-full bg-primary/10 transition-colors duration-300">
                                    <span className="material-symbols-outlined text-primary text-4xl font-light">{p.icon}</span>
                                </div>
                                <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-4 text-royal-blue dark:text-white text-center  font-bold">
                                    {p.title}
                                </h4>
                                <p className="text-neutral-500 dark:text-neutral-400 font-light text-base leading-relaxed  text-center">
                                    {p.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </article>
    );
};

export default About;
