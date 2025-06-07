const spinner = document.getElementById("spinner");
const table = document.getElementById("data-table");
const tableBody = document.getElementById("table-body");
const pagination = document.getElementById("pagination");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageMember = document.getElementById("page-number");

let data = [];
let currentPage = 1;
const rowsPerPage = 10;

// Fetch data from API
async function fetchData() {
  spinner.style.display = "flex";
  try {
    const response = await fetch("https://randomuser.me/api/?results=50");
    const json = await response.json();
    data = json.results;
    console.log(data);
    displayTable(data);
    updateButtons();
  } catch (error) {
    console.error("Error fetching data", error);
  } finally {
    spinner.style.display = "none";
    table.style.display = "table";
    pagination.style.display = "block";
  }
}

// Display table data
function displayTable(dataToDisplay) {
  tableBody.innerText = "";
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  console.log("start", start, "end", end);
  const paginatedItems = dataToDisplay.slice(start, end);

  dataToDisplay.forEach((user) => {
    const row = ` <tr>
          <td data-label="Name">${user.name.first} ${user.name.last}</td>
          <td data-label="Email">${user.email}</td>
          <td data-label="Username">${user.login.username}</td>
          <td data-label="Country">${user.location.country}</td>
        </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

// Previous Page
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayTable(data);
    updateButtons();
  }
}

// Next Page
function nextPage() {
  if (currentPage * rowsPerPage < data.length) {
    currentPage++;
    displayTable(data);
    updateButtons();
  }
}

// Update pagination buttons
function updateButtons() {
  pageNumber.innerText = currentPage;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage * rowsPerPage >= data.length;
}

// Startup
fetchData();

// Dark Mode functionality
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// check if dark mode is preferred or previously chosen

const isDarkMode = localStorage.getItem("dark-mode") === "true";

// set initial mode
if (isDarkMode) {
  body.classList.add("dark-mode");
  themeToggle.innerText = "Light Mode";
}

// Toggle dark mode and update text
themeToggle.addEventListener("click", () => {
  body.style.transition = "background-color 0.3s, color 0.3s";
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    themeToggle.innerText = "Dark Mode";
    localStorage.setItem("dark-mode", "true");
  }
});
