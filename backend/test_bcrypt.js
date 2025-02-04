import bcrypt from "bcryptjs";

// Simulate fetching the stored hash from MongoDB
const storedHash = "$2a$10$3eXGwiC6qYDQzv9pvqjFzOUV6cZDQFf3yjwkqPy8AWZIKUc0lp9e."; // Example hash from DB
const enteredPassword = "apD9^y$g"; // Password entered during login
const enteredPasswordTrimmed = enteredPassword.trim();
bcrypt.compare(enteredPasswordTrimmed, storedHash, (err, result) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Password Match Result:", result ? "✅ Match" : "❌ Mismatch");
    }
});

