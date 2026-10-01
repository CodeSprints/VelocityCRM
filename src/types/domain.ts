export type RecordStatus = 'hot' | 'warm' | 'cold';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  status: RecordStatus;
  avatar: string;
  lastContact: string;
  value: number;
  source: string;
}

export interface Organization {
  id: string;
  name: string;
  category: string;
  size: string;
  revenue: string;
  website: string;
  contactIds: string[];
}

export type PipelineStageId = 'discovery' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';

export interface PipelineItem {
  id: string;
  title: string;
  value: number;
  stage: PipelineStageId;
  probability: number;
  contactId: string;
  expectedCloseDate: string;
  notes: string;
}

export type ActivityType = 'call' | 'email' | 'meeting' | 'task';

export interface ActivityEntry {
  id: string;
  type: ActivityType;
  title: string;
  contactId: string;
  date: string;
  notes: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
  contactId?: string;
  dueDate: string;
  createdAt: string;
}

export type NotificationType = 'deal' | 'contact' | 'task' | 'system';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

export interface InboxMessage {
  id: string;
  subject: string;
  sender: string;
  senderName: string;
  preview: string;
  isRead: boolean;
  isStarred: boolean;
  receivedAt: string;
  contactId?: string;
}

export interface DocumentFile {
  id: string;
  name: string;
  category: string;
  size: string;
  updatedAt: string;
  owner: string;
}

export type ThemePreference = 'light' | 'dark' | 'system';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  phone: string;
  timezone: string;
  preferences: {
    theme: ThemePreference;
    notifications: {
      email: boolean;
      push: boolean;
      deals: boolean;
      tasks: boolean;
      contacts: boolean;
    };
  };
}
