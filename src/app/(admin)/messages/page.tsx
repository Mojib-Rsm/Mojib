
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getMessages, addMessage, updateMessageStatus, Message } from '@/services/messages';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const initialMessages = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    subject: 'Inquiry about WordPress Development',
    message: 'Hello, I was wondering if you are available for a new WordPress project. We need a custom theme developed for our corporate blog. Please let me know your availability and rates. Thanks!',
    status: 'Unread',
  },
  {
    name: 'Bob Williams',
    email: 'bob@example.com',
    subject: 'Question about AI Integration',
    message: 'I am interested in your AI integration services. Can you provide more details on how you integrate chatbots into existing websites? We are looking to improve customer support on our e-commerce site.',
    status: 'Read',
  },
    {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    subject: 'Digital Marketing Proposal',
    message: 'Could you send over a proposal for a comprehensive digital marketing strategy? Our main goals are to increase brand awareness and generate more leads. Looking forward to hearing from you.',
    status: 'Read',
  },
];


export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        let fetchedMessages = await getMessages();
        if (fetchedMessages.length === 0) {
            const seedPromises = initialMessages.map(m => addMessage(m as Omit<Message, 'id' | 'date' | 'createdAt'>));
            await Promise.all(seedPromises);
            fetchedMessages = await getMessages();
             toast({
                title: "Demo messages seeded!",
                description: "Initial messages have been added to Firestore.",
            });
        }
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
    fetchMessages();
  }, [toast]);

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
