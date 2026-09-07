/**
 * @file hero-waves.tsx
 * @package src/components/home
 * @preview Independent isolated full-width double layer wave divider supporting standard themes.
 */

"use client";

/**
 * Standalone full-screen width Wave divider component.
 * Features an extra-tall background wave with a low-riding foreground wave nested at the absolute bottom edge.
 * @function HeroWaves
 * @returns {React.JSX.Element} Screen-wide solid vector wave block.
 */
export function HeroWaves() {
    return (
        <div className="relative w-full overflow-hidden leading-none z-20 bg-transparent -mt-12 md:-mt-24">
            <svg 
                viewBox="0 0 1440 240" 
                preserveAspectRatio="none" 
                className="relative block w-full h-32 md:h-64"
            >
                <defs>
                    {/* Dynamic blending gradients for Wave 2, seamlessly easing into the systemic CSS background variable */}
                    <linearGradient id="wave-bottom-theme-light" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--background)" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="var(--background)" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="var(--background)" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="wave-bottom-theme-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--background)" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="var(--background)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="var(--background)" stopOpacity="1" />
                    </linearGradient>
                </defs>

                {/* WAVE LAYER 1 (Top Background Wave): 4 massive, extra-tall deep curves (Vivid Solid Purple) */}
                <path
                    d="M0,30 C180,160 360,10 540,90 C720,180 900,10 1080,90 C1260,180 1380,90 1440,40 L1440,240 L0,240 Z"
                    className="fill-purple-600 dark:fill-purple-900 transition-all duration-500"
                />

                {/* WAVE LAYER 2 (Bottom Foreground Wave): 8 dense ripples sitting at the absolute bottom edge of Layer 1 */}
                <path
                    d="M0,175 C90,195 180,155 270,175 C360,195 450,155 540,175 C630,195 720,155 810,175 C900,195 990,155 1080,175 C1170,195 1260,155 1350,175 C1395,185 1418,185 1440,175 L1440,240 L0,240 Z"
                    fill="url(#wave-bottom-theme-light)"
                    className="dark:fill-[url(#wave-bottom-theme-dark)] transition-all duration-500"
                />
            </svg>
        </div>
    );
}