'use server';

import { formatText as formatTextFlow } from '@/ai/flows/text-formatter';
import type { FormatTextInput } from '@/ai/flows/text-formatter';

export async function formatText(
  input: FormatTextInput
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const result = await formatTextFlow(input);
    return { success: true, data: result.formattedText };
  } catch (error) {
    console.error('Error formatting text:', error);
    // Return a generic error message to the user
    return { success: false, error: 'An unexpected error occurred while formatting text.' };
  }
}
