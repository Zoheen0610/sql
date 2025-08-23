import { useTheme } from "../context/Theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label
      for="switch"
      class="switch"
      className="relative inline-block w-14 h-8 -mt-1 cursor-pointer"
    >
      <input
        id="switch"
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="absolute opacity-0 w-0 h-0"
       />
      <span class="slider"></span>
      <span class="decoration"></span>
    </label>
  );
}
