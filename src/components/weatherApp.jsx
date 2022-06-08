import axios from "axios";
import WeatherForm from "./weatherForm";
import { useEffect, useState } from "react";
import WeatherMainInfo from "./weatherMainInfo";
import styles from "./weatherApp.module.css";
import Loading from "./loading";

const { REACT_APP_KEY, REACT_APP_URL } = process.env;

export default function WeatherApp() {

    const [weather, setWeather] = useState(null);
    
    useEffect(() => {
        loadInfo();
    }, []);
    
    useEffect(() => {
        document.title = `Weather | ${weather?.location.name ?? ""}`;
    }, [weather]);


    async function loadInfo(city = 'buenos aires') {
        try {            
            const info = await axios.get(`${REACT_APP_URL}&key=${REACT_APP_KEY}&q=${city}`);

            const cityInfo = info.data;
            
            setTimeout(() => {
                setWeather(cityInfo);
            }, 2000)

        } catch (error) {
            return error
        }
    }


    function handleChangeCity(city) {
        setWeather(null);
        loadInfo(city);
    }

    return (
        <div className={styles.containerAll}>
            <div className={styles.weatherContainer}>
                <WeatherForm onChangeCity={handleChangeCity}/>
                {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}         
            </div>
        </div>
    );
}