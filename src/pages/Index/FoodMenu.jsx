import { useState, useEffect, useRef } from 'react';
import fishImg from '../../assets/fish.png';

// ── Timing display — computed from cruiseType + tier ──────────────────────────
const TimingDisplay = ({ cruiseType, tier }) => {
    const isDay = cruiseType === 'day';
    const isOvernight = !isDay;
    const isPremium = tier === 'premium';
    const isDeluxe = !isPremium;

    const acText = isOvernight
        ? (isDeluxe ? 'AC time 9.00 pm To 6.00 am' : 'Full time AC')
        : 'Full time AC'; // day-premium

    const showAC = (isDay && isPremium) || isOvernight;

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-2.5 text-center">
                <span className="material-symbols-outlined text-[24px] md:text-[20px] text-royal-blue">schedule</span>
                <span className="text-[15px] md:text-[16px] text-neutral-700 leading-tight">
                    {isDay
                        ? 'Cruise time 11.00 am to 5.00 pm'
                        : 'Cruise time 12.00 pm to 9.00 am (Next day)'}
                </span>
            </div>
            {showAC && (
                <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-2.5 text-center">
                    <span className="material-symbols-outlined text-[24px] md:text-[20px] text-royal-blue">ac_unit</span>
                    <span className="text-[15px] md:text-[16px] font-handwriting text-neutral-700 leading-tight">
                        {acText}
                    </span>
                </div>
            )}
        </div>
    );
};

