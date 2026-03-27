const redirectParams = Object.fromEntries(new URLSearchParams(window.location.search));
window.redirectParams = redirectParams;

// show a 3-second progress bar before navigating
const progressBar = document.getElementById('progressBar');
const statusMessage = document.getElementById('status-message');

const totalDuration = 300;
const totalDurationRollover = 200;
const stepInterval = 50;
let elapsed = 0;
let elapsedRollover = 0;

const skey = redirectParams.skey;
const cid = redirectParams.cid;
const csvUrl = `https://tigerspend.rit.edu/statementdetail.php?skey=${encodeURIComponent(skey)}&cid=${encodeURIComponent(cid)}&format=csv&format=csv&startdate=2025-08-01&enddate=2026-04-30&acct=63`;
const rolloverUrl = `https://tigerspend.rit.edu/statementdetail.php?skey=${encodeURIComponent(skey)}&cid=${encodeURIComponent(cid)}&format=csv&format=csv&startdate=2025-08-01&enddate=2026-04-30&acct=29`;
const csvUrlThisTerm = `https://tigerspend.rit.edu/statementdetail.php?skey=${encodeURIComponent(skey)}&cid=${encodeURIComponent(cid)}&format=csv&format=csv&startdate=2026-01-01&enddate=2026-04-30&acct=63`;
const rolloverUrlThisTerm = `https://tigerspend.rit.edu/statementdetail.php?skey=${encodeURIComponent(skey)}&cid=${encodeURIComponent(cid)}&format=csv&format=csv&startdate=2026-01-01&enddate=2026-04-30&acct=29`;

const toggleThisTerm = document.getElementById("cb2-7");

toggleThisTerm.addEventListener("change", () => {
  localStorage.setItem("ToggleThisTermState", toggleThisTerm.checked);
  console.log("Toggle This Term state saved:", toggleThisTerm.checked);
});

localStorage.setItem("ToggleThisTermState", false);

function thistermfunc(checked) {
  localStorage.setItem("ToggleThisTermState", checked);
  console.log("Toggle This Term state saved:", checked);
}

const statsbtn = document.getElementById("viewStatsBtn");

function showStatsButton() {
  statsbtn.classList.remove("hidden");

  // allow the browser to apply display change first
  requestAnimationFrame(() => {
    statsbtn.classList.add("show");
  });
}



fetch(csvUrl)
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.text(); // get the CSV as plain text
  })
  .then(csvText => {
    console.log(csvText); // raw CSV content

    // Option 1: Save it to sessionStorage
    sessionStorage.setItem("myCSV", csvText);

    // Option 2: Parse CSV immediately
    const rows = csvText.split("\n").map(row => row.split(","));
    console.log(rows);
  })
  .catch(err => console.error("Failed to fetch CSV:", err));

fetch(rolloverUrl)
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.text(); // get the CSV as plain text
  })
  .then(csvText => {
    console.log(csvText); // raw CSV content

    // Option 1: Save it to sessionStorage
    sessionStorage.setItem("myCSVRollover", csvText);

    // Option 2: Parse CSV immediately
    const rows = csvText.split("\n").map(row => row.split(","));
    console.log(rows);
  })
  .catch(err => console.error("Failed to fetch CSV:", err));

fetch(rolloverUrlThisTerm)
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.text(); // get the CSV as plain text
  })
  .then(csvText => {
    console.log(csvText); // raw CSV content

    // Option 1: Save it to sessionStorage
    sessionStorage.setItem("MyCSVRolloverThisTerm", csvText);

    // Option 2: Parse CSV immediately
    const rows = csvText.split("\n").map(row => row.split(","));
    console.log(rows);
  })
  .catch(err => console.error("Failed to fetch CSV:", err));

fetch(csvUrlThisTerm)
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.text(); // get the CSV as plain text
  })
  .then(csvText => {
    console.log(csvText); // raw CSV content

    // Option 1: Save it to sessionStorage
    sessionStorage.setItem("MyCSVThisTerm", csvText);

    // Option 2: Parse CSV immediately
    const rows = csvText.split("\n").map(row => row.split(","));
    console.log(rows);
  })
  .catch(err => console.error("Failed to fetch CSV:", err));

const timer = setInterval(() => {
    elapsed += stepInterval;
    const percent = Math.min(100, (elapsed / totalDuration) * 100);
    if (progressBar) progressBar.style.width = `${percent}%`;

    if (statusMessage) {
        statusMessage.textContent = `Loading main CSV...`;
    }

    if (elapsed >= totalDuration) {
        clearInterval(timer);
    }
}, stepInterval);
setTimeout(() => {
    const timerrollover = setInterval(() => {
        elapsedRollover += stepInterval;
        const percent = Math.min(100, (elapsedRollover / totalDurationRollover) * 100);
        if (csvProgressBar) csvProgressBar.style.width = `${percent}%`;

        if (elapsedRollover >= totalDurationRollover) {
            clearInterval(timerrollover);
            const redirectDestination = redirectParams.redirect || 'dining.html';
            showStatsButton();
        }
    }, stepInterval);
}, 350);

