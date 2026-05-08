import { useEffect, useState } from 'react'
import { X, Play, Plus, ThumbsUp, Volume2, VolumeX } from 'lucide-react'
import { tmdb, getImageUrl } from '../api/tmdb'
import type { Movie, MovieDetails, Video } from '../types'

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  const [details, setDetails] = useState<MovieDetails | null>(null)
  const [trailer, setTrailer] = useState<Video | null>(null)
  const [muted, setMuted] = useState(true)
  const title = movie.title || movie.name || ''
  const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [detailsRes, videosRes] = await Promise.all([
          tmdb.get(`/${mediaType}/${movie.id}`),
          tmdb.get(`/${mediaType}/${movie.id}/videos`),
        ])
        setDetails(detailsRes.data)
        const videos: Video[] = videosRes.data.results || []
        const trailerVideo =
          videos.find(v => v.type === 'Trailer' && v.site === 'YouTube') ||
          videos.find(v => v.site === 'YouTube')
        setTrailer(trailerVideo || null)
      } catch (err) {
        console.error(err)
      }
    }
    fetchDetails()
  }, [movie.id, mediaType])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const year = new Date(movie.release_date || movie.first_air_date || '').getFullYear()

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 overflow-y-auto py-8"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-[#181818] rounded-lg w-full max-w-3xl mx-4 overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#181818] flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <X size={20} className="text-white" />
        </button>

        <div className="relative aspect-video">
          {trailer ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&modestbranding=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <img
              src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => trailer
                  ? window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')
                  : window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' trailer')}`, '_blank')
                }
                className="flex items-center gap-2 bg-white text-black font-bold px-5 py-2 rounded hover:bg-gray-200 transition-colors text-sm"
              >
                <Play size={18} fill="black" />
                Assistir
              </button>
              <button className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                <Plus size={18} className="text-white" />
              </button>
              <button className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                <ThumbsUp size={18} className="text-white" />
              </button>
            </div>

            {trailer && (
              <button
                onClick={() => setMuted(!muted)}
                className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors"
              >
                {muted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-green-400 font-semibold">
                  {Math.round(movie.vote_average * 10)}% relevante
                </span>
                {year > 1970 && <span className="text-gray-400">{year}</span>}
                {details?.runtime && (
                  <span className="text-gray-400">
                    {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
                  </span>
                )}
                {details?.number_of_seasons && (
                  <span className="text-gray-400">
                    {details.number_of_seasons} temporada{details.number_of_seasons > 1 ? 's' : ''}
                  </span>
                )}
                <span className="border border-gray-500 text-gray-400 text-xs px-1 py-0.5">HD</span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">{movie.overview}</p>
            </div>

            <div className="w-48 text-sm flex-shrink-0">
              {details?.genres && details.genres.length > 0 && (
                <p className="mb-2">
                  <span className="text-gray-500">Gêneros: </span>
                  <span className="text-white">{details.genres.map(g => g.name).join(', ')}</span>
                </p>
              )}
              <p className="mb-2">
                <span className="text-gray-500">Avaliação: </span>
                <span className="text-white">⭐ {movie.vote_average.toFixed(1)}</span>
              </p>
              {details?.tagline && (
                <p className="mb-2">
                  <span className="text-gray-500">Slogan: </span>
                  <span className="text-white italic">{details.tagline}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