const FoodMenu = () => {
    const [cruiseType, setCruiseType] = useState('day');    // 'day' | 'overnight'
    const [tier, setTier] = useState('deluxe'); // 'deluxe' | 'premium'
    const [menuVisible, setMenuVisible] = useState(true);   // drives fade animation

    const isDay = cruiseType === 'day';
    const isDeluxe = tier === 'deluxe';

    // Fade animation when switching tier (mirrors jQuery .animate opacity)
    const changeTier = (newTier) => {
        if (newTier === tier) return;
        setMenuVisible(false);
        setTimeout(() => {
            setTier(newTier);
            setMenuVisible(true);
        }, 200);
    };

    return (
        <article className="max-w-full overflow-hidden">
            <section className="py-12 bg-soft-cream relative z-40" id="culinary">
                <style>{`
                    @keyframes hook-bob {
                        0%, 100% { transform: translateY(0); }
                        50%       { transform: translateY(15px); }
                    }
                    .hook-animate { animation: hook-bob 3s ease-in-out infinite; }
                `}</style>

                {/* Hanging Fishing Rod & Hook */}
                <div className="absolute top-[-210px] left-0 z-50 opacity-90 pointer-events-none drop-shadow-sm">
                    <svg className="hook-animate" width="200" height="400" viewBox="0 0 200 400" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        {/* Rod */}
                        <path d="M-20 200 Q 60 100 120 50" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" />
                        {/* Fishing Line */}
                        <line x1="120" y1="50" x2="120" y2="350" stroke="#1E3A8A" strokeWidth="1" strokeOpacity="0.6" />
                        {/* Hook */}
                        <path d="M120 350 C120 370 140 375 140 360" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M140 360 L136 366" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                </div>

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
                    {/* Section heading */}
                    <div className="text-center mb-16">
                        <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.8em] text-primary/60 uppercase block mb-4">
                            Food Menu
                        </span>
                        <h2 className="text-2xl lg:text-4xl font-serif italic text-royal-blue/80">A Taste of the Sun</h2>
                        <h3 className="sr-only">Menu Selection</h3>
                    </div>

                    <div className="max-w-4xl mx-auto mb-8 space-y-8">
                        {/* ── Cruise type toggle ── */}
                        <div className="flex justify-center">
                            <div className="inline-flex p-1 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-primary/10">
                                <button
                                    className={`cruise-selector-btn px-8 py-3 font-medium rounded-full text-[10px] tracking-[0.2em] uppercase transition-all ${cruiseType === 'day' ? 'active' : ''}`}
                                    onClick={() => setCruiseType('day')}>
                                    Day Cruise
                                </button>
                                <button
                                    className={`cruise-selector-btn px-8 py-3 font-medium rounded-full text-[10px] tracking-[0.2em] uppercase transition-all ${cruiseType === 'overnight' ? 'active' : ''}`}
                                    onClick={() => setCruiseType('overnight')}>
                                    Overnight Cruise
                                </button>
                            </div>
                        </div>

                        {/* ── Tier toggle ── */}
                        <div className="flex justify-center border-b border-primary/10">
                            <div className="flex gap-12">
                                <button
                                    className={`type-selector-btn pb-4 font-medium text-[10px] tracking-[0.3em] uppercase transition-all ${isDeluxe ? 'active' : ''}`}
                                    onClick={() => changeTier('deluxe')}>
                                    Deluxe Menu
                                </button>
                                <button
                                    className={`type-selector-btn pb-4 font-medium text-[10px] tracking-[0.3em] uppercase transition-all ${!isDeluxe ? 'active' : ''}`}
                                    onClick={() => changeTier('premium')}>
                                    Premium Menu
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Menu display section ── */}
                    <section className="pt-0 pb-12 bg-ivory-luxury" id="catalog-section">
                        <div className="max-w-[1000px] mx-auto px-6">
                            <div className="catalog-container rounded-2xl overflow-hidden p-8 md:p-12" id="menu-catalog">

                                {/* Dynamic header */}
                                <div className="text-center mb-16 relative">
                                    <div className="inline-block relative">
                                        <div className="h-[1px] w-12 bg-primary/20 absolute -left-16 top-1/2"></div>
                                        <div className="text-[10px] tracking-[0.4em] font-handwriting uppercase text-primary mb-2">
                                            {isDay ? 'Day Cruise' : 'Overnight Cruise'}
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-handwriting text-royal-blue px-4">
                                            {isDeluxe ? 'Deluxe Experience' : 'Premium Experience'}
                                        </h3>
                                        <div className="h-[1px] w-12 bg-primary/20 absolute -right-16 top-1/2"></div>
                                    </div>

                                    {/* Timing display — computed from state */}
                                    <div
                                        className="mt-4 flex flex-col justify-center items-center transition-opacity duration-300"
                                        style={{ opacity: menuVisible ? 1 : 0 }}
                                    >
                                        <TimingDisplay cruiseType={cruiseType} tier={tier} />
                                    </div>
                                </div>

                                {/* ── Menu content — fades when tier changes ── */}
                                <div
                                    id="menu-content-grid"
                                    className="flex flex-col gap-6 max-w-2xl mx-auto text-center transition-opacity duration-200"
                                    style={{ opacity: menuVisible ? 1 : 0 }}
                                >
                                    {/* Layer 1: Welcome Drink */}
                                    <div className="meal-section">
                                        <h4 className="menu-category-title justify-center">
                                            <span>Welcome Drink</span>
                                            <span className="material-symbols-outlined text-sm">&nbsp;glass_cup</span>
                                        </h4>
                                        <div className="mt-2">
                                            <ul className="menu-item-text">
                                                <li>Lime Juice</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Layer 2: Lunch */}
                                    <div className="meal-section">
                                        <h4 className="menu-category-title justify-center mb-4 font-handwriting">
                                            <span>{isDay ? 'Lunch' : 'Lunch'}</span>
                                            <span className="material-symbols-outlined text-sm">&nbsp;restaurant</span>
                                        </h4>

                                        {/* Day Cruise Lunch */}
                                        {isDay && (
                                            <div className="space-y-4">
                                                {isDeluxe && (
                                                    <div>
                                                        <span className="diet-badge diet-badge-veg">Veg</span>
                                                        <ul className="menu-item-text">
                                                            <li>Rice</li><li>Chapati</li><li>Paneer Masala</li>
                                                            <li>Cauliflower Fry</li><li>Sambar</li><li>Thoran</li>
                                                            <li>Mezhukkupuratty</li><li>Banana Kalan</li>
                                                            <li>Pappadam</li><li>Pickle</li><li>Veg Salad</li>
                                                        </ul>
                                                    </div>
                                                )}
                                                {!isDeluxe && (
                                                    <div>
                                                        <span className="diet-badge diet-badge-veg">Veg</span>
                                                        <ul className="menu-item-text">
                                                            <li>Rice</li><li>Chapati</li><li>Paneer Masala</li>
                                                            <li>Cauliflower Fry</li><li>Sambar</li><li>Thoran</li>
                                                            <li>Mezhukkupuratty</li><li>Banana Kalan</li>
                                                            <li>Pappadam</li><li>Pickle</li><li>Veg Salad</li>
                                                            <li className="italic font-serif">Payasam (Vermicelli)</li>
                                                        </ul>
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="diet-badge diet-badge-nonveg">Non-Veg</span>
                                                    <ul className="menu-item-text">
                                                        <li>Fish Fry (Pearl Spot)</li>
                                                        <li>Chicken Roast</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}

                                        {/* Overnight Cruise Lunch */}
                                        {!isDay && (
                                            <div className="space-y-4">
                                                {isDeluxe && (
                                                    <div>
                                                        <span className="diet-badge diet-badge-veg">Veg</span>
                                                        <ul className="menu-item-text">
                                                            <li>Rice</li><li>Sambar</li><li>Thoran</li>
                                                            <li>Cauliflower Fry</li><li>Mezhukkupuratty</li>
                                                            <li>Yogurt</li><li>Pappadam</li><li>Pickle</li><li>Veg Salad</li>
                                                        </ul>
                                                    </div>
                                                )}
                                                {!isDeluxe && (
                                                    <div>
                                                        <span className="diet-badge diet-badge-veg">Veg</span>
                                                        <ul className="menu-item-text">
                                                            <li>Rice</li><li>Chapati</li><li>Banana Kalan</li>
                                                            <li>Cauliflower Fry</li><li>Sambar</li><li>Thoran</li>
                                                            <li>Mezhukkupuratty</li><li>Yogurt</li>
                                                            <li>Pappadam</li><li>Pickle</li><li>Veg Salad</li>
                                                            <li className="italic font-serif">Payasam (Vermicelli)</li>
                                                        </ul>
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="diet-badge diet-badge-nonveg">Non-Veg</span>
                                                    <ul className="menu-item-text">
                                                        {isDeluxe
                                                            ? <li>Fish Fry (Pearl Spot / Seer)</li>
                                                            : <><li>Fish Curry</li><li>Chicken Fry</li></>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Layer 3: Tea & Snacks */}
                                    <div className="meal-section">
                                        <h4 className="menu-category-title justify-center">
                                            <span>Tea / Snacks</span>
                                            <span className="material-symbols-outlined text-sm">&nbsp;bakery_dining</span>
                                        </h4>
                                        <div className="mt-2">
                                            <ul className="menu-item-text">
                                                <li>Tea / Coffee</li>
                                                <li>Banana Fritters</li>
                                                <li>Onion Pakoda</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Layer 4: Dinner (Overnight Only) */}
                                    {!isDay && (
                                        <div className="meal-section">
                                            <h4 className="menu-category-title justify-center mb-4 font-handwriting">
                                                <span>Dinner</span>
                                                <span className="material-symbols-outlined text-sm">&nbsp;nights_stay</span>
                                            </h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <span className="diet-badge diet-badge-veg">Veg</span>
                                                    <ul className="menu-item-text">
                                                        <li>Chapati</li><li>Rice</li><li>Paneer Masala</li>
                                                        <li>Dal Fry</li><li>Potato Roast</li>
                                                        <li>Vendakka Mezhukkupuratty</li><li>Pickle</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <span className="diet-badge diet-badge-nonveg">Non-Veg</span>
                                                    <ul className="menu-item-text">
                                                        <li>Chicken Roast</li>
                                                        {!isDeluxe && <li>Fish Fry</li>}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Layer 5: Breakfast (Overnight Only) */}
                                    {!isDay && (
                                        <div className="meal-section">
                                            <h4 className="menu-category-title justify-center mb-4 font-handwriting">
                                                <span>Breakfast</span>
                                                <span className="material-symbols-outlined text-sm">&nbsp;wb_sunny</span>
                                            </h4>
                                            <div className="space-y-4">
                                                {isDeluxe && (
                                                    <ul className="menu-item-text">
                                                        <li>Idli / Dosa</li>
                                                        <li>Sambar &amp; Chutney</li>
                                                        <li>Tea / Coffee</li>
                                                    </ul>
                                                )}
                                                {!isDeluxe && (
                                                    <>
                                                        <div>
                                                            <span className="diet-badge diet-badge-veg">Veg</span>
                                                            <ul className="menu-item-text">
                                                                <li>Bread</li><li>Butter</li><li>Jam</li><li>Idli / Dosa</li>
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <span className="diet-badge diet-badge-nonveg">Non-Veg</span>
                                                            <ul className="menu-item-text">
                                                                <li>Egg Omelet</li>
                                                            </ul>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Disclaimer */}
                                <div className="mt-10 text-center">
                                    <div className="flex items-center justify-center gap-4 mb-4">
                                        <span className="block h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#c9a96e]"></span>
                                        <span className="text-[#c9a96e] text-lg">✦</span>
                                        <span className="block h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#c9a96e]"></span>
                                    </div>
                                    <p className="text-[#5D4037] text-lg font-handwriting italic">
                                        Note: Menu items are subject to change
                                    </p>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </article>
    );
};

export default FoodMenu;