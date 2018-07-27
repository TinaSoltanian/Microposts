import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);


document.querySelector(".post-submit").addEventListener('click',submitPost);


function submitPost(){
  const data = ui.getInputValues();

  http.post('http://localhost:3000/posts',data)
  .then(data => {
      getPosts();
      ui.clearField();
      ui.showAlert("Post added","alert alert-success");      
  })
  .catch(err => console.log(err));
}


function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err));
}
