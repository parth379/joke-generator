import { useCallback, useEffect, useRef, useState } from 'react'
import Aurora from './components/reactbits/Aurora'
import BlurText from './components/reactbits/BlurText'
import ClickSpark from './components/reactbits/ClickSpark'
import ShinyText from './components/reactbits/ShinyText'
import SpotlightCard from './components/reactbits/SpotlightCard'
import { fetchJoke, randomFallbackJoke, type Joke } from './jokes'

function App() {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [showPunchline, setShowPunchline] = useState(false)
  const [loading, setLoading] = useState(false)
  const [offline, setOffline] = useState(false)
  const [count, setCount] = useState(0)
  const controllerRef = useRef<AbortController | null>(null)

  const loadJoke = useCallback(async () => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setLoading(true)
    setShowPunchline(false)
    try {
      setJoke(await fetchJoke(controller.signal))
      setOffline(false)
    } catch (err) {
      if (controller.signal.aborted) return
      console.warn('Falling back to local jokes:', err)
      setJoke((prev) => randomFallbackJoke(prev ?? undefined))
      setOffline(true)
    }
    setLoading(false)
    setCount((c) => c + 1)
  }, [])

  useEffect(() => {
    void loadJoke()
    return () => controllerRef.current?.abort()
  }, [loadJoke])

  return (
    <main className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <Aurora colorStops={['#7c3aed', '#ec4899', '#22d3ee']} amplitude={1.1} blend={0.5} speed={0.6} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center gap-8 px-4 py-16">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            <ShinyText text="Joke Generator" color="#c4b5fd" shineColor="#ffffff" speed={3} />
          </h1>
          <p className="mt-3 text-sm text-violet-200/70">Ek click, ek joke. 😄</p>
        </header>

        <SpotlightCard
          theme="dark"
          spotlightColor="rgba(236, 72, 153, 0.35)"
          className="w-full rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md sm:p-10"
        >
          <div className="flex min-h-48 flex-col justify-center gap-6" aria-live="polite">
            {joke ? (
              <>
                <BlurText
                  key={`setup-${count}`}
                  text={joke.setup}
                  trigger="load"
                  animateBy="words"
                  direction="top"
                  delay={60}
                  className="text-2xl font-semibold leading-snug text-white sm:text-3xl"
                />
                {showPunchline ? (
                  <BlurText
                    key={`punch-${count}`}
                    text={joke.punchline}
                    trigger="load"
                    effect="zoom"
                    animateBy="words"
                    delay={80}
                    className="text-xl text-pink-200 sm:text-2xl"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPunchline(true)}
                    className="self-start rounded-full border border-pink-300/40 px-4 py-2 text-sm text-pink-200 transition hover:bg-pink-300/10"
                  >
                    Punchline dikhao 👀
                  </button>
                )}
              </>
            ) : (
              <p className="text-lg text-violet-200/70">Joke dhoondh rahe hain…</p>
            )}
          </div>
        </SpotlightCard>

        <ClickSpark sparkColor={['#f472b6', '#a78bfa', '#22d3ee']} sparkCount={10} sparkRadius={28} className="!h-auto !w-auto">
          <button
            type="button"
            onClick={() => void loadJoke()}
            disabled={loading}
            className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:scale-105 active:scale-95 disabled:opacity-60"
          >
            {loading ? 'Loading…' : 'Naya joke 🎲'}
          </button>
        </ClickSpark>

        {offline && (
          <p className="text-xs text-violet-200/60">Joke API nahi mili, isliye saved jokes dikha rahe hain.</p>
        )}
      </div>
    </main>
  )
}

export default App
