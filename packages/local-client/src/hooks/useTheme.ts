import React from "react";
import { SettingsState } from "../state/reducers/settingsReducer";
import appTheme from "../_shared/appTheme";
import { useActions } from "./use-actions";
import { useTypedSelector } from "./use-typed-selector";

const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

function getThemeModeFromDeviceTheme(matchesDarkTheme: boolean) {
  return matchesDarkTheme ? "dark" : "light";
}

export function useTheme() {
  const [deviceTheme, setDeviceTheme] = React.useState<"light" | "dark">(() =>
    getThemeModeFromDeviceTheme(prefersDarkTheme.matches)
  );

  const themeMode = useTypedSelector(
    ({ settings: { themeMode } }) => themeMode
  );
  const { updateSettings } = useActions();

  const selectedTheme = themeMode === "device" ? deviceTheme : themeMode;
  const colors = selectedTheme === "light" ? appTheme.light : appTheme.dark;

  React.useEffect(() => {
    prefersDarkTheme.addEventListener("change", (event) =>
      setDeviceTheme(getThemeModeFromDeviceTheme(event.matches))
    );
  }, []);

  const updateTheme = React.useCallback(
    (themeMode: SettingsState["themeMode"]) => {
      updateSettings(themeMode);
    },
    [updateSettings]
  );

  const toggleTheme = React.useCallback(() => {
    updateSettings(themeMode === "light" ? "dark" : "light");
  }, [updateSettings, themeMode]);

  return {
    themeMode: selectedTheme,
    theme: colors,
    isDark: selectedTheme !== "light",
    updateTheme,
    toggleTheme,
  };
}
