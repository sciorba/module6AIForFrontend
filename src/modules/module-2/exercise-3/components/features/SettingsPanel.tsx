import { useState } from "react";
import type { SettingsTab } from "../../types/settings";
import { useSettingsForm } from "../../hooks/useSettingsForm";
import { SettingsTabs } from "../ui/SettingsTabs";
import { ProfileTab } from "./ProfileTab";
import { NotificationsTab } from "./NotificationsTab";
import { PrivacyTab } from "./PrivacyTab";
import { AppearanceTab } from "./AppearanceTab";

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const form = useSettingsForm();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Sidebar tabs */}
        <div className="w-full shrink-0 sm:w-48">
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Content panel */}
        <div className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
          {activeTab === "profile" && (
            <ProfileTab settings={form.settings.profile} onUpdate={form.updateProfile} />
          )}
          {activeTab === "notifications" && (
            <NotificationsTab settings={form.settings.notifications} onUpdate={form.updateNotifications} />
          )}
          {activeTab === "privacy" && (
            <PrivacyTab settings={form.settings.privacy} onUpdate={form.updatePrivacy} />
          )}
          {activeTab === "appearance" && (
            <AppearanceTab settings={form.settings.appearance} onUpdate={form.updateAppearance} />
          )}

          {/* Save / Cancel bar */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6 dark:border-gray-700 transition-colors">
            <div>
              {form.saveMessage && (
                <p className="text-sm font-medium text-green-600 dark:text-green-400 transition-colors">
                  {form.saveMessage}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={form.cancel}
                disabled={!form.isDirty}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={form.save}
                disabled={!form.isDirty || form.isSaving}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {form.isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
