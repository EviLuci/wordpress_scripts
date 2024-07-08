document.addEventListener("DOMContentLoaded", function () {
    // Function to clone the primary social icons widget and insert it into the placeholder
    function cloneSocialIcons() {
        const primaryWidget = document.getElementById("social-icons-1");
        const secondaryPlaceholder = document.getElementById("social-icons-2");

        if (primaryWidget && secondaryPlaceholder) {
            // Clone the primary widget
            const clonedWidget = primaryWidget.cloneNode(true);

            // Remove the ID from the cloned widget to avoid duplicate IDs
            clonedWidget.removeAttribute("id");

            // Add a class to the cloned widget for styling
            clonedWidget.classList.add("social-icons-mobile-tablet");

            // Insert the cloned widget into the placeholder
            secondaryPlaceholder.appendChild(clonedWidget);
        }
    }

    // Call the function to clone the social icons widget
    cloneSocialIcons();
});
