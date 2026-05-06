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

const toggleThisTerm = document.getElementById("cb2-7");


localStorage.setItem("ToggleThisTermState", false);

const statsbtn = document.getElementById("viewStatsBtn");

// Add download functionality to CSV buttons
document.getElementById('mainCsvBtn').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'main.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

document.getElementById('rolloverCsvBtn').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = rolloverUrl;
    a.download = 'rollover.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Add upload file change listeners to change button color and save file contents to sessionStorage
function saveCsvFileToSession(file, storageKey, label) {
    if (!file) {
        sessionStorage.removeItem(storageKey);
        label.classList.remove('uploaded');
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        sessionStorage.setItem(storageKey, reader.result);
        label.classList.add('uploaded');
    };
    reader.onerror = () => {
        console.error('Failed to read CSV file:', reader.error);
        label.classList.remove('uploaded');
        sessionStorage.removeItem(storageKey);
    };
    reader.readAsText(file);
}

document.getElementById('mainCsvUpload').addEventListener('change', (event) => {
    const label = document.querySelector('label[for="mainCsvUpload"]');
    const file = event.target.files[0];
    saveCsvFileToSession(file, 'myCSV', label);
});

document.getElementById('rolloverCsvUpload').addEventListener('change', (event) => {
    const label = document.querySelector('label[for="rolloverCsvUpload"]');
    const file = event.target.files[0];
    saveCsvFileToSession(file, 'myCSVRollover', label);
});



