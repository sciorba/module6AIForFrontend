import { useState, useCallback } from "react";
import type { AllSettings } from "../types/settings";

const defaultSettings: AllSettings = {
  profile: {
    fullName: "Jane Cooper",
    email: "jane@gridstore.com",
    bio: "Project manager and design enthusiast. Love building products that make people's lives easier.",
    language: "en",
    timezone: "America/New_York",
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    mentionAlerts: true,
    marketingEmails: false,
  },
  privacy: {
    profileVisibility: "public",
    showEmail: false,
    showActivity: true,
    allowIndexing: true,
    twoFactorAuth: false,
  },
  appearance: {
    theme: "system",
    fontSize: "medium",
    reducedMotion: false,
    compactMode: false,
  },
};

export function useSettingsForm() {
  const [settings, setSettings] = useState<AllSettings>(defaultSettings);
  const [savedSettings, setSavedSettings] = useState<AllSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  const updateProfile = useCallback(
    <K extends keyof AllSettings["profile"]>(key: K, value: AllSettings["profile"][K]) => {
      setSettings((prev) => ({ ...prev, profile: { ...prev.profile, [key]: value } }));
      setSaveMessage(null);
    },
    [],
  );

  const updateNotifications = useCallback(
    <K extends keyof AllSettings["notifications"]>(key: K, value: AllSettings["notifications"][K]) => {
      setSettings((prev) => ({ ...prev, notifications: { ...prev.notifications, [key]: value } }));
      setSaveMessage(null);
    },
    [],
  );

  const updatePrivacy = useCallback(
    <K extends keyof AllSettings["privacy"]>(key: K, value: AllSettings["privacy"][K]) => {
      setSettings((prev) => ({ ...prev, privacy: { ...prev.privacy, [key]: value } }));
      setSaveMessage(null);
    },
    [],
  );

  const updateAppearance = useCallback(
    <K extends keyof AllSettings["appearance"]>(key: K, value: AllSettings["appearance"][K]) => {
      setSettings((prev) => ({ ...prev, appearance: { ...prev.appearance, [key]: value } }));
      setSaveMessage(null);
    },
    [],
  );

  const save = useCallback(() => {
    setIsSaving(true);
    setSaveMessage(null);
    // Simulate async save
    setTimeout(() => {
      setSavedSettings(settings);
      setIsSaving(false);
      setSaveMessage("Settings saved successfully!");
      setTimeout(() => setSaveMessage(null), 3000);
    }, 600);
  }, [settings]);

  const cancel = useCallback(() => {
    setSettings(savedSettings);
    setSaveMessage(null);
  }, [savedSettings]);

  return {
    settings,
    isDirty,
    isSaving,
    saveMessage,
    updateProfile,
    updateNotifications,
    updatePrivacy,
    updateAppearance,
    save,
    cancel,
  };
}
