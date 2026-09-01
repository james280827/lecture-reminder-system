const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        button.textContent = "🙈";
    } else {
        input.type = "password";
        button.textContent = "👁";
    }
}

registerForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    message.textContent = "";

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        return;
    }

    if (!window.supabase) {
        message.textContent = "Supabase library failed to load.";
        return;
    }

    if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
        message.textContent = "Supabase configuration is missing.";
        return;
    }

    message.textContent = "Creating account...";

    try {
        const supabaseClient = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );

        const { error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo:
                    "https://james280827.github.io/lecture-reminder-system/"
            }
        });

        if (error) {
            message.textContent = error.message;
            return;
        }

        message.textContent =
            "Account created successfully! Check your email.";

        registerForm.reset();

    } catch (error) {
        message.textContent =
            "Something went wrong: " + error.message;
    }
});
