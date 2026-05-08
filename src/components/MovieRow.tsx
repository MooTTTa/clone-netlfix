import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MovieCard } from './MovieCard'
import { useMovies } from '../hooks/useMovies'
import type { Movie } from '../types'

interface MovieRowProps {
  title: string
  fetchUrl: string
  onMovieClick: (movie: Movie) => void
}

export function MovieRow({ title, fetchUrl, onMovieClick }: MovieRowProps) {
  const { movies, loading } = useMovies(fetchUrl)
  const rowRef = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return
    const amount = rowRef.current.clientWidth * 0.75
    rowRef.current.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  const handleScroll = () => {
    if (!rowRef.current) return
    setShowLeft(rowRef.current.scrollLeft > 0)
    setShowRight(
      rowRef.current.scrollLeft < rowRef.current.scrollWidth - rowRef.current.clientWidth - 10
    )
  }

  return (
    <div className="mb-8 group/row">
      <h2 className="text-white text-base md:text-xl font-semibold px-4 md:px-12 mb-3 hover:text-gray-300 cursor-pointer transition-colors">
        {title}
        <span className="text-[#54b9c5] text-xs ml-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
          Ver tudo &rsaquo;
        </span>
      </h2>

      <div className="relative">
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 hover:bg-black/80 flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>
        )}

        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto px-4 md:px-12 py-4 row-scroll"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-36 md:w-44 lg:w-48 aspect-[2/3] bg-gray-800 rounded animate-pulse"
                />
              ))
            : movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
              ))}
        </div>

        {showRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 hover:bg-black/80 flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100"
          >
            <ChevronRight size={32} className="text-white" />
          </button>
        )}
      </div>
    </div>
  )
}
