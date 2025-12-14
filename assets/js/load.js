function loadPage() {
	let page = document.getElementById("main_content");
	page.innerHTML = "Loading...";
	// Go to content page
	fetch("./content/poison.html")
		.then(response => response.text())
		.then(data => {
			// The data is another HTML page
			// set the innerHTML of the body to the body of the data
			let newPage = new DOMParser().parseFromString(data, "text/html");
			console.log(newPage);
			document.title = newPage.title;
			document.body.innerHTML = newPage.body.innerHTML;
			if (typeof initBackend === "function") initBackend();
		});
}
