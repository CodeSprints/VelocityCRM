import { defineStore } from 'pinia';

import type {
  ActivityEntry,
  AppNotification,
  Contact,
  CurrentUser,
  DocumentFile,
  InboxMessage,
  Organization,
  PipelineItem,
  TaskItem,
} from '@/types/domain';
import { createId } from '@/utils/id';

interface CrmState {
  contacts: Contact[];
  organizations: Organization[];
  pipelineItems: PipelineItem[];
  activities: ActivityEntry[];
  tasks: TaskItem[];
  notifications: AppNotification[];
  messages: InboxMessage[];
  documents: DocumentFile[];
  currentUser: CurrentUser;
}

const initialContacts: Contact[] = [
  {
    id: 'c1',
    name: 'Sarah Johnson',
    email: 'sarah@techstartup.com',
    phone: '+1 (555) 123-4567',
    organization: 'TechStartup Inc.',
    role: 'CTO',
    status: 'hot',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    lastContact: '2025-01-15',
    value: 150000,
    source: 'Website',
  },
  {
    id: 'c2',
    name: 'Michael Chen',
    email: 'mchen@innovatecorp.com',
    phone: '+1 (555) 987-6543',
    organization: 'InnovateCorp',
    role: 'VP of Sales',
    status: 'warm',
    avatar:
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    lastContact: '2025-01-12',
    value: 75000,
    source: 'Referral',
  },
  {
    id: 'c3',
    name: 'Emily Rodriguez',
    email: 'emily@growthco.io',
    phone: '+1 (555) 456-7890',
    organization: 'GrowthCo',
    role: 'CEO',
    status: 'cold',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    lastContact: '2025-01-08',
    value: 200000,
    source: 'Cold outreach',
  },
];

const initialOrganizations: Organization[] = [
  {
    id: 'o1',
    name: 'TechStartup Inc.',
    category: 'Technology',
    size: '50-100',
    revenue: '$5M-$10M',
    website: 'https://techstartup.example.com',
    contactIds: ['c1'],
  },
  {
    id: 'o2',
    name: 'InnovateCorp',
    category: 'Software',
    size: '100-500',
    revenue: '$10M-$50M',
    website: 'https://innovatecorp.example.com',
    contactIds: ['c2'],
  },
  {
    id: 'o3',
    name: 'GrowthCo',
    category: 'Consulting',
    size: '10-50',
    revenue: '$1M-$5M',
    website: 'https://growthco.example.com',
    contactIds: ['c3'],
  },
];

const initialPipelineItems: PipelineItem[] = [
  {
    id: 'p1',
    title: 'Enterprise software licence',
    value: 150000,
    stage: 'proposal',
    probability: 75,
    contactId: 'c1',
    expectedCloseDate: '2026-02-28',
    notes: 'Technical review completed, waiting for budget approval.',
  },
  {
    id: 'p2',
    title: 'Consulting services package',
    value: 75000,
    stage: 'negotiation',
    probability: 60,
    contactId: 'c2',
    expectedCloseDate: '2026-03-15',
    notes: 'Price negotiations ongoing, strong interest shown.',
  },
  {
    id: 'p3',
    title: 'Platform integration',
    value: 200000,
    stage: 'discovery',
    probability: 25,
    contactId: 'c3',
    expectedCloseDate: '2026-04-30',
    notes: 'Initial discovery call scheduled for next week.',
  },
  {
    id: 'p4',
    title: 'Annual support renewal',
    value: 48000,
    stage: 'closed-won',
    probability: 100,
    contactId: 'c1',
    expectedCloseDate: '2026-01-10',
    notes: 'Renewed for another 12 months.',
  },
];

