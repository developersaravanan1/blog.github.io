// Load saved blog posts from local storage on page load
window.addEventListener("load", function() {
    var savedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    savedPosts.forEach(function(post) {
      createBlogPostElement(post);
    });
  });
  
  // Event listener for form submission
  document.getElementById("blogForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get input values
    var title = document.getElementById("titleInput").value;
    var content = document.getElementById("contentInput").value;
    var image = document.getElementById("imageInput").files[0];
    var video = document.getElementById("videoInput").files[0];
  
    // Read image file as a Base64-encoded string
    var reader = new FileReader();
    reader.onload = function(event) {
      var imageData = event.target.result;
  
      // Create blog post object
      var post = {
        title: title,
        content: content,
        image: imageData ? imageData : null,
        video: video ? URL.createObjectURL(video) : null
      };
  
      // Save blog post to local storage
      var savedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
      savedPosts.push(post);
      localStorage.setItem("blogPosts", JSON.stringify(savedPosts));
  
      // Create and append the blog post element
      createBlogPostElement(post);
  
      // Reset form fields
      document.getElementById("blogForm").reset();
    };
    reader.readAsDataURL(image);
  });
  
  // Function to create a blog post element and append it to the main section
  function createBlogPostElement(post) {
    var postElement = document.createElement("div");
    postElement.style.justifyContent="center";
    postElement.style.alignItems="center";
    postElement.style.textAlign="center";
    postElement.style.marginBottom="20px";
    postElement.classList.add("post");


  
    var titleElement = document.createElement("h2");
    titleElement.textContent = post.title;
    postElement.appendChild(titleElement);
  
    var contentElement = document.createElement("p");
    contentElement.textContent = post.content;
    postElement.appendChild(contentElement);
  
    if (post.image) {
      var imageElement = document.createElement("img");
      imageElement.src = post.image;
      imageElement.style.width="150px";
      imageElement.style.height="auto";
      postElement.appendChild(imageElement);
    }
  
    if (post.video) {
      var videoElement = document.createElement("video");
      videoElement.src = post.video;
      videoElement.controls = true;
      postElement.appendChild(videoElement);
    }
  
    document.getElementsByTagName("main")[0].appendChild(postElement);
  }
  