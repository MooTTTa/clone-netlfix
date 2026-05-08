export interface Movie {
  id: number
  title?: string
  name?: string
  original_title?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  release_date?: string
  first_air_date?: string
  genre_ids: number[]
  media_type?: 'movie' | 'tv' | 'person'
  popularity: number
  adult?: boolean
  original_language: string
}

export interface Genre {
  id: number
  name: string
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime?: number
  number_of_seasons?: number
  number_of_episodes?: number
  status: string
  tagline?: string
  homepage?: string
  production_companies: { id: number; name: string; logo_path: string | null }[]
}

export interface Row {
  title: string
  fetchUrl: string
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}
