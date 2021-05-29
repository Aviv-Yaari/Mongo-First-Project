console.log("hello");
const form = document.querySelector("form");
const cat = document.querySelector("#cat");
let prodName = document.querySelector("#name");
form.addEventListener("submit", (event) => {
  // event.preventDefault();
  prodName.value = prodName.value.toLowerCase();
  if (!cat.value.trim()) {
    cat.name = "";
  }
  console.log(cat);
});
