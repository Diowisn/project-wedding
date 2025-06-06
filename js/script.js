// Countdown Timer
function updateCountdown() {
  const weddingDate = new Date("June 15, 2025 10:00:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Auto slide change
// setInterval(() => {
//   showSlide(currentSlide + 1);
// }, 5000);

// Animate on Scroll
function checkVisibility() {
  const storyItems = document.querySelectorAll(".story-item");
  const coupleIntro = document.querySelectorAll(".couple-intro");

  storyItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < window.innerHeight - 100) {
      item.classList.add("visible");
    }
  });

  coupleIntro.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight - 100) {
      card.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkVisibility);
window.addEventListener("load", checkVisibility);

// Form Submission
document
  .getElementById("wedding-rsvp")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
      "Thank you for your RSVP! We look forward to seeing you at our wedding."
    );
    this.reset();
  });

// Bottom Nav Active State
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Animation trigger for couple section
document.addEventListener("DOMContentLoaded", function () {
  const coupleSection = document.querySelector(".couple-intro");
  const coupleProfiles = document.querySelectorAll(".couple-profile");
  const coupleSymbol = document.querySelector(".couple-symbol");

  if (coupleSection && coupleProfiles.length && coupleSymbol) {
    function animateCouple() {
      const rect = coupleSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        coupleProfiles.forEach((profile) => {
          profile.classList.add("fade-in");
        });
        coupleSymbol.classList.add("heart-beat");
        window.removeEventListener("scroll", animateCouple);
      }
    }

    animateCouple();
    window.addEventListener("scroll", animateCouple);
  }
});

// Copy Functionality
function copyAccountNumber(number) {
  navigator.clipboard
    .writeText(number)
    .then(() => {
      alert("Nomor rekening berhasil disalin: " + number);
    })
    .catch((err) => {
      console.error("Gagal menyalin: ", err);
    });
}

function openInvitation() {
  // Sembunyikan cover pembuka
  document.getElementById("openingPage").style.display = "none";

  // Scroll ke home
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });

  // Mainkan musik
  if (typeof audio !== "undefined") {
    audio
      .play()
      .then(() => {
        isPlaying = true;
        document.getElementById("musicToggle").innerHTML =
          '<i class="fas fa-pause"></i>';
      })
      .catch((e) => {
        console.log("Gagal autoplay: ", e);
      });
  }
}

// Jadikan audio dan isPlaying global
let audio;
let isPlaying = false;

document.addEventListener("DOMContentLoaded", function () {
  audio = new Audio("music/sinarengan.mp3");
  audio.loop = true;

  const musicToggle = document.getElementById("musicToggle");

  musicToggle.addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
      musicToggle.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      audio.play();
      musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
  });

  audio.addEventListener("pause", () => {
    musicToggle.innerHTML = '<i class="fas fa-play"></i>';
    isPlaying = false;
  });

  audio.addEventListener("play", () => {
    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
  });
});

//  <script>
//     const form = document.getElementById("wedding-rsvp");

//     form.addEventListener("submit", (e) => {
//       e.preventDefault();

//       const formData = {
//         name: form.querySelector("#name").value,
//         phone: form.querySelector("#phone").value,
//         guests: form.querySelector("#guests").value,
//         attending: form.querySelector('input[name="attending"]:checked').value,
//         message: form.querySelector("#message").value,
//       };

//       console.log("Form values:", formData);

//       if (!formData.name || !formData.phone || !formData.guests) {
//         alert("Please fill in all required fields!");

//         if (!formData.name) console.error("Name is empty");
//         if (!formData.phone) console.error("Phone is empty");
//         if (!formData.guests) console.error("Guests not selected");

//         return;
//       }

//       fetch("rsvp_submit.php", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.status === "success") {
//             alert("Thank you! Your RSVP has been submitted.");
//             form.reset();
//           } else {
//             throw new Error(data.message || "Unknown error occurred");
//           }
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           alert("Error submitting RSVP: " + error.message);
//         });
//     });
//   </script>
