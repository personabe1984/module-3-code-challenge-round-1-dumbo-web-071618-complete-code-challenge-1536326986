document.addEventListener('DOMContentLoaded', function() {
  //id 75
  const imageId = 75; //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageBox = document.querySelector("#image");
  const imageName = document.querySelector("#name");
  const commentBox = document.querySelector("#comments");
  const likeSpan = document.querySelector("#likes");
  const likeBtn = document.querySelector("#like_button");
  const commentForm = document.querySelector("#comment_form");

  fetch(imageURL)
    .then(res => res.json())
    .then(data => {
      imageBox.setAttribute("src", data.url);
      imageName.innerText = data.name;
      likeSpan.innerText = data.like_count;
      data.comments.forEach( comment => {
        commentBox.appendChild(renderCommentFromDatabase(comment))
      })
    })

  likeBtn.addEventListener("click", () => {
    let likeCounter = parseInt(likeSpan.innerText, 10);
    likeSpan.innerText = likeCounter + 1;
    fetch(likeURL, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        image_id: imageId,
        like_count: likeSpan.innerText
      })
    })
  })

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newComment = document.querySelector("#comment_input");
    commentBox.appendChild(renderCommentFromFrontEnd(newComment.value));

    fetch(commentsURL, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        image_id: imageId,
        content : newComment.value
      })
    })
    newComment.value = '';
  })




})

function renderCommentFromFrontEnd(data){
  let comment = document.createElement('li');
  comment.innerText = data;

  let deleteBtn = document.createElement('button');
  deleteBtn.innerText = "X";

  comment.appendChild(deleteBtn);
  return comment;
}

function renderCommentFromDatabase(data){
  let comment = document.createElement('li');
  comment.innerText = data.content;

  let deleteBtn = document.createElement('button');
  deleteBtn.innerText = "X";
  //console.log(data.id);
  deleteBtn.setAttribute('data-id', data.id)
  comment.appendChild(deleteBtn);


  return comment;
}
