/**
 * @file seed.ts
 * @description Development database seed.
 */

import prisma from "../src/lib/prisma";
import dotenv from "dotenv";
import { randomUUID } from "node:crypto";

dotenv.config();

async function main() {
    console.log("🚀 Initiating database hydration sequence...");

    /**
     * Clean Database
     */
    await prisma.projectImage.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.projectLike.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.skill.deleteMany({});
    await prisma.milestone.deleteMany({});
    await prisma.qualityStandard.deleteMany({});
    await prisma.service.deleteMany({});
    await prisma.experience.deleteMany({});
    await prisma.profile.deleteMany({});

    console.log("✅ Database cleaned.");

    /**
     * Seed Categories
     */
    await prisma.category.createMany({
        data: [
            {
                slug: "featured",
                nameEn: "Featured",
                nameAr: "مميز",
            },
            {
                slug: "frontend",
                nameEn: "Frontend",
                nameAr: "واجهات أمامية",
            },
            {
                slug: "backend",
                nameEn: "Backend",
                nameAr: "خلفية",
            },
            {
                slug: "full-stack",
                nameEn: "Full Stack",
                nameAr: "فول ستاك",
            },
            {
                slug: "saas",
                nameEn: "SaaS",
                nameAr: "SaaS",
            },
        ],
    });

    console.log("✅ Categories Seeded.");

    /**
     * Seed Profile
     */
    await prisma.profile.create({
        data: {
            bioEn:
                "Frontend & Full-Stack Engineer focused on building modern, scalable, and user-centered web applications with React, Next.js, TypeScript, and Node.js. I care about clean architecture, maintainable code, performance, and polished user experiences.",

            bioAr:
                "مهندس واجهات أمامية وفول ستاك، متخصص في بناء تطبيقات ويب حديثة وقابلة للتوسع تركز على المستخدم، باستخدام React وNext.js وTypeScript وNode.js. أهتم بالمعمارية النظيفة، وقابلية صيانة الكود، والأداء، وتجربة المستخدم المتكاملة.",

            aboutTextEn:
                "I'm Ahmed Tarek, a Computer Science graduate and Frontend & Full-Stack Engineer passionate about turning ideas into well-structured, reliable, and engaging digital products. My work combines strong frontend development with backend knowledge and an eye for UI/UX, allowing me to approach products from both the user and engineering perspectives. I continuously learn, improve my technical skills, and focus on writing clean, scalable code that solves real problems.",

            aboutTextAr:
                "أنا أحمد طارق، خريج علوم الحاسب ومهندس Frontend وFull-Stack شغوف بتحويل الأفكار إلى منتجات رقمية منظمة وموثوقة وذات تجربة استخدام مميزة. أجمع بين خبرة قوية في تطوير الواجهات الأمامية ومعرفة جيدة بتطوير الـBackend واهتمام بتصميم وتجربة المستخدم، مما يساعدني على النظر إلى المنتج من الناحيتين التقنية والعملية. أحرص باستمرار على تطوير مهاراتي التقنية وكتابة كود نظيف وقابل للتوسع يساهم في حل مشكلات حقيقية.",

            // NOTE: source value had a stray leading "Y" before "https" —
            // removed here since it would otherwise break the URL.
            cvUrl:
                "https://drive.google.com/file/d/1BbG7ktbRiZJNNP308P7pF6z5doMNj2K6/view",

            cvDownloads: 0,
        },
    });

    console.log("✅ Profile Seeded.");

    /**
     * Seed Skills
     *
     * Curated to exactly 3 entries per category (FRONTEND | BACKEND | TOOLS)
     * per request, with "AI Agents" and "Automation" added under TOOLS.
     */
    await prisma.skill.createMany({
        data: [
            // ================================
            // FRONTEND
            // ================================
            {
                nameEn: "React",
                nameAr: "رياكت",
                descriptionEn:
                    "Building dynamic, reusable, and scalable user interfaces using component-based architecture.",
                descriptionAr:
                    "بناء واجهات مستخدم ديناميكية وقابلة لإعادة الاستخدام والتوسع باستخدام المعمارية المعتمدة على المكونات.",
                category: "FRONTEND",
                icon: "Atom",
            },
            {
                nameEn: "Next.js",
                nameAr: "نكست جي إس",
                descriptionEn:
                    "Building modern full-stack web applications with server-side rendering, routing, and optimized performance.",
                descriptionAr:
                    "بناء تطبيقات ويب حديثة باستخدام الرندر من جهة الخادم، ونظام التوجيه، وتحسين الأداء.",
                category: "FRONTEND",
                icon: "Triangle",
            },
            {
                nameEn: "TypeScript",
                nameAr: "تايب سكريبت",
                descriptionEn:
                    "Writing safer and more maintainable applications with strong typing and modern JavaScript features.",
                descriptionAr:
                    "كتابة تطبيقات أكثر أمانًا وقابلية للصيانة باستخدام الأنواع القوية وميزات JavaScript الحديثة.",
                category: "FRONTEND",
                icon: "Code2",
            },

            // ================================
            // BACKEND
            // ================================
            {
                nameEn: "Node.js",
                nameAr: "نود جي إس",
                descriptionEn:
                    "Building server-side applications and backend services using JavaScript and TypeScript.",
                descriptionAr:
                    "بناء تطبيقات وخدمات Backend باستخدام JavaScript وTypeScript.",
                category: "BACKEND",
                icon: "Server",
            },
            {
                nameEn: "PostgreSQL",
                nameAr: "بوستجري إس كيو إل",
                descriptionEn:
                    "Working with relational databases and structured data using PostgreSQL.",
                descriptionAr:
                    "التعامل مع قواعد البيانات العلائقية والبيانات المنظمة باستخدام PostgreSQL.",
                category: "BACKEND",
                icon: "Database",
            },
            {
                nameEn: "Prisma",
                nameAr: "بريزما",
                descriptionEn:
                    "Managing database access with type-safe queries and modern ORM workflows.",
                descriptionAr:
                    "إدارة الوصول إلى قواعد البيانات باستخدام استعلامات آمنة من ناحية الأنواع وORM حديث.",
                category: "BACKEND",
                icon: "Boxes",
            },

            // ================================
            // TOOLS
            // ================================
            {
                nameEn: "AI Agents",
                nameAr: "وكلاء الذكاء الاصطناعي",
                descriptionEn:
                    "Designing and integrating AI-powered agents and LLM-driven workflows to automate tasks and enhance application intelligence.",
                descriptionAr:
                    "تصميم ودمج وكلاء ذكاء اصطناعي وسير عمل يعتمد على نماذج اللغة الكبيرة لأتمتة المهام وتعزيز ذكاء التطبيقات.",
                category: "TOOLS",
                icon: "Bot",
            },
            {
                nameEn: "Automation",
                nameAr: "الأتمتة",
                descriptionEn:
                    "Automating repetitive development and operational tasks to improve efficiency, consistency, and delivery speed.",
                descriptionAr:
                    "أتمتة المهام التطويرية والتشغيلية المتكررة لتحسين الكفاءة والاتساق وسرعة التسليم.",
                category: "TOOLS",
                icon: "Workflow",
            },
            {
                nameEn: "Git & GitHub",
                nameAr: "جيت وجيت هاب",
                descriptionEn:
                    "Managing source code, version control, and collaborative development workflows.",
                descriptionAr:
                    "إدارة الكود والتحكم في الإصدارات وسير العمل التعاوني باستخدام Git وGitHub.",
                category: "TOOLS",
                icon: "GitBranch",
            },
        ],
    });

    console.log("✅ Skills Seeded.");

    /**
     * Seed Experience
     */
    await prisma.experience.createMany({
        data: [
            // ================================
            // ZIKOLA
            // ================================
            {
                companyEn: "Zikola",
                companyAr: "زيكولا",
                roleEn: "Frontend Developer Intern",
                roleAr: "متدرب تطوير واجهات أمامية",
                durationEn: "2 Months",
                durationAr: "شهران",
                descriptionEn:
                    "Completed an intensive Frontend Development internship focused on building modern web applications using React, Next.js, TypeScript, and modern development practices. Worked on real-world development tasks, including responsive user interfaces, reusable components, application states, dynamic routing, and integration with backend services and APIs. Also gained practical exposure to debugging, code organization, and collaborative development workflows.",
                descriptionAr:
                    "أكملت تدريبًا مكثفًا في تطوير الواجهات الأمامية، ركز على بناء تطبيقات ويب حديثة باستخدام React وNext.js وTypeScript وأفضل ممارسات التطوير الحديثة. عملت على مهام عملية شملت بناء واجهات متجاوبة، وإنشاء مكونات قابلة لإعادة الاستخدام، والتعامل مع حالات التطبيق المختلفة، والمسارات الديناميكية، والتكامل مع خدمات الـBackend وواجهات API. كما اكتسبت خبرة عملية في حل المشكلات وتنظيم الكود وسير العمل في بيئة تطوير تعاونية.",
                startDate: new Date("2026-01-01"),
                endDate: new Date("2026-03-01"),
            },

            // ================================
            // FREELANCE DEVELOPMENT
            // ================================
            {
                companyEn: "Freelance",
                companyAr: "عمل حر",
                roleEn: "Frontend & Full-Stack Developer",
                roleAr: "مطور واجهات أمامية وفول ستاك",
                durationEn: "Freelance",
                durationAr: "عمل حر",
                descriptionEn:
                    "Worked independently on web development projects, building responsive and user-focused interfaces and developing complete web applications. Applied frontend technologies alongside backend and database fundamentals to transform project requirements into functional digital solutions. Focused on clean implementation, maintainable code, performance, and practical user experience.",
                descriptionAr:
                    "عملت بشكل مستقل على مشاريع لتطوير الويب، شملت بناء واجهات متجاوبة تركز على المستخدم وتطوير تطبيقات ويب متكاملة. استخدمت تقنيات الواجهات الأمامية إلى جانب أساسيات الـBackend وقواعد البيانات لتحويل متطلبات المشاريع إلى حلول رقمية عملية. ركزت على جودة التنفيذ، وتنظيم الكود، وقابلية الصيانة، والأداء، وتجربة المستخدم.",
                startDate: new Date("2024-01-01"),
                endDate: null,
            },

            // ================================
            // DIGITAL MARKETING
            // ================================
            {
                companyEn: "Freelance",
                companyAr: "عمل حر",
                roleEn: "Digital Marketing Specialist",
                roleAr: "مسوق إلكتروني",
                durationEn: "Freelance",
                durationAr: "عمل حر",
                descriptionEn:
                    "Worked on digital marketing for digital products, supporting product positioning, promotional content, audience targeting, and online marketing activities. Developed practical experience in understanding customer needs, presenting product value clearly, and creating marketing approaches focused on engagement and conversion.",
                descriptionAr:
                    "عملت في مجال التسويق الإلكتروني للمنتجات الرقمية، وشمل ذلك المساهمة في تحديد طريقة عرض المنتجات، وإعداد المحتوى الترويجي، وفهم الجمهور المستهدف، وتنفيذ أنشطة التسويق الرقمي. ساعدتني هذه التجربة على اكتساب فهم عملي لاحتياجات العملاء، وطريقة تقديم قيمة المنتج بشكل واضح، وبناء أساليب تسويقية تركز على التفاعل والتحويل.",
                startDate: new Date("2023-01-01"),
                endDate: null,
            },

            // ================================
            // GRAPHIC DESIGN
            // ================================
            {
                companyEn: "Freelance",
                companyAr: "عمل حر",
                roleEn: "Graphic Designer",
                roleAr: "مصمم جرافيك",
                durationEn: "Freelance",
                durationAr: "عمل حر",
                descriptionEn:
                    "Worked independently on visual design projects, creating digital graphics and marketing materials for different needs. Developed an understanding of visual hierarchy, composition, branding consistency, and communicating ideas visually, which later contributed to a stronger perspective on UI and user experience.",
                descriptionAr:
                    "عملت بشكل مستقل على مشاريع تصميم بصري، شملت إنشاء تصميمات رقمية ومواد تسويقية لاحتياجات مختلفة. ساعدتني هذه التجربة على تطوير فهم للتسلسل البصري، وتوزيع العناصر، واتساق الهوية البصرية، والتواصل البصري، وهو ما انعكس لاحقًا بشكل إيجابي على فهمي لتصميم واجهات وتجربة المستخدم.",
                startDate: new Date("2022-01-01"),
                endDate: null,
            },
        ],
    });

    console.log("✅ Experience Seeded.");

    /**
     * Seed Services
     */
    await prisma.service.createMany({
        data: [
            // ================================
            // FRONTEND DEVELOPMENT
            // ================================
            {
                titleEn: "Frontend Development",
                titleAr: "تطوير الواجهات الأمامية",
                descriptionEn:
                    "Building modern, responsive, and high-performance user interfaces using React, Next.js, TypeScript, and modern frontend practices.",
                descriptionAr:
                    "بناء واجهات مستخدم حديثة ومتجاوبة وعالية الأداء باستخدام React وNext.js وTypeScript وأفضل ممارسات تطوير الواجهات الأمامية.",
                icon: "MonitorCode",
            },

            // ================================
            // FULL-STACK DEVELOPMENT
            // ================================
            {
                titleEn: "Full-Stack Web Development",
                titleAr: "تطوير تطبيقات ويب متكاملة",
                descriptionEn:
                    "Building complete web applications from user interfaces to backend services, APIs, databases, and application workflows.",
                descriptionAr:
                    "تطوير تطبيقات ويب متكاملة بدءًا من واجهات المستخدم وصولًا إلى خدمات الـBackend وواجهات API وقواعد البيانات وسير عمل التطبيق.",
                icon: "Layers3",
            },

            // ================================
            // SAAS PRODUCTS
            // ================================
            {
                titleEn: "SaaS Product Development",
                titleAr: "تطوير منتجات SaaS",
                descriptionEn:
                    "Designing and developing scalable SaaS products with modern dashboards, user management, database-driven workflows, and reusable application architecture.",
                descriptionAr:
                    "تصميم وتطوير منتجات SaaS قابلة للتوسع، تشمل لوحات تحكم حديثة وإدارة المستخدمين وسير عمل يعتمد على قواعد البيانات وبنية تطبيق قابلة لإعادة الاستخدام.",
                icon: "CloudCog",
            },

            // ================================
            // AI AGENTS & AUTOMATION
            // ================================
            {
                titleEn: "AI Agents & Automation",
                titleAr: "وكلاء الذكاء الاصطناعي والأتمتة",
                descriptionEn:
                    "Building AI-powered agents and automated workflows that reduce repetitive work, connect systems, and improve operational efficiency.",
                descriptionAr:
                    "بناء وكلاء مدعومين بالذكاء الاصطناعي وسير عمل آلي لتقليل المهام المتكررة وربط الأنظمة وتحسين كفاءة العمليات.",
                icon: "Bot",
            },

            // ================================
            // UI/UX IMPLEMENTATION
            // ================================
            {
                titleEn: "UI/UX Implementation",
                titleAr: "تنفيذ واجهات وتجربة المستخدم",
                descriptionEn:
                    "Transforming product ideas and interface designs into polished, responsive, and user-focused digital experiences.",
                descriptionAr:
                    "تحويل أفكار المنتجات وتصميمات الواجهات إلى تجارب رقمية احترافية ومتجاوبة تركز على المستخدم.",
                icon: "PanelsTopLeft",
            },

            // ================================
            // BACKEND & API DEVELOPMENT
            // ================================
            {
                titleEn: "Backend & API Development",
                titleAr: "تطوير الـBackend وواجهات API",
                descriptionEn:
                    "Developing structured backend services, REST APIs, database integrations, and application logic for modern web products.",
                descriptionAr:
                    "تطوير خدمات Backend منظمة وواجهات REST API وربط قواعد البيانات ومنطق التطبيقات للمنتجات الرقمية الحديثة.",
                icon: "ServerCog",
            },
        ],
    });

    console.log("✅ Services Seeded.");

    /**
     * Seed Quality Standards
     */
    await prisma.qualityStandard.createMany({
        data: [
            // ================================
            // CLEAN CODE
            // ================================
            {
                titleEn: "Clean & Maintainable Code",
                titleAr: "كود نظيف وقابل للصيانة",
                descriptionEn:
                    "Writing clear, well-structured, and maintainable code that is easy to understand, extend, and improve over time.",
                descriptionAr:
                    "كتابة كود واضح ومنظم وقابل للصيانة، يسهل فهمه وتطويره وتحسينه مع مرور الوقت.",
                icon: "Code2",
            },

            // ================================
            // SCALABLE ARCHITECTURE
            // ================================
            {
                titleEn: "Scalable Architecture",
                titleAr: "بنية قابلة للتوسع",
                descriptionEn:
                    "Designing applications with modular structures and reusable patterns that can grow alongside product requirements.",
                descriptionAr:
                    "تصميم التطبيقات ببنية منظمة وقابلة للتوسع تعتمد على وحدات وأنماط قابلة لإعادة الاستخدام مع نمو متطلبات المنتج.",
                icon: "Blocks",
            },

            // ================================
            // PERFORMANCE & RELIABILITY
            // ================================
            {
                titleEn: "Performance & Reliability",
                titleAr: "الأداء والاعتمادية",
                descriptionEn:
                    "Focusing on responsive performance, predictable behavior, and reliable application experiences across different use cases.",
                descriptionAr:
                    "التركيز على الأداء السريع والسلوك المتوقع وتجربة تطبيق موثوقة في مختلف حالات الاستخدام.",
                icon: "Gauge",
            },

            // ================================
            // USER-CENTERED QUALITY
            // ================================
            {
                titleEn: "User-Centered Quality",
                titleAr: "الجودة التي تركز على المستخدم",
                descriptionEn:
                    "Building intuitive and polished experiences by considering usability, accessibility, and real user needs throughout development.",
                descriptionAr:
                    "بناء تجارب سهلة واحترافية من خلال مراعاة سهولة الاستخدام وإمكانية الوصول واحتياجات المستخدم الفعلية أثناء التطوير.",
                icon: "HeartHandshake",
            },
        ],
    });

    console.log("✅ Quality Standards Seeded.");

    /**
     * Seed Milestones
     */
    await prisma.milestone.createMany({
        data: [
            // ================================
            // THE BEGINNING
            // ================================
            {
                titleEn: "The Beginning",
                titleAr: "البداية",
                descriptionEn:
                    "My journey started with a curiosity about technology and digital products, gradually developing into a serious interest in how software is designed, built, and used.",
                descriptionAr:
                    "بدأت رحلتي بشغف وفضول تجاه التكنولوجيا والمنتجات الرقمية، وتطور هذا الاهتمام تدريجيًا إلى رغبة حقيقية في فهم كيفية تصميم البرمجيات وبنائها واستخدامها.",
                year: "2021",
                order: 1,
            },

            // ================================
            // CREATIVE FOUNDATION
            // ================================
            {
                titleEn: "Creative Foundation",
                titleAr: "بناء الأساس الإبداعي",
                descriptionEn:
                    "I explored graphic design and digital marketing through freelance work, gaining practical experience in visual communication, branding, audience understanding, and presenting ideas effectively.",
                descriptionAr:
                    "استكشفت مجال التصميم الجرافيكي والتسويق الرقمي من خلال العمل الحر، مما منحني خبرة عملية في التواصل البصري، وفهم الجمهور، وبناء الهوية، وتقديم الأفكار بشكل مؤثر.",
                year: "2022",
                order: 2,
            },

            // ================================
            // ENTERING SOFTWARE DEVELOPMENT
            // ================================
            {
                titleEn: "Entering Software Development",
                titleAr: "دخول عالم تطوير البرمجيات",
                descriptionEn:
                    "I shifted my primary focus toward software development, building a strong foundation in frontend engineering while expanding my knowledge of backend systems, databases, and modern web architecture.",
                descriptionAr:
                    "بدأت التركيز بشكل أساسي على تطوير البرمجيات، وبنيت أساسًا قويًا في تطوير الواجهات الأمامية مع توسيع معرفتي بأنظمة الـBackend وقواعد البيانات وبنية تطبيقات الويب الحديثة.",
                year: "2023",
                order: 3,
            },

            // ================================
            // REAL-WORLD DEVELOPMENT
            // ================================
            {
                titleEn: "Real-World Development",
                titleAr: "التطوير في بيئة عملية",
                descriptionEn:
                    "Through freelance projects and professional training, I moved beyond tutorials and started working on practical applications, reusable components, real workflows, APIs, and maintainable application structures.",
                descriptionAr:
                    "من خلال المشاريع المستقلة والتدريب العملي، انتقلت من مرحلة التعلم النظري إلى العمل على تطبيقات ومشاريع عملية، ومكونات قابلة لإعادة الاستخدام، وسير عمل حقيقي، وواجهات API، وبنية تطبيقات قابلة للصيانة.",
                year: "2025",
                order: 4,
            },

            // ================================
            // BUILDING THE FUTURE
            // ================================
            {
                titleEn: "Building What's Next",
                titleAr: "بناء المرحلة القادمة",
                descriptionEn:
                    "Today, I focus on building scalable web products and SaaS applications while expanding into AI-powered agents and automation, combining software engineering with modern intelligent workflows.",
                descriptionAr:
                    "أركز اليوم على بناء منتجات ويب وتطبيقات SaaS قابلة للتوسع، مع التوسع في مجال وكلاء الذكاء الاصطناعي والأتمتة، من خلال الجمع بين هندسة البرمجيات وسير العمل الذكي الحديث.",
                year: "Today",
                order: 5,
            },
        ],
    });

    console.log("✅ Milestones Seeded.");

    /**
     * Seed Projects
     *
     * Real, shipped projects replacing the earlier placeholder set.
     * Each project's categories are connected via existing Category
     * slugs (seeded earlier), matched against the pairing below.
     */
    const projectCategoryMap: Record<string, string[]> = {
        "glow-medical": ["featured", "full-stack", "saas"],
        "snap-cakes": ["frontend", "featured"],
        "dibo-cafe": ["frontend", "full-stack"],
        "blogify-pro-backend": ["backend"],
        "alhaj-coffee-backend": ["backend"],
        "dibo-cafe-backend": ["backend"],
    };

    // ============================================================
    // 1. GLOW MEDICAL
    // ============================================================
    await prisma.project.create({
        data: {
            titleEn: "Glow Medical",
            slugEn: "glow-medical",

            descriptionEn:
                "A complete digital platform for managing and presenting a modern medical clinic, combining a comprehensive management dashboard with a public-facing patient experience, online booking, communication, and intelligent assistance.",

            contentEn: `
# Glow Medical

Glow Medical is the largest and most comprehensive project I have worked on, built as a complete digital ecosystem for a modern medical clinic.

## Project Overview

The platform combines a full clinic management dashboard with a polished public-facing experience for patients and visitors.

Instead of treating the website as a simple informational page, the project connects the clinic's internal operations with the patient's digital journey.

## Main Features

- Complete clinic management dashboard
- Public-facing medical website
- Online appointment booking
- Patient-oriented booking experience
- Service and medical information pages
- Doctor and clinic information
- Multiple dedicated application pages
- Interactive user interfaces
- Responsive design across devices
- Chatbot / intelligent assistance experience
- Structured data management
- Backend integration
- Dashboard-based administration
- Form handling and validation
- Loading and error states
- Reusable UI components

## Dashboard

The dashboard provides a centralized workspace for managing different aspects of the clinic.

It was designed around practical administrative workflows rather than being only a visual dashboard.

## Patient Experience

The public interface focuses on making it easy for visitors to understand the clinic's services and move naturally toward booking an appointment.

The experience includes dedicated pages, structured information, interactive components, and responsive layouts.

## Intelligent Assistance

The platform also includes a chatbot experience designed to help users interact with the system and access information through a more natural conversational interface.

## Engineering Focus

The project required combining frontend architecture, backend integration, database-driven workflows, responsive UI development, and user experience considerations into one coherent product.

The main focus was building a maintainable structure that could support both the public website and the internal management experience.

## What This Project Demonstrates

Glow Medical demonstrates my ability to work beyond isolated UI screens and build a complete product experience involving dashboards, public interfaces, forms, data flows, APIs, and real-world business workflows.
`,

            titleAr: "Glow Medical",
            slugAr: "جلو-ميديكال",

            descriptionAr:
                "منصة رقمية متكاملة لإدارة وعرض عيادة طبية حديثة، تجمع بين لوحة تحكم شاملة وتجربة مستخدم عامة للحجز والتواصل والوصول إلى الخدمات والمعلومات.",

            contentAr: `
# Glow Medical

Glow Medical هو أكبر وأكثر مشروع متكامل عملت عليه، وتم تطويره كنظام رقمي متكامل لعيادة طبية حديثة.

## نظرة عامة

يجمع المشروع بين لوحة تحكم متكاملة لإدارة العيادة وتجربة استخدام عامة مخصصة للمرضى والزوار.

بدلًا من التعامل مع الموقع كصفحات تعريفية فقط، يربط المشروع بين العمليات الداخلية للعيادة والرحلة الرقمية للمريض.

## أهم المميزات

- لوحة تحكم متكاملة لإدارة العيادة
- واجهة عامة للمرضى والزوار
- نظام حجز مواعيد إلكتروني
- تجربة حجز مخصصة للمرضى
- صفحات الخدمات والمعلومات الطبية
- عرض بيانات الأطباء والعيادة
- صفحات متعددة مخصصة لمختلف الوظائف
- واجهات تفاعلية
- تصميم متجاوب مع مختلف الأجهزة
- Chatbot للمساعدة والتفاعل
- إدارة منظمة للبيانات
- التكامل مع الـBackend
- إدارة النظام من خلال Dashboard
- التعامل مع النماذج والتحقق من البيانات
- حالات Loading و Error
- مكونات UI قابلة لإعادة الاستخدام

## لوحة التحكم

توفر لوحة التحكم مساحة عمل مركزية لإدارة الجوانب المختلفة الخاصة بالعيادة.

تم تصميمها لتخدم العمليات الإدارية الفعلية، وليس فقط لعرض الإحصائيات بشكل بصري.

## تجربة المريض

تركز الواجهة العامة على تسهيل فهم خدمات العيادة والوصول إلى الحجز بطريقة واضحة وسلسة.

وتتضمن صفحات مخصصة ومعلومات منظمة وعناصر تفاعلية وتصميمًا متجاوبًا.

## المساعدة الذكية

يتضمن المشروع أيضًا تجربة Chatbot تساعد المستخدمين على التفاعل مع النظام والوصول إلى المعلومات بطريقة أكثر طبيعية.

## التركيز الهندسي

تطلب المشروع الجمع بين هندسة الواجهات الأمامية، والتكامل مع الـBackend، وسير العمل المعتمد على البيانات، والتصميم المتجاوب، وتجربة المستخدم داخل منتج واحد متكامل.

كان التركيز الأساسي على بناء بنية منظمة وقابلة للصيانة تدعم الموقع العام ولوحة التحكم الداخلية.

## ماذا يوضح المشروع؟

يوضح Glow Medical قدرتي على تجاوز بناء واجهات منفصلة والعمل على منتج متكامل يجمع بين Dashboards والواجهات العامة والنماذج وتدفقات البيانات وواجهات API وسير العمل الواقعي.
`,

            workspacePath: "projects/glow-medical",
            coverImage: "/projects/glow-medical.jpg",

            liveUrl: "https://glow-medical-s8oz.vercel.app/",
            githubFront: null,
            githubBack: null,

            technologies: [
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Node.js",
                "PostgreSQL",
                "Prisma",
                "REST API",
                "AI Chatbot",
            ],

            sharedPackages: [],

            categories: {
                connect: projectCategoryMap["glow-medical"].map((slug) => ({
                    slug,
                })),
            },
        },
    });

    // ============================================================
    // 2. SNAP CAKES
    // ============================================================
    await prisma.project.create({
        data: {
            titleEn: "Snap Cakes",
            slugEn: "snap-cakes",

            descriptionEn:
                "A modern responsive web experience for a cake and dessert business, designed to showcase products and provide an engaging customer journey.",

            contentEn: `
# Snap Cakes

Snap Cakes is a modern web project created for a cake and dessert business.

## Project Overview

The project focuses on presenting products through a visually engaging interface while keeping the experience simple and accessible for customers.

## Main Focus

- Modern responsive interface
- Product presentation
- Visual-focused layouts
- Mobile-friendly experience
- Clear navigation
- Interactive UI elements
- Structured content presentation
- Customer-oriented experience

## Design Approach

The interface places strong emphasis on visual hierarchy and product presentation, helping users quickly understand the available offerings while maintaining a clean browsing experience.

## Development Focus

The project demonstrates practical frontend development, responsive layouts, component-based implementation, and attention to visual details.
`,

            titleAr: "Snap Cakes",
            slugAr: "سناب-كيكس",

            descriptionAr:
                "موقع ويب حديث ومتجاوب لمشروع متخصص في الكيك والحلويات، يركز على عرض المنتجات وتقديم تجربة استخدام جذابة للعملاء.",

            contentAr: `
# Snap Cakes

Snap Cakes هو مشروع ويب حديث تم تطويره لمشروع متخصص في الكيك والحلويات.

## نظرة عامة

يركز المشروع على عرض المنتجات بطريقة جذابة بصريًا مع الحفاظ على تجربة استخدام بسيطة وسهلة للعملاء.

## أهم الجوانب

- واجهة حديثة ومتجاوبة
- عرض المنتجات
- تصميمات تعتمد على المحتوى البصري
- تجربة مناسبة للهواتف
- تنقل واضح
- عناصر UI تفاعلية
- عرض منظم للمحتوى
- تجربة تركز على العميل

## أسلوب التصميم

يعتمد التصميم على التسلسل البصري الجيد وإبراز المنتجات لمساعدة المستخدم على فهم الخيارات المتاحة بسرعة مع الحفاظ على تجربة تصفح نظيفة.

## التركيز أثناء التطوير

يوضح المشروع قدرتي على تطوير واجهات Frontend عملية ومتجاوبة مع الاهتمام بالمكونات وإعادة الاستخدام والتفاصيل البصرية.
`,

            workspacePath: "projects/snap-cakes",
            coverImage: "/projects/snap-cakes.jpg",

            liveUrl: "https://snap-cakes.web.app/",
            githubFront: null,
            githubBack: null,

            technologies: [
                "React",
                "JavaScript",
                "CSS",
                "Responsive Design",
            ],

            sharedPackages: [],

            categories: {
                connect: projectCategoryMap["snap-cakes"].map((slug) => ({
                    slug,
                })),
            },
        },
    });

    // ============================================================
    // 3. DIBO CAFE
    // ============================================================
    await prisma.project.create({
        data: {
            titleEn: "DIBO Cafe",
            slugEn: "dibo-cafe",

            descriptionEn:
                "A modern digital experience for DIBO Cafe, focused on presenting the cafe, its products, and customer-facing information through a responsive web interface.",

            contentEn: `
# DIBO Cafe

DIBO Cafe is a modern web project built to provide a digital presence for a cafe and present its products and information through a clean customer-facing experience.

## Project Overview

The application focuses on creating a responsive and visually engaging interface that allows visitors to explore the cafe and its offerings.

## Main Focus

- Cafe digital presence
- Product and menu presentation
- Responsive design
- Modern UI
- Structured content
- Customer-focused navigation
- Mobile-friendly experience
- Backend integration

## Development

The project was developed with attention to reusable components, responsive layouts, and clean separation between the user interface and backend functionality.

A dedicated backend was also developed for the project to support application data and business workflows.
`,

            titleAr: "DIBO Cafe",
            slugAr: "ديبو-كافيه",

            descriptionAr:
                "تجربة رقمية حديثة لكافيه DIBO تركز على عرض الكافيه ومنتجاته ومعلوماته من خلال واجهة ويب متجاوبة وسهلة الاستخدام.",

            contentAr: `
# DIBO Cafe

DIBO Cafe هو مشروع ويب حديث تم تطويره لتوفير حضور رقمي للكافيه وعرض المنتجات والمعلومات من خلال تجربة استخدام واضحة ومميزة.

## نظرة عامة

يركز التطبيق على إنشاء واجهة متجاوبة وجذابة بصريًا تسمح للزوار باستكشاف الكافيه وما يقدمه.

## أهم الجوانب

- حضور رقمي للكافيه
- عرض المنتجات والمنيو
- تصميم متجاوب
- واجهة مستخدم حديثة
- تنظيم المحتوى
- تنقل يركز على العميل
- تجربة مناسبة للهواتف
- التكامل مع الـBackend

## التطوير

تم تطوير المشروع مع الاهتمام بالمكونات القابلة لإعادة الاستخدام والتصميم المتجاوب والفصل المنظم بين واجهة المستخدم ووظائف الـBackend.

كما تم تطوير Backend مستقل للمشروع لدعم بيانات التطبيق وسير العمل الخاص به.
`,

            workspacePath: "projects/dibo-cafe",
            coverImage: "/projects/dibo-cafe.jpg",

            liveUrl: "https://dibo-cafe-b13d9.web.app/",
            githubFront: null,
            githubBack: "https://github.com/AhmedMo100/DIBO-CAFE-Backend",

            technologies: [
                "React",
                "JavaScript",
                "CSS",
                "REST API",
                "Node.js",
                "Backend Integration",
            ],

            sharedPackages: [],

            categories: {
                connect: projectCategoryMap["dibo-cafe"].map((slug) => ({
                    slug,
                })),
            },
        },
    });

    // ============================================================
    // 4. BLOGIFY PRO BACKEND
    // ============================================================
    await prisma.project.create({
        data: {
            titleEn: "Blogify Pro Backend",
            slugEn: "blogify-pro-backend",

            descriptionEn:
                "Backend API designed to power a modern blogging platform with structured content, user-related operations, and scalable server-side functionality.",

            contentEn: `
# Blogify Pro Backend

Blogify Pro Backend is a backend project focused on providing server-side functionality for a modern blogging platform.

## Project Overview

The project was designed around structured APIs and backend services responsible for handling application data and business logic.

## Main Focus

- RESTful API architecture
- Blog and content management
- Server-side business logic
- Database operations
- Request validation
- Structured API responses
- Error handling
- Modular backend organization

## Engineering Focus

The project demonstrates backend development fundamentals including API design, data management, validation, and separation of application responsibilities.

The architecture is designed to provide a clean foundation that can be consumed by a separate frontend application.
`,

            titleAr: "Blogify Pro Backend",
            slugAr: "باك-إند-بلوجيفاي-برو",

            descriptionAr:
                "Backend API لمنصة تدوين حديثة، يركز على إدارة المحتوى والبيانات ومنطق التطبيق من جهة الخادم بطريقة منظمة وقابلة للتوسع.",

            contentAr: `
# Blogify Pro Backend

Blogify Pro Backend هو مشروع Backend يركز على توفير الوظائف البرمجية اللازمة لمنصة تدوين حديثة.

## نظرة عامة

يعتمد المشروع على واجهات API منظمة وخدمات Backend مسؤولة عن التعامل مع بيانات التطبيق ومنطق الأعمال.

## أهم الجوانب

- بنية RESTful API
- إدارة المدونات والمحتوى
- منطق التطبيق من جهة الخادم
- التعامل مع قواعد البيانات
- التحقق من الطلبات والبيانات
- تنظيم Responses
- التعامل مع الأخطاء
- تنظيم وحدات الـBackend

## التركيز الهندسي

يوضح المشروع فهم أساسيات تطوير الـBackend، بما يشمل تصميم الـAPIs وإدارة البيانات والتحقق من المدخلات والفصل بين مسؤوليات التطبيق.

تم تصميم البنية لتوفير أساس منظم يمكن لواجهة Frontend مستقلة التعامل معه.
`,

            workspacePath: "projects/blogify-pro-backend",
            coverImage: "/projects/blogify-pro-backend.jpg",

            liveUrl: null,
            githubFront: null,
            githubBack: "https://github.com/AhmedMo100/Blogify-Pro-Backend",

            technologies: [
                "Node.js",
                "Express.js",
                "JavaScript",
                "REST API",
                "MongoDB",
            ],

            sharedPackages: [],

            categories: {
                connect: projectCategoryMap["blogify-pro-backend"].map(
                    (slug) => ({ slug }),
                ),
            },
        },
    });

    // ============================================================
    // 5. ALHAJ COFFEE BACKEND
    // ============================================================
    await prisma.project.create({
        data: {
            titleEn: "AlHaj Coffee Backend",
            slugEn: "alhaj-coffee-backend",

            descriptionEn:
                "Backend service developed to support a coffee business application with structured APIs, data management, and business logic.",

            contentEn: `
# AlHaj Coffee Backend

AlHaj Coffee Backend is a backend project developed to provide server-side functionality for a coffee business application.

## Project Overview

The backend is responsible for exposing structured APIs and handling application data and business logic.

## Main Focus

- RESTful API development
- Product and business data
- Database operations
- Backend business logic
- Request validation
- Error handling
- Structured API responses
- Frontend-backend communication

## Engineering Focus

The project demonstrates practical backend development and the ability to structure APIs around real business requirements rather than isolated technical examples.
`,

            titleAr: "AlHaj Coffee Backend",
            slugAr: "باك-إند-الحاج-كوفي",

            descriptionAr:
                "خدمة Backend لدعم تطبيق خاص بمشروع قهوة، تشمل واجهات API منظمة وإدارة البيانات ومنطق الأعمال.",

            contentAr: `
# AlHaj Coffee Backend

AlHaj Coffee Backend هو مشروع Backend تم تطويره لتوفير الوظائف البرمجية من جهة الخادم لتطبيق خاص بمشروع قهوة.

## نظرة عامة

يتولى الـBackend توفير واجهات API منظمة والتعامل مع بيانات التطبيق ومنطق الأعمال.

## أهم الجوانب

- تطوير RESTful APIs
- إدارة بيانات المنتجات والمشروع
- عمليات قواعد البيانات
- منطق الأعمال
- التحقق من الطلبات
- التعامل مع الأخطاء
- تنظيم Responses
- التواصل بين الـFrontend والـBackend

## التركيز الهندسي

يوضح المشروع خبرة عملية في تطوير الـBackend وبناء APIs مبنية حول متطلبات مشروع حقيقي بدلًا من أمثلة تقنية منفصلة.
`,

            workspacePath: "projects/alhaj-coffee-backend",
            coverImage: "/projects/alhaj-coffee-backend.jpg",

            liveUrl: null,
            githubFront: null,
            githubBack: "https://github.com/AhmedMo100/AlHaj-Coffee-Back-end",

            technologies: [
                "Node.js",
                "Express.js",
                "JavaScript",
                "REST API",
                "MongoDB",
            ],

            sharedPackages: [],

            categories: {
                connect: projectCategoryMap["alhaj-coffee-backend"].map(
                    (slug) => ({ slug }),
                ),
            },
        },
    });

    // ============================================================
    // 6. DIBO CAFE BACKEND
    // ============================================================
    await prisma.project.create({
        data: {
            titleEn: "DIBO Cafe Backend",
            slugEn: "dibo-cafe-backend",

            descriptionEn:
                "Backend API developed for DIBO Cafe to provide structured application data, business logic, and communication with the customer-facing interface.",

            contentEn: `
# DIBO Cafe Backend

DIBO Cafe Backend is the server-side component of the DIBO Cafe project.

## Project Overview

The backend was developed to provide the application with structured data access and server-side business logic.

## Main Focus

- RESTful APIs
- Data management
- Product and cafe-related information
- Backend business logic
- API integration
- Request validation
- Error handling
- Frontend communication

## Architecture

The backend is designed as an independent service that can communicate with the public-facing application through APIs.

This separation makes it possible to evolve the frontend and backend independently while keeping application responsibilities organized.
`,

            titleAr: "DIBO Cafe Backend",
            slugAr: "باك-إند-ديبو-كافيه",

            descriptionAr:
                "Backend API تم تطويره لمشروع DIBO Cafe لتوفير البيانات ومنطق الأعمال والتواصل مع الواجهة العامة للتطبيق.",

            contentAr: `
# DIBO Cafe Backend

DIBO Cafe Backend هو الجزء المسؤول عن الـBackend في مشروع DIBO Cafe.

## نظرة عامة

تم تطوير الـBackend لتوفير الوصول المنظم إلى بيانات التطبيق وتنفيذ منطق الأعمال من جهة الخادم.

## أهم الجوانب

- RESTful APIs
- إدارة البيانات
- بيانات المنتجات والكافيه
- منطق الأعمال
- التكامل مع الـAPI
- التحقق من الطلبات
- التعامل مع الأخطاء
- التواصل مع الـFrontend

## البنية

تم تصميم الـBackend كخدمة مستقلة تتواصل مع التطبيق العام من خلال APIs.

يسمح هذا الفصل بتطوير الـFrontend والـBackend بشكل مستقل مع الحفاظ على تنظيم مسؤوليات التطبيق.
`,

            workspacePath: "projects/dibo-cafe-backend",
            coverImage: "/projects/dibo-cafe-backend.jpg",

            liveUrl: null,
            githubFront: null,
            githubBack: "https://github.com/AhmedMo100/DIBO-CAFE-Backend",

            technologies: [
                "Node.js",
                "Express.js",
                "JavaScript",
                "REST API",
                "MongoDB",
            ],

            sharedPackages: [],

            categories: {
                connect: projectCategoryMap["dibo-cafe-backend"].map(
                    (slug) => ({ slug }),
                ),
            },
        },
    });

    console.log("✅ Projects Seeded Successfully!");

    /**
     * Seed Engagement (Likes & Comments)
     *
     * Numbers are intentionally modest to keep the portfolio's social
     * proof believable rather than inflated. Likes are generated in a
     * loop rather than listed individually, since ProjectLike only
     * needs a unique visitorId per row (enforced by the
     * @@unique([projectId, visitorId]) constraint) — there is no other
     * meaningful per-like data to hand-author. Comments are seeded with
     * status APPROVED so they render immediately on the site, since
     * getProjectBySlug only surfaces APPROVED comments.
     */
    const engagementData: Record<
        string,
        {
            likes: number;
            comments: { authorName: string; content: string }[];
        }
    > = {
        "glow-medical": {
            likes: 18,
            comments: [
                {
                    authorName: "Omar Hassan",
                    content:
                        "The clinic dashboard is really well structured, especially the combination between the public booking experience and the management side.",
                },
                {
                    authorName: "Youssef Ali",
                    content:
                        "Great example of turning a real business workflow into a complete digital product.",
                },
                {
                    authorName: "Mariam Ahmed",
                    content:
                        "The public experience feels clean and easy to navigate.",
                },
                {
                    authorName: "Karim Mostafa",
                    content:
                        "The chatbot and booking flow are interesting additions to the platform.",
                },
            ],
        },

        "snap-cakes": {
            likes: 11,
            comments: [
                {
                    authorName: "Nour Mohamed",
                    content:
                        "Clean presentation and a nice focus on the products.",
                },
                {
                    authorName: "Omar Adel",
                    content:
                        "The responsive experience works really well on mobile.",
                },
                {
                    authorName: "Salma Hassan",
                    content: "Simple and visually appealing interface.",
                },
            ],
        },

        "dibo-cafe": {
            likes: 9,
            comments: [
                {
                    authorName: "Ahmed Samir",
                    content:
                        "Nice combination between the customer-facing interface and the backend service.",
                },
                {
                    authorName: "Mahmoud Ali",
                    content: "The project has a clean and practical structure.",
                },
            ],
        },

        "blogify-pro-backend": {
            likes: 7,
            comments: [
                {
                    authorName: "Mostafa Khaled",
                    content:
                        "Good backend-focused project with a clear API structure.",
                },
                {
                    authorName: "Omar Ibrahim",
                    content:
                        "Interesting example of separating backend responsibilities from the frontend.",
                },
            ],
        },

        "alhaj-coffee-backend": {
            likes: 6,
            comments: [
                {
                    authorName: "Yassin Mohamed",
                    content:
                        "A practical backend project built around a real business use case.",
                },
            ],
        },

        "dibo-cafe-backend": {
            likes: 5,
            comments: [
                {
                    authorName: "Ahmed Khaled",
                    content:
                        "Nice example of connecting a customer-facing application with a dedicated backend.",
                },
            ],
        },
    };

    for (const [slug, data] of Object.entries(engagementData)) {
        const project = await prisma.project.findUnique({
            where: { slugEn: slug },
            select: { id: true },
        });

        if (!project) {
            console.warn(`⚠️  Skipping engagement for unknown slug: ${slug}`);
            continue;
        }

        await prisma.projectLike.createMany({
            data: Array.from({ length: data.likes }, () => ({
                projectId: project.id,
                visitorId: randomUUID(),
            })),
        });

        await prisma.comment.createMany({
            data: data.comments.map((comment) => ({
                projectId: project.id,
                visitorId: randomUUID(),
                authorName: comment.authorName,
                content: comment.content,
                status: "APPROVED",
            })),
        });
    }

    console.log("✅ Engagement (Likes & Comments) Seeded.");


    console.log("🎉 Database hydrated successfully!");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });