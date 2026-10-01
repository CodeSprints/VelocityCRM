import {
  BarChart3,
  Building2,
  CalendarClock,
  CheckSquare,
  FileText,
  Mail,
  Settings,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-vue-next';

export interface NavigationItem {
  to: string;
  labelKey: string;
  icon: LucideIcon;
}

export const navigationItems: NavigationItem[] = [
  { to: '/', labelKey: 'nav.dashboard', icon: BarChart3 },
  { to: '/contacts', labelKey: 'nav.contacts', icon: Users },
  { to: '/organizations', labelKey: 'nav.organizations', icon: Building2 },
  { to: '/pipeline', labelKey: 'nav.pipeline', icon: Target },
  { to: '/tasks', labelKey: 'nav.tasks', icon: CheckSquare },
  { to: '/activities', labelKey: 'nav.activities', icon: CalendarClock },
  { to: '/inbox', labelKey: 'nav.inbox', icon: Mail },
  { to: '/reports', labelKey: 'nav.reports', icon: TrendingUp },
  { to: '/documents', labelKey: 'nav.documents', icon: FileText },
  { to: '/settings', labelKey: 'nav.settings', icon: Settings },
];

const pickNavigationItem = (index: number): NavigationItem => navigationItems[index] as NavigationItem;

export const primaryMobileNavigation: NavigationItem[] = [
  pickNavigationItem(0),
  pickNavigationItem(1),
  pickNavigationItem(3),
  pickNavigationItem(4),
  pickNavigationItem(9),
];
