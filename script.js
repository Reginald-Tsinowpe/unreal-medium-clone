
//      REPLACE ELEMENT.ID WITH USERNAME
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => {
        json.forEach(async (element) => {
            let author_name = await Fetch_Author_Name(element.id);

            let one_blog = document.createElement('div'); 
            one_blog.className= "one-blog";
            one_blog.innerHTML = `
            <div class="one-blog-details">
                <a href="./blog/index.html?open-blog=https://jsonplaceholder.typicode.com/posts/${element.id}">

                    <div class="one-blog-details-image">
                        <div class="one-blog-creator-info">
                            <p class="one-blog-creator-name"><i class="fa-regular fa-circle-user"></i> ${author_name}</p>
                            <p class="one-blog-title">${element.title}</p>
                            <p class="one-blog-body">${element.body}</p>
                        </div>
                        
                        <div>
                            <img src="https://picsum.photos/200/100" class="blog-image">
                        </div>

                    </div>
                    

                </a>
                <div class="lower-buttons">
                    
                    <a href="./blog/index.html?open-blog=https://jsonplaceholder.typicode.com/posts/${element.id}">
                            <div class="blog-summary-clap-comment">
                                <span>Creation Date</span>
                                <i class="fa-solid fa-hands-clapping" data-tip="x claps"></i>
                                <i class="fa-solid fa-comment" data-tip="x responses"></i>
                            </div>
                    </a>        
            
                    <div class="blog-summary-clickable-options">
                        <i class="fa-solid fa-ban" data-tip="show less like this" onClick="alert('You will not see such blogs going forward.'); Deactive_Options_Menu()"></i>
                        <i class="fa-solid fa-bookmark" data-tip="save" onClick="alert('Blog has been saved to your favorites.'); Deactive_Options_Menu()"></i>
                        <div class="hold-options-icon-detail-div">
                            <i class="fa-solid fa-ellipsis" data-tip="more" onClick="Toggle_Options_Menu(event);"></i>
                            <div class="blog-summary-more-options">
                                <div onClick="alert('You will see more of such blogs going forward.');Deactive_Options_Menu()">
                                    <p><i class="fa-solid fa-circle-plus"></i>Show more</p>
                                    <p>Recommend more stories like this to me.</p>
                                </div>

                                <div  onClick="alert('You will not see such blogs going forward.'); Deactive_Options_Menu();">
                                    <p><i class="fa-solid fa-circle-minus"></i>Show less</p>
                                    <p>Recommend fewer stories like this to me.</p>
                                </div>

                                <hr>
                                <p onClick="Follow_Author(${element.userId})">Follow author</p>
                                <p onClick="Follow_Publication(${element.userId})">Follow publication</p>
                                <hr>

                                <p onClick="Mute_Author(${element.userId})">Mute author</p>
                                <p onClick="Mute_Publication(${element.userId})">Mute publication</p>
                                <p>Report story...</p>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
                
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


function Toggle_Options_Menu(event){
    const icon = event.currentTarget; // The clicked <i> element
    const container = icon.closest('.hold-options-icon-detail-div'); // Ensure the container exists
    if (!container) return;

    const menu = container.querySelector('.blog-summary-more-options');

    if (!menu) return;

    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
    } else {
        Deactive_Options_Menu();
        menu.classList.add('show'); 
    }
}

async function Follow_Author(user_id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`);
        const user_data = await response.json();
        
        alert(`You are now following ${user_data.name}`);
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data.");
    }

    Deactive_Options_Menu();
}
async function Follow_Publication(user_id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`);
        const user_data = await response.json();
        
        alert(`You are now following ${user_data.company.name}`);
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data.");
    }

    Deactive_Options_Menu();
}

function Deactive_Options_Menu(){
    document.querySelectorAll('.blog-summary-more-options').forEach(menu => {
        menu.classList.remove("show")});
}

async function Mute_Author(user_id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`);
        const user_data = await response.json();
        
        alert(`You have muted ${user_data.name}`);
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data.");
    }

    Deactive_Options_Menu();
}
async function Mute_Publication(user_id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`);
        const user_data = await response.json();
        
        alert(`You have muted ${user_data.company.name}`);
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data.");
    }

    Deactive_Options_Menu();
}

async function Fetch_Author_Name(user_id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`);
        const user_info = await response.json();
        return user_info.name || "Anonymous Creator"; // Now it correctly returns the name
    } catch (error) {
        console.error("Error fetching author name:", error);
        return "Unknown Author"; // Fallback in case of error
    }
}