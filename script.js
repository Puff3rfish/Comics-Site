document.addEventListener('DOMContentLoaded', () => {
  const chapters = Array.from({ length: 83 }, (_, i) => `Koala_Chapter ${i + 1}`);
  const chapterContainer = document.getElementById("chapterContainer");
  const gridBtn = document.getElementById("gridBtn");
  const listBtn = document.getElementById("listBtn");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const darkIcon = document.getElementById("darkIcon"); // fixed id

  let isDarkMode = false;

  function renderChapters(layout) {
    chapterContainer.innerHTML = "";
    chapterContainer.className = layout === "grid" ? "grid" : "list";

    if (layout === "list") {
      chapters.forEach((ch, i) => {
        const item = document.createElement("div");
        item.className = "chapter";
        item.innerHTML = `<a href="reader.html?chapter=${encodeURIComponent(ch)}">Chapter ${i + 1}</a>`;
        chapterContainer.appendChild(item);
      });
    } else {
      // append items directly so CSS grid (repeat(5,1fr)) makes rows of 5
      chapters.forEach((ch, i) => {
        const item = document.createElement("div");
        item.className = "chapter";
        item.innerHTML = `<a href="reader.html?chapter=${encodeURIComponent(ch)}">Chapter ${i + 1}</a>`;
        chapterContainer.appendChild(item);
      });
    }
  }

  // initial render
  renderChapters("grid");

  // controls
  gridBtn && gridBtn.addEventListener("click", () => renderChapters("grid"));
  listBtn && listBtn.addEventListener("click", () => renderChapters("list"));

  darkModeBtn && darkModeBtn.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark", isDarkMode);

    const darkIcon = document.getElementById("darkIcon");
    if (darkIcon) {
      const dm = darkIcon.dataset.dm || "assets/icons/dm.png";
      const lm = darkIcon.dataset.lm || "assets/icons/lm.png";
      darkIcon.src = isDarkMode ? dm : lm;
    }
  });
});
