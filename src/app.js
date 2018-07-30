import { http } from "./http";
import { ui } from "./ui";

document.addEventListener("DOMContentLoaded", getPosts);

document.querySelector(".post-submit").addEventListener("click", submitPost);

document.querySelector("#posts").addEventListener("click", editPosts);

document.querySelector("#posts").addEventListener("click", deletePost);

document.querySelector(".card-form").addEventListener("click", cancelClicked);

function submitPost() {
  const data = ui.getInputValues();

  if (data.title === "" || data.body === "") {
    ui.showAlert("Please fill in all fields", "alert alert-danger");
  } else {
    const id = ui.getId();
    if (id === '') {
      http
        .post("http://localhost:3000/posts", data)
        .then(data => {
          getPosts();
          ui.clearField();
          ui.showAlert("Post added", "alert alert-success");
        })
        .catch(err => console.log(err));
    } else {
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          getPosts();
          ui.changeFormState('add');
          ui.showAlert("Post updated", "alert alert-success");
        })
        .catch(err => console.log(err));      
    }
  }
}

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function deletePost(e){
  //sif 
  e.preventDefault();
}

function editPosts(e) {
  if (document.querySelector(".post-cancel")) {
    ui.showAlert(
      "Please finish editing the current post",
      "alert alert-danger"
    );
  } else {
    const id = e.target.parentElement.dataset.id;
    let body = e.target.parentElement.previousElementSibling.textContent;
    let title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;

    let data = {
      id,
      title,
      body
    };

    ui.fillForm(data);
  }

  e.preventDefault();
}

function cancelClicked(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("cancel");
  }

  e.preventDefault();
}
