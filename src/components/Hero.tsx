import { useState, useEffect } from 'react'
import { Play, Info } from 'lucide-react'
import { tmdb, getImageUrl } from '../api/tmdb'
import type { Movie } from '../types'

interface HeroProps {
  onMovieClick: (movie: Movie) => void
}

export function Hero({ onMovieClick }: HeroProps) {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tmdb.get('/trending/all/week')
        const results: Movie[] = res.data.results
        const withBackdrop = results.filter(m => m.backdrop_path)
        setMovie(withBackdrop[Math.floor(Math.random() * Math.min(5, withBackdrop.length))])
      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  }, [])

  if (!movie) {
    return (
      <div className="relative h-[80vh] bg-gradient-to-r from-gray-900 to-gray-800 animate-pulse" />
    )
  }

  const title = movie.title || movie.name || ''
  const truncatedOverview = movie.overview.length > 200
    ? `${movie.overview.substring(0, 200)}...`
    : movie.overview

  return (
    <div className="relative h-[80vh] md:h-[90vh]">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-1/4 left-4 md:left-12 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
          {title}
        </h1>

        <p className="text-sm md:text-base text-gray-200 mb-6 leading-relaxed hidden md:block">
          {truncatedOverview}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => onMovieClick(movie)}
            className="flex items-center gap-2 bg-white text-black font-bold px-6 py-2.5 rounded hover:bg-gray-200 transition-colors text-sm md:text-base"
          >
            <Play size={20} fill="black" />
            Assistir
          </button>
          <button
            onClick={() => onMovieClick(movie)}
            className="flex items-center gap-2 bg-gray-600/70 text-white font-semibold px-6 py-2.5 rounded hover:bg-gray-600/50 transition-colors text-sm md:text-base backdrop-blur-sm"
          >
            <Info size={20} />
            Mais informações
          </button>
        </div>
      </div>
    </div>
  )
}