const initialActivities: ActivityEntry[] = [
  {
    id: 'a1',
    type: 'call',
    title: 'Discovery call with Sarah',
    contactId: 'c1',
    date: '2026-01-15',
    notes: 'Discussed technical requirements and implementation timeline.',
  },
  {
    id: 'a2',
    type: 'email',
    title: 'Proposal follow-up',
    contactId: 'c2',
    date: '2026-01-12',
    notes: 'Sent detailed proposal and pricing information.',
  },
  {
    id: 'a3',
    type: 'meeting',
    title: 'Product demo',
    contactId: 'c3',
    date: '2026-01-08',
    notes: 'Demonstrated core platform features, positive feedback received.',
  },
];

const initialTasks: TaskItem[] = [
  {
    id: 't1',
    title: 'Follow up with Sarah Johnson',
    description: 'Send proposal follow-up email',
    priority: 'high',
    status: 'pending',
    assignedTo: 'current-user',
    contactId: 'c1',
    dueDate: '2026-01-20',
    createdAt: '2026-01-15',
  },
  {
    id: 't2',
    title: 'Prepare demo for InnovateCorp',
    description: 'Set up product demo environment',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'current-user',
    contactId: 'c2',
    dueDate: '2026-01-25',
    createdAt: '2026-01-12',
  },
  {
    id: 't3',
    title: 'Quarterly pipeline review',
    description: 'Review open opportunities with the team',
    priority: 'low',
    status: 'completed',
    assignedTo: 'current-user',
    dueDate: '2026-01-05',
    createdAt: '2025-12-20',
  },
];

const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'New record created',
    message: 'Enterprise software licence has been created.',
    type: 'deal',
    isRead: false,
    createdAt: '2026-01-15T10:30:00Z',
  },
  {
    id: 'n2',
    title: 'Task due soon',
    message: 'Follow up with Sarah Johnson is due in 2 days.',
    type: 'task',
    isRead: false,
    createdAt: '2026-01-15T09:15:00Z',
  },
  {
    id: 'n3',
    title: 'Contact updated',
    message: "Michael Chen's information has been updated.",
    type: 'contact',
    isRead: true,
    createdAt: '2026-01-14T16:45:00Z',
  },
];

const initialMessages: InboxMessage[] = [
  {
    id: 'm1',
    subject: 'Proposal discussion',
    sender: 'sarah@techstartup.com',
    senderName: 'Sarah Johnson',
    preview: 'Thank you for the detailed proposal. I have a few questions…',
    isRead: false,
    isStarred: false,
    receivedAt: '2026-01-15T14:30:00Z',
    contactId: 'c1',
  },
  {
    id: 'm2',
    subject: 'Meeting confirmation',
    sender: 'mchen@innovatecorp.com',
    senderName: 'Michael Chen',
    preview: 'Confirming our meeting for tomorrow at 2 PM…',
    isRead: true,
    isStarred: true,
    receivedAt: '2026-01-14T11:20:00Z',
    contactId: 'c2',
  },
];

const initialDocuments: DocumentFile[] = [
  {
    id: 'd1',
    name: 'Enterprise-proposal-v3.pdf',
    category: 'Proposals',
    size: '1.2 MB',
    updatedAt: '2026-01-14',
    owner: 'John Doe',
  },
  {
    id: 'd2',
    name: 'Master-services-agreement.docx',
    category: 'Contracts',
    size: '420 KB',
    updatedAt: '2026-01-10',
    owner: 'John Doe',
  },
];

const initialCurrentUser: CurrentUser = {
  id: 'current-user',
  name: 'John Doe',
  email: 'john.doe@velocitycrm.example',
  avatar:
    'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  role: 'Operations manager',
  department: 'Operations',
  phone: '+1 (555) 123-4567',
  timezone: 'Europe/Warsaw',
  preferences: {
    theme: 'system',
    notifications: {
      email: true,
      push: true,
      deals: true,
      tasks: true,
      contacts: false,
    },
  },
};

