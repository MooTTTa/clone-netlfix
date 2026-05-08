import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { MovieRow } from '../components/MovieRow'
import { MovieModal } from '../components/MovieModal'
import { rows } from '../api/tmdb'
import type { Movie } from '../types'

export function BrowsePage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />

      <Hero onMovieClick={setSelectedMovie} />

      <div className="-mt-16 relative z-10 pb-12">
        {rows.map(row => (
          <MovieRow
            key={row.fetchUrl}
            title={row.title}
            fetchUrl={row.fetchUrl}
            onMovieClick={setSelectedMovie}
          />
        ))}
      </div>

      <footer className="px-4 md:px-12 pb-12 text-gray-500">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-6">
          {['Central de Ajuda', 'Conta', 'Mídia', 'Relações com Investidores',
            'Carreiras', 'Resgatar Cartão Pré-pago', 'Comprar Cartão Pré-pago',
            'Privacidade', 'Termos de Uso', 'Preferências de Cookies',
            'Informações Corporativas', 'Acessibilidade Netflix'].map(link => (
            <a key={link} href="#" className="hover:underline">{link}</a>
          ))}
        </div>
        <p className="text-xs">© 2024 Netflix Clone — Projeto educacional</p>
      </footer>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}
