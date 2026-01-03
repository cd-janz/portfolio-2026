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
export const collections = {nav, header, hero, ide, ideSystem, experience, education, courses, ideNav, sections, person,
services}
export type Timeline = z.infer<typeof timelineSchema>;
export type IDESystem = z.infer<typeof ideSystemSchema>;
export type IDENav = z.infer<typeof ideNavSchema>;
export type IDE = z.infer<typeof ideSchema>;