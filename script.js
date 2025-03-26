
//      REPLACE ELEMENT.ID WITH USERNAME
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => {
        json.forEach(element => {
            let one_blog = document.createElement('div'); 
            one_blog.className= "one-blog";
            one_blog.innerHTML = `
            <div class="one-blog-details">
            <a href="./blog/index.html?open-blog=https://jsonplaceholder.typicode.com/posts/${element.id}">

                <p >${element.id}</p>
                <p class="one-blog-title">${element.title}</p>
                <p class="one-blog-body">${element.body}</p>

                <div class="lower-buttons">
                    <!-- //date -->
                    <div>
                        <i class="fa-solid fa-hands-clapping" data-tip="x claps"></i>
                        <i class="fa-solid fa-comment" data-tip="x responses"></i>
                    </div>
                    
                    <div>
                        <i class="fa-solid fa-ban" data-tip="show less like this"></i>
                        <i class="fa-solid fa-bookmark" data-tip="save"></i>
                        <i class="fa-solid fa-ellipsis" data-tip="more"></i>
                    </div>

                    
                </div>
            </div>
                
                <p><img src="https://picsum.photos/100/100"></p>
                </a>
          
                
                <br>
            `; 
            const separator = document.createElement('hr');
            separator.className = "separator";

            document.getElementById("blog-posts").appendChild(one_blog);
            document.getElementById("blog-posts").appendChild(separator);
        });
  });


  document.getElementById("scroll-left").addEventListener("click", function() {
    document.getElementById("scroll-container").scrollBy({ left: -150, behavior: "smooth" });
});

document.getElementById("scroll-right").addEventListener("click", function() {
    document.getElementById("scroll-container").scrollBy({ left: 150, behavior: "smooth" });
});
