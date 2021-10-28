/**
 * All routes of the SPA
 */
const _routes = {
    "/": "home",
    "/allcats": "allcats",
};
const _pages = document.querySelectorAll(".page");
const _navLinks = document.querySelectorAll("nav a");


function hideAllPages() {
    for (const page of _pages) {
        page.style.display = "none";
    }
}


function navigateTo(path) {
    window.history.pushState({}, path, location.origin + path);
    showPage(path)
}


function showPage(path) {
    hideAllPages(); 
    document.querySelector(`#${_routes[path]}`).style.display = "block"; // show page by given path
    setActiveTab(path);
}

function setActiveTab(pathname) {
    for (const link of _navLinks) {
        if (pathname === link.getAttribute("href")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    }
}


function attachNavLinkEvents() {
    const navLinks = document.querySelectorAll(".nav-link");
    for (const link of navLinks) {
        link.addEventListener("click", function (event) {
            const path = link.getAttribute("href");
            navigateTo(path);
            event.preventDefault();
        });
    }
}

function initRouter() {
    attachNavLinkEvents();
    window.addEventListener("popstate", () => showPage(location.pathname)); // change page when using back and forth in browser

    let path = "/"; // default path
    if (_routes[location.pathname]) {
        path = location.pathname;
    }
    navigateTo(path);
}

initRouter();