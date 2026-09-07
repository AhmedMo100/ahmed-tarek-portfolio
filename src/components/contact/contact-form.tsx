"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendContactMessage, ContactFormData } from "@/services/messages";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
    Send,
    CheckCircle2,
    AlertCircle,
    Loader2,
    User,
    Mail,
    MessageSquare,
} from "lucide-react";
import { SectionDivider } from "../shared/section-divider";

export function ContactForm() {
    const t = useTranslations("ContactPage");
    const [status, setStatus] = useState<
        "idle" | "sending" | "success" | "error"
    >("idle");

    const { register, handleSubmit, reset } =
        useForm<ContactFormData>();

    const onSubmit = async (data: ContactFormData) => {
        setStatus("sending");

        try {
            // Saving to the database is the source of truth for success.
            const dbResult = await sendContactMessage(data);

            if (!dbResult.success) {
                setStatus("error");
                return;
            }

            setStatus("success");
            reset();

            // Best-effort email notification. A failure here should never
            // block the success state, since the message is already saved.
            fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).catch(() => {
                // Intentionally silent: db write already succeeded.
            });
        } catch {
            setStatus("error");
        }
    };

    const fieldVariants: Variants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: "easeInOut" },
        },
    };

    return (
        <section
            id="contact-form-section"
            className="relative overflow-hidden px-4 py-16 md:py-20 lg:py-24"
        >
            {/* Soft background glow */}
            <div
                aria-hidden="true"
                className="absolute left-[10%] top-[20%] -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="absolute right-[5%] bottom-[10%] -z-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
            />

            <div className="container relative z-10 mx-auto max-w-2xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10 space-y-3 text-center"
                >
                    <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
                        {t("form.heading")}
                    </h2>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 72 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="mx-auto h-px bg-linear-to-r from-primary to-primary/10"
                    />

                    <p className="mx-auto max-w-lg text-sm leading-7 text-muted-foreground md:text-base">
                        {t("form.subheading")}
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-6 shadow-2xl shadow-black/5 backdrop-blur-xl md:p-10 dark:shadow-black/20"
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent"
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.08 }}
                        className="space-y-5"
                    >
                        {/* Name */}
                        <motion.div variants={fieldVariants} className="relative">
                            <User
                                className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-300"
                                size={18}
                            />
                            <input
                                {...register("name", { required: true })}
                                required
                                minLength={2}
                                placeholder={t("form.placeholderName")}
                                className="peer w-full rounded-xl border border-border bg-background/70 py-3.5 pe-4 ps-11 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/60 hover:border-primary/30 focus:border-primary/60 focus:bg-background focus:ring-4 focus:ring-primary/5"
                            />
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={fieldVariants} className="relative">
                            <Mail
                                className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-300"
                                size={18}
                            />
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                required
                                placeholder={t("form.placeholderEmail")}
                                className="peer w-full rounded-xl border border-border bg-background/70 py-3.5 pe-4 ps-11 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/60 hover:border-primary/30 focus:border-primary/60 focus:bg-background focus:ring-4 focus:ring-primary/5"
                            />
                        </motion.div>

                        {/* Message */}
                        <motion.div variants={fieldVariants} className="relative">
                            <MessageSquare
                                className="pointer-events-none absolute start-3.5 top-4 text-muted-foreground"
                                size={18}
                            />
                            <textarea
                                {...register("message", { required: true })}
                                required
                                minLength={10}
                                placeholder={t("form.placeholderMessage")}
                                rows={5}
                                className="w-full resize-none rounded-xl border border-border bg-background/70 py-3.5 pe-4 ps-11 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/60 hover:border-primary/30 focus:border-primary/60 focus:bg-background focus:ring-4 focus:ring-primary/5"
                            />
                        </motion.div>

                        {/* Submit */}
                        <motion.button
                            variants={fieldVariants}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.985 }}
                            disabled={status === "sending"}
                            type="submit"
                            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/15 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {status === "sending" ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    <span>{t("form.sending")}</span>
                                </>
                            ) : (
                                <>
                                    <span>{t("form.submit")}</span>
                                    <Send
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </>
                            )}
                        </motion.button>

                        {/* Status */}
                        <AnimatePresence mode="wait">
                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center justify-center gap-1 pt-1 text-center"
                                >
                                    <div className="flex items-center gap-2 text-sm text-emerald-500">
                                        <CheckCircle2 size={18} />
                                        <p>{t("form.success")}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {t("footer.description")}
                                    </p>
                                </motion.div>
                            )}

                            {status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center justify-center gap-2 pt-1 text-sm text-destructive"
                                >
                                    <AlertCircle size={18} />
                                    <p>{t("form.error")}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.form>

                <SectionDivider className="mt-36" />
            </div>
        </section>
    );
}