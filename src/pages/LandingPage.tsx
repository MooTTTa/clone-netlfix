import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const FAQ_ITEMS = [
  {
    question: 'O que é Netflix?',
    answer: 'A Netflix é um serviço de streaming que oferece uma grande variedade de séries, filmes, animes, documentários e muito mais em milhares de dispositivos conectados à Internet.',
  },
  {
    question: 'Quanto custa a Netflix?',
    answer: 'Assista à Netflix no smartphone, tablet, Smart TV, notebook ou TV a cabo, sem custos adicionais. Planos a partir de R$ 20,90 por mês. Sem contratos extras e sem compromissos.',
  },
  {
    question: 'Onde posso assistir?',
    answer: 'Assista onde quiser, quando quiser. Faça login na sua conta da Netflix em netflix.com em qualquer computador conectado à Internet ou em qualquer dispositivo compatível com a Internet.',
  },
  {
    question: 'Como faço para cancelar?',
    answer: 'A Netflix é flexível. Sem contratos chatos, sem compromissos. É fácil cancelar sua conta online com apenas dois cliques. Sem taxas de cancelamento.',
  },
  {
    question: 'O que posso assistir na Netflix?',
    answer: 'A Netflix tem um extenso catálogo de filmes, documentários, séries, animes e originais Netflix. Assista o quanto quiser, quando quiser.',
  },
]

export function LandingPage() {
  const [email, setEmail] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/browse')
  }

  return (
    <div className="bg-black text-white">
      <header
        className="relative min-h-[70vh] flex flex-col bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/a449faea-1c7d-4b27-b5e9-6bf5e4c26c13/BR-pt-20240311-popsignuptwoweeks-perspective_alpha_website_small.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />

        <nav className="relative z-10 flex items-center justify-between px-8 md:px-16 py-6">
          <span className="text-[#E50914] font-black text-2xl md:text-3xl tracking-widest select-none">NETFLIX</span>
          <button
            onClick={() => navigate('/browse')}
            className="bg-[#E50914] text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-[#c40812] transition-colors"
          >
            Entrar
          </button>
        </nav>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl leading-tight">
            Filmes, séries e muito mais. Sem limites.
          </h1>
          <p className="text-xl md:text-2xl mb-2">Assista onde quiser. Cancele quando quiser.</p>
          <p className="text-base md:text-lg mb-6 text-gray-300">
            Quer assistir agora? Insira seu email para criar ou reiniciar a sua conta.
          </p>

          <form onSubmit={handleStart} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Endereço de email"
              className="flex-1 bg-black/60 border border-gray-600 text-white px-5 py-4 rounded text-base placeholder:text-gray-400 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#E50914] text-white font-bold px-8 py-4 rounded text-xl hover:bg-[#c40812] transition-colors whitespace-nowrap"
            >
              Vamos lá
              <ChevronRight size={24} />
            </button>
          </form>
        </div>
      </header>

      <div className="border-t-8 border-gray-800">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto px-6 py-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Aproveite na TV.</h2>
            <p className="text-gray-300 text-xl">Assista em Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, reprodutores de Blu-ray e muito mais.</p>
          </div>
          <div className="md:w-1/2">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="TV" className="w-full" />
          </div>
        </div>
      </div>

      <div className="border-t-8 border-gray-800">
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 max-w-5xl mx-auto px-6 py-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Baixe suas séries para assistir offline.</h2>
            <p className="text-gray-300 text-xl">Salve seu conteúdo favorito com facilidade e tenha sempre algo para assistir.</p>
          </div>
          <div className="md:w-1/2">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="Mobile" className="w-full rounded-lg" />
          </div>
        </div>
      </div>

      <div className="border-t-8 border-gray-800">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto px-6 py-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Assista em todos os lugares.</h2>
            <p className="text-gray-300 text-xl">Transmita filmes e séries ilimitados no celular, tablet, laptop e TV sem pagar a mais.</p>
          </div>
          <div className="md:w-1/2">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" alt="Devices" className="w-full" />
          </div>
        </div>
      </div>

      <div className="border-t-8 border-gray-800">
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 max-w-5xl mx-auto px-6 py-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Crie perfis para crianças.</h2>
            <p className="text-gray-300 text-xl">Crianças vão adorar uma experiência diferente, só para elas, dentro da sua conta, com seus personagens e histórias favoritas.</p>
          </div>
          <div className="md:w-1/2">
            <img src="https://occ-0-6594-93.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABejro9CE2SHPmHaFxuGBMTHRBmCJCGGBBgHiJQKf4jmqJFanBuAFzPVFqLqGDVRTOzv7V1qhDGjfCSrpuUiD1x11gUV1kUCjQEDChHYdFrW4AvFluqHMCpXfPYbj6g.png?r=54d" alt="Kids" className="w-full" />
          </div>
        </div>
      </div>

      <div className="border-t-8 border-gray-800 py-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Perguntas Frequentes</h2>
        <div className="max-w-3xl mx-auto space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="bg-[#2d2d2d]">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between text-xl font-medium hover:bg-[#414141] transition-colors"
              >
                {item.question}
                <span className="text-4xl ml-4">{openFaq === i ? '×' : '+'}</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 pt-2 text-xl text-gray-200 border-t border-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleStart} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mt-12">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Endereço de email"
            className="flex-1 bg-black/60 border border-gray-600 text-white px-5 py-4 rounded text-base placeholder:text-gray-400 focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#E50914] text-white font-bold px-8 py-4 rounded text-xl hover:bg-[#c40812] transition-colors"
          >
            Vamos lá
            <ChevronRight size={24} />
          </button>
        </form>
      </div>

      <div className="border-t-8 border-gray-800 py-12 px-6 text-gray-500 text-sm">
        <div className="max-w-5xl mx-auto">
          <p className="mb-6">Tem perguntas? Ligue 0800-591-9127</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['FAQ', 'Centro de Ajuda', 'Conta', 'Mídia', 'Preferências de Cookies',
              'Privacidade', 'Termos de Uso', 'Informações Corporativas',
              'Só na Netflix'].map(link => (
              <a key={link} href="#" className="hover:underline">{link}</a>
            ))}
          </div>
          <p className="mt-6">Netflix Brasil</p>
          <p className="mt-2 text-xs">Clone educacional — não é a Netflix oficial</p>
        </div>
      </div>
    </div>
  )
}
