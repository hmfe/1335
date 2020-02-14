export default async function  countryAPI(userInput) {
    var response = await fetch('https://restcountries-v1.p.rapidapi.com/name/' + encodeURIComponent(userInput), {
        headers: {
            "X-RapidAPI-Host": "restcountries-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "ca5af657a4mshfb7d346f15f6cabp1cd280jsn51556ef34eb2"
        }
    });
    return await response.json();
} 
