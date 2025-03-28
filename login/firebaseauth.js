// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUV9GijHeTHQ0fLNd-W3ZtgRC3h75mDLE",
  authDomain: "login-form-19755.firebaseapp.com",
  projectId: "login-form-19755",
  storageBucket: "login-form-19755.firebasestorage.app",
  messagingSenderId: "322061302269",
  appId: "1:322061302269:web:91d33db84a1c6606934194",
  measurementId: "G-CDMKYMH6TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

class AuthUI {
    static setLoading(isLoading) {
        const buttons = document.querySelectorAll('button[type="submit"], .google-signin');
        buttons.forEach(button => {
            button.disabled = isLoading;
            button.innerHTML = isLoading ? 
                '<span class="spinner"></span> Loading...' : 
                button.getAttribute('data-original-text') || button.innerHTML;
        });
    }

    static showMessage(message, isSuccess = true) {
        const messageDiv = document.getElementById("signInMessage");
        messageDiv.textContent = message;
        messageDiv.className = `messageDiv ${isSuccess ? 'success' : 'error'}`;
        messageDiv.style.display = "block";
        messageDiv.style.backgroundColor = isSuccess ? '#4CAF50' : '#f44336';
        setTimeout(() => messageDiv.style.display = "none", 3000);
    }

    static validateForm(email, password, name = null) {
        if (name === '') throw new Error("Name is required");
        if (!email || !password) throw new Error("Email and password are required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Invalid email format");
        if (password.length < 6) throw new Error("Password must be at least 6 characters");
    }

    static handleAuthError(error) {
        let message = "Authentication failed: ";
        switch (error.code) {
            case 'auth/user-not-found':
                message += "No account found with this email";
                break;
            case 'auth/wrong-password':
                message += "Invalid password";
                break;
            case 'auth/email-already-in-use':
                message += "Email already registered";
                break;
            case 'auth/network-request-failed':
                message += "Network error. Please check your connection";
                break;
            default:
                message += error.message;
        }
        this.showMessage(message, false);
    }
}

// Auth state observer
auth.onAuthStateChanged((user) => {
    const authStatus = document.getElementById("authStatus");
    if (user) {
        authStatus.textContent = `Logged in as ${user.email}`;
        document.querySelectorAll('.auth-only').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.non-auth-only').forEach(el => el.style.display = 'none');
    } else {
        authStatus.textContent = "Not logged in";
        document.querySelectorAll('.auth-only').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.non-auth-only').forEach(el => el.style.display = 'block');
    }
});

// Sign In
document.getElementById("signinForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    AuthUI.setLoading(true);
    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value;

    try {
        AuthUI.validateForm(email, password);
        await signInWithEmailAndPassword(auth, email, password);
        AuthUI.showMessage("Login successful!");
        document.getElementById("signinForm").reset();
    } catch (error) {
        AuthUI.handleAuthError(error);
    } finally {
        AuthUI.setLoading(false);
    }
});

// Sign Up
document.getElementById("signupForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const name = document.getElementById("signupName").value.trim();

    try {
        if (!name) throw new Error("Name is required");
        AuthUI.validateForm(email, password, name);
        await createUserWithEmailAndPassword(auth, email, password);
        AuthUI.showMessage("Account created successfully!");
        document.getElementById("signupForm").reset();
    } catch (error) {
        AuthUI.handleAuthError(error);
    }
});

// Google Sign-In
document.querySelectorAll(".google-signin").forEach(button => {
    button.setAttribute('data-original-text', button.innerHTML);
    button.addEventListener("click", async (e) => {
        e.preventDefault();
        AuthUI.setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            AuthUI.showMessage(`Welcome, ${result.user.displayName}!`);
        } catch (error) {
            AuthUI.handleAuthError(error);
        } finally {
            AuthUI.setLoading(false);
        }
    });
});

document.getElementById("logout").addEventListener("click", async () => {
    try {
        await signOut(auth);
        AuthUI.showMessage("Logged out successfully.");
    } catch (error) {
        AuthUI.handleAuthError(error);
    }
});