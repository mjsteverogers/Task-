
 tailwind.config = {
      darkMode: 'class',
    };
const toggleButton = document.getElementById("toggleDark");

    toggleButton.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
    });
const readMoreBtn = document.getElementById("readMoreBtn");
  const moreText = document.getElementById("moreText");

  readMoreBtn.addEventListener("click", () => {
    if (moreText.classList.contains("hidden")) {
      moreText.classList.remove("hidden");
      readMoreBtn.textContent = "Read Less";
    } else {
      moreText.classList.add("hidden");
      readMoreBtn.textContent = "Read More";
    }
  });


document.getElementById("commentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  fetch("comments.php", {
    method: "POST",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `name=${encodeURIComponent(name)}&comment=${encodeURIComponent(comment)}`
  })
  .then(response => response.json())
  .then(data => {
    loadComments();
    document.getElementById("commentForm").reset();
  });
});


function loadComments() {
  fetch("comments.php")
    .then(res => res.json())
    .then(data => {
      const commentsDiv = document.getElementById("comments");
      commentsDiv.innerHTML = "";
      data.forEach(c => {
        const div = document.createElement("div");
        div.className = "bg-gray-100 dark:bg-gray-700 p-3 rounded";
        div.innerHTML = `<strong>${c.name}</strong><p>${c.comment}</p>`;
        commentsDiv.appendChild(div);
      });
    });
}

window.onload = loadComments;
