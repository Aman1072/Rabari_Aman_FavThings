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