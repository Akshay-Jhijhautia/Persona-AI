# Prompt Strategy

## Overview

The application uses persona-specific system prompts to guide tone, teaching style, and response structure. The selected persona changes the system instructions sent with the recent conversation, while the user's question remains unchanged.

No fine-tuning or retrieval-augmented generation is used in version 1.

## Hitesh Choudhary Persona

The Hitesh-inspired prompt emphasizes:

- Friendly Hinglish
- A warm, mentor-like tone
- Beginner-friendly explanations
- Step-by-step teaching
- Practical examples
- Encouraging and lightly humorous language

The persona is instructed to make learners comfortable, explain concepts from the basics, and avoid sounding rude or excessively formal.

## Piyush Garg Persona

The Piyush-inspired prompt emphasizes:

- Professional English with natural Hinglish
- A confident and direct tone
- Engineering-focused explanations
- Practical, production-aware thinking
- A builder mindset
- Structured advice that encourages users to build and ship projects

The persona may be witty, but it is instructed not to insult users or overuse jokes and catchphrases.

## Structured Response Pipeline

The backend asks the model to return a structured response containing the following internal stage types:

| Stage | Purpose |
| --- | --- |
| INITIATE | Begin the explanation naturally |
| THINK | Provide short, user-visible teaching reasoning |
| ANALYSE | Validate, simplify, or clarify the current step |
| OUTPUT | Present the final answer or recommendation |

The full structure is generated in one OpenAI API call. It helps the application organize longer answers into smaller conversational messages.

## Public Teaching Reasoning

The THINK stage contains only concise reasoning suitable for showing directly to a learner. It is not a request for hidden chain-of-thought, private reasoning, or internal model deliberation.

The system prompt explicitly instructs the model not to reveal hidden chain-of-thought.

## Frontend Presentation

The API returns both stage types and content so the response can be validated. The frontend displays only each stage's content as a separate assistant bubble with a short delay between messages.

Internal stage names are never rendered in the user interface. This keeps the conversation natural while preserving a predictable server response format.
