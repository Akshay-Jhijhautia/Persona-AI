# Persona AI Chat

Persona AI Chat is an educational chat application that simulates teaching styles inspired by publicly available content from Hitesh Choudhary and Piyush Garg. It combines a ChatGPT-style interface with persona-specific prompting and structured responses from the OpenAI API.

> **Disclaimer:** This project is an AI-generated educational simulation inspired by publicly available teaching styles. It is not affiliated with, endorsed by, or operated by Hitesh Choudhary or Piyush Garg, and it does not represent either real person.

## Features

- ChatGPT-style responsive chat interface
- Hitesh Choudhary and Piyush Garg persona selector
- Light and dark themes
- Persona-specific teaching tone and response style
- Multi-message conversational presentation
- Recent-message context management
- Strictly validated structured API responses
- Loading, error, and auto-scroll behavior
- Server-side OpenAI API key handling
- No RAG, fine-tuning, or database required for v1

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 App Router | Frontend application and API route |
| React 19 | Interactive chat state and UI |
| TypeScript | Strict application and API types |
| Tailwind CSS 4 | Responsive light and dark styling |
| OpenAI Node SDK | Server-side Responses API integration |
| GPT-4o | Default language model |

## How the App Works

1. The user chooses a persona and enters a message.
2. The frontend stores the conversation in React state.
3. The latest eight user and assistant messages are sent to the **/api/chat** route.
4. The server validates the request and builds the selected persona's system prompt.
5. The server makes one OpenAI Responses API call for the user submission.
6. OpenAI returns a structured response organized into internal stages.
7. The frontend validates the response and displays only each stage's natural-language content as a separate chat bubble.

The stage names are implementation details and are never shown in the chat interface.

## Run Locally

### Prerequisites

- Node.js 20.9.0 or newer
- npm
- An OpenAI API key

### Setup

1. Clone the repository and enter the project directory.

       git clone <repository-url>
       cd Persona-AI

2. Install dependencies.

       npm install

3. Create a **.env.local** file in the project root.

       OPENAI_API_KEY=your_openai_api_key
       OPENAI_MODEL=gpt-4o

4. Start the development server.

       npm run dev

5. Open http://localhost:3000 in a browser. To use port 3001 instead:

       npm run dev -- -p 3001

Do not commit **.env.local** or expose the API key through a variable prefixed with **NEXT_PUBLIC_**.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| OPENAI_API_KEY | Yes | Server-side OpenAI API key |
| OPENAI_MODEL | No | Model used by the API route; defaults to gpt-4o |

## Available Scripts

| Command | Description |
| --- | --- |
| npm run dev | Start the development server |
| npm run build | Create a production build |
| npm run start | Start the production server |
| npm run lint | Run ESLint |

## Deployment

The project can be deployed to Vercel or another Next.js-compatible platform.

For a Vercel deployment:

1. Import the repository.
2. Add **OPENAI_API_KEY** and, optionally, **OPENAI_MODEL** in the project environment settings.
3. Deploy using the default Next.js build configuration.

Keep all secrets in the deployment platform's server-side environment settings. Never commit API keys to source control.

## Version 1 Scope

Version 1 intentionally uses:

- Prompt-based persona simulation
- One LLM call per user message
- An eight-message context window
- In-memory frontend chat state

Version 1 does not include:

- Retrieval-augmented generation (RAG)
- Fine-tuning
- Database or conversation persistence
- User authentication

## Project Documentation

- [Data Collection](docs/data-collection.md)
- [Prompt Strategy](docs/prompt-strategy.md)
- [Context Management](docs/context-management.md)
- [Sample Conversations](docs/sample-conversations.md)

## Disclaimer

This is an AI-generated educational simulation inspired by publicly available teaching styles. The generated responses may be inaccurate and should be independently verified. The application does not claim that its responses were written, approved, or spoken by the real individuals.
