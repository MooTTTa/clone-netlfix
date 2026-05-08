import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Bell, ChevronDown, X } from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchToggle = () => {
    setSearchOpen(prev => !prev)
    if (!searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setSearchQuery('')
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-4 transition-all duration-500 ${
        scrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center gap-8">
        <Link to="/browse">
          <span className="text-[#E50914] font-black text-2xl md:text-3xl tracking-widest select-none">NETFLIX</span>
        </Link>

        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link to="/browse" className="text-white hover:text-gray-300 transition-colors">Início</Link>
          <Link to="/browse?type=series" className="text-gray-300 hover:text-white transition-colors">Séries</Link>
          <Link to="/browse?type=movies" className="text-gray-300 hover:text-white transition-colors">Filmes</Link>
          <Link to="/browse?type=new" className="text-gray-300 hover:text-white transition-colors">Novidades</Link>
          <Link to="/browse?type=mylist" className="text-gray-300 hover:text-white transition-colors">Minha Lista</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <form onSubmit={handleSearchSubmit} className={`flex items-center border transition-all duration-300 ${
          searchOpen ? 'border-white bg-black/80 px-3' : 'border-transparent'
        }`}>
          <button type="button" onClick={handleSearchToggle} className="text-white cursor-pointer p-1">
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          {searchOpen && (
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Títulos, pessoas, gêneros"
              className="bg-transparent text-white text-sm outline-none w-48 ml-2 placeholder:text-gray-400"
            />
          )}
        </form>

        <Bell size={20} className="text-white cursor-pointer hover:text-gray-300" />

        <div className="flex items-center gap-1 cursor-pointer group">
          <div className="w-8 h-8 rounded bg-[#E50914] flex items-center justify-center text-sm font-bold">M</div>
          <ChevronDown size={16} className="text-white group-hover:rotate-180 transition-transform duration-200" />
        </div>
      </div>
    </nav>
  )
}
