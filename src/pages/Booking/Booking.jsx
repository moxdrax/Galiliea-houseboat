import { useState, useEffect, useRef } from 'react';
import boat9 from '../../assets/Boat/boat9.avif';
import '../../styles/Hero.css';
import img from '../../assets/booking.jpeg';

const PAGE_TITLE = 'Make Your Reservation | Galilea Houseboat Alleppey';
const PAGE_DESCRIPTION = 'Experience the ultimate Kerala backwater voyage. Reserve your private stay on Galilea Houseboat through our professional booking concierge.';

const CustomSelect = ({ label, value, options, onChange, isOpen, onToggle, inputFieldClass, inputLabelClass, id }) => {
    const getDisplayValue = () => {
        const val = parseInt(value);
        if (label === 'Rooms') return `${val} ${val === 1 ? 'Room' : 'Rooms'}`;
        if (label === 'Adults') return `${val} ${val === 1 ? 'Adult' : 'Adults'}`;
        return `${val} ${val === 1 ? 'Child' : 'Children'}`;
    };

    return (
        <div className="relative">
            <label className={inputLabelClass} htmlFor={id}>{label}</label>
            <button
                type="button"
                id={id}
                onClick={onToggle}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className={`${inputFieldClass} flex items-center justify-between text-left cursor-pointer`}
            >
                <span>{getDisplayValue()}</span>
                <span className={`material-symbols-outlined transition-transform duration-300 text-royal-blue/60 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>

            {isOpen && (
                <div role="listbox" className="absolute z-[100] mt-2 w-full bg-white border border-primary/10 rounded-lg shadow-2xl overflow-hidden max-h-80 overflow-y-auto animate-fade-in ring-1 ring-black/5">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            role="option"
                            aria-selected={value === opt.toString()}
                            onClick={() => onChange(opt.toString())}
                            className={`w-full px-4 py-3 text-sm text-left transition-colors duration-200 hover:bg-primary/5  ${value === opt.toString() ? 'bg-primary/10 text-royal-blue font-bold border-l-4 border-royal-blue' : 'text-neutral-700 pl-5'}`}
                        >
                            {opt} {label === 'Rooms' ? (opt === 1 ? 'Room' : 'Rooms') : label === 'Adults' ? (opt === 1 ? 'Adult' : 'Adults') : (opt === 1 ? 'Child' : 'Children')}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const Booking = () => {
    const [counts, setCounts] = useState({
        rooms: "1",
        adults: "2",
        childBelow5: "0",
        childAbove5: "0"
    });
    const [activeDropdown, setActiveDropdown] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        document.title = PAGE_TITLE;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', PAGE_DESCRIPTION);
        window.scrollTo(0, 0);

        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleChange = (name, value) => {
        setCounts(prev => ({ ...prev, [name]: value }));
        setActiveDropdown(null);
    };

    const inputLabelClass = "text-[12px] font-bold text-royal-blue dark:text-white uppercase mb-2 block";
    const inputFieldClass = "w-full bg-white border-0 focus:ring-2 focus:ring-primary/50 rounded-md py-3 px-4 text-sm text-royal-blue dark:text-white transition-all duration-300 placeholder:text-royal-blue/30 outline-none shadow-inner";
    const today = new Date().toISOString().split('T')[0];

    const range0To9 = [...Array(10)].map((_, i) => i);
    const range1To16 = [...Array(16)].map((_, i) => i + 1);

    return (
        <article className="relative min-h-screen w-full flex flex-col pt-32 pb-48 lg:pt-40 lg:pb-64">
            <div className="absolute inset-0 z-0">
                <img src={img} alt="Luxury Houseboat Background" className="w-full h-full object-cover scale-110" />
                <div className="absolute inset-0 bg-royal-blue/60 mix-blend-multiply" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
                    <div className="w-full max-w-md animate-fade-in-up">
                        <div className="bg-white p-8 md:p-12 rounded-lg shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                            <form className="space-y-6" ref={formRef}>
                                <div>
                                    <label className={inputLabelClass} htmlFor="name">Name</label>
                                    <input type="text" id="name" placeholder="Enter your full name" className={inputFieldClass} />
                                </div>
                                <div>
                                    <label className={inputLabelClass} htmlFor="email">Email Address</label>
                                    <input type="email" id="email" placeholder="Enter your email" className={inputFieldClass} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={inputLabelClass} htmlFor="phone">Phone Number</label>
                                        <input type="text" id="phone" placeholder="Enter your phone no" className={inputFieldClass} />
                                    </div>
                                    <div>
                                        <label className={inputLabelClass} htmlFor="check-in">Arrival Date</label>
                                        <input type="date" id="check-in" min={today} className={inputFieldClass} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 relative z-[60]">
                                    <CustomSelect
                                        label="Rooms"
                                        id="rooms-select"
                                        value={counts.rooms}
                                        options={range1To16}
                                        isOpen={activeDropdown === 'rooms'}
                                        onToggle={() => handleToggle('rooms')}
                                        onChange={(val) => handleChange('rooms', val)}
                                        inputFieldClass={inputFieldClass}
                                        inputLabelClass={inputLabelClass}
                                    />
                                    <CustomSelect
                                        label="Adults"
                                        id="adults-select"
                                        value={counts.adults}
                                        options={range0To9}
                                        isOpen={activeDropdown === 'adults'}
                                        onToggle={() => handleToggle('adults')}
                                        onChange={(val) => handleChange('adults', val)}
                                        inputFieldClass={inputFieldClass}
                                        inputLabelClass={inputLabelClass}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 relative z-[55]">
                                    <CustomSelect
                                        label="Children below 5"
                                        id="child-below-select"
                                        value={counts.childBelow5}
                                        options={range0To9}
                                        isOpen={activeDropdown === 'childBelow5'}
                                        onToggle={() => handleToggle('childBelow5')}
                                        onChange={(val) => handleChange('childBelow5', val)}
                                        inputFieldClass={inputFieldClass}
                                        inputLabelClass={inputLabelClass}
                                    />
                                    <CustomSelect
                                        label="Children above 5"
                                        id="child-above-select"
                                        value={counts.childAbove5}
                                        options={range0To9}
                                        isOpen={activeDropdown === 'childAbove5'}
                                        onToggle={() => handleToggle('childAbove5')}
                                        onChange={(val) => handleChange('childAbove5', val)}
                                        inputFieldClass={inputFieldClass}
                                        inputLabelClass={inputLabelClass}
                                    />
                                </div>

                                <div className="pt-4 relative z-0">
                                    <button type="submit" className="w-full bg-royal-blue text-white font-bold py-4 rounded-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-lg hover:shadow-xl active:scale-95">
                                        Check availability
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

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
