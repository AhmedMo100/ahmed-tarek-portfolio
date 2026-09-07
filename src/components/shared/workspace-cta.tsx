/**
 * @file workspace-cta.tsx
 * @package src/components/home
 * @preview Perfectly leveled grid layout with dynamic action channels and integrated contact navigation.
 */

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight, Mail, MessageSquareText, ShieldCheck, Send, Layers, User } from "lucide-react";

/**
 * High-fidelity production console with equalized height grid alignment and broad-audience CTA.
 * @function WorkspaceCta
 * @returns {React.JSX.Element} Symmetrical structured production layout.
 */
export function WorkspaceCta() {
    const t = useTranslations("WorkspaceCta");
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    const [isExecuted, setIsExecuted] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const runConnectSequence = () => {
        if (isExecuted) return;
        setIsExecuted(true);
        
        const lines = [
            t("log.step1"),
            t("log.step2"),
            t("log.step3")
        ];

        lines.forEach((line, index) => {
            setTimeout(() => {
                setTerminalOutput((prev) => [...prev, line]);
                if (index === lines.length - 1) {
                    setShowActions(true);
                }
            }, index * 450);
        });
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-24 bg-background text-foreground relative overflow-hidden">
            {/* Ambient production background dynamic glow matrices */}
            <div className="absolute top-12 left-1/4 w-[400px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-12 right-1/4 w-[350px] h-[250px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            {/* Equalized grid height configuration on large screens via items-stretch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
                
                {/* LEFT: Structural Title Deck & Core Metrics */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground leading-tight">
                            {t("title")}
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                            {t("subtitle")}
                        </p>
                    </div>

                    {/* Highly aesthetic credibility cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                        <motion.div 
                            whileHover={{ y: -4 }}
                            className="p-5 rounded-2xl border border-border bg-card/20 backdrop-blur-md flex flex-col gap-2 justify-center"
                        >
                            <Layers className="h-5 w-5 text-purple-500" />
                            <span className="text-sm font-semibold text-foreground">{t("bento.security")}</span>
                            <span className="text-xs text-muted-foreground">{t("bento.securityDesc")}</span>
                        </motion.div>

                        <motion.div 
                            whileHover={{ y: -4 }}
                            className="p-5 rounded-2xl border border-border bg-card/20 backdrop-blur-md flex flex-col gap-2 justify-center"
                        >
                            <Send className="h-5 w-5 text-indigo-500" />
                            <span className="text-sm font-semibold text-foreground">{t("bento.speed")}</span>
                            <span className="text-xs text-muted-foreground">{t("bento.speedDesc")}</span>
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT: Perfect height matched immersive communication console */}
                <div className="lg:col-span-7 flex w-full">
                    <div className="w-full rounded-2xl border border-border bg-black/95 text-zinc-300 font-mono text-xs md:text-sm overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300">
                        
                        {/* Terminal Control Dashboard Ribbon */}
                        <div className="bg-zinc-900/90 border-b border-border/50 px-4 py-3 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                            </div>
                            <span className="text-zinc-500 text-xs font-sans font-medium">{t("windowTitle")}</span>
                            <Terminal className="h-3.5 w-3.5 text-zinc-500" />
                        </div>

                        {/* Interactive Console Viewport Output Terminal */}
                        <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                            <div className="flex flex-col gap-2">
                                {!isExecuted && (
                                    <p className="text-zinc-600 font-sans italic">
                                        {t("terminalPlaceholder")}
                                    </p>
                                )}
                                
                                <div className="flex flex-col gap-3">
                                    {terminalOutput.map((line, idx) => (
                                        <motion.p 
                                            initial={{ opacity: 0, x: -6 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={idx}
                                            className={idx === 2 ? "text-emerald-400 font-sans leading-relaxed" : "text-zinc-300 font-sans leading-relaxed"}
                                        >
                                            {line}
                                        </motion.p>
                                    ))}
                                </div>
                            </div>

                            {/* Wide aspect layout action node wrapper */}
                            <div className="border-t border-border/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-sans">
                                    <ShieldCheck className={`h-4 w-4 ${showActions ? "text-emerald-500" : "text-zinc-600"}`} />
                                    <span>{showActions ? t("status.ready") : t("status.idle")}</span>
                                </div>

                                <AnimatePresence mode="wait">
                                    {!isExecuted ? (
                                        <motion.button
                                            key="trigger"
                                            onClick={runConnectSequence}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-foreground text-background font-sans text-xs font-bold flex items-center justify-center gap-2 transition-colors hover:bg-foreground/90 cursor-pointer shadow-lg whitespace-nowrap"
                                        >
                                            <span>{t("terminalBtn")}</span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </motion.button>
                                    ) : (
                                        showActions && (
                                            <motion.div 
                                                key="channels"
                                                initial={{ opacity: 0, y: 4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto justify-end"
                                            >
                                                {/* Route to full Contact page anchor */}
                                                <Link 
                                                    href="/contact"
                                                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-border bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 font-sans text-xs font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                                                >
                                                    <User className="h-3.5 w-3.5 text-purple-400" />
                                                    <span>{t("contactPageBtn")}</span>
                                                </Link>

                                                {/* WhatsApp Connection Node */}
                                                <motion.a
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    href="https://wa.me/201068130835"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-zinc-900 border border-border hover:bg-zinc-800 text-zinc-200 font-sans text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                                                >
                                                    <MessageSquareText className="h-3.5 w-3.5 text-emerald-500" />
                                                    <span>{t("whatsappBtn")}</span>
                                                </motion.a>

                                                {/* Direct Email Link Node */}
                                                <motion.a
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    href="mailto:ahmed.tarek.dev@outlook.com"
                                                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-sans text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md whitespace-nowrap"
                                                >
                                                    <Mail className="h-3.5 w-3.5" />
                                                    <span>{t("mailBtn")}</span>
                                                </motion.a>
                                            </motion.div>
                                        )
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}