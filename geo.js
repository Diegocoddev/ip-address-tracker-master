// Output Message

const ip = document.getElementById("ip");
const locationIP = document.getElementById("locationIP");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

// Input Message

const inputIP = document.getElementById("inputIP");
const btnIP = document.getElementById("btnIP");


inputIP.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      searchIP();
    }
  });

const searchIP = (event) => {
    const geoAPI = async(url) => {
        const dataGeo = await fetch(url);
        const resultData = await dataGeo.json();
        return resultData;   
    }

    geoAPI(`https://geo.ipify.org/api/v2/country,city?apiKey=at_EfOENpLctW6eGWu3rTLyvNSV94yfU&ipAddress=${inputIP.value}`)
    .then((res) => {
        ip.innerText = res.ip;
        locationIP.innerText = res.location.city;
        timezone.innerText = res.location.timezone;
        isp.innerText = res.isp;

        let container = L.DomUtil.get('map');
        if (container != null) {
            container._leaflet_id = null;
        }

        let map = L.map('map').setView([res.location.lat, res.location.lng], 13);
        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker([res.location.lat, res.location.lng], {
            icon: L.icon({
              iconUrl: "./images/icon-location.svg",
              iconSize: [46, 56],
              iconAnchor: [12, 12],
              popupAnchor: [0, 0]
            })
          }).addTo(map)
          .bindPopup(res.ip)
    })
    .catch((err) => console.log(err));
}

btnIP.addEventListener("click", searchIP);
