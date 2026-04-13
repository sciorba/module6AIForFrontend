import type { NotificationSettings } from "../../types/settings";
import { ToggleSwitch } from "../ui/ToggleSwitch";

interface NotificationsTabProps {
  settings: NotificationSettings;
  onUpdate: <K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) => void;
}

export function NotificationsTab({ settings, onUpdate }: NotificationsTabProps) {
  return (
    <div role="tabpanel" aria-label="Notification settings">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">
        Notification Settings
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors">
        Choose how and when you want to be notified.
      </p>

      <div className="mt-6 divide-y divide-gray-100 dark:divide-gray-700 transition-colors">
        <ToggleSwitch
          id="emailNotifications"
          label="Email Notifications"
          description="Receive email alerts for important updates and activity."
          checked={settings.emailNotifications}
          onChange={(v) => onUpdate("emailNotifications", v)}
        />
        <ToggleSwitch
          id="pushNotifications"
          label="Push Notifications"
          description="Get push notifications on your devices in real time."
          checked={settings.pushNotifications}
          onChange={(v) => onUpdate("pushNotifications", v)}
        />
        <ToggleSwitch
          id="weeklyDigest"
          label="Weekly Digest"
          description="Receive a summary email every Monday with your weekly activity."
          checked={settings.weeklyDigest}
          onChange={(v) => onUpdate("weeklyDigest", v)}
        />
        <ToggleSwitch
          id="mentionAlerts"
          label="Mention Alerts"
          description="Get notified when someone mentions you in a comment or task."
          checked={settings.mentionAlerts}
          onChange={(v) => onUpdate("mentionAlerts", v)}
        />
        <ToggleSwitch
          id="marketingEmails"
          label="Marketing Emails"
          description="Receive product updates, tips, and promotional content."
          checked={settings.marketingEmails}
          onChange={(v) => onUpdate("marketingEmails", v)}
        />
      </div>
    </div>
  );
}
