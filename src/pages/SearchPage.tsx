import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { MovieModal } from '../components/MovieModal'
import { useSearch } from '../hooks/useMovies'
import { getImageUrl } from '../api/tmdb'
import type { Movie } from '../types'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { results, loading } = useSearch(query)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />

      <div className="pt-24 px-4 md:px-12">
        {query ? (
          <>
            <h2 className="text-white text-xl mb-6">
              {loading ? 'Buscando...' : `Resultados para "${query}"`}
            </h2>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-[2/3] bg-gray-800 rounded animate-pulse" />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-400 text-lg">Nenhum resultado encontrado para "{query}"</p>
                <p className="text-gray-500 mt-2">Tente buscar por outro título, pessoa ou gênero.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {results.map(movie => (
                  <div
                    key={movie.id}
                    onClick={() => setSelectedMovie(movie)}
                    className="cursor-pointer group relative"
                  >
                    <img
                      src={getImageUrl(movie.poster_path || movie.backdrop_path)}
                      alt={movie.title || movie.name}
                      className="w-full aspect-[2/3] object-cover rounded group-hover:scale-105 transition-transform duration-300"
                    />
                    <p className="text-white text-xs mt-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                      {movie.title || movie.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-400 text-xl">Use a barra de busca para encontrar filmes e séries.</p>
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}
