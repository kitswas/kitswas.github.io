// CONFIGURATION
// Note: No trailing slash
const API_URL = "https://tjuouuecm9.execute-api.ap-south-1.amazonaws.com";

// 1. FETCH VISITOR COUNT (GET)
async function updateCounter() {
	const countEl = document.getElementById("visitor-count");
	if (!countEl) return;

	try {
		const response = await fetch(`${API_URL}/count`);
		if (!response.ok) throw new Error("Network response was not ok");

		const data = await response.json();
		// Update the DOM
		countEl.innerText = data.count;
	} catch (error) {
		console.error("Failed to fetch count:", error);
		countEl.innerText = "unknown";
	}
}

// 2. SEND MESSAGE (POST)
async function handleFormSubmit(event) {
	event.preventDefault(); // Stop page reload
	const status = document.getElementById("form-status");
	if (status) status.innerText = "Sending...";

	// Convert Form Data to JSON
	const formData = new FormData(event.target);
	const data = Object.fromEntries(formData.entries());

	try {
		const response = await fetch(`${API_URL}/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();

		if (response.ok) {
			if (status) status.innerText = "Message received!";
			event.target.reset(); // Clear form
		} else {
			if (status) status.innerText = "Error: " + (result.error || "Unknown error");
		}
	} catch (error) {
		console.error("Error sending message:", error);
		if (status) status.innerText = "Failed to send message.";
	}
}

function initBackend() {
	updateCounter();

	const form = document.getElementById("contact-form");
	if (form && form.dataset.backendBound !== "true") {
		form.addEventListener("submit", handleFormSubmit);
		form.dataset.backendBound = "true";
	}
}

// INITIALIZATION
document.addEventListener("DOMContentLoaded", initBackend);
