const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const toggleBtn = document.getElementById("toggleBtn");
const resetBtn = document.getElementById("resetBtn");

const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");
const matchMessage = document.getElementById("matchMessage");

const rules = [
    {
        id: "length",
        test: p => p.length >= 8
    },
    {
        id: "upper",
        test: p => /[A-Z]/.test(p)
    },
    {
        id: "lower",
        test: p => /[a-z]/.test(p)
    },
    {
        id: "number",
        test: p => /[0-9]/.test(p)
    },
    {
        id: "special",
        test: p => /[^A-Za-z0-9]/.test(p)
    }
];

function checkPassword() {
    const p = password.value;
    let score = 0;

    rules.forEach(rule => {
        const item = document.getElementById(rule.id);
        const passed = rule.test(p);

        item.classList.toggle("valid", passed);
        item.textContent =
            (passed ? "✓ " : "✗ ") +
            item.textContent.substring(2);

        if (passed) {
            score++;
        }
    });

    if (p.length === 0) {
        strengthText.textContent = "Not entered";
        strengthText.style.color = "#666";
        strengthBar.style.width = "0%";
        strengthBar.style.background = "#ddd";
    } else if (score <= 2) {
        strengthText.textContent = "Weak";
        strengthText.style.color = "#d93025";
        strengthBar.style.width = "33%";
        strengthBar.style.background = "#e53935";
    } else if (score <= 4) {
        strengthText.textContent = "Medium";
        strengthText.style.color = "#e69500";
        strengthBar.style.width = "66%";
        strengthBar.style.background = "#f4b400";
    } else {
        strengthText.textContent = "Strong";
        strengthText.style.color = "#188038";
        strengthBar.style.width = "100%";
        strengthBar.style.background = "#188038";
    }

    checkMatch();
}

function checkMatch() {
    const p = password.value;
    const cp = confirmPassword.value;

    if (cp.length === 0) {
        matchMessage.textContent = "";
    } else if (p === cp) {
        matchMessage.textContent = "✓ Passwords Match";
        matchMessage.style.color = "#188038";
    } else {
        matchMessage.textContent = "✗ Passwords Do Not Match";
        matchMessage.style.color = "#d93025";
    }
}

password.addEventListener("input", checkPassword);
confirmPassword.addEventListener("input", checkMatch);

toggleBtn.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        toggleBtn.textContent = "Hide";
    } else {
        password.type = "password";
        toggleBtn.textContent = "Show";
    }
});

resetBtn.addEventListener("click", function () {
    password.value = "";
    confirmPassword.value = "";
    toggleBtn.textContent = "Show";
    password.type = "password";

    rules.forEach(rule => {
        const item = document.getElementById(rule.id);
        item.classList.remove("valid");
        item.textContent = "✗ " +
            item.textContent.substring(2);
    });

    strengthText.textContent = "Not entered";
    strengthText.style.color = "#666";
    strengthBar.style.width = "0%";
    strengthBar.style.background = "#ddd";
    matchMessage.textContent = "";
});