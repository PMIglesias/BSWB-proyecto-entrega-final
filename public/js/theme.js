document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("themeBtn");
  const body = document.body;

  if (!themeBtn) return; 

  const stored = localStorage.getItem("theme");
  if (stored === "dark") {
    body.classList.add("dark-mode");
  } else if (stored === "light") {
    body.classList.remove("dark-mode");
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add("dark-mode");
  }

  // icon inicial
  themeBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";

  themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
  });
});
