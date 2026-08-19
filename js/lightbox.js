document.addEventListener("DOMContentLoaded", function () {
  var pages = Array.prototype.slice.call(document.querySelectorAll(".pdf-pages img"));
  if (!pages.length) return;

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCount = document.getElementById("lightbox-count");
  var closeBtn = document.getElementById("lightbox-close");
  var prevBtn = document.getElementById("lightbox-prev");
  var nextBtn = document.getElementById("lightbox-next");
  var index = 0;

  function show(i) {
    index = (i + pages.length) % pages.length;
    var img = pages[index];
    lightboxImg.src = img.dataset.full || img.src;
    lightboxImg.alt = img.alt;
    lightboxCount.textContent = (index + 1) + " / " + pages.length;
  }

  function open(i) {
    show(i);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  pages.forEach(function (img, i) {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Open " + img.alt + " larger");
    img.addEventListener("click", function () { open(i); });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(i);
      }
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () { show(index - 1); });
  nextBtn.addEventListener("click", function () { show(index + 1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
});
