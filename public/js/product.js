const elements = {};
elements.editBtn = document.querySelector("#edit");
elements.deleteBtn = document.querySelector("#delete");
const prodId = document.querySelector("h1").getAttribute("productId");

// Edit Icon Functionality
elements.editBtn.addEventListener("click", () => {
  const editableElements = document.querySelectorAll(".editable");
  for (const element of editableElements) {
    if (
      element.tagName === "BUTTON" ||
      element.classList.contains("category")
    ) {
      element.hidden = !element.hidden;
    } else element.readOnly = !element.readOnly;
  }
});

// Delete
const delUrl = `http://localhost:3000/products/${prodId}`;
elements.deleteBtn.addEventListener("click", async () => {
  fetch(delUrl, {
    method: "DELETE",
  }).then(() => {
    window.location.href = "http://localhost:3000/products";
  });
});

// Form Submit
