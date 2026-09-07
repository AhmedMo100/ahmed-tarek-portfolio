"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

interface MobileNavbarProps {
    cvUrl?: string | null;
}

export function MobileNavbar({ cvUrl }: MobileNavbarProps) {
    const [open, setOpen] = useState(false);

    const t = useTranslations("Navigation");

    const closeMenu = () => setOpen(false);

    return (
        <div className="sm:hidden">
            {/* Mobile Controls */}
            <div className="flex items-center gap-2">
                <LanguageSwitcher />

                <ThemeToggle />

                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted"
                >
                    {open ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`absolute left-0 top-full w-full border-b border-border bg-background/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-out ${
                    open
                        ? "translate-y-0 opacity-100 visible"
                        : "-translate-y-3 opacity-0 invisible pointer-events-none"
                }`}
            >
                <nav className="container mx-auto max-w-4xl px-4 py-5">
                    <div
                        className={`flex flex-col gap-1 transition-all duration-300 ${
                            open
                                ? "translate-y-0 opacity-100"
                                : "-translate-y-2 opacity-0"
                        }`}
                    >
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            {t("home")}
                        </Link>

                        <Link
                            href="/about"
                            onClick={closeMenu}
                            className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            {t("about")}
                        </Link>

                        <Link
                            href="/projects"
                            onClick={closeMenu}
                            className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            {t("projects")}
                        </Link>

                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            {t("contact")}
                        </Link>

                        {cvUrl && (
                            <a
                                href={cvUrl}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMenu}
                                className="mt-3 inline-flex items-center justify-center rounded-lg bg-foreground px-4 py-3 text-sm font-semibold text-background transition-all hover:scale-[1.01] hover:opacity-90 active:scale-[0.99]"
                            >
                                {t("cv")}
                            </a>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}
