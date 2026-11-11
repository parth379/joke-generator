# joke-generator

Random Joke Generator using External APIs, built with React + Vite + Tailwind and animated components from [React Bits](https://reactbits.dev).

Jokes come from the [Official Joke API](https://official-joke-api.appspot.com/random_joke). If the API can't be reached, the app shows a few built-in jokes instead.

## Run it

```bash
npm install
npm run dev
```

## React Bits components used

They live in `src/components/reactbits/` (TypeScript + Tailwind versions):

- **Aurora** – animated background
- **ShinyText** – title shine effect
- **SpotlightCard** – card that glows under the cursor
- **BlurText** – setup and punchline animate in word by word
- **ClickSpark** – sparks when you click "Naya joke"

To add more, pick a component on reactbits.dev and run its CLI command, e.g.:

```bash
npx shadcn@latest add https://reactbits.dev/r/SplitText-TS-TW
```
