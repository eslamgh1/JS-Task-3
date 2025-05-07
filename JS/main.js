var BookmarkName = document.getElementById("BookmarkName");
var bookmakURL = document.getElementById("bookmakURL");

var bookmarkRepo = [];

if (localStorage.getItem("MyStorage") !== null) {
  bookmarkRepo = JSON.parse(localStorage.getItem("MyStorage"));
  bookmarkRepo = bookmarkRepo.map((site) => ({
    ...site,
    url: site.url.match(/^https?:\/\//) ? site.url : `https://${site.url}`,
  }));
  localStorage.setItem("MyStorage", JSON.stringify(bookmarkRepo));
  displaySite();
}

function addSite() {
  let taskinfoCode = BookmarkName.value.trim();
  let taskinfoUrl = bookmakURL.value.trim();

  // Normalize URL: Add 'https://' if no protocol is specified
  if (!taskinfoUrl.match(/^https?:\/\//)) {
    taskinfoUrl = `https://${taskinfoUrl}`;
  }

  const site = {
    code: taskinfoCode,
    url: taskinfoUrl,
  };

  // Check for duplicate site names
  const isDuplicate = bookmarkRepo.some(
    (hambozoAihaga) => hambozoAihaga.code.toLowerCase() === taskinfoCode.toLowerCase()
  );

  if (!taskinfoCode || !taskinfoUrl || !validationName(taskinfoUrl)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      text: "Valid site name and URL are required (e.g., https://www.abcd.com or www.abcd.com)",
    });
  } else if (isDuplicate) {
    Swal.fire({
      icon: "warning",
      title: "Duplicate Site Name",
      text: `The site name "${taskinfoCode}" already exists. Please choose a different name.`,
    });
  } else {
    bookmarkRepo.push(site);
    localStorage.setItem("MyStorage", JSON.stringify(bookmarkRepo));
    displaySite();
    clearForm();
  }
}

function displaySite() {
  let taskBox = ``;
  for (let i = 0; i < bookmarkRepo.length; i++) {
    taskBox += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookmarkRepo[i].code}</td>
        <td>
          <a class="btn btn-danger text-decoration-none text-light" href="${bookmarkRepo[i].url}" target="_blank">
            <i class="fa-regular fa-eye mx-2"></i>Visit
          </a>
        </td>
        <td>
          <button onclick="deleteTask(${i})" type="button" class="btn btn-danger">
            <i class="fa-solid fa-trash mx-2"></i>Delete
          </button>
        </td>
      </tr>
    `;
  }
  document.getElementById("allTasks").innerHTML = taskBox;
}

function deleteTask(index) {
  bookmarkRepo.splice(index, 1);
  localStorage.setItem("MyStorage", JSON.stringify(bookmarkRepo));
  displaySite();
}

function clearForm() {
  BookmarkName.value = "";
  bookmakURL.value = "";
}

function validationName(url) {
  const regex = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/[\w-]*)*$/;
  const databByUser = url || bookmakURL.value;

  if (regex.test(databByUser)) {
    bookmakURL.classList.add("is-valid");
    bookmakURL.classList.remove("is-invalid");
    return true;
  } else {
    bookmakURL.classList.add("is-invalid");
    bookmakURL.classList.remove("is-valid");
    Swal.fire({
      icon: "error",
      title: "Invalid URL",
      text: "Enter a valid URL (e.g., https://www.abcd.com or www.abcd.com)",
    });
    return false;
  }
}