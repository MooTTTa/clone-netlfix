import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
})

export const endpoints = {
  trending: '/trending/all/week',
  netflixOriginals: '/discover/tv?with_networks=213',
  topRated: '/movie/top_rated',
  actionMovies: '/discover/movie?with_genres=28',
  comedyMovies: '/discover/movie?with_genres=35',
  horrorMovies: '/discover/movie?with_genres=27',
  romanceMovies: '/discover/movie?with_genres=10749',
  documentaries: '/discover/movie?with_genres=99',
  popularSeries: '/tv/popular',
  airingToday: '/tv/airing_today',
}

export const rows = [
  { title: 'Originais Netflix', fetchUrl: endpoints.netflixOriginals },
  { title: 'Em Alta', fetchUrl: endpoints.trending },
  { title: 'Melhores Avaliados', fetchUrl: endpoints.topRated },
  { title: 'Ação', fetchUrl: endpoints.actionMovies },
  { title: 'Comédia', fetchUrl: endpoints.comedyMovies },
  { title: 'Terror', fetchUrl: endpoints.horrorMovies },
  { title: 'Romance', fetchUrl: endpoints.romanceMovies },
  { title: 'Documentários', fetchUrl: endpoints.documentaries },
  { title: 'Séries Populares', fetchUrl: endpoints.popularSeries },
]

export const getImageUrl = (path: string | null, size = 'w500') => {
  if (!path) return '/placeholder.jpg'
  return `${IMAGE_BASE_URL}/${size}${path}`
}
