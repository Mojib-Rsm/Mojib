
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getMessages, updateMessageStatus, Message } from '@/services/messages';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages: ", error);
      toast({
        title: "Error",
        description: "Could not fetch messages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleAccordionChange = async (value: string) => {
    if(!value) return;
    const messageId = value.split('-')[1];
    const message = messages.find(m => m.id === messageId);
    if (message && message.status === 'Unread') {
        try {
            await updateMessageStatus(messageId, 'Read');
            setMessages(messages.map(m => m.id === messageId ? {...m, status: 'Read'} : m));
        } catch (error) {
            console.error("Error updating message status: ", error);
            toast({
                title: "Error",
                description: "Could not mark message as read.",
                variant: "destructive",
            });
        }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Contact Messages</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Messages submitted through your contact form.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <Accordion type="single" collapsible onValueChange={handleAccordionChange}>
                    {messages.map(message => (
                        <AccordionItem value={`item-${message.id}`} key={message.id} className="border-b">
                            <AccordionTrigger className="w-full text-left hover:no-underline p-4 rounded-lg hover:bg-muted/50">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2.5 h-2.5 rounded-full ${message.status === 'Unread' ? 'bg-primary' : 'bg-transparent'}`}></div>
                                        <div className='text-left'>
                                            <p className={`font-semibold ${message.status === 'Unread' ? 'text-foreground' : 'text-muted-foreground'}`}>{message.name}</p>
                                            <p className="text-sm text-muted-foreground">{message.subject}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-xs text-muted-foreground hidden md:block">{message.date}</p>
                                        {message.status === 'Unread' && <Badge variant="default">New</Badge>}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-muted/30 rounded-b-lg">
                            <p className="text-sm text-muted-foreground mb-4">From: {message.email}</p>
                            <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
