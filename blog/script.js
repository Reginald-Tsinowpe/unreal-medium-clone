alert("I will finish this part today.");
document.addEventListener("DOMContentLoaded", function () {

    const urlParams = new URLSearchParams(window.location.search);
    const blogUrl = urlParams.get("open-blog");

    if (blogUrl) {
        fetch(blogUrl)
            .then(response => response.json())
            .then(data => {
                // Display the blog post details
                document.getElementById("blog-title").textContent = data.title;
                document.getElementById("blog-body").textContent = data.body;

                for (let i = 0; i <= 3; i++) {
                    let bacon_ipsum = document.createElement("div");
                    bacon_ipsum.className = "bacon-text";
                    let img = document.createElement("img");

                    let random_width = Math.floor(Math.random() * (700 - 500 + 1)) + 500;
                    let random_height = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
                    img.src = `https://picsum.photos/${random_width}/${random_height}`;
                    img.style.maxWidth = "100vw";
                    img.alt = "Random Image";

                    let rand_length = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
                    Fetch_Lorem_Ipsum(rand_length).then(loremText => {
                        bacon_ipsum.textContent = loremText;
                        document.getElementById("main-body").appendChild(bacon_ipsum);
                        document.getElementById("main-body").appendChild(document.createElement("br"));
                        if (i !== 3) {
                            document.getElementById("main-body").appendChild(img);
                        }
                    });
                }

                // FETCH POST'S COMMENTS TO DISPLAY IN #RESPONSES
                fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}/comments`)
                    .then(response => response.json())
                    .then(comment_data => {
                        let comment_div = document.getElementById("responses");
                        comment_div.innerHTML = ""; // Clear previous content if any

                        comment_data.forEach(comment => {
                            let singleComment = document.createElement("div");
                            singleComment.className = "comment";

                            singleComment.innerHTML = `
                                <i class="fa-regular fa-circle-user"></i>
                                <strong>${comment.name}</strong> (<em>${comment.email}</em>)<br>
                                <p>${comment.body}</p>
                                <i class="fa-solid fa-hands-clapping" data-tip="x claps"></i>
                                <i class="fa-solid fa-comment" data-tip="x responses"></i>
                                <a style="color:black;">Reply</a>
                                <hr>
                            `;

                            comment_div.appendChild(singleComment);
                        });
                    })
                    .catch(error => console.error("Error fetching comments:", error));

                    //      FETCHING USER'S OTHER POSTS TO DISPLAY
                    fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}/posts`
                    ).then(response=>response.json()).then(user_posts => {
                        let more_from_user_div = document.getElementById("creator-grid");
                        
                        user_posts.slice(0, 4).forEach(user_post => {


                            let thumb_nail_img_src = `https://picsum.photos/100/100`;
                            
                            let post_summary = document.createElement('div');
                            post_summary.className = "extra-post-from-user";
                            post_summary.innerHTML = `
                                <h3>${user_post.title}</h3>
                                <p>${user_post.body.substring(0, 100)}...</p>
                                <img src=${thumb_nail_img_src}>
                                <a href="http://example.com">Read More</a>
                            `;
            
                            more_from_user_div.appendChild(post_summary);

                        })
                    });

                    //      FETCHING THE USER' NAME FOR THE "SEE ALL FROM USER LINK UNDER THE USER'S OTHER POSTS"
            fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
            .then(response => response.json()).then(user_data => {
                let all_from_user = document.createElement('a')
                all_from_user.textContent = `See all from ${user_data.name}`
                all_from_user.href = "http://example.com";
                all_from_user.id = "see-all-from-user";
                document.getElementById("more-from-creator").appendChild(all_from_user);


                document.getElementById("post-creator-name").textContent = user_data.name;
                document.getElementById("user-bio").textContent = user_data.company.catchPhrase;
            })


            //      RANDOMIZED POSTS RECOMMENDED FROM MEDIAN
            

            })
            .catch(error => console.error("Error fetching blog post:", error));

            
    } else {
        console.error("No blog URL found in query parameters.");
    }
});

function Fetch_Lorem_Ipsum(wordCount) {
    return fetch("https://baconipsum.com/api/?type=all-meat&paras=1&format=text",
        {method: "GET" }
).then(response=>response.text()).then(data => {
    return data;
});
}



