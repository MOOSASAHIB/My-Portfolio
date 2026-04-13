const yearTarget = document.querySelector("[data-year]");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const tiltTargets = document.querySelectorAll("[data-tilt]");
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

if (hasFinePointer) {
  tiltTargets.forEach((target) => {
    let rafId = 0;

    const updateTilt = (clientX, clientY) => {
      const rect = target.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 14;
      const rotateX = (0.5 - y) * 14;

      target.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      target.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    };

    target.addEventListener("pointermove", (event) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateTilt(event.clientX, event.clientY));
    });

    target.addEventListener("pointerleave", () => {
      target.style.setProperty("--rx", "0deg");
      target.style.setProperty("--ry", "0deg");
    });
  });
}
