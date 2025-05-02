// Sample news data for each topic
const newsData = {
    general: [
        { title: "General News 1", description: "Breaking news in the general category." },
        { title: "General News 2", description: "Updates on current events worldwide." },
        { title: "General News 3", description: "Important announcements for the public." },
        { title: "General News 4", description: "General news highlights of the day." },
        { title: "General News 5", description: "Top stories in the general category." },
        { title: "General News 6", description: "General news updates from around the globe." },
        { title: "General News 7", description: "Key developments in general news." },
        { title: "General News 8", description: "General news you need to know today." },
        { title: "General News 9", description: "Latest updates in the general category." },
        { title: "General News 10", description: "General news stories making headlines." },
    ],
    business: [
        { title: "Business News 1", description: "Stock market updates and trends." },
        { title: "Business News 2", description: "Latest developments in the business world." },
        { title: "Business News 3", description: "Key insights into the global economy." },
        { title: "Business News 4", description: "Business strategies and innovations." },
        { title: "Business News 5", description: "Top business stories of the day." },
        { title: "Business News 6", description: "Updates on major business deals." },
        { title: "Business News 7", description: "Business news highlights from around the world." },
        { title: "Business News 8", description: "Economic forecasts and analysis." },
        { title: "Business News 9", description: "Business news you need to know today." },
        { title: "Business News 10", description: "Latest updates in the business sector." },
    ],
    sports: [
        { title: "Sports News 1", description: "Highlights from recent sports events." },
        { title: "Sports News 2", description: "Updates on your favorite teams and players." },
        { title: "Sports News 3", description: "Breaking news in the world of sports." },
        { title: "Sports News 4", description: "Sports news highlights of the day." },
        { title: "Sports News 5", description: "Top stories in the sports category." },
        { title: "Sports News 6", description: "Sports news updates from around the globe." },
        { title: "Sports News 7", description: "Key developments in sports news." },
        { title: "Sports News 8", description: "Sports news you need to know today." },
        { title: "Sports News 9", description: "Latest updates in the sports category." },
        { title: "Sports News 10", description: "Sports news stories making headlines." },
    ],
    technology: [
        { title: "Technology News 1", description: "Latest advancements in technology." },
        { title: "Technology News 2", description: "Updates on tech companies and innovations." },
        { title: "Technology News 3", description: "Breaking news in the tech industry." },
        { title: "Technology News 4", description: "Technology news highlights of the day." },
        { title: "Technology News 5", description: "Top stories in the technology category." },
        { title: "Technology News 6", description: "Tech news updates from around the globe." },
        { title: "Technology News 7", description: "Key developments in technology news." },
        { title: "Technology News 8", description: "Technology news you need to know today." },
        { title: "Technology News 9", description: "Latest updates in the tech category." },
        { title: "Technology News 10", description: "Technology news stories making headlines." },
    ],
    entertainment: [
        { title: "Entertainment News 1", description: "Latest updates in the entertainment world." },
        { title: "Entertainment News 2", description: "Breaking news in movies and TV shows." },
        { title: "Entertainment News 3", description: "Entertainment news highlights of the day." },
        { title: "Entertainment News 4", description: "Top stories in the entertainment category." },
        { title: "Entertainment News 5", description: "Celebrity news and gossip." },
        { title: "Entertainment News 6", description: "Entertainment news updates from around the globe." },
        { title: "Entertainment News 7", description: "Key developments in entertainment news." },
        { title: "Entertainment News 8", description: "Entertainment news you need to know today." },
        { title: "Entertainment News 9", description: "Latest updates in the entertainment category." },
        { title: "Entertainment News 10", description: "Entertainment news stories making headlines." },
    ],
};

// Function to display news
function displayNews(topic) {
    const newsType = document.getElementById("newsType");
    const newsDetails = document.getElementById("newsdetails");

    // Clear previous news
    newsType.textContent = topic.charAt(0).toUpperCase() + topic.slice(1) + " News";
    newsDetails.innerHTML = "";

    // Populate news
    newsData[topic].forEach((news, index) => {
        const newsCard = document.createElement("div");
        newsCard.className = "col-md-4 news-card";
        newsCard.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.description}</p>
                    <button class="btn btn-link view-full-story" data-index="${index}" data-topic="${topic}">View Full Story</button>
                </div>
            </div>
        `;
        newsDetails.appendChild(newsCard);
    });

    // Add event listeners to "View Full Story" buttons
    document.querySelectorAll(".view-full-story").forEach((button) => {
        button.addEventListener("click", (e) => {
            const topic = e.target.getAttribute("data-topic");
            const index = e.target.getAttribute("data-index");
            openSignInModal(topic, index);
        });
    });
}

// Function to open the sign-in modal
function openSignInModal(topic, index) {
    const modal = new bootstrap.Modal(document.getElementById("signInModal"));
    modal.show();

    // Handle sign-in form submission
    const signInForm = document.getElementById("signInForm");
    signInForm.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;

        // Validate Gmail account
        if (!email.endsWith("@gmail.com")) {
            alert("Please use a valid Gmail account.");
            return;
        }

        // Redirect to the full story
        const fullStoryUrl = `fullstory.html?topic=${topic}&index=${index}`;
        window.location.href = fullStoryUrl;
    };
}

// Event listeners for navbar links
document.getElementById("genral").addEventListener("click", () => displayNews("general"));
document.getElementById("business").addEventListener("click", () => displayNews("business"));
document.getElementById("sport").addEventListener("click", () => displayNews("sports"));
document.getElementById("technology").addEventListener("click", () => displayNews("technology"));
document.getElementById("entertainment").addEventListener("click", () => displayNews("entertainment"));

// Default display
displayNews("general");