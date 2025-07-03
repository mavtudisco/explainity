import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
}

export async function POST(req: Request) {
  const { messages, searchResults } = await req.json();

  // If we have search results, include them in the context
  let systemMessage = "You are a helpful AI assistant that provides accurate and informative responses.";
  
  if (searchResults && searchResults.length > 0) {
    systemMessage += "\n\nI have found some relevant information to help answer your question:\n\n";
    searchResults.forEach((result: SearchResult, index: number) => {
      systemMessage += `[${index + 1}] ${result.title}\nURL: ${result.url}\nSource: ${result.source}\nSummary: ${result.snippet}\n\n`;
    });
    
    systemMessage += "Please use this information to provide a comprehensive answer. When referencing information from these sources, cite them using [1], [2], etc. Always include the relevant URLs in your response.";
  }

  const result = streamText({
    model: openai('gpt-4o'),
    messages: [
      { role: 'system', content: systemMessage },
      ...messages
    ],
  });

  return result.toDataStreamResponse();
} 