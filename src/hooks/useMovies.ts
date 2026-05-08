import { useState, useEffect } from 'react'
import { tmdb } from '../api/tmdb'
import type { Movie } from '../types'

export function useMovies(url: string) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchMovies = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await tmdb.get(url)
        if (!cancelled) {
          setMovies(response.data.results || [])
        }
      } catch (err) {
        if (!cancelled) {
          setError('Erro ao carregar filmes')
          console.error(err)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchMovies()
    return () => { cancelled = true }
  }, [url])

  return { movies, loading, error }
}

export function useSearch(query: string) {
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    let cancelled = false
    const timer = setTimeout(async () => {
      try {
        setLoading(true)
        const response = await tmdb.get('/search/multi', {
          params: { query },
        })
        if (!cancelled) {
          setResults(
            (response.data.results || []).filter(
              (r: Movie) => r.media_type !== 'person' && (r.poster_path || r.backdrop_path)
            )
          )
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 400)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

  return { results, loading }
}
