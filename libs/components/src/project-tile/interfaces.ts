export interface ProjectTile {
    id: number
    name: string
    tagline: string
    iconSrc: string
    rank?: number
    stars?: number
    category?: string
}

export interface FeaturedProjectTile {
    id: number
    name: string
    tagline: string
    category: string
    iconSrc: string
}

export interface TopProjectTile {
    id: number
    name: string
    tagline: string
    rank: number
    iconSrc: string
    users: number
}
