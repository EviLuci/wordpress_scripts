document.addEventListener("DOMContentLoaded", function () {
    const floatingShareButton = document.querySelector(".floating-share");
    const saveContactButton = document.querySelector(".vcard-container");

    function adjustFloatingButtonPosition() {
        const floatingShareButtonRect =
            floatingShareButton.getBoundingClientRect();
        const saveContactButtonRect = saveContactButton.getBoundingClientRect();

        if (
            floatingShareButtonRect.bottom >= saveContactButtonRect.top &&
            floatingShareButtonRect.top >= saveContactButtonRect.top
        ) {
            floatingShareButton.style.bottom =
                saveContactButtonRect.height + 10 + "px";
        } else {
            floatingShareButton.style.bottom = "10px";
        }
    }

    window.addEventListener("scroll", adjustFloatingButtonPosition);
    window.addEventListener("resize", adjustFloatingButtonPosition);
    adjustFloatingButtonPosition();
});
