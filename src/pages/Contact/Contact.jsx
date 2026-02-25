import { useEffect, useState } from 'react';
import boat9 from '../../assets/Boat/boat9.avif';
import '../../styles/Hero.css';

const PAGE_TITLE = 'Contact Us | Galilea Houseboat Alleppey - Kerala Backwater Booking';
const PAGE_DESCRIPTION = 'Connect with Galilea Houseboat for luxury cruise bookings in Alleppey. Reach us via phone, email, or visit our office. We are here to help you plan your perfect Kerala backwater journey.';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null }
    });

    useEffect(() => {
        document.title = PAGE_TITLE;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', PAGE_DESCRIPTION);
        window.scrollTo(0, 0);
    }, []);

    const floatingClass = "flex w-14 h-14 rounded-full bg-white text-royal-blue items-center justify-center transition-all duration-300 shadow-lg border border-royal-blue/10 hover:scale-110 active:scale-95 group";

    const inputClass = "w-full bg-[#fdfaf5] border border-neutral-200 rounded-lg py-4 px-6 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-royal-blue/10 transition-all font-light";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(prevStatus => ({ ...prevStatus, submitting: true }));

        const scriptURL = "https://script.google.com/macros/s/AKfycbzJovSn9aA3cTmJ10oip0AUhXqqSZE_n_fS08X4uHM59xRtzHCE1JTKKxMqaH4qzq8g/exec";

        try {
            console.log('Sending inquiry to Google Script...', formData);

            await fetch(scriptURL, {
                method: 'POST',
                body: new URLSearchParams(formData),
                mode: 'no-cors'
            });

            setStatus({
                submitted: true,
                submitting: false,
                info: { error: false, msg: "Thank you! We'll contact you soon." }
            });
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

        } catch (error) {
            console.error('Submission error:', error);
            setStatus({
                submitted: false,
                submitting: false,
                info: { error: true, msg: "Something went wrong. Please try again later." }
            });
        }

        setTimeout(() => {
            setStatus(prev => ({ ...prev, info: { error: false, msg: null } }));
        }, 5000);
    };

    return (
        <article className="max-w-full overflow-hidden">
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
                                GET IN TOUCH
                            </span>
                            <h1
                                className="text-5xl md:text-8xl font-serif italic text-white mb-6 drop-shadow-2xl reveal-up"
                                style={{ animationDelay: '0.2s' }}>
                                Contact
                            </h1>
                            <div className="flex items-center justify-center gap-4 fade-in-delayed">
                                <div className="w-24 h-[3px] bg-white/40" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="bg-[#f2eee3] dark:bg-[#1a1814] py-24 md:py-32" id="contact-info">
                <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                        {/* Column 1: Contact info - 3 cols */}
                        <div className="lg:col-span-3 space-y-12 py-4 animate-fade-in-up">
                            <div className="group">
                                <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.4em] text-royal-blue/60 uppercase block mb-6">OUR CONCIERGE</span>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-royal-blue/5">
                                            <span className="material-symbols-outlined text-royal-blue text-xl font-light">person</span>
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 text-royal-blue dark:text-white">Partners</h4>
                                            <p className="text-lg font-serif italic text-neutral-600 dark:text-neutral-400">Joshy Thomas & Johnson Mathew</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-royal-blue/5">
                                            <span className="material-symbols-outlined text-royal-blue text-xl font-light">call</span>
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 text-royal-blue dark:text-white">Reservations</h4>
                                            <a href="tel:+919746814181" className="text-lg font-serif italic text-neutral-600 dark:text-neutral-400 hover:text-royal-blue transition-colors block leading-relaxed">+91 9746814181</a>
                                            <a href="tel:+919895646190" className="text-lg font-serif italic text-neutral-600 dark:text-neutral-400 hover:text-royal-blue transition-colors block leading-relaxed">+91 9895646190</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-royal-blue/5">
                                            <span className="material-symbols-outlined text-royal-blue text-xl font-light">mail</span>
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 text-royal-blue dark:text-white">General Inquiry</h4>
                                            <a href="mailto:galileacruise@gmail.com" className="text-lg font-serif italic text-neutral-600 dark:text-neutral-400 hover:text-royal-blue transition-colors break-words">galileacruise@gmail.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="group border-t border-royal-blue/10 pt-10">
                                <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.4em] text-royal-blue/60 uppercase block mb-6">LOCATION</span>
                                <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-royal-blue/5">
                                        <span className="material-symbols-outlined text-royal-blue text-xl font-light">location_on</span>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-royal-blue dark:text-white">Main Docking Office</h4>
                                        <p className="text-base font-serif italic leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-sm">
                                            Kainakary Panchayath - Kuppapuram Rd, Kuttamangalam, Kuppapuram, Kainakary South, Kerala 688501
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Contact Form - 5 cols */}
                        <div className="lg:col-span-5 bg-white/80 dark:bg-[#111] p-8 md:p-12 rounded-[40px] relative z-10 animate-fade-in-up md:hover:shadow-2xl md:hover:shadow-royal-blue/5 transition-all duration-700"
                            style={{
                                border: '1px solid rgba(238, 189, 43, 0.2)',
                                boxShadow: 'inset 0 0 40px rgba(248, 241, 229, 0.5)',
                            }}>
                            <div className="mb-8">
                                <span className="text-[10px] font-bold tracking-[0.4em] text-royal-blue uppercase mb-2 block">Contact Us</span>
                                <h2 className="text-3xl font-serif italic text-royal-blue dark:text-white">Get in Touch</h2>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-widest text-royal-blue uppercase pl-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className={inputClass}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-widest text-royal-blue uppercase pl-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className={inputClass}
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-widest text-royal-blue uppercase pl-1">Phone Number</label>
                                        <input
                                            type="text"
                                            placeholder="Phone Number"
                                            className={inputClass}
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-widest text-royal-blue uppercase pl-1">Subject</label>
                                        <input
                                            type="text"
                                            placeholder="Inquiry Subject"
                                            className={inputClass}
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest text-royal-blue uppercase pl-1">Message</label>
                                    <textarea
                                        placeholder="How can we help you?"
                                        className={`${inputClass} h-32 resize-none`}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <button
                                        type="submit"
                                        className="w-full md:w-50 bg-royal-blue text-white font-bold tracking-[0.2em] px-8 py-4 rounded-lg hover:bg-royal-blue/90 transition-all transform hover:-translate-y-1 active:scale-95 uppercase text-[10px] shadow-lg shadow-royal-blue/20 disabled:opacity-50 disabled:transform-none"
                                        disabled={status.submitting}
                                    >
                                        {status.submitting ? 'Sending...' : 'Send Message'}
                                    </button>

                                    {status.info.msg && (
                                        <div className={`p-4 rounded-lg ${status.info.error ? 'text-royal-blue' : 'text-royal-blue'} text-[10px] font-bold tracking-widest uppercase animate-pulse shrink-0`}>
                                            {status.info.msg}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Column 3: MapSection - 4 cols */}
                        <div className="lg:col-span-4 h-full min-h-[500px] animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            <div className="h-full w-full rounded-none overflow-hidden relative z-0">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3935.2872203277957!2d76.38374597502445!3d9.483727990596874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMjknMDEuNCJOIDc2wrAyMycxMC44IkU!5e0!3m2!1sen!2sin!4v1770288747438!5m2!1sen!2sin"
                                    className="w-full h-full grayscale brightness-90 hover:grayscale-0 transition-all duration-700 contrast-125"
                                    style={{ border: 0 }} allowFullScreen loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <div className="fixed right-6 bottom-[180px] md:bottom-[120px] z-[70] flex flex-col gap-4">
                <a href="https://wa.me/919746814181" target="_blank" rel="noopener noreferrer"
                    className={`${floatingClass} hover:bg-[#25D366] hover:text-white`}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                </a>
                <a href="tel:+919746814181" className={`${floatingClass} hover:bg-royal-blue hover:text-white`}>
                    <span className="material-symbols-outlined text-2xl font-light">call</span>
                </a>
            </div>
        </article>
    );
};

export default Contact;
