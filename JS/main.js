var BookmarkName = document.getElementById("BookmarkName");
var bookmakURL = document.getElementById("bookmakURL");

var bookmarkRepo = [];


if (localStorage.getItem("MyStorage") !== null) {
  bookmarkRepo = JSON.parse(localStorage.getItem("MyStorage"));
  displaySite(bookmarkRepo);
}

function addSite() {
   site = {
    code: BookmarkName.value.trim(),
    url: bookmakURL.value.trim(),
  };

  // sit.code = get method
  // sit.url = get method
  
  var taskinfoCode = site.code;
  var taskinfoUrl = site.url;

  //&  Check if the BookmarkName already exists in the bookmarkRepo ( arrow function == shorthand )
  //& some() is method to test(to search) whether any element in the array  by the provided function

  var isDuplicate = bookmarkRepo.some( (hambozoAihaga) => hambozoAihaga.code.toLowerCase()===taskinfoCode.toLowerCase() );

  if (!taskinfoCode || !taskinfoUrl || !validationName()) {
    Swal.fire({
      icon: "error",
      title: "1st Valid Site and URL names cannot be empty",
      text: "2nd Valid website(such as): https://www.abcd.com or www.abcd.com",
      
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
    // console.log(bookmarkRepo);
  }
}

function displaySite() {
  var taskBox = ``;

  for (var i = 0; i < bookmarkRepo.length; i++) {
    taskBox += `
            <tr>
              <td>${i + 1}</td>
              <td>${bookmarkRepo[i].code}</td>
              <td><button type="button" class="btn btn-danger btn-visit"> <a class="text-decoration-none text-light" href="${bookmarkRepo[i].url}"><i class="fa-regular fa-eye mx-2"></i>Visit</a> </button></td>
              <td><button onclick="deleteTask(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash mx-2"></i>Delete</button></td>
            </tr>
  
    `;
  }

  //*  .innerHTML ==> add between first opening and lasting tags
  document.getElementById("allTasks").innerHTML = taskBox;
}

function deleteTask(index) {
  console.log(index);
  bookmarkRepo.splice(index, 1);
  localStorage.setItem("MyStorage", JSON.stringify(bookmarkRepo));
  displaySite();
}

function clearForm() {
  BookmarkName.value = null;
  bookmakURL.value = null;
}


function validationName(){
  var regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;
  var databByUser = bookmakURL.value;

  if (  regex.test(databByUser) )
    {
      bookmakURL.classList.add("is-valid")
      bookmakURL.classList.remove("is-invalid")

      return true

  } else{

    bookmakURL.classList.add("is-invalid")
    bookmakURL.classList.remove("is-valid")
    // window.alert("try again")
    Swal.fire({
      icon: "error",
      title: "Enter such as: https://www.abcd.com or www.abcd.com ",
      text: "Enter valid URL website",
    
    });

    return false
  }

  }




  
  // First trial without {{{{  isDuplicate   }}}} 
// function addSite() {
//   site = {
//     code: BookmarkName.value,
//     url: bookmakURL.value,
//   };
//   var taskinfoCode = site.code;
//   var taskinfoUrl = site.url;

//   if (taskinfoCode && taskinfoUrl && validationName()) {
//     bookmarkRepo.push(site);
//     localStorage.setItem("MyStorage", JSON.stringify(bookmarkRepo));

//     displaySite();
//     clearForm();
//     console.log(bookmarkRepo);
//   } 

//   else {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Site and URL names Cannot be empty",
//       footer: 'Enter such as: https://www.abcd.com or www.abcd.com '
//     });
//   }
// }






