Create submission-ready documentation for my Gen AI persona chat project.

Project context:

- Next.js + TypeScript + Tailwind CSS
- OpenAI API using GPT-4o
- ChatGPT-style UI
- Persona dropdown supports:
  - Hitesh Choudhary
  - Piyush Garg
- Backend route: /api/chat
- No RAG in v1
- No fine-tuning
- One LLM call per user message
- Backend returns structured stages internally:
  INITIATE, THINK, ANALYSE, OUTPUT
- Frontend displays only stage.content, not stage.type
- API key remains server-side in .env.local

Task:
Create/update these files:

1. README.md
   Include:

- Project title
- Short description
- Features
- Tech stack
- How to run locally
- Required environment variables
- How the app works
- Deployment note
- Disclaimer that this is an AI-generated educational simulation inspired by public teaching styles, not the real person

2. docs/data-collection.md
   Explain:

- Persona data was collected from publicly available content like official websites, YouTube videos, talks, blogs, and social media presence
- No private data used
- No scraping automation required for v1
- Observations were manually converted into persona traits, tone, teaching style, common phrases, and do/don't rules

3. docs/prompt-strategy.md
   Explain:

- Persona-specific system prompts
- Hitesh persona: friendly Hinglish, beginner-friendly, warm mentor style
- Piyush persona: professional Hinglish, confident, engineering-focused, builder mindset
- Structured response pipeline
- Internal stages are used for response organization, but hidden from frontend
- THINK stage is public teaching reasoning only, not hidden chain-of-thought

4. docs/context-management.md
   Explain:

- Frontend keeps chat messages in React state
- Only recent 8 messages are sent to backend
- This controls token usage and keeps context relevant
- Persona can be switched using dropdown
- No database persistence in v1

5. docs/sample-conversations.md
   Add:

- One sample Hitesh conversation for: What is 2 \* 4 - 5 / 8 + 6?
- One sample Piyush conversation for: Can I build a todo app and run it locally?
- Samples should show natural user-visible messages only, not INITIATE/THINK/ANALYSE labels

Important:

- Do not modify app code.
- Do not add new packages.
- Keep documentation simple, clear, and assignment-ready.
- Use Markdown.
