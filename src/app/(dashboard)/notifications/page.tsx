'use client';

import { useState } from 'react';
import {
  Bell,
  Mail,
  MessageSquare,
  Send,
  History,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { notifications } from '@/lib/data';
import type { Notification, NotificationType } from '@/lib/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export default function NotificationsPage() {
  const [notificationType, setNotificationType] = useState<NotificationType>('push');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('All Users');
  const { toast } = useToast();

  const handleSendNotification = () => {
    if (!message || (notificationType !== 'sms' && !title)) {
      toast({
        variant: 'destructive',
        title: 'Missing Content',
        description: 'Please provide a title and message before sending.',
      });
      return;
    }
    toast({
      title: '🚀 Notification Sent!',
      description: `Your ${notificationType.toUpperCase()} has been sent to ${target}.`,
    });
    // Reset form
    setTitle('');
    setMessage('');
    setTarget('All Users');
  };
  
  const notificationStatusVariant: {[key: string]: "default" | "secondary" | "destructive"} = {
      sent: "default",
      failed: "destructive",
      scheduled: "secondary",
      draft: "secondary"
  }

  const renderIcon = (type: NotificationType) => {
    switch (type) {
      case 'push': return <Bell className="w-4 h-4" />;
      case 'sms': return <MessageSquare className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      default: return null;
    }
  };


  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>
            Communicate with your users via push, SMS, or email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="send">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="send">
                <Send className="mr-2 h-4 w-4" />
                Send Notification
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="mr-2 h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="send">
              <div className="grid gap-6 pt-4">
                <div className="grid gap-3">
                  <Label>Channel</Label>
                  <Select onValueChange={(val) => setNotificationType(val as NotificationType)} defaultValue="push">
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="push"><Bell className="inline-block mr-2 h-4 w-4" />Push Notification</SelectItem>
                      <SelectItem value="sms"><MessageSquare className="inline-block mr-2 h-4 w-4" />SMS</SelectItem>
                      <SelectItem value="email"><Mail className="inline-block mr-2 h-4 w-4" />Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {notificationType !== 'sms' && (
                  <div className="grid gap-3">
                    <Label htmlFor="title">Title / Subject</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={
                        notificationType === 'push'
                          ? 'Enter push notification title'
                          : 'Enter email subject'
                      }
                    />
                  </div>
                )}
                <div className="grid gap-3">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Compose your message..."
                    className="min-h-[120px]"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="target">Target Audience</Label>
                  <Select onValueChange={setTarget} defaultValue="All Users">
                    <SelectTrigger>
                      <SelectValue placeholder="Select target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Users">All Users</SelectItem>
                      <SelectItem value="Sellers">Sellers</SelectItem>
                      <SelectItem value="Agents">Agents</SelectItem>
                      <SelectItem value="Buyers">Buyers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSendNotification} className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardHeader className="px-0">
                  <CardTitle>Notification History</CardTitle>
                  <CardDescription>
                    A log of all previously sent notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Type</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notifications.map((notif) => (
                        <TableRow key={notif.id}>
                          <TableCell>
                            <Badge variant="secondary" className="flex items-center gap-1 capitalize">
                              {renderIcon(notif.type)}
                              {notif.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">{notif.title}</p>
                            <p className="text-xs text-muted-foreground">{notif.message}</p>
                          </TableCell>
                           <TableCell>{notif.target}</TableCell>
                          <TableCell>
                            <Badge variant={notificationStatusVariant[notif.status]} className="capitalize">{notif.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right text-xs">
                            {format(new Date(notif.createdAt), 'PPp')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
