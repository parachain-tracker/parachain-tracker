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

export enum ProjectType {
    Dapp,
    Parachain,
}

export interface TickerCoord {
    x: number
    y: number
}

export interface TickerTrend {
    label: string
    value: number
}

export interface Paginated<T> {
    items: T[]
    itemsPerPage: number
    from: number
    to: number
    totalItems: number
}
