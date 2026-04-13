import type { AppearanceSettings, ThemeMode, FontSize } from "../../types/settings";
import { SelectInput } from "../ui/SelectInput";
import { ToggleSwitch } from "../ui/ToggleSwitch";

interface AppearanceTabProps {
  settings: AppearanceSettings;
  onUpdate: <K extends keyof AppearanceSettings>(key: K, value: AppearanceSettings[K]) => void;
}

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System (auto)" },
];

const fontSizeOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium (default)" },
  { value: "large", label: "Large" },
];

export function AppearanceTab({ settings, onUpdate }: AppearanceTabProps) {
  return (
    <div role="tabpanel" aria-label="Appearance settings">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">
        Appearance Settings
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors">
        Customize the look and feel of the application.
      </p>

      <div className="mt-6 space-y-1">
        <SelectInput
          id="theme"
          label="Theme"
          description="Choose your preferred color scheme."
          value={settings.theme}
          onChange={(v) => onUpdate("theme", v as ThemeMode)}
          options={themeOptions}
        />
        <SelectInput
          id="fontSize"
          label="Font Size"
          description="Adjust the default text size across the application."
          value={settings.fontSize}
          onChange={(v) => onUpdate("fontSize", v as FontSize)}
          options={fontSizeOptions}
        />
      </div>

      <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-700 transition-colors">
        <ToggleSwitch
          id="reducedMotion"
          label="Reduce Motion"
          description="Minimize animations and transitions for accessibility."
          checked={settings.reducedMotion}
          onChange={(v) => onUpdate("reducedMotion", v)}
        />
        <ToggleSwitch
          id="compactMode"
          label="Compact Mode"
          description="Use tighter spacing for a denser information layout."
          checked={settings.compactMode}
          onChange={(v) => onUpdate("compactMode", v)}
        />
      </div>
    </div>
  );
}
