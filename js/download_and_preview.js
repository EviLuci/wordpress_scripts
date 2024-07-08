document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("downloadPDFButton")
        .addEventListener("click", function () {
            const pdfUrl = "pdf url";
            const pdfName = "abc.pdf";
            const button = document.getElementById("downloadPDFButton");
            const originalText = button.innerText;
            // Disable the button and show loading text
            button.disabled = true;
            button.innerText = "Loading...";
            fetch(pdfUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.blob();
                })
                .then((blob) => {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = pdfName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                    // Re-enable the button and reset text
                    button.disabled = false;
                    button.innerText = originalText;
                })
                .catch((error) => {
                    console.error(
                        "There was a problem with the fetch operation:",
                        error
                    );
                    alert("Failed to download PDF. Please try again later.");
                    // Re-enable the button and reset text
                    button.disabled = false;
                    button.innerText = originalText;
                });
        });
    // Create the link element once
    const downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    document
        .getElementById("downloadPDFButton")
        .addEventListener("click", function () {
            const pdfUrl = "pdf url";
            // Set the href and download attributes for the link
            downloadLink.href = pdfUrl;
            downloadLink.download = "apm.pdf"; // Set the filename you prefer here
            // Trigger the download
            downloadLink.click();
            // Reset the href attribute to allow for subsequent clicks
            setTimeout(() => {
                downloadLink.href = "";
            }, 100); // Short timeout to ensure the download completes before resetting
        });
    document
        .getElementById("viewPDFButton")
        .addEventListener("click", function () {
            const pdfUrl = "pdf url";
            const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
                pdfUrl
            )}&embedded=true`;
            const pdfViewer = document.createElement("iframe");
            pdfViewer.src = googleViewerUrl;
            pdfViewer.width = "100%";
            pdfViewer.height = "100%";
            pdfViewer.style.border = "none";
            const modal = document.createElement("div");
            modal.style.position = "fixed";
            modal.style.top = "50%";
            modal.style.left = "50%";
            modal.style.transform = "translate(-50%, -50%)";
            modal.style.width = "90%";
            modal.style.height = "90%";
            modal.style.backgroundColor = "white";
            modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            modal.style.zIndex = "1000";
            modal.style.padding = "0"; // Remove padding to fit the iframe properly
            modal.style.overflow = "hidden"; // Ensure no overflow issues
            // Create close button
            const closeButton = document.createElement("button");
            closeButton.innerText = "Close";
            closeButton.style.position = "absolute";
            closeButton.style.top = "2px";
            closeButton.style.left = "2px";
            closeButton.style.backgroundColor = "#40629C";
            closeButton.style.color = "white";
            closeButton.style.border = "none";
            closeButton.style.padding = "5px";
            closeButton.style.borderRadius = "0px";
            closeButton.style.cursor = "pointer";
            closeButton.style.fontSize = "10px";
            closeButton.style.zIndex = "1001";
            closeButton.addEventListener("click", function () {
                document.body.removeChild(modal);
                document.body.removeChild(overlay);
            });
            modal.appendChild(closeButton);
            modal.appendChild(pdfViewer);
            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            overlay.style.zIndex = "999";
            overlay.addEventListener("click", function () {
                document.body.removeChild(modal);
                document.body.removeChild(overlay);
            });
            document.body.appendChild(overlay);
            document.body.appendChild(modal);
        });
});
//
