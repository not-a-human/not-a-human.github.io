// Theme initialization script to prevent FOUC (Flash of Unstyled Content)
(function () {
  // Only run on client side
  if (typeof window === "undefined") return;

  function getInitialTheme() {
    try {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme && ["light", "dark"].includes(savedTheme)) {
        return savedTheme;
      }
    } catch (e) {
      // localStorage might not be available
    }

    // Default to dark theme
    return "dark";
  }

  // Only apply theme if not already set to prevent hydration mismatch
  if (!document.documentElement.hasAttribute("data-theme")) {
    const theme = getInitialTheme();
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }
})();
