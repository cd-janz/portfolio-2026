import {defineCollection} from "astro:content";
import {glob} from "astro/loaders"
import {z} from "zod";

const nav = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/nav"}),
    schema: z.array(z.object({
        label: z.string(),
        path: z.string(),
    }))
})

const header = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/header"}),
    schema: z.object({
        resume: z.string(),
    })
})
const hero = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/hero"}),
    schema: z.object({
        headline: z.string(),
        description: z.string(),
        enter: z.string(),
        contact: z.string(),
    })
})
const timelineSchema = z.object({
    title: z.string(),
    institution: z.string(),
    position_program: z.string(),
    attendance_mode: z.string(),
    location: z.string(),
    summary: z.string(),
    responsibilities: z.optional(z.array(z.string())),
    achievements: z.optional(z.array(z.string())),
    projects: z.optional(z.array(z.string())),
    start: z.string(),
    end: z.optional(z.string()),
    technologies: z.array(z.string()),
    related: z.optional(z.array(z.string())),
    status: z.string(),
    path: z.optional(z.string()),
})
const education = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/education"}),
    schema: timelineSchema
})
const courses = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/courses"}),
    schema: timelineSchema
})
const experience = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/experience"}),
    schema: timelineSchema
})
const ideSchema = z.object({
    title: z.string(),
    experience: z.object({
        title: z.string(),
        items: z.array(z.string())
    }),
    education: z.object({
        title: z.string(),
        items: z.array(z.string())
    })
})
const ide = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/ide"}),
    schema: ideSchema
})
const ideSystemSchema = z.object({
    company: z.string(),
    start: z.string(),
    end: z.string(),
    summary: z.string(),
    relevantProjects: z.string(),
    design: z.string(),
    technologies: z.string(),
})
const ideSystem = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/ideSystem"}),
    schema: ideSystemSchema
})
const ideNavSchema = z.object({
    file: z.string(),
    edit: z.string(),
    selection: z.string(),
    terminal: z.string(),
    view: z.string(),
    window: z.string(),
    help: z.string(),
})
const ideNav = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/ideNav"}),
    schema: ideNavSchema
})
const sections = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/sections"}),
    schema: z.object({
        about: z.string(),
        title_about: z.string(),
        services: z.string(),
        title_services: z.string(),
        career: z.string(),
        title_career: z.string(),
        projects: z.string(),
        title_projects: z.string(),
        contact: z.string(),
        title_contact: z.string(),
    })
})
const person = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/person"}),
    schema: z.object({
        first_name: z.string(),
        last_name: z.string(),
        position: z.string(),
        spanish: z.string(),
        english: z.string(),
        work_mode: z.string(),
        relocation: z.string(),
        title: z.string(),
        description: z.string(),
    })
})
const services = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/services"}),
    schema: z.array(z.object({
        key: z.string(),
        name: z.string(),
        subtitle: z.string(),
        skills: z.array(z.string()),
        experience: z.string(),
        description: z.string(),
    }))
})
const projectSchema = z.object({
    picture: z.optional(z.string()),
    year: z.string(),
    type: z.enum(["personal", "enterprise", "test"]),
    metrics: z.optional(z.string()),
    name: z.string(),
    short_description: z.string(),
    skills: z.array(z.string()),
    position: z.optional(z.string()),
    collaborators: z.optional(z.array(z.string())),
    repo: z.optional(z.string()),
    live: z.optional(z.string()),
})
const projects = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/content/projects"}),
    schema: projectSchema
})
const contactSchema = z.object({
    title_one: z.string(),
    title_two: z.string(),
    subtitle_one: z.string(),
    subtitle_two: z.string(),
    phone: z.string(),
    name: z.string(),
    subject: z.string(),
    message: z.string(),
    send: z.string()
})
const contact = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/contact"}),
    schema: contactSchema
})
const infoSchema = z.object({
    email: z.string(),
    github: z.string(),
    github_link: z.string(),
    linkedin: z.string(),
    linkedin_link: z.string(),
    phone: z.string(),
    whatsapp_link: z.string(),
    telegram: z.string(),
    telegram_link: z.string()
})
const info = defineCollection({
    loader: glob({pattern: "*.json", base: "./src/content/info"}),
    schema: infoSchema
})
export const collections = {nav, header, hero, ide, ideSystem, experience, education, courses, ideNav, sections, person,
services, projects, contact, info}
export type Project = z.infer<typeof projectSchema>;
export type Timeline = z.infer<typeof timelineSchema>;
export type IDESystem = z.infer<typeof ideSystemSchema>;
export type IDENav = z.infer<typeof ideNavSchema>;
export type IDE = z.infer<typeof ideSchema>;
