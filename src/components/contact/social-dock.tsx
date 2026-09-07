
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, MessageCircle } from "lucide-react";
import {
    FaGithub,
    FaLinkedin,
    FaFacebook,
    FaInstagram,
} from "react-icons/fa";

const SOCIAL_LINKS = [
    {
        name: "whatsapp",
        icon: MessageCircle,
        url: "https://wa.me/201068130835",
    },
    {
        name: "email",
        icon: Mail,
        url: "mailto:ahmed.tarek.dev@outlook.com",
    },
    {
        name: "facebook",
        icon: FaFacebook,
        url: "#",
    },
    {
        name: "instagram",
        icon: FaInstagram,
        url: "#",
    },
    {
        name: "linkedin",
        icon: FaLinkedin,
        url: "#",
    },
    {
        name: "github",
        icon: FaGithub,
        url: "#",
    },
];

export function SocialDock() {
    const t = useTranslations("ContactPage.social");

    return (
        <section className="relative mx-auto max-w-6xl overflow-hidden px-6 py-20 md:py-24">


            <div className="relative z-10">

                {/* Header */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 18,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mb-10 text-center"
                >
                    <h3 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                        {t("title")}
                    </h3>

                    <motion.div
                        initial={{
                            width: 0,
                        }}
                        whileInView={{
                            width: 64,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.15,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                            mx-auto
                            mt-4
                            h-px
                            bg-linear-to-r
                            from-primary
                            to-primary/10
                        "
                    />
                </motion.div>

                {/* Social Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.08,
                            },
                        },
                    }}
                    className="
                        grid
                        grid-cols-2
                        gap-3
                        sm:grid-cols-3
                        lg:grid-cols-6
                    "
                >
                    {SOCIAL_LINKS.map((link) => {
                        const Icon = link.icon;

                        return (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={t(link.name)}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 18,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.45,
                                            ease: [0.22, 1, 0.36, 1],
                                        },
                                    },
                                }}
                                whileHover={{
                                    y: -4,
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-card/30
                                    p-5
                                    backdrop-blur-md
                                    transition-all
                                    duration-300
                                    hover:border-primary/30
                                    hover:bg-card/60
                                    hover:shadow-xl
                                    hover:shadow-primary/5
                                "
                            >
                                {/* Card glow */}
                                <div
                                    aria-hidden="true"
                                    className="
                                        pointer-events-none
                                        absolute
                                        -right-8
                                        -top-8
                                        h-20
                                        w-20
                                        rounded-full
                                        bg-primary/10
                                        blur-2xl
                                        opacity-0
                                        transition-opacity
                                        duration-300
                                        group-hover:opacity-100
                                    "
                                />

                                <div className="relative z-10 flex items-center justify-between gap-3">

                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-border
                                            bg-background/60
                                            transition-all
                                            duration-300
                                            group-hover:border-primary/30
                                            group-hover:bg-primary
                                        "
                                    >
                                        <Icon
                                            className="
                                                h-5
                                                w-5
                                                text-muted-foreground
                                                transition-all
                                                duration-300
                                                group-hover:text-primary-foreground
                                                group-hover:scale-110
                                            "
                                        />
                                    </div>

                                    <span
                                        className="
                                            hidden
                                            text-xs
                                            font-semibold
                                            text-muted-foreground
                                            transition-colors
                                            duration-300
                                            group-hover:text-foreground
                                            sm:block
                                        "
                                    >
                                        {t(link.name)}
                                    </span>
                                </div>

                                {/* Bottom accent */}
                                <div
                                    aria-hidden="true"
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        h-px
                                        w-0
                                        bg-primary
                                        transition-all
                                        duration-300
                                        group-hover:w-full
                                    "
                                />
                            </motion.a>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

