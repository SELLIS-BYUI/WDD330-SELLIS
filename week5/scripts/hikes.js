const hikeList = [
    {
        name: "Bechler Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description:
        "Beautiful short hike along the Bechler river to Bechler Falls",
        directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
        name: "Teton Canyon",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description: "Beautiful short (or long) hike through Teton Canyon.",
        directions:
        "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Stateline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
        name: "Denanda Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "7 miles",
        difficulty: "Moderate",
        description:
        "Beautiful hike through Bechler meadows river to Denanda Falls",
        directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
];

const displayHikes = () => {
    const hike = hikeList;
    const imgBasePath = "//byui-cit.github.io/cit261/examples/";
    let startingPoint = document.getElementById('orderedHikeList');
    
    startingPoint.innerHTML = '';

    for(let i = 0; i < hike.length; i++) {
    let hikeListItem = document.createElement('li'); 
    hikeListItem.setAttribute('class', 'gridChild');
        hikeListItem.innerHTML = `
            <h2>${hike[i].name}</h2>
            <img src=${imgBasePath}${hike[i].imgSrc} alt=${hike[i].imgAlt} width="430" height="200">
            <h3>Distance:</h3>
            <p>${hike[i].distance}</p>
            <h3>Difficulty:</h3> 
            <p>${hike[i].difficulty}</p>`; 

        startingPoint.appendChild(hikeListItem);
    }
}
displayHikes();