import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { SocialDock } from "@/components/contact/social-dock";
import { ContactFooter } from "@/components/contact/contact-footer";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background">
            <ContactHero />
            <div className="container mx-auto px-4">
                <ContactForm />
                <SocialDock />
                <ContactFooter />
            </div>
        </main>
    );
}