document.addEventListener("DOMContentLoaded", function () {
    // Function to clone the primary container and insert it into the placeholder
    function cloneContainer() {
        const primaryContainer = document.getElementById("clone_this");
        const secondaryPlaceholder = document.getElementById("clone_here");

        if (primaryContainer && secondaryPlaceholder) {
            // Clone the primary widget
            const clonedWidget = primaryContainer.cloneNode(true);

            // Remove the ID from the cloned widget to avoid duplicate IDs
            clonedWidget.removeAttribute("id");

            // Add a class to the cloned widget for styling
            clonedWidget.classList.add("cloned-widget");

            // Insert the cloned widget into the placeholder
            secondaryPlaceholder.appendChild(clonedContainer);
        }
    }

    // Call the function to clone the container
    cloneContainer();
});
