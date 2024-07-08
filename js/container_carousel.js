document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const totalSlides = slides.length;
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");

    // Initially hide prev button since we start at first slide
    prevBtn.style.display = "none";

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll(".dot");

    // Show or hide prev and next buttons based on slide index
    function updateButtons() {
        prevBtn.style.display = slideIndex === 0 ? "none" : "block";
        nextBtn.style.display =
            slideIndex === totalSlides - 1 ? "none" : "block";
    }

    // Update dots based on slide index
    function updateDots() {
        dots.forEach((dot) => dot.classList.remove("active"));
        dots[slideIndex].classList.add("active");
    }

    // Function to update carousel slide position
    function updateCarousel() {
        const newTransformValue = -slideIndex * 100 + "%";
        document.querySelector(
            ".carousel"
        ).style.transform = `translateX(${newTransformValue})`;
        updateButtons();
        updateDots();
    }

    // Next button click event
    nextBtn.addEventListener("click", () => {
        if (slideIndex < totalSlides - 1) {
            slideIndex++;
            updateCarousel();
        }
        resetAutoScroll();
    });

    // Prev button click event
    prevBtn.addEventListener("click", () => {
        if (slideIndex > 0) {
            slideIndex--;
            updateCarousel();
        }
        resetAutoScroll();
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const carousel = document.querySelector(".carousel");

    carousel.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoScroll();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            if (slideIndex < totalSlides - 1) {
                slideIndex++;
                updateCarousel();
            }
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right
            if (slideIndex > 0) {
                slideIndex--;
                updateCarousel();
            }
        }
    }

    // Auto-scroll functionality
    let autoScrollInterval = setInterval(() => {
        slideIndex = (slideIndex + 1) % totalSlides;
        updateCarousel();
    }, 5000); // Adjust the interval as needed

    // Reset auto-scroll interval when user interacts
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            slideIndex = (slideIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }

    // Dot click event
    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            slideIndex = parseInt(e.target.dataset.index);
            updateCarousel();
            resetAutoScroll();
        });
    });
});
