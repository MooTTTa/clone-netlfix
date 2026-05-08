import { useState } from 'react'
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react'
import { getImageUrl } from '../api/tmdb'
import type { Movie } from '../types'

interface MovieCardProps {
  movie: Movie
  onClick: (movie: Movie) => void
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)
  const title = movie.title || movie.name || 'Sem título'

  return (
    <div
      className="relative flex-shrink-0 w-36 md:w-44 lg:w-48 cursor-pointer group transition-all duration-300 hover:scale-110 hover:z-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(movie)}
    >
      <img
        src={imgError ? '/placeholder.jpg' : getImageUrl(movie.poster_path || movie.backdrop_path)}
        alt={title}
        onError={() => setImgError(true)}
        className="w-full aspect-[2/3] object-cover rounded"
      />

      {hovered && (
        <div className="absolute inset-0 rounded overflow-hidden shadow-2xl">
          <img
            src={getImageUrl(movie.backdrop_path || movie.poster_path, 'w780')}
            alt={title}
            className="w-full h-2/3 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#1a1a1a]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-1.5">
                <button
                  onClick={e => { e.stopPropagation(); onClick(movie) }}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Play size={14} fill="black" className="text-black ml-0.5" />
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                  <Plus size={14} className="text-white" />
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                  <ThumbsUp size={14} className="text-white" />
                </button>
              </div>
              <button
                onClick={e => { e.stopPropagation(); onClick(movie) }}
                className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:border-white transition-colors"
              >
                <ChevronDown size={14} className="text-white" />
              </button>
            </div>

            <p className="text-white text-xs font-semibold truncate">{title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-green-400 text-xs font-semibold">
                {Math.round(movie.vote_average * 10)}% relevante
              </span>
              {(movie.release_date || movie.first_air_date) && (
                <span className="text-gray-400 text-xs">
                  {new Date(movie.release_date || movie.first_air_date || '').getFullYear()}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
