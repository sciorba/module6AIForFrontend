import type { PrivacySettings } from "../../types/settings";
import { SelectInput } from "../ui/SelectInput";
import { ToggleSwitch } from "../ui/ToggleSwitch";

interface PrivacyTabProps {
  settings: PrivacySettings;
  onUpdate: <K extends keyof PrivacySettings>(key: K, value: PrivacySettings[K]) => void;
}

const visibilityOptions = [
  { value: "public", label: "Public — Anyone can see your profile" },
  { value: "friends", label: "Friends Only — Only connections can see" },
  { value: "private", label: "Private — Only you can see" },
];

export function PrivacyTab({ settings, onUpdate }: PrivacyTabProps) {
  return (
    <div role="tabpanel" aria-label="Privacy settings">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">
        Privacy Settings
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors">
        Control who can see your information and how your data is used.
      </p>

      <div className="mt-6">
        <SelectInput
          id="profileVisibility"
          label="Profile Visibility"
          description="Choose who can see your profile information."
          value={settings.profileVisibility}
          onChange={(v) => onUpdate("profileVisibility", v as PrivacySettings["profileVisibility"])}
          options={visibilityOptions}
        />
      </div>

      <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-700 transition-colors">
        <ToggleSwitch
          id="showEmail"
          label="Show Email Address"
          description="Display your email on your public profile."
          checked={settings.showEmail}
          onChange={(v) => onUpdate("showEmail", v)}
        />
        <ToggleSwitch
          id="showActivity"
          label="Show Activity Status"
          description="Let others see when you were last active."
          checked={settings.showActivity}
          onChange={(v) => onUpdate("showActivity", v)}
        />
        <ToggleSwitch
          id="allowIndexing"
          label="Search Engine Indexing"
          description="Allow search engines to index your profile page."
          checked={settings.allowIndexing}
          onChange={(v) => onUpdate("allowIndexing", v)}
        />
        <ToggleSwitch
          id="twoFactorAuth"
          label="Two-Factor Authentication"
          description="Add an extra layer of security to your account."
          checked={settings.twoFactorAuth}
          onChange={(v) => onUpdate("twoFactorAuth", v)}
        />
      </div>
    </div>
  );
}
