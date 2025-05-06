$(document).ready(function () {
  // Mobile Nav Toggle
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenuSidebar = document.getElementById("mobileMenuSidebar");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("overlay");
  menuToggle.addEventListener("click", () => {
    mobileMenuSidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll"); // স্ক্রল বন্ধ
  });
  function closeMobileMenu() {
    mobileMenuSidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll"); // স্ক্রল চালু
  }
  closeMenu.addEventListener("click", closeMobileMenu);
  overlay.addEventListener("click", closeMobileMenu);
  // counter
  const counters = document.querySelectorAll(".count");
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
  // mobile menu
  document.querySelectorAll(".toggleBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const allSubmenus = document.querySelectorAll(".submenuToggleMobil");

      // সব সাবমেনু আগে বন্ধ করে দাও
      allSubmenus.forEach((menu) => {
        if (menu !== btn.nextElementSibling) {
          menu.style.display = "none";
        }
      });

      // তারপর যেটা ক্লিক করা হয়েছে সেটা toggle করো
      const submenu = btn.nextElementSibling;
      submenu.style.display =
        submenu.style.display === "block" ? "none" : "block";
    });
  });

  // video
  function convertToEmbedUrl(url) {
    if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop().split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      return url;
    }
  }
  const videoBtns = document.querySelectorAll(".video-btn");
  const videoIframe = document.getElementById("videoIframe");
  videoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      videoBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const rawUrl = btn.getAttribute("data-video");
      const embedUrl = convertToEmbedUrl(rawUrl);
      videoIframe.src = embedUrl;
    });
  });
  const defaultVideo = document
    .querySelector(".video-btn.active")
    ?.getAttribute("data-video");
  if (defaultVideo) {
    videoIframe.src = convertToEmbedUrl(defaultVideo);
  }

  // filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const filterValue = button.getAttribute("data-filter");
      cards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "block";
        } else {
          if (card.classList.contains(filterValue)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });
});
