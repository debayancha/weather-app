const fetchResults = async (city) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=29969bb26e444dce97d61222250402&q=${city}&aqi=yes`;
    
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("City not found");

        const data = await res.json();
        console.log(data);
        
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
};

// Function to get current Date and Time
const getDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = now.toLocaleDateString('en-US', options);
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;  // Convert to 12-hour format
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const time = `${hours}:${minutes} ${ampm}`;
    return `${date} | ${time}`;
};

// Function to display data
const displayData = (data) => {
    const weatherContainer = document.getElementById("weatherResult");
    weatherContainer.innerHTML = `
        <p><strong>${data.location.name}, ${data.location.region}, ${data.location.country}</strong></p>
        <p><small>${getDateTime()}</small></p> <!-- Display Date & Time -->
        <p>🌡️ Temperature: ${data.current.temp_c}°C</p>
        <p>☁️ Condition: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather Icon">
    `;
};

let search = document.getElementById('search');
search.addEventListener('click', () => {
    let city = document.getElementById('cityInput').value;
    if (city) fetchResults(city);
});
