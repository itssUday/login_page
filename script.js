document.getElementById("breakButton").addEventListener("click", function () {
    let button = this;
    let rect = button.getBoundingClientRect();
    button.style.display = "none"; // Hide button

    // Play rock-breaking sound
    let audio = new Audio("rock-breaking.mp3"); // Replace with the correct path to your MP3 file
    audio.play().then(() => {
        // Delay before starting the fragments effect
        setTimeout(() => {
            // Trigger the fragments effect
            for (let i = 0; i < 15; i++) {
                let frag = document.createElement("div");
                frag.classList.add("fragment");
                document.body.appendChild(frag);

                // Random positions
                frag.style.left = rect.left + Math.random() * rect.width + "px";
                frag.style.top = rect.top + Math.random() * rect.height + "px";

                // Random movement & rotation
                let angle = Math.random() * 360;
                let distance = Math.random() * 150 + 50; // Slightly increased for drama
                let x = Math.cos(angle) * distance;
                let y = Math.sin(angle) * distance;
                let rotation = Math.random() * 720 - 360; // More rotation

                // Slow-motion effect
                setTimeout(() => {
                    frag.style.transition = "transform 3s ease-out, opacity 3s ease-out"; // Slower
                    frag.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(0)`;
                    frag.style.opacity = "0";
                }, Math.random() * 300); // Staggered delay for realism

                setTimeout(() => frag.remove(), 3500);
            }

            // Delay before playing the video
            setTimeout(() => {
                let videoOverlay = document.getElementById("video-overlay");
                let video = document.getElementById("intro-video");

                videoOverlay.style.display = "flex"; // Show video overlay
                video.play(); // Play the video

                // Stop and hide video after 12 seconds
                setTimeout(function () {
                    video.pause();
                    videoOverlay.style.display = "none";
                }, 12000);
            }, 1000); // Wait 4 seconds after fragments effect starts
        }, 1000); // Wait 1 second after sound starts
    }).catch((err) => {
        console.error("Audio playback failed:", err);
    });
});
