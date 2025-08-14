// Text formatter AI agent.
//
// - formatText - A function that handles the text formatting process.
// - FormatTextInput - The input type for the formatText function.
// - FormatTextOutput - The return type for the formatText function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FormatTextInputSchema = z.object({
  text: z.string().describe('The text to format.'),
});
export type FormatTextInput = z.infer<typeof FormatTextInputSchema>;

const FormatTextOutputSchema = z.object({
  formattedText: z.string().describe('The formatted text.'),
});
export type FormatTextOutput = z.infer<typeof FormatTextOutputSchema>;

export async function formatText(input: FormatTextInput): Promise<FormatTextOutput> {
  return formatTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'formatTextPrompt',
  input: {schema: FormatTextInputSchema},
  output: {schema: FormatTextOutputSchema},
  prompt: `You are a text formatting expert. You will receive text that needs to be formatted, and your job is to clean up formatting inconsistencies, correct spacing, and standardize the appearance of the text. Ensure the text is easy to read and professional. Return only the formatted text.\n\nText to format: {{{text}}}`,
});

const formatTextFlow = ai.defineFlow(
  {
    name: 'formatTextFlow',
    inputSchema: FormatTextInputSchema,
    outputSchema: FormatTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
