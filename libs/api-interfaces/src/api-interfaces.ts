export interface Message {
    message: string
}

export interface Project {
    id: number
    name: string
    author: string
    tagline: string
    description: string
    categories: ProjectCategory[]
    status: string
    rank: number
}

export interface ProjectCategory {
    name: string
}

export enum ProjectStatus {
    Live,
    Down,
}
