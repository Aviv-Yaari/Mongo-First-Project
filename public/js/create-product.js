console.log("hello");
const form = document.querySelector("form");
const cat = document.querySelector("#cat");
form.addEventListener("submit", (event) => {
  // event.preventDefault();
  if (!cat.value.trim()) {
    cat.name = "";
  }
  console.log(cat);
});
