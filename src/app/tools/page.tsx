'use client';

import { useLanguage } from '@/contexts/LanguageProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrGenerator } from '@/components/tools/QrGenerator';
import { TextFormatter } from '@/components/tools/TextFormatter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image as ImageIcon, Search } from 'lucide-react';

export default function ToolsPage() {
  const { t } = useLanguage();

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">{t('toolsTitle')}</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          A collection of handy utilities to help with your daily tasks.
        </p>
      </div>
      <Tabs defaultValue="text-formatter" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="text-formatter">{t('textFormatterTitle')}</TabsTrigger>
          <TabsTrigger value="qr-generator">{t('qrGeneratorTitle')}</TabsTrigger>
          <TabsTrigger value="image-compressor" disabled>{t('imageCompressorTitle')}</TabsTrigger>
          <TabsTrigger value="domain-checker" disabled>{t('domainCheckerTitle')}</TabsTrigger>
        </TabsList>
        <TabsContent value="text-formatter">
          <TextFormatter />
        </TabsContent>
        <TabsContent value="qr-generator">
          <QrGenerator />
        </TabsContent>
        <TabsContent value="image-compressor">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ImageIcon/> {t('imageCompressorTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">This feature is coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="domain-checker">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Search/> {t('domainCheckerTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">This feature is coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
