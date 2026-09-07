/**
 * @file navbar.tsx
 * @package src/components/shared
 * @preview Global navigation header bar. Dynamically translates route anchors
 * and encapsulates layout management utilities (Theme & Language).
 */

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { ProjectsDropdown } from "./projects-dropdown";
import { CVButton } from "./cv-button";
import { MobileNavbar } from "./mobile-navbar";
import { getProfile } from "@/services/profile";
import { ProjectsService } from "@/services/projects";

import Logo from "../../../public/Logo.png";

export async function Navbar() {
    const locale = await getLocale();
    const t = await getTranslations("Navigation");

    const profile = await getProfile();

    const projects = (
        await ProjectsService.getNavbarProjects(locale)
    ).slice(0, 6);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md py-3">
            <div className="container mx-auto max-w-4xl h-16 flex items-center justify-between px-4">

                {/* Logo */}
                <Link
                    href="/"
                    className="transition-opacity hover:opacity-80"
                >
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={120}
                        height={120}
                        priority
                    />
                </Link>

                <div className="flex items-center gap-6">

                    {/* Desktop Navigation */}
                    <nav className="hidden sm:flex items-center gap-4 text-sm font-medium">

                        <Link
                            href="/"
                            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                            {t("home")}
                        </Link>

                        <Link
                            href="/about"
                            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                            {t("about")}
                        </Link>

                        <ProjectsDropdown
                            locale={locale}
                            projects={projects}
                            labels={{
                                projects: t("projects"),
                                projectsDescription: t("projectsDescription"),
                                viewAllProjects: t("viewAllProjects"),
                            }}
                        />

                        <Link
                            href="/contact"
                            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                            {t("contact")}
                        </Link>

                    </nav>

                    <div className="hidden sm:block h-4 w-px bg-border" />

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:flex items-center gap-2">
                            <LanguageSwitcher />
                            <ThemeToggle />
                            <CVButton />
                        </div>

                        <MobileNavbar cvUrl={profile?.cvUrl} />
                    </div>

                </div>
            </div>
        </header>
    );
}