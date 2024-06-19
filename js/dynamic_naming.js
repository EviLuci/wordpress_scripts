document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const excludedUrls = [
        // Add excluded URLs here
    ];

    function isExcludedPage() {
        const currentUrl = window.location.href;
        return excludedUrls.includes(currentUrl);
    }
    // Call the interceptDownload function to start intercepting the download link clicks
    if (!isExcludedPage()) {
        interceptDownload();
    }

    // Function to intercept the click event on the download link
    function interceptDownload() {
        document.addEventListener("click", function (event) {
            // Check if the clicked element is a download link
            if (
                event.target.tagName.toLowerCase() === "a" &&
                event.target.download === "filename"
            ) {
                // Get the title of the page dynamically
                const pageTitle = document.title;
                // Generate the new file name based on the page title
                const newFileName = generateContactFileName(pageTitle);
                // Set the new file name to the download attribute
                event.target.download = newFileName;
            }
        });
    }

    // Function to generate a new file name based on the page title
    function generateContactFileName(title) {
        return (
            title.replace(/[^a-z0-9]/gi, "_").toLowerCase() +
            "_desired_file_name"
        );
    }
});
