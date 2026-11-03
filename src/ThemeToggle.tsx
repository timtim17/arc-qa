import { useEffect, useState } from "preact/hooks";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/icon/icon.js";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("arc-theme") as Theme | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply on mount before first paint
  useEffect(() => {
    document.body.classList.toggle("wa-dark", getInitialTheme() === "dark");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("wa-dark", theme === "dark");
    localStorage.setItem("arc-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const iconName = theme === "dark" ? "sun" : "moon";
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <wa-button
      appearance="plain"
      onclick={toggle}
      class="theme-toggle-btn"
    >
      <wa-icon name={iconName} label={label} style={{color: 'white',}} />
    </wa-button>
  );
}
