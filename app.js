// Dark-Light Mode
const checkbox = document.querySelector(".light-dark-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");

function updateImages(theme) {
    const imageElements = document.querySelectorAll("img");

    imageElements.forEach((img) => {
        const altText = img.getAttribute("alt");
        const imageName = altText.toLowerCase().replace(" ", "-");
        const themePrefix = theme === "dark" ? "dark" : "light";
        const src = `assets/${themePrefix}-img-${imageName}.png`;
        img.src = src;
    });
}

function updateSVGs(theme) {
    const svgElements = document.querySelectorAll("embed");

    svgElements.forEach((svg) => {
        const altText = svg.getAttribute("title");
        const svgName = altText.toLowerCase().replace(" ", "-");
        const themePrefix = theme === "dark" ? "dark" : "light";
        const src = `assets/${themePrefix}-svg-${svgName}.svg`;
        svg.src = src;
    });
}

function setTheme(theme) {
    currentTheme = theme;
    document.body.classList.toggle("dark-theme", theme === "dark");
    document.body.classList.toggle("light-theme", theme === "light");
    checkbox.checked = theme === "dark";
    localStorage.setItem("theme", theme);
    updateImages(theme);
    updateSVGs(theme);
    // toggleChartTheme(theme); // Comment me if using a non-theme chart widget like GeckoTerminal or none at all.
}

//Chart Light and Dark Toggle with Page.
// const initialToken = "0x05ac38825fca6188eaffd91c827c1b1c4b468eb9"; // Replace with your initial token address

// function toggleChartTheme(theme) {
//     const chartIframe = document.getElementById("chart-widget");
//     // const chartTheme = theme === "dark" ? "dark" : "light"; //DexTools and DexScreener only.

//     // const chartURL = `https://www.dextools.io/widget-chart/en/kava/pe-light/${initialToken}?theme=${dextoolsTheme}&chartType=1&chartResolution=1D&drawingToolbars=false&drawingSessionBreaks=false`;
//     // ^ In the DexTools URL, the only accepted resolutions are 1D, 3D, 1W, and 1M. Any chart under 1D requires minute values. Example: A 12 hour chart would be chartResolution=720. A chart below 1D defaults to having session breaks even when they're false.
//     // const chartURL = `https://dexscreener.com/kava/${initialToken}?embed=1&theme=${dextoolsTheme}`
//     const chartURL = `https://www.geckoterminal.com/kava/pools/${initialToken}?embed=1&info=1&swaps=0`
//     chartIframe.src = chartURL;
// }
//End Dextools Light and Dark Toggle with Page

setTheme(currentTheme);

checkbox.addEventListener("change", function () {
    setTheme(currentTheme === "dark" ? "light" : "dark");
});

prefersDarkScheme.addEventListener("change", (event) => {
    setTheme(event.matches ? "dark" : "light");
});

// Button to toggle the first checkbox
const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", function () {
    // Trigger the click event on the first checkbox
    checkbox.click();
});

// Chart Pointer-Events Checkbox
const chart = document.getElementById("chart-widget");
const pointerCheck = document.getElementById("pointerEventsCheckbox");

pointerCheck.addEventListener("change", function () {
    if (this.checked) {
        chart.style.pointerEvents = "auto";
    } else {
        chart.style.pointerEvents = "none";
    }
});

//Dark Light Button Icon
function updateToggle() {
    var toggleBox = document.getElementById("toggleButton");
    var checkBox = document.getElementById("toggle");

    if (checkBox.checked) {
        toggleBox.classList.remove("fa-sun");
        toggleBox.classList.add("fa-moon");
    } else {
        toggleBox.classList.remove("fa-moon");
        toggleBox.classList.add("fa-sun");
    }
}

updateToggle();

//Lock Unlock
function updateLabel() {
    var checkBox = document.getElementById("pointerEventsCheckbox");
    var statusText = document.getElementById("statusText");

    if (checkBox.checked) {
        statusText.classList.remove("fa-lock");
        statusText.classList.add("fa-unlock");
        statusText.style.color = "lime";
    } else {
        statusText.classList.remove("fa-unlock");
        statusText.classList.add("fa-lock");
        statusText.style.color = "crimson";
    }
}

updateLabel();

function updateBars() {
    var barBox = document.getElementById("ham-check");
    var barIcon = document.getElementById("bars");

    if (barBox.checked) {
        barIcon.classList.remove("fa-bars");
        barIcon.classList.add("fa-xmark");
    } else {
        barIcon.classList.remove("fa-xmark");
        barIcon.classList.add("fa-bars");
    }
}

updateBars();

//Parallax
const elements = {
    stars: document.getElementById("stars"),
    sun: document.getElementById("sun"),
    cloud: document.getElementById("cloud"),
    farMount: document.getElementById("farmount"),
    closeMount: document.getElementById("closemount"),
    intHeader: document.getElementById("intro-header"),
};

let isReducedMotion = false;

function checkReducedMotion() {
    isReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
    updateParallax();
}

function updateParallax() {
    if (!isReducedMotion) {
        window.addEventListener("scroll", () => {
            const value = window.scrollY;
            const rotationAngle = (value / 400) * -1;

            elements.stars.style.transform = `rotate(${rotationAngle}deg)`;
            elements.stars.style.left = -value * 0.1 + "px";
            elements.cloud.style.left = value + "px";
            elements.sun.style.top = -value * 0.75 + "px";
            elements.sun.style.left = -value * 0.5 + "px";
            elements.farMount.style.top = value * 0.35 + "px";
            elements.closeMount.style.top = value * 0.15 + "px";
            elements.intHeader.style.top = -value * 2 + "px";
        });
    } else {
        window.removeEventListener("scroll", updateParallax);
    }
}

checkReducedMotion();
window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .addEventListener("change", checkReducedMotion);

// Scroll Effects
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

const hiddenElementsTwo = document.querySelectorAll(".hidden-two");
hiddenElementsTwo.forEach((el) => observer.observe(el));

//Copy Text
const supElement = document.getElementById("copyText");
const popup = document.getElementById("popup");

//Copy to Clipboard on element click
supElement.addEventListener("click", async function (event) {
    const textToCopy = "0xA67D28936E714ce40A16700fAF1121f6a06D8E64"; // Replace with your desired text

    // Create a temporary text area element
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        await navigator.clipboard.writeText(textToCopy);

        // Position the popup relative to the <sup> element within the "popup-container"
        const supRect = supElement.getBoundingClientRect();
        const popupContainer = supElement.parentElement;
        // popup.style.top = "0";
        popup.style.top = supRect.height + -62 + "px";
        popup.style.left = supRect.width + -140 + "px"; // Adjust the left position
        popup.style.display = "inline-block";
        setTimeout(function () {
            popup.style.display = "none";
        }, 2000);
    } catch (error) {
        console.error("Unable to copy text to clipboard:", error);
    } finally {
        document.body.removeChild(textArea);
    }

    event.stopPropagation(); // Prevent the click event from propagating to the parent <h2> element
});

// Uncheck Hamburger Nav Checkbox on Link Click
const hamCheck = document.getElementById("ham-check");
const links = document.querySelectorAll(".menu-links a");
const barNav = document.getElementById("bars");

links.forEach((link) => {
    link.addEventListener("click", function () {
        hamCheck.checked = false; // Uncheck the checkbox
        barNav.classList.remove("fa-xmark");
        barNav.classList.add("fa-bars");
    });
});