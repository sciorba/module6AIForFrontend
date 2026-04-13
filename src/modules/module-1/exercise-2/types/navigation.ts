export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isActive?: boolean;
}

export interface UserInfo {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface NavbarProps {
  logo: string;
  navItems: NavItem[];
  user?: UserInfo;
  onSearch?: (query: string) => void;
  onLogout?: () => void;
}
