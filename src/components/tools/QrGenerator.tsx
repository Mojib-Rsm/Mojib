'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { QrCode } from 'lucide-react';

export function QrGenerator() {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateQr = () => {
    if (inputValue.trim()) {
      setQrCodeUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
          inputValue
        )}`
      );
    }
  };

  return (
    <Card className="w-full glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><QrCode /> {t('qrGeneratorTitle')}</CardTitle>
        <CardDescription>
          Enter any text or URL to generate a QR code instantly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow space-y-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('qrInputPlaceholder')}
            />
            <Button onClick={generateQr} className="w-full md:w-auto">
              {t('qrGenerateButton')}
            </Button>
          </div>
          <div className="w-full md:w-[250px] h-[250px] bg-secondary rounded-lg flex items-center justify-center border">
            {qrCodeUrl ? (
              <Image
                src={qrCodeUrl}
                alt="Generated QR Code"
                width={250}
                height={250}
              />
            ) : (
              <p className="text-muted-foreground text-center p-4">Your QR code will appear here</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
