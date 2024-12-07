// let searchBtn = document.getElementById("submit");
// let searchInput = document.getElementById("search");

// let allCountries=[];

// searchInput.addEventListener("keyup" , function(){
//     getWeather(searchInput.value)
//     // forcast(id)
    
//     })


//     getWeather("Cairo");


// async function getWeather(name){
//     let response = await fetch(`https://api.weatherapi.com/v1/search.json?key=083afff6666b4730bf6150519240612&q=${name}`);
//     let final = await response.json();
    
//     allCountries=final;
//     displayData();
// }





// function displayData(){
//     let cartona="";
//     for(let i=0 ; i<allCountries.length ; i++){
//         cartona=`
//                   <div class="col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4 p-0   ">

//                   <div class="box ">
//                       <div class="box-header d-flex ">
//                           <div class="day">Wednesday</div>
//                           <div class=" date ms-auto">4December</div>
//                       </div>
//                       <div class="location-2">${allCountries[i].name}</div>
//                       <div class="content">
//                           <div class="degree">
//                               19.2  <sup>o</sup> c
//                           </div>
//                           <div class="icon">
//                               <img src="143.webp" alt="">
//                           </div>
//                       </div>
//                       <div class="custom">Mist</div>

//                       <div class="pb-4  box-footer ">
//                           <span class="px-2">
//                               <img src="icon-umberella.png" class="px-1" alt="">20%

//                           </span>
//                           <span class="px-2">
//                               <img src="icon-wind.png" class="px-1" alt="">18km/h
//                           </span>
//                           <span class="px-2">
//                               <img src="icon-compass.png" class="px-1" alt="">East
//                           </span>
//                       </div>
//                   </div>
             
              
//                   </div>


//                   <div class="col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4 p-0   ">
                       
//                     <div class="box2">
//                       <div class="box2-head">
//                         <div class="day2">Saturday</div>
//                       </div>
//                       <div class="content2">
//                         <div class="logo2">
//                           <img src="116.webp" alt="">
//                         </div>

//                         <div class="degree2">
//                           22.6 <sup>o</sup>c
//                         </div>
//                         <small>16.1<sup>o</sup></small>
//                         <div class="custom2 ">Partly Cloudy </div>
//                       </div>
//                     </div>
//               </div>

//               <div class="col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4 p-0   ">
                       
//                 <div class="box3">
//                   <div class="box4-header ">
//                     <div class="day3">Sunday</div>
//                   </div>
//                   <div class="content2">
//                     <div class="logo2">
//                       <img src="113.webp" alt="">
//                     </div>

//                     <div class="degree2">
//                       24.4<sup>o</sup>c
//                     </div>
//                     <small>16.5<sup>o</sup></small>
//                     <div class="custom2 ">Sunny </div>
//                   </div>
//                 </div>
//           </div>
//          `
//     }

//     document.getElementById("rowData").innerHTML=cartona;
// }




// //  async function forcast(id){
// // let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=%20083afff6666b4730bf6150519240612&q=${id}`)
// // let final = await response.json();
// // console.log(final);

// // }
















let locationField = document.querySelector(".location-2");
let tempertureField = document.querySelector(".degree ");
let weatherField = document.querySelector(".custom");
let dateandTimeField = document.querySelector(".date");
let searchField = document.querySelector(".location-input");
let form = document.querySelector('form');
let iconLogo = document.querySelector(".logo");
let dayField = document.querySelector(".day");

form.addEventListener('keyup', searchForLocation);

let target = 'cairo';

let fetchResults = async function(tLocation) {
  

    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=083afff6666b4730bf6150519240612&q=${tLocation}&days=3`);
    let data = await res.json();
    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    let icon = data.current.condition.icon;
    let forecastData = data.forecast.forecastday;

    updateDetails(temp, locationName, time, condition, icon, forecastData);
};

function updateDetails(temp, locationName, time, condition, icon, forecastData) {
    let splitDate = time.split(" ")[0];
    let splitTime = time.split(" ")[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    tempertureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${splitDate} ${splitTime}`;
    weatherField.innerText = condition;
    iconLogo.setAttribute('src', `https:${icon}`);
    dayField.innerText = currentDay;

    let forecastDays = forecastData.slice(1); 
    displayForecast(forecastDays);
}

function displayForecast(forecastDays) {
    let forecastContainer = document.querySelector("#forecastContainer");

    
    forecastContainer.innerHTML = "";

    for (let i = 0; i < forecastDays.length; i++){
      const dayData = forecastDays[i];
        let dayForecast = document.createElement('div');
        dayForecast.classList.add( 'forecast-day');



        if (i === 1) {
          let box2 = document.querySelector(".box2")
          let day2 = document.querySelector(".day2")


         box2.classList.add('menna');
         day2.classList.add('headd');
      }

        let dayName = getDayName(new Date(dayData.date).getDay());
        let minTemp = dayData.day.mintemp_c;
        let maxTemp = dayData.day.maxtemp_c;
        let condition = dayData.day.condition.text;
        let icon = dayData.day.condition.icon;

        dayForecast.innerHTML = `
           


                

              <div class="box2">
                      <div class="box2-head">
                        <div class="day2">${dayName}</div>
                      </div>
                      <div class="content2">
                        <div class="logo2">
                          <img src="https:${icon}" alt="">
                        </div>

                        <div class="degree2">
                          ${maxTemp}<sup>o</sup>C
                        </div>
                        <small>${minTemp } <sup>o</sup>  </small>
                        <div class="custom2 ">${condition} </div>
                      </div>
                    </div>
                   
                    
        `;

        forecastContainer.appendChild(dayForecast);
    }
  
}

function searchForLocation(e) {
    e.preventDefault();

  var target = searchField.value;
    fetchResults(target);
}

fetchResults(target);

function getDayName(number) {
    switch (number) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
}
