export interface HotkeyConfig {
  platformKey: string;
  description: string;
}

export const hotkeysConfig: HotkeyConfig[] = [
  {
    platformKey: 'meta.shift.d', // Mac-specific
    description: 'Trigger for Command + Shift + D, toggles column visibility',
  },
  {
    platformKey: 'ctrl.shift.d', // Windows-specific
    description: 'Trigger for Ctrl + Shift + D, toggles column visibility',
  },
];
