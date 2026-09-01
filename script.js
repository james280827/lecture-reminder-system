const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

if (!loginForm) {
    console.error("Login form not found.");
} else {

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        message.textContent = "Logging in...";

        if (!window.supabase) {
            message.textContent = "Supabase library failed to load.";
            return;
        }

        try {
            const supabaseClient = window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_PUBLISHABLE_KEY
            );

            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

            if (error) {
                message.textContent = error.message;
                return;
            }

            message.textContent = "Login successful!";

            console.log("Logged in user:", data.user);

        } catch (error) {
            console.error(error);
            message.textContent =
                "Something went wrong: " + error.message;
        }
    });
}
