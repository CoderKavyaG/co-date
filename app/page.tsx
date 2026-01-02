import BirthdayForm from "@/components/BirthdayForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="fixed w-full top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50 transition-all duration-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-extrabold text-lg tracking-tighter">CD</span>
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">co-date</span>
            </div>
            <nav className="hidden sm:flex items-center gap-8">
              <a href="#how-it-works" className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
              <a href="https://github.com/CoderKavyaG/co-date" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors">GitHub</a>
              <a
                href="https://x.com/goelsahhab"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-900 text-white text-base font-medium rounded-xl hover:bg-gray-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Follow Updates
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 min-h-[calc(100vh)] pt-32 flex flex-col justify-center items-center pb-16 sm:pb-24">
        <div className="w-full max-w-4xl text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-red-50 text-red-600 text-sm font-semibold tracking-wide uppercase animate-fade-in-up">
            ✨ Discover your spot on Earth
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
            Your Birthday, Now <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 to-red-400">Mapped.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed font-light">
            Every date creates a coordinate. Find where in the world your birthday lives.
          </p>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-gray-200/50 transform transition-all hover:scale-[1.01] duration-500">
            <BirthdayForm />
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-gray-100 min-h-screen flex items-center py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
                It's kinda magic 🎩
              </h2>
              <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
                We turn your special date into real coordinates. Is it an ocean? A city? A desert?
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-2 shadow-xl max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src="/preview-card.png"
                  alt="Birthday Map Preview"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto px-4 min-h-screen flex items-center py-24 bg-gray-50/50">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need
            </h2>
            <p className="text-xl text-gray-500 font-light">
              Simple, fast, and completely free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 text-gray-900">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Deterministic Math</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Same birthday = Same place. Always. It is a fun way to find your "birth place" in a parallel universe.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 text-gray-900">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Visual Explorer</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                We use OpenStreetMap to show you exactly where you landed. Zoom in, explore, look around.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 text-gray-900">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Share the Fun</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Generated a cool spot? Share the card with friends and compare where everyone belongs.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 text-gray-900">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Fast & Modern</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Built with Next.js and React for instant page loads and a smooth user experience.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 text-gray-900">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Responsive Design</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Your birthday place looks perfect on every device, from desktop to mobile phones.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 text-gray-900">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">100% Free</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                No API keys, no registration, no payment required. Completely free and open source.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col items-center">

            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CD</span>
              </div>
              <span className="text-xl font-bold text-gray-900">co-date</span>
            </div>

            <div className="flex gap-8 mb-8">
              <a href="https://github.com/CoderKavyaG/co-date" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors font-medium">GitHub</a>
              <a href="https://x.com/goelsahhab" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors font-medium">Twitter / X</a>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm font-medium">
                2025 | Developed by <a href="https://x.com/goelsahhab" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">@goelsahhab</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