export const useCrmStore = defineStore('crm', {
  state: (): CrmState => ({
    contacts: initialContacts,
    organizations: initialOrganizations,
    pipelineItems: initialPipelineItems,
    activities: initialActivities,
    tasks: initialTasks,
    notifications: initialNotifications,
    messages: initialMessages,
    documents: initialDocuments,
    currentUser: initialCurrentUser,
  }),
  getters: {
    unreadNotificationsCount: (state) => state.notifications.filter((item) => !item.isRead).length,
    unreadMessagesCount: (state) => state.messages.filter((item) => !item.isRead).length,
    openPipelineItems: (state) =>
      state.pipelineItems.filter((item) => item.stage !== 'closed-won' && item.stage !== 'closed-lost'),
    wonValue: (state) =>
      state.pipelineItems
        .filter((item) => item.stage === 'closed-won')
        .reduce((total, item) => total + item.value, 0),
    pendingTasksCount: (state) => state.tasks.filter((task) => task.status !== 'completed').length,
    contactById: (state) => (id: string) => state.contacts.find((contact) => contact.id === id),
  },
  actions: {
    addContact(payload: Omit<Contact, 'id'>) {
      this.contacts.push({ ...payload, id: createId('c') });
    },
    updateContact(id: string, updates: Partial<Contact>) {
      const index = this.contacts.findIndex((contact) => contact.id === id);
      const existing = this.contacts[index];
      if (existing) this.contacts[index] = { ...existing, ...updates };
    },
    deleteContact(id: string) {
      this.contacts = this.contacts.filter((contact) => contact.id !== id);
    },
    addOrganization(payload: Omit<Organization, 'id'>) {
      this.organizations.push({ ...payload, id: createId('o') });
    },
    updateOrganization(id: string, updates: Partial<Organization>) {
      const index = this.organizations.findIndex((organization) => organization.id === id);
      const existing = this.organizations[index];
      if (existing) this.organizations[index] = { ...existing, ...updates };
    },
    deleteOrganization(id: string) {
      this.organizations = this.organizations.filter((organization) => organization.id !== id);
    },
    addPipelineItem(payload: Omit<PipelineItem, 'id'>) {
      this.pipelineItems.push({ ...payload, id: createId('p') });
    },
    updatePipelineItem(id: string, updates: Partial<PipelineItem>) {
      const index = this.pipelineItems.findIndex((item) => item.id === id);
      const existing = this.pipelineItems[index];
      if (existing) this.pipelineItems[index] = { ...existing, ...updates };
    },
    deletePipelineItem(id: string) {
      this.pipelineItems = this.pipelineItems.filter((item) => item.id !== id);
    },
    addTask(payload: Omit<TaskItem, 'id'>) {
      this.tasks.push({ ...payload, id: createId('t') });
    },
    updateTask(id: string, updates: Partial<TaskItem>) {
      const index = this.tasks.findIndex((task) => task.id === id);
      const existing = this.tasks[index];
      if (existing) this.tasks[index] = { ...existing, ...updates };
    },
    deleteTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    addActivity(payload: Omit<ActivityEntry, 'id'>) {
      this.activities.unshift({ ...payload, id: createId('a') });
    },
    markNotificationRead(id: string) {
      const notification = this.notifications.find((item) => item.id === id);
      if (notification) notification.isRead = true;
    },
    markAllNotificationsRead() {
      this.notifications.forEach((notification) => {
        notification.isRead = true;
      });
    },
    toggleMessageStar(id: string) {
      const message = this.messages.find((item) => item.id === id);
      if (message) message.isStarred = !message.isStarred;
    },
    toggleMessageRead(id: string) {
      const message = this.messages.find((item) => item.id === id);
      if (message) message.isRead = !message.isRead;
    },
    addDocument(payload: Omit<DocumentFile, 'id'>) {
      this.documents.unshift({ ...payload, id: createId('d') });
    },
    deleteDocument(id: string) {
      this.documents = this.documents.filter((document) => document.id !== id);
    },
    updateCurrentUser(updates: Partial<CurrentUser>) {
      this.currentUser = { ...this.currentUser, ...updates };
    },
  },
  persist: {
    key: 'velocitycrm-data',
  },
});
