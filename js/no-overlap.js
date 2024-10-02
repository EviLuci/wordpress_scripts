document.addEventListener("DOMContentLoaded", function () {
  const floatingShareButton = document.querySelector(".floating-share");
  const saveContactButtons = document.querySelectorAll(".vcard-container");
  const mobileView = window.matchMedia("(max-width: 768px)");

  function isElementVisible(element) {
    return element.offsetWidth > 0 && element.offsetHeight > 0;
  }

  function getVisibleSaveContactButton() {
    for (let button of saveContactButtons) {
      if (isElementVisible(button)) {
        return button;
      }
    }
    return null;
  }

  function adjustFloatingButtonPosition() {
    const visibleSaveContactButton = getVisibleSaveContactButton();
    const floatingShareButtonRect = floatingShareButton.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY + viewportHeight;

    if (!visibleSaveContactButton) {
      floatingShareButton.style.bottom = "10px";
      return;
    }

    const saveContactButtonRect =
      visibleSaveContactButton.getBoundingClientRect();

    if (
      floatingShareButtonRect.bottom >= saveContactButtonRect.top &&
      floatingShareButtonRect.top <= saveContactButtonRect.bottom
    ) {
      floatingShareButton.style.bottom =
        window.innerHeight - saveContactButtonRect.top + 10 + "px";
    } else if (scrollPosition >= documentHeight) {
      floatingShareButton.style.bottom =
        saveContactButtonRect.height + 20 + "px";
    } else {
      floatingShareButton.style.bottom = "10px";
    }
  }

  function initialize() {
    if (mobileView.matches) {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            adjustFloatingButtonPosition();
          }
        });
      });

      saveContactButtons.forEach((button) => {
        observer.observe(button);
      });

      window.addEventListener("scroll", adjustFloatingButtonPosition);
      window.addEventListener("resize", adjustFloatingButtonPosition);
      adjustFloatingButtonPosition();
    }
  }

  mobileView.addListener(initialize);
  initialize();
});
