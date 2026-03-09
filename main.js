document.addEventListener("DOMContentLoaded", () => {
  const revealItems = [...document.querySelectorAll(".reveal")];
  const copyHandleButton = document.getElementById("copyHandleButton");

  revealItems.forEach((item, index) => {
    item.style.setProperty("--delay", `${index * 70}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  if (copyHandleButton) {
    copyHandleButton.addEventListener("click", async () => {
      const handle = "@mg_concept";

      try {
        await navigator.clipboard.writeText(handle);
        copyHandleButton.setAttribute("aria-label", "Arroba copiado");
        copyHandleButton.title = "Arroba copiado";
      } catch (error) {
        copyHandleButton.setAttribute("aria-label", handle);
        copyHandleButton.title = handle;
      }

      copyHandleButton.classList.add("is-copied");

      window.setTimeout(() => {
        copyHandleButton.classList.remove("is-copied");
        copyHandleButton.setAttribute(
          "aria-label",
          "Copiar arroba da MG Concept"
        );
        copyHandleButton.title = "";
      }, 1600);
    });
  }
});