document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const totalSlides = slides.length;
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");

    // Initialize dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === slideIndex) {
            dot.classList.add("active");
        }
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    // Update dots
    function updateDots() {
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            if (index === slideIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // Show or hide prev and next buttons based on slide index
    function updateButtons() {
        if (slideIndex === 0) {
            prevBtn.style.display = "none";
        } else {
            prevBtn.style.display = "block";
        }

        if (slideIndex === totalSlides - 1) {
            nextBtn.style.display = "none";
        } else {
            nextBtn.style.display = "block";
        }
    }

    // Next button click event
    nextBtn.addEventListener("click", () => {
        if (slideIndex < totalSlides - 1) {
            slideIndex++;
            updateCarousel();
        }
    });

    // Prev button click event
    prevBtn.addEventListener("click", () => {
        if (slideIndex > 0) {
            slideIndex--;
            updateCarousel();
        }
    });

    // Function to go to a specific slide
    function goToSlide(index) {
        slideIndex = index;
        updateCarousel();
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

    // Touch event handling
    let startX;
    document.querySelector(".carousel").addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    document.querySelector(".carousel").addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            // Swipe left
            if (slideIndex < totalSlides - 1) {
                slideIndex++;
                updateCarousel();
            }
        } else if (endX - startX > 50) {
            // Swipe right
            if (slideIndex > 0) {
                slideIndex--;
                updateCarousel();
            }
        }
    });

    // Initialize button states and dots
    updateButtons();
    updateDots();
});
