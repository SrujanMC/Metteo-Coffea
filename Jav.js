// Wait until DOM fully loads
document.addEventListener("DOMContentLoaded", function () {

    // Mobile Menu
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

});


// Chatbot
function toggleChat() {
    const chat = document.getElementById('chatBox');
    chat.style.display = (chat.style.display === 'block') ? 'none' : 'block';
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const container = document.getElementById('chatMessages');
    const text = input.value.trim().toLowerCase();

    if (!text) return;

    container.innerHTML += `<div class="user-msg">${input.value}</div>`;
    input.value = '';

    setTimeout(() => {
        let reply = "Call us at 080 4091 1633 ☕";

        if (text.includes("menu")) reply = "Try Blueberry Cake & Red Sauce Pasta!";
        if (text.includes("where")) reply = "Church Street, near Blossom Book House.";
        if (text.includes("reserve")) reply = "Click 'Reserve Table' above.";

        container.innerHTML += `<div class="bot-msg">${reply}</div>`;
        container.scrollTop = container.scrollHeight;
    }, 500);
}


// Modal Controls
function openReservation() {
    document.getElementById('resModal').style.display = 'flex';
}

function closeReservation() {
    document.getElementById('resModal').style.display = 'none';
}


// EMAIL + FORM
document.addEventListener("DOMContentLoaded", function () {

    emailjs.init("FqI15pQ59KDgM7x2O"); // <-- IMPORTANT

    const form = document.getElementById("reservationForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("resName").value;
        const email = document.getElementById("resEmail").value;
        const date = document.getElementById("resDate").value;
        const time = document.getElementById("resTime").value;
        const status = document.getElementById("formStatus");

        status.innerText = "Sending confirmation...";

        emailjs.send("FqI15pQ59KDgM7x2O", "__ejs-test-mail-service__", {
            name: name,
            email: email,
            date: date,
            time: time
        })
        .then(() => {
            status.innerHTML = `✅ Confirmed! Email sent to <b>${email}</b>`;

            setTimeout(() => {
                closeReservation();
                form.reset();
                status.innerText = "";
            }, 4000);
        })
        .catch((err) => {
            console.error(err);
            status.innerText = "❌ Email failed. Check setup.";
        });
    });

});


// Close modal if clicked outside
window.onclick = function(event) {
    const modal = document.getElementById('resModal');
    if (event.target == modal) {
        closeReservation();
    }
};
