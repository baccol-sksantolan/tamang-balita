// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4Etdm_Eb8b9tQcHiD9Cm7KL5FoJGeOA",
    authDomain: "balitang-tama.firebaseapp.com",
    databaseURL: "https://balitang-tama-default-rtdb.firebaseio.com",
    projectId: "balitang-tama",
    storageBucket: "balitang-tama.appspot.com",
    messagingSenderId: "995757434254",
    appId: "1:995757434254:web:90a693d4c19695b8e87df",
    measurementId: "G-VXT34P3F2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginContainer = document.getElementById("login-container");
    const adminDashboard = document.getElementById("admin-dashboard");
    const loginError = document.getElementById("login-error");

    // Hardcoded admin credentials (for demonstration purposes)
    const adminCredentials = {
        username: "admin",
        password: "password123"
    };

    // Handle login form submission
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === adminCredentials.username && password === adminCredentials.password) {
            // Hide login form and show admin dashboard
            loginContainer.classList.add("hidden");
            adminDashboard.classList.remove("hidden");
        } else {
            // Show error message
            loginError.textContent = "Invalid username or password. Please try again.";
        }
    });

    // DOM Elements
    const newsList = document.getElementById("news-list");

    // Upload News
    document.getElementById("upload-news").addEventListener("click", () => {
        const title = prompt("Enter news title:");
        const content = prompt("Enter news content:");
        if (title && content) {
            const newsRef = ref(db, "news");
            push(newsRef, {
                title: title,
                content: content,
                status: "published"
            });
            alert("News uploaded successfully!");
        }
    });

    // Archive News
    document.getElementById("archive-news").addEventListener("click", () => {
        const newsId = prompt("Enter the ID of the news to archive:");
        if (newsId) {
            const newsRef = ref(db, `news/${newsId}`);
            update(newsRef, { status: "archived" });
            alert("News archived successfully!");
        }
    });

    // Delete News
    document.getElementById("delete-news").addEventListener("click", () => {
        const newsId = prompt("Enter the ID of the news to delete:");
        if (newsId) {
            const newsRef = ref(db, `news/${newsId}`);
            remove(newsRef);
            alert("News deleted successfully!");
        }
    });

    // Edit News
    document.getElementById("edit-news").addEventListener("click", () => {
        const newsId = prompt("Enter the ID of the news to edit:");
        const newTitle = prompt("Enter the new title:");
        const newContent = prompt("Enter the new content:");
        if (newsId && newTitle && newContent) {
            const newsRef = ref(db, `news/${newsId}`);
            update(newsRef, {
                title: newTitle,
                content: newContent
            });
            alert("News updated successfully!");
        }
    });

    // Fetch and display news in real-time
    const newsRef = ref(db, "news");
    onValue(newsRef, (snapshot) => {
        newsList.innerHTML = "<h3>News List</h3>";
        snapshot.forEach((childSnapshot) => {
            const news = childSnapshot.val();
            const newsId = childSnapshot.key;
            newsList.innerHTML += `
                <div>
                    <h4>${news.title}</h4>
                    <p>${news.content}</p>
                    <p>Status: ${news.status}</p>
                    <p>ID: ${newsId}</p>
                </div>
            `;
        });
    });
});