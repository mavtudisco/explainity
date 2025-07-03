# Explainity - AI Chat with Search Integration

A Next.js application that combines AI chat functionality with web search integration, similar to Perplexity. Features include real-time search, AI-powered responses with source citations, and a modern tabbed interface.

## Features

- 🤖 AI-powered chat with streaming responses
- 🔍 Real-time web search integration
- 📚 Source citations and references
- 🎨 Modern, responsive UI with tabbed interface
- ⚡ Multiple search modes (Quick, Balanced, Deep, Creative)
- 🎯 AI model selection (GPT-4, Claude, Gemini)

## Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- PostgreSQL database (for production) or SQLite (for development)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mavtudisco/explainity.git
cd explainity
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/explainity"
# For development, you can use SQLite:
# DATABASE_URL="file:./dev.db"

# OpenAI API Key (required for AI chat functionality)
OPENAI_API_KEY="your-openai-api-key-here"

### 4. Database Setup

Set up your database using Prisma:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database with initial data
npx prisma db seed
```

### 5. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
explainity/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   │   ├── chat/      # AI chat endpoint
│   │   │   ├── search/    # Search API
│   │   │   └── auth/      # Authentication
│   │   ├── components/    # React components
│   │   │   ├── ui/        # UI components
│   │   │   └── custom/    # Custom components
│   │   └── lib/           # Utility functions
│   └── prisma/            # Database schema and migrations
├── public/                # Static assets
└── .env.example          # Environment variables template
```

## API Endpoints

- `POST /api/chat` - AI chat endpoint
- `POST /api/chat-with-search` - AI chat with search integration
- `GET /api/search` - Web search API
- `POST /api/auth/[...all]` - Authentication endpoints

## Database Schema

The application uses Prisma with the following main models:
- `User` - User accounts and authentication
- `Chat` - Chat sessions and messages
- `SearchResult` - Cached search results

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Prisma Documentation](https://www.prisma.io/docs) - database toolkit for Node.js
- [OpenAI API Documentation](https://platform.openai.com/docs) - AI model integration
- [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) - deploy your Next.js app
