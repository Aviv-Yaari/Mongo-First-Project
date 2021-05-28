const elements = {};
elements.editIcon = document.querySelector(".icon-edit");
elements.deleteIcon = document.querySelector(".icon-delete");
elements.deleteBtn = document.querySelector("#delete");
const prodId = document.querySelector("h1").getAttribute("productId");

// Edit Icon Functionality
elements.editIcon.addEventListener("click", () => {
  const editableElements = document.querySelectorAll(".editable");
  for (const element of editableElements) {
    element.hidden = !element.hidden;
  }
});

// Delete
const delUrl = `http://localhost:3000/products/${prodId}`;
elements.deleteIcon.addEventListener("click", async () => {
  fetch(delUrl, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  }).then(() => {
    window.location.href = "http://localhost:3000/products";
  });
});
