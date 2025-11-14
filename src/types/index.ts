export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  type: 'work' | 'education' | 'certification';
}

export type ExperienceFilter = 'all' | 'work' | 'education' | 'certification';

export interface Project {
  id: string;
  title: string;
  description:string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  codeUrl?: string;
  highlight?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'soft';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface PersonalInfo {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
    socialLinks: {
        github: string;
        linkedin: string;
        twitter: string;
    }
}
