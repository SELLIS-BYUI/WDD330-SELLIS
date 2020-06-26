var url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

export const getJsonUrl = (url) =>{
    var jsonData = fetch(url)
    .then(function (response){
        return response.json();
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