'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { formatText } from '@/app/actions';
import { Wand2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function TextFormatter() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormat = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    const result = await formatText({ text: inputText });
    setIsLoading(false);

    if (result.success && result.data) {
      setOutputText(result.data);
      toast({
        title: "Success",
        description: "Text formatted successfully.",
      })
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to format text.",
      })
    }
  };

  return (
    <Card className="w-full glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Wand2 /> {t('textFormatterTitle')}</CardTitle>
        <CardDescription>
          Paste any text to automatically clean up formatting, correct spacing, and standardize its appearance using AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="input-text">{t('textFormatterInputLabel')}</Label>
            <Textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here..."
              className="min-h-[200px] md:min-h-[300px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="output-text">{t('textFormatterOutputLabel')}</Label>
            <Textarea
              id="output-text"
              value={outputText}
              readOnly
              placeholder="Formatted text will appear here..."
              className="min-h-[200px] md:min-h-[300px] bg-secondary"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Button onClick={handleFormat} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('textFormatterLoading')}
              </>
            ) : (
              t('textFormatterButton')
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
