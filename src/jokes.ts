export type Joke = {
  setup: string
  punchline: string
}

const API_URL = 'https://official-joke-api.appspot.com/random_joke'

// Used when the API is unreachable, so the app always has something to show.
const FALLBACK_JOKES: Joke[] = [
  { setup: "Why don't scientists trust atoms?", punchline: 'Because they make up everything.' },
  { setup: 'Why did the developer go broke?', punchline: 'Because he used up all his cache.' },
  { setup: 'How do you comfort a JavaScript bug?', punchline: 'You console it.' },
  { setup: 'Why do programmers prefer dark mode?', punchline: 'Because light attracts bugs.' },
  { setup: 'What do you call a fake noodle?', punchline: 'An impasta.' },
  { setup: 'Why did the scarecrow win an award?', punchline: 'He was outstanding in his field.' },
]

export function randomFallbackJoke(exclude?: Joke): Joke {
  const options = FALLBACK_JOKES.filter((j) => j.setup !== exclude?.setup)
  return options[Math.floor(Math.random() * options.length)]
}

export async function fetchJoke(signal?: AbortSignal): Promise<Joke> {
  const res = await fetch(API_URL, { signal })
  if (!res.ok) throw new Error(`Joke API returned ${res.status}`)
  const data = (await res.json()) as Partial<Joke>
  if (!data.setup || !data.punchline) throw new Error('Joke API returned an unexpected shape')
  return { setup: data.setup, punchline: data.punchline }
}
