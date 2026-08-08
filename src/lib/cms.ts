export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  icon: string | null;
  image: string | null;
  highlights: string[] | null;
  deliverables: string[] | null;
  process: string[] | null;
  sort_order: number;
  published: boolean;
}

export interface AcademyProgram {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  price: string | null;
  duration: string | null;
  level: string | null;
  image: string | null;
  syllabus: string[] | null;
  outcomes: string[] | null;
  tools: string[] | null;
  sort_order: number;
  published: boolean;
}

export interface Lead {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  budget: string | null;
  timeline: string | null;
  service_slug: string | null;
  program_slug: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export const textareaToArray = (value: string): string[] =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export const arrayToTextarea = (value: string[] | null | undefined): string =>
  (value || []).join("\n");

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");