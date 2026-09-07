This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

















/**
 * @file seed.ts
 * @preview Pre-populates the Neon PostgreSQL database with deep, diverse, production-grade mock data.
 * Houses 3 distinct records per applicable model to thoroughly test frontend pagination, filtering, and component states.
 */

import prisma from '../src/lib/prisma';
import { SkillCategory, CommentStatus, MessageStatus } from '@/generated/prisma/client';
import dotenv from 'dotenv';

// Inject environment runtime configurations securely
dotenv.config();

/**
 * Main seeding execution lifecycle logic orchestration.
 * 
 * @async
 * @function main
 * @returns {Promise<void>} Resolves upon successful completion of the cascading database seed setup.
 */
async function main() {
    console.log('🚀 Executing highly optimized, comprehensive database seed cycle...');

    // ----------------------------------------------------------------------------------
    // 1. CLEAN RESET (Cascading truncation to maintain state purity)
    // ----------------------------------------------------------------------------------
    console.log('🧹 Purging any existing transactional portfolio records...');
    await prisma.message.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.projectImage.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.service.deleteMany({});
    await prisma.experience.deleteMany({});
    await prisma.skill.deleteMany({});
    await prisma.profile.deleteMany({});

    // ----------------------------------------------------------------------------------
    // 2. SEED PROFILE DATA (Strict Single-Row Enforcement)
    // ----------------------------------------------------------------------------------
    console.log('👤 Synchronizing base profile meta (Single Row)...');
    await prisma.profile.create({
        data: {
            bio: "Frontend-focused Full-Stack Engineer crafting responsive interfaces with React, Next.js, and scaling backends with robust database architectures.",
            aboutText: "I am Ahmed Tarek, a passionate software engineer based in Egypt. I specialize in optimizing client experiences, implementing highly robust monorepo structures using Turborepo, maintaining strict adherence to Clean Code patterns, and designing highly flexible schema layouts that power real-time component states.",
            cvUrl: "https://res.cloudinary.com/demo/image/upload/v1/cv/ahmed-tarek-resume.pdf",
            cvDownloads: 147,
        },
    });

    // ----------------------------------------------------------------------------------
    // 3. SEED SKILLS REGISTRY (3 Per Category = 9 Records total)
    // ----------------------------------------------------------------------------------
    console.log('🛠️ Registering 9 technical stack credentials across categorized layers...');
    await prisma.skill.createMany({
        data: [
            // Frontend Layer
            { name: 'Next.js', category: SkillCategory.FRONTEND, icon: 'NextIcon' },
            { name: 'TypeScript', category: SkillCategory.FRONTEND, icon: 'TypeScriptIcon' },
            { name: 'Tailwind CSS', category: SkillCategory.FRONTEND, icon: 'TailwindIcon' },
            // Backend Layer
            { name: 'Node.js', category: SkillCategory.BACKEND, icon: 'NodeIcon' },
            { name: 'Prisma ORM', category: SkillCategory.BACKEND, icon: 'PrismaIcon' },
            { name: 'PostgreSQL', category: SkillCategory.BACKEND, icon: 'PostgresIcon' },
            // Tools & Automation Layer
            { name: 'Turborepo', category: SkillCategory.TOOLS, icon: 'TerminalIcon' },
            { name: 'n8n / Make', category: SkillCategory.TOOLS, icon: 'CpuIcon' },
            { name: 'Git & GitHub', category: SkillCategory.TOOLS, icon: 'GitIcon' },
        ],
    });

    // ----------------------------------------------------------------------------------
    // 4. SEED PROFESSIONAL EXPERIENCES (3 Records)
    // ----------------------------------------------------------------------------------
    console.log('💼 Writing 3 historical corporate tenure and internship timelines...');
    await prisma.experience.createMany({
        data: [
            {
                company: "Zikola Lab",
                role: "Full Stack Development Intern",
                duration: "3 Months (Spring 2026)",
                description: "Architected a centralized engineering monorepo containing interconnected clinic dashboards. Streamlined package workflows with pnpm workspaces and decoupled UI layouts via Radix primitive layers.",
                startDate: new Date('2026-03-01'),
                endDate: new Date('2026-05-31'),
            },
            {
                company: "Glow Medical Hub",
                role: "Freelance Solutions Engineer",
                duration: "2 Months (Early 2026)",
                description: "Implemented a customer engagement portal with localized WhatsApp message triggers, robust webhook delivery modules, and specialized forms validated fully through secure Zod chains.",
                startDate: new Date('2026-01-10'),
                endDate: new Date('2026-02-28'),
            },
            {
                company: "Open Source Ecosystems",
                role: "Frontend Contributor",
                duration: "6 Months (2025)",
                description: "Refactored UI primitives using Tailwind CSS and Class Variance Authority (CVA) to design modular, heavily reusable typography hierarchies following modern accessible standards.",
                startDate: new Date('2025-07-01'),
                endDate: new Date('2025-12-30'),
            },
        ],
    });

    // ----------------------------------------------------------------------------------
    // 5. SEED FREELANCE SERVICES (3 Records)
    // ----------------------------------------------------------------------------------
    console.log('⚡ Seeding 3 business deliverance freelance models...');
    await prisma.service.createMany({
        data: [
            {
                title: "Full-Stack Web Architectures",
                description: "Production-ready solutions backed by high-performance Next.js architectures, secure route handlers, and type-safe data pipelines.",
                icon: "Layers"
            },
            {
                title: "Workflow Automation Engineering",
                description: "Connecting disparate third-party communication paths, WhatsApp APIs, and data layers via customized n8n pipelines.",
                icon: "Cpu"
            },
            {
                title: "UI/UX Engineering & Monorepos",
                description: "Consolidating software assets into fast, deterministic Turborepo workspaces using clean styling frameworks.",
                icon: "Layout"
            },
        ],
    });

    // ----------------------------------------------------------------------------------
    // 6. SEED PROJECTS, CAROUSEL IMAGES, AND CLIENT COMMENTS (3 Complete Projects)
    // ----------------------------------------------------------------------------------
    console.log('🚀 Instantiating 3 comprehensive operational application records with relational nodes...');

    // Project 1: DentalOps
    await prisma.project.create({
        data: {
            title: "DentalOps Enterprise Monorepo",
            slug: "dental-ops-platform",
            description: "An enterprise-grade clinic ecosystem running synchronous multi-dashboard architectures.",
            content: "## System Overview\nAdvanced scalable workspace managing dental clinics dynamically via isolated workspace packages.\n\n### Core Wins\n* Shared internal strict TypeScript layouts.\n* Deterministic pnpm setup optimizing global module caching.",
            coverImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800",
            liveUrl: "https://dentalops.demo.dev",
            githubFront: "https://github.com/ahmedtarek/dentalops-workspace",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Turborepo"],
            featured: true,
            views: 342,
            likes: 89,
            images: {
                create: [
                    { url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800", altText: "Clinical Workspace Admin Screen" },
                    { url: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800", altText: "Hardware Showroom Mapping Interface" }
                ]
            },
            comments: {
                create: [
                    { authorName: "Omar Bradley", content: "Exceptionally clean monorepo organization! A masterclass in architecture.", status: CommentStatus.APPROVED },
                    { authorName: "Sarah Jenkins", content: "The data isolation between the clinic and showroom dashboards is top-notch.", status: CommentStatus.APPROVED }
                ]
            }
        }
    });

    // Project 2: Glow Medical Hub
    await prisma.project.create({
        data: {
            title: "Glow Medical Web Ecosystem",
            slug: "glow-medical-hub",
            description: "Patient engagement portal integrated with automated asynchronous webhook messaging streams.",
            content: "## Webhook Telemetry\nGlow Medical synchronizes critical client inquiries straight into responsive records without user downtime.\n\n### Advanced Features\n* Custom WhatsApp modules implementing programmatic automated triggers.\n* Schema parsing layers blocking malicious injection scripts.",
            coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
            githubBack: "https://github.com/ahmedtarek/glow-medical-core",
            technologies: ["React", "Next.js", "Tailwind CSS", "Zod", "WhatsApp API"],
            featured: true,
            views: 215,
            likes: 64,
            images: {
                create: [
                    { url: "https://images.unsplash.com/photo-1504813184591-01552ff317aa?w=800", altText: "Patient Communication Telemetry View" }
                ]
            },
            comments: {
                create: [
                    { authorName: "Tarek Mansour", content: "Did you rely on standard event loops to trigger the instant WhatsApp webhooks?", status: CommentStatus.APPROVED }
                ]
            }
        }
    });

    // Project 3: Automated Workflow Pipelines
    await prisma.project.create({
        data: {
            title: "Automated Enterprise Sync Tool",
            slug: "automated-sync-tool",
            description: "SaaS automation pipeline keeping corporate platforms and communication channels perfectly mapped in real-time.",
            content: "## Automation Pipeline Analysis\nThis micro-tool resolves integration gaps using secure webhook delivery methods.\n\n### Mechanics\n* Dynamic nodes processing incoming JSON payloads on the fly.\n* Instant error monitoring alerts channeled straight to secure engineering backends.",
            coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
            liveUrl: "https://automation.demo.dev",
            technologies: ["Node.js", "n8n", "Webhooks", "JSON Parser"],
            featured: false,
            views: 94,
            likes: 22,
            images: {
                create: [
                    { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", altText: "Complex Workflow Node Interface Map" }
                ]
            },
            comments: {
                create: [
                    { authorName: "Alex Rivera", content: "This cut down our manual entry overhead significantly. Awesome automation deployment!", status: CommentStatus.APPROVED }
                ]
            }
        }
    });

    // ----------------------------------------------------------------------------------
    // 7. SEED FORMS / MESSAGES (3 Records)
    // ----------------------------------------------------------------------------------
    console.log('📬 Seeding 3 structured client contact communications...');
    await prisma.message.createMany({
        data: [
            {
                name: "Johnathan Doe",
                email: "johndoe@enterprise.io",
                subject: "Freelance Integration Project Inquiry",
                message: "Hey Ahmed, we checked out your custom monorepo projects and your automation setups with n8n. We would love to contract you to synchronize our custom CRM data into a centralized dashboard environment next month.",
                status: MessageStatus.UNREAD,
            },
            {
                name: "Mostafa Mahmoud",
                email: "mostafa.m@techagency.eg",
                subject: "Full-Time Frontend Role Opportunity",
                message: "Hello Ahmed, your clean code structure using Class Variance Authority caught our attention. We have an active opening for a Next.js engineer in Cairo. Let us know your availability for a call.",
                status: MessageStatus.UNREAD,
            },
            {
                name: "Emily Watson",
                email: "emily@saasgrowth.com",
                subject: "Consultation Request for Monorepos",
                message: "We need an expert to transition our separate React codebases into a clean Turborepo setup. Your portfolio layout aligns perfectly with what we are trying to build.",
                status: MessageStatus.READ,
            }
        ]
    });

    console.log('✅ Base seeding runtime sequence finished successfully. Neon Database fully hydrated.');
}

// Execute the seeding runtime routing sequence
main()
    .catch((error) => {
        console.error('❌ An unhandled transaction breakdown occurred during database seeding operations:', error);
        process.exit(1);
    })
    .finally(async () => {
        // Gracefully disconnect using the centralized global client instance
        await prisma.$disconnect();
    });