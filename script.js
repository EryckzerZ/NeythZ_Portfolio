// ================================
// Scroll Progress Bar
// ================================
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = pct + "%";
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// ================================
// Back to Top Button
// ================================
const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", toggleBackToTop, { passive: true });
toggleBackToTop();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================================
// Active Nav Link on Scroll
// ================================
const sections = document.querySelectorAll("main .sheet[id]");
const navLinks = document.querySelectorAll(".nav a[href^='#']");

if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => navObserver.observe(section));
}

// ================================
// Project Detail Modal
// ================================
const projectDetails = {
  "Preventive Maintenance Dashboard":
    "This dashboard helps the maintenance team plan and track their work in one place. It runs on Streamlit with a PostgreSQL database, and syncs work orders automatically so nothing gets lost in spreadsheets. Role-based access keeps the right data in front of the right people.",
  "Predictive Maintenance System":
    "Six industrial motors are monitored every second through this dashboard. A Gradient Boosting model turns live sensor readings into a simple health score, so the team can spot problems before a motor fails. Readings are logged in the background and can be exported to Excel.",
  "NeoDex Arm":
    "NeoDex Arm sees an object, decides its color, and moves to sort it — all in real time. It runs OpenCV-based computer vision on a Raspberry Pi, with a full pipeline connecting perception to motor control.",
  "AeroBASE Drone":
    "Built for the AeroBASE team, this drone can fly and make decisions on its own. ROS2 and an NVIDIA Jetson handle the software, Pixhawk handles flight control, and LiDAR keeps it clear of obstacles. OpenCV lets it detect gates and track a path through them in real time.",
  "VIERAC":
    "VIERAC combines mobility and manipulation in one small robot. It moves freely on omni-wheels and uses a camera to spot objects, then reaches for them with a semi-autonomous arm. A Raspberry Pi 5 powers the whole system.",
  "SPRINKY":
    "SPRINKY waters plants on its own. It follows a line around the garden and stops or turns when it senses an obstacle, all controlled by an Arduino UNO — a simple, low-cost way to automate watering.",
  "Emotion Voice Recognition":
    "This project listens to a voice clip and predicts the speaker's emotion. It pulls out audio features (MFCC) through digital signal processing, then classifies them with an SVM model, reaching 98% accuracy across several emotional states."
};

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalIndex = document.getElementById("modalIndex");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
const modalLink = document.getElementById("modalLink");
const modalClose = document.getElementById("modalClose");

function openModal(card) {
  const title = card.querySelector("h3")?.textContent.trim() || "";
  const index = card.querySelector(".card-index")?.textContent.trim() || "";
  const shortDesc = card.querySelector("p:not(.card-index)")?.textContent.trim() || "";
  const tags = Array.from(card.querySelectorAll(".card-tags span")).map((t) => t.textContent);
  const link = card.querySelector(".card-link")?.href || "#";

  if (modalTitle) modalTitle.textContent = title;
  if (modalIndex) modalIndex.textContent = index;
  if (modalDesc) modalDesc.textContent = projectDetails[title] || shortDesc;
  if (modalTags) {
    modalTags.innerHTML = "";
    tags.forEach((t) => {
      const span = document.createElement("span");
      span.textContent = t;
      modalTags.appendChild(span);
    });
  }
  if (modalLink) modalLink.href = link;

  modalOverlay?.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay?.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.closest(".card-link")) return;
    openModal(card);
  });
});

modalClose?.addEventListener("click", closeModal);
modalOverlay?.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ================================
// Mobile Navigation
// ================================
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ================================
// Scroll Reveal
// ================================
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// ================================
// Footer Year
// ================================
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ================================
// Theme Toggle (Dark / Light) 
// ================================
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const html = document.documentElement;

    const isDark = html.getAttribute("data-theme") === "dark";

    if (isDark) {
      html.removeAttribute("data-theme");
      saveTheme("light");
    } else {
      html.setAttribute("data-theme", "dark");
      saveTheme("dark");
    }
  });
}

function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Theme changes still work when storage is unavailable (for example, file:// previews).
  }
}
