import { prismaClient } from "./db.js";
import axios from "axios"

export async function updateWeather () {
    const findDestinationMany = await prismaClient.destinations.findMany({
        select : {
            id : true,
            alamat : true
        }
    })
    console.log(findDestinationMany);
    if(!findDestinationMany) {
        return
    }

    for (let index = 0; index < findDestinationMany.length; index++) {
        const getWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${findDestinationMany.latitude}&lon=${findDestinationMany.longtitude}&appid=${process.env.WEATHER_API_KEY}`)

        if(getWeather.status != 200 ) {
            return
        }

        const result = await getWeather.data
        prismaClient.weather.update({
            where : {
                destination_id : findDestinationMany.id
            },
            data : {
                main : result.weather[0].main,
                temp : result.main.temp,
                deksription : result.weather[0].description
            }
        })
    }
}
