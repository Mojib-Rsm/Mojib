
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const initialMessages = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    subject: 'Inquiry about WordPress Development',
    message: 'Hello, I was wondering if you are available for a new WordPress project. We need a custom theme developed for our corporate blog. Please let me know your availability and rates. Thanks!',
    date: '2024-07-20T10:30:00Z',
    status: 'Unread',
  },
  {
    id: 2,
    name: 'Bob Williams',
    email: 'bob@example.com',
    subject: 'Question about AI Integration',
    message: 'I am interested in your AI integration services. Can you provide more details on how you integrate chatbots into existing websites? We are looking to improve customer support on our e-commerce site.',
    date: '2024-07-19T15:00:00Z',
    status: 'Read',
  },
    {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    subject: 'Digital Marketing Proposal',
    message: 'Could you send over a proposal for a comprehensive digital marketing strategy? Our main goals are to increase brand awareness and generate more leads. Looking forward to hearing from you.',
    date: '2024-07-18T09:00:00Z',
    status: 'Read',
  },
];

type Message = {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: 'Read' | 'Unread';
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleAccordionChange = (value: string) => {
    const messageId = parseInt(value.split('-')[1]);
    const message = messages.find(m => m.id === messageId);
    if (message && message.status === 'Unread') {
        setMessages(messages.map(m => m.id === messageId ? {...m, status: 'Read'} : m));
    }
  }
  
  const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      })
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
                                    <p className="text-xs text-muted-foreground hidden md:block">{formatDate(message.date)}</p>
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
        </CardContent>
      </Card>
    </div>
  );
}
