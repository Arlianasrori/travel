import { app } from "./config/app.js";
import { updateWeather } from "./config/updateWeather.js";
setInterval(async () => {
    updateWeather()
},86400 * 1000)
app.listen(2008,console.log("server is running on localhost:2008"))
