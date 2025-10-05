// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Gallery tabs functionality
function showGallery(type) {
  // Hide all gallery contents
  document.querySelectorAll(".gallery-content").forEach((content) => {
    content.classList.remove("active");
  });

  // Remove active class from all tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected gallery content
  document.getElementById(type).classList.add("active");

  // Add active class to clicked button
  event.target.classList.add("active");
}

// Scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".fade-in");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

///////////////////////////////////////////////////////
// Scroll to top button
const scrollToTopBtn = document.querySelector(".B");
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});
///////////////////////////////////////////////////

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

// Accessibility improvements
document.addEventListener("keydown", (e) => {
  // Close modal on Escape key
  if (e.key === "Escape" && successModal.style.display === "block") {
    successModal.style.display = "none";
  }

  // Close mobile menu on Escape key
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Lazy loading for images (if images are added later)
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages);

// Print functionality
function printPage() {
  window.print();
}

// Share functionality
function shareContent(title, url) {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url,
    });
  } else {
    // Fallback to copying URL
    navigator.clipboard.writeText(url).then(() => {
      alert("تم نسخ الرابط");
    });
  }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
window.removeEventListener("scroll", animateOnScroll);
window.addEventListener("scroll", debounce(animateOnScroll, 10));

// Page loaded message
window.addEventListener("load", () => {
  console.log("تم تحميل الموقع بنجاح 🚀");
});
