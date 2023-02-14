let newPostBtn = document.getElementById("newBlogPostBtn");
let newBlogPost = document.getElementById("newBlogPost");
let newPostTitle = document.getElementById("newPostTitle")
let newPostSaveBtn = document.getElementById("newPostSaveBtn")
let newPostCancelBtn = document.getElementById("cancelNewPost")
let editBtns = document.getElementsByClassName("editBtn");
let deleteBtns = document.getElementsByClassName("deleteBtn")
let commentBtns = document.getElementsByClassName("commentBtn")

newPostBtn.addEventListener("click", () => {
    newPostBtn.setAttribute("class", "hide");
    newPostTitle.removeAttribute("class")
    newBlogPost.removeAttribute("class")
    newPostSaveBtn.removeAttribute("class")
    newPostCancelBtn.removeAttribute("class")
})

newPostSaveBtn.addEventListener("click", async () => {
    let title = newPostTitle.value.trim()
    let content = newBlogPost.value.trim()

    if (title && content) {
        console.log(title, content)
        const response = await fetch(`/api/posts/`, {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to create blog post');
        }
      }

    newPostTitle.value = ""
    newBlogPost.value = ""

    newPostTitle.setAttribute("class", "hide")
    newBlogPost.setAttribute("class", "hide")
    newPostSaveBtn.setAttribute("class", "hide")
    newPostCancelBtn.setAttribute("class", "hide")
    newPostBtn.removeAttribute("class");
})

newPostCancelBtn.addEventListener("click", () => {
    newPostTitle.value = ""
    newBlogPost.value = ""

    newPostTitle.setAttribute("class", "hide")
    newBlogPost.setAttribute("class", "hide")
    newPostSaveBtn.setAttribute("class", "hide")
    newPostCancelBtn.setAttribute("class", "hide")
    newPostBtn.removeAttribute("class");
})

for (let i=0; i < editBtns.length; i++) {
  editBtns[i].addEventListener("click", () => {
    event.preventDefault()
    let editDeleteDiv = event.target.parentNode
    let post = editDeleteDiv.previousElementSibling
    let postTitle = post.childNodes[1].childNodes[1].innerHTML
    let postContent = post.childNodes[3].childNodes[1].innerHTML

    let postId = event.target.parentNode.previousElementSibling.getAttribute("value")

    post.classList.add("hide")

    let editPost = document.createElement("div")
    editPost.setAttribute("class", "post")

    let editInput = document.createElement("input")
    editInput.setAttribute("id", "editPostTitle")
    editInput.setAttribute("placeholder", postTitle)

    let editTextarea = document.createElement("textarea")
    editTextarea.setAttribute("id", "editBlogPost")
    editTextarea.setAttribute("placeholder", postContent)

    let editBtnsDiv = document.createElement("div")

    let editSaveBtn = document.createElement("button")
    editSaveBtn.setAttribute("id", "editPostSaveBtn")
    editSaveBtn.textContent = "Save"

    let cancelEditBtn = document.createElement("button")
    cancelEditBtn.setAttribute("id", "cancelEditPost")
    cancelEditBtn.textContent = "Cancel"

    editBtnsDiv.appendChild(editSaveBtn)
    editBtnsDiv.appendChild(cancelEditBtn)

    editPost.appendChild(editInput)
    editPost.appendChild(editTextarea)
    editPost.appendChild(editBtnsDiv)

    post.parentNode.insertBefore(editPost, post.nextSibling)
    editDeleteDiv.setAttribute("class", "hide")

    cancelEditBtn.addEventListener("click", () => {
      post.parentNode.removeChild(editPost)
      post.classList.remove("hide");
      editDeleteDiv.removeAttribute("class", "hide")
    })

    editSaveBtn.addEventListener("click", async () => {
      console.log("this is gonna be rad")
      let newTitle = document.getElementById("editPostTitle").value
      let newContent = document.getElementById("editBlogPost").value

      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ 
          title: newTitle,
          content: newContent
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update blog post');
      }

    })
  
  })
}

for (let i=0; i< deleteBtns.length; i++) {
  deleteBtns[i].addEventListener("click", async () => {
    event.preventDefault()
    let editDeleteDiv = event.target.parentNode
    let postId = editDeleteDiv.previousElementSibling.getAttribute("value");
    console.log(postId)
    let response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }

  })
}
