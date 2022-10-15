//import files go on top


(() => {
    const   favThingsButtons = document.querySelector("#favThingsButtons"),
            theFavButtonTemplate = document.querySelector("#favThingsButtonTemplate").content;

    let favourteItems = [];

    // Fetch function and get my fav things data
    function getFavData() {
        fetch("./data.json")
            .then(res => res.json())
            .then(data => {
                // save to get later
                favourteItems = data;

                buildFavThings(data);
            })
        .catch(error => {
            console.error(error);
        });
    }

    function buildFavThings(info) {

        const favouriteNames = Object.keys(info);

        updateText(info[favouriteNames[0]])

        // add all thumbnails at the bottom
        favouriteNames.forEach(favorite => {
            let panel = theFavButtonTemplate.cloneNode(true);
            let section = panel.children;

            section[0].dataset.Title = favorite

            // add image
            section[0].querySelector("img").src = `images/${info[favorite].Image}`;

            favThingsButtons.appendChild(panel);
        });

        // going through each button and adding click thing event
        let buttons = document.querySelectorAll(".favourite_button");
        buttons.forEach(button => {
            button.addEventListener('click', clickFavourite)
        });
    }

    function clickFavourite(event) {
        // click to get name and then change
        const favorite = event.currentTarget.dataset.Title;
        updateText(favourteItems[favorite])
    }

    function updateText(data) {
        const landingBox = document.querySelector("#favThings");
        let section = landingBox.children;
        // add image
        // first div
        section[1].querySelector("img").src = `images/${data.Image}`;

        // getting the second div children
        let text = section[0].children
        // update the text
        text[0].textContent = data.Title;
        text[1].textContent = data.Text;
        text[2].textContent = data.Description;
    }

    getFavData();
})();