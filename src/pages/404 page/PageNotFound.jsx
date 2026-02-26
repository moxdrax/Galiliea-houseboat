import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <main className="flex-grow relative overflow-hidden flex items-start justify-center pt-32 md:pt-48 pb-32">
            <div className="absolute inset-0 error-bg blur-sm scale-110 opacity-40"></div>
            <div className="absolute inset-0 bg-ivory/60"></div>
            <span className="material-symbols-outlined swimming-fish-animation text-4xl">phishing</span>
            <div className="relative z-10 max-w-2xl px-6 text-center">
                <h1 className=" text-[120px] md:text-[200px] leading-none text-royal-blue opacity-90 select-none">404
                </h1>
                <div className="space-y-6 mt-8 md:mt-12">
                    <h2 className="text-3xl md:text-5xl font-light text-royal-blue ">Lost in the Backwaters?</h2>
                    <p className="text-charcoal/80 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
                        It seems you’ve drifted off course. The current has taken you to uncharted waters. Let us guide you
                        back to the main channel.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                        <Link className="w-55 sm:w-auto bg-primary text-royal-blue px-10 py-4 rounded-full font-bold text-[11px] tracking-[0.25em] uppercase transition-all hover:scale-105 active:scale-95"
                            to="/">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PageNotFound;
