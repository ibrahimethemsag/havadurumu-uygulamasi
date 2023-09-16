import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function HavaDurumu() {
  const [sehir, setSehir] = useState("");
  const [havaDurumu, setHavaDurumu] = useState({});
  const [hata, setHata] = useState("");

  const API_KEY = "04eab7656c3ae613964df0f527ff4145";

  useEffect(() => {
    if (sehir) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${API_KEY}&units=metric`
        )
        .then((response) => {
          setHavaDurumu(response.data);
        })
        .catch((error) => {
          /* setHata("Hava durumu bilgileri alınamadı."); */
          console.error(error);
        });
      console.log(havaDurumu);
    }
  }, [sehir]);

  return (
    <>
      <div className="genelKutu">
        <h1 className="hava">Hava Durumu Uygulaması</h1>
        <input
          className="searchBar"
          type="text"
          placeholder="Şehir adı girin"
          value={sehir}
          onChange={(e) => setSehir(e.target.value)}
        />
        {hata && <p>{hata}</p>}
        {havaDurumu.main && (
          <div>
            <h2 className="havaDurumu">{sehir} Hava Durumu</h2>
            <img
              src={`http://openweathermap.org/img/w/${havaDurumu.weather[0].icon}.png`}
              alt={havaDurumu.weather[0].description}
              className="havaDurumuResmi"
            />
            <div className="detayDiv">
              <p className="havaDurumuAciklamasi">
                Hava Durumu: {havaDurumu.weather[0].description}
              </p>
              <p className="sicaklik">Sıcaklık: {havaDurumu.main.temp} °C</p>
              <p className="nemOrani">Nem Oranı: {havaDurumu.main.humidity}%</p>
              <p className="ruzgarHizi">
                Rüzgar Hızı: {havaDurumu.wind.speed} m/s
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HavaDurumu;
