const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "New Delhi";

//    This is the way of fetching the json file from api call weather api

const fetchdata = async (target) => {
 try {
    const url = `https://api.weatherapi.com/v1/current.json?key=c068c1e2ffdf49d38db184220232302&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  
    //   This is the way of accesesing data from data object data.current.temp_c It signifies that data k andar se current k andar se tempc k andar ka data
  
    // Instead of passing this all value we can pass the parameters by destructuring the whole content
  
    // This is the way of accesing current element from data object
    //const{current}=data;
  


    // Destructuring the content 
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;
  
    // We have accesed the variables from destructuring then we can pass it by its name.
  
    updateDom(temp_c, name, icon, text, localtime);
 } catch (error) {
    alert("Location Not Found")
 }
};

fetchdata(target);

function updateDom(temperature, city, emoji, text, time) {
  //console.log(time);  karne setime ish format me aaega   2023-02-24 15:36  now we want date and time separaetly therefore we use split funcn

  // Splitt time ko split kardega jaha jaha " " space hoga uska 0th element hoga 2023-02-24 and 1st element hoga 15:39  therefore we are accessing it them with their indexes

  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];

  // This exact date funcn returns the number regarding the day i.e 0 for sunday,1 for monday,2 for tuesday and so on.....
  let Exactday = new Date(exactDate).getDay();
  Exactday= gettheDay(Exactday);

  // 11:01 - Monday 2022-06-22

  dateField.innerText=`${exactTime} - ${Exactday} - ${ exactDate}`

//   console.log(exactTime);
//   console.log(exactDate);

  temperatureField.innerText = temperature;
  cityField.innerText = city;
  emojiField.src = emoji;
  weatherField.innerText = text;
}

// Function to get the day 
function gettheDay(date) {
  switch (date) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Tuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thursday";

    case 5:
      return "Friday";
    case 6:
      return "Saturday";

    default:
      return "Dont know";
     
  }
}



const search=(e)=>{
    e.preventDefault();
    target= searchField.value

    // after getting data of search field value We will assign that value to fetch data funcn
    fetchdata(target)
   
 }
// Ye Event listeaner laga dia hai form k submissiobn pr ye hona chahie  ye search funcn ko call kardega 
form.addEventListener("submit",search)
