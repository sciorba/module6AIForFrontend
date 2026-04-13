import type { ProfileSettings } from "../../types/settings";
import { TextInput } from "../ui/TextInput";
import { SelectInput } from "../ui/SelectInput";

interface ProfileTabProps {
  settings: ProfileSettings;
  onUpdate: <K extends keyof ProfileSettings>(key: K, value: ProfileSettings[K]) => void;
}

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
];

const timezoneOptions = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Berlin", label: "Central European Time (CET)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
];

export function ProfileTab({ settings, onUpdate }: ProfileTabProps) {
  return (
    <div role="tabpanel" aria-label="Profile settings">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">
        Profile Settings
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors">
        Manage your personal information and preferences.
      </p>

      <div className="mt-6 space-y-1">
        <TextInput
          id="fullName"
          label="Full Name"
          value={settings.fullName}
          onChange={(v) => onUpdate("fullName", v)}
          placeholder="Enter your full name"
        />
        <TextInput
          id="email"
          label="Email Address"
          type="email"
          value={settings.email}
          onChange={(v) => onUpdate("email", v)}
          placeholder="you@example.com"
        />
        <TextInput
          id="bio"
          label="Bio"
          value={settings.bio}
          onChange={(v) => onUpdate("bio", v)}
          multiline
          rows={3}
          description="Brief description for your profile. Max 200 characters."
          placeholder="Tell us about yourself..."
        />
        <SelectInput
          id="language"
          label="Language"
          value={settings.language}
          onChange={(v) => onUpdate("language", v)}
          options={languageOptions}
        />
        <SelectInput
          id="timezone"
          label="Timezone"
          value={settings.timezone}
          onChange={(v) => onUpdate("timezone", v)}
          options={timezoneOptions}
        />
      </div>
    </div>
  );
}
