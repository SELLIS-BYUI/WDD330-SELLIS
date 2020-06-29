//Code provided by team activity directions
export const getJsonUrl = (url) => {
    const jsonData = fetch(url)
    .then(function (response){
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            return response.json();
        }
    })
    .catch(function(error) {
        console.log(error);
    });
    return jsonData;
}

export const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};
