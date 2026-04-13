export type SettingsTab = "profile" | "notifications" | "privacy" | "appearance";

export interface ProfileSettings {
  fullName: string;
  email: string;
  bio: string;
  language: string;
  timezone: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  mentionAlerts: boolean;
  marketingEmails: boolean;
}

export interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends";
  showEmail: boolean;
  showActivity: boolean;
  allowIndexing: boolean;
  twoFactorAuth: boolean;
}

export type ThemeMode = "light" | "dark" | "system";
export type FontSize = "small" | "medium" | "large";

export interface AppearanceSettings {
  theme: ThemeMode;
  fontSize: FontSize;
  reducedMotion: boolean;
  compactMode: boolean;
}

export interface AllSettings {
  profile: ProfileSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  appearance: AppearanceSettings;
}
