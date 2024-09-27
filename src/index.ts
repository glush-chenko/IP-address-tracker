import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {validateIp, addTileLayer, getAddress, addOffset} from "./helpers";
import icon from "../images/icon-location.svg";
import "babel-polyfill";

interface Data {
    ip: string;
    location: {
        country: string;
        region: string;
        city: string;
        lat: number;
        lng: number;
        postalCode: string;
        timezone: string;
        geonameId: number;
    }
    isp: string;
    proxy: {
        proxy: boolean;
        vpn: boolean;
        tor: boolean
    }
}

const ipInput = document.querySelector(".search-bar__input") as HTMLInputElement;
const btn = document.querySelector("button") as HTMLButtonElement;

const ipInfo = document.getElementById("ip");
const locationInfo = document.getElementById('location');
const timezoneInfo = document.getElementById('timezone');
const ispInfo = document.getElementById('isp');

let currentMarker: L.Marker | null = null;
const markerIcon = L.icon({
    iconUrl: `${icon}`,
    iconSize: [30, 40],
});

const mapArea = document.querySelector(".map") as HTMLDivElement;
const map = L.map(mapArea, {
    center: [55.75, 37.61],
    zoom: 13,
});
addTileLayer(map);

const fetchData = async () => {
    if (validateIp(ipInput.value)) {
        try {
            await getAddress({
                ip: ipInput.value,
                validateIp,
                setInfo,
            });
        } catch (error) {
            console.error(error);
            alert('Error fetching data. Please try again.');
        }
    } else {
        alert('Invalid IP address.');
    }
}

const handleKey = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        await fetchData();
    }
}

const setInfo = (mapData: Data) => {
    if (mapData) {
        const {lat, lng, country, region, timezone} = mapData.location;

        ipInfo.textContent = mapData.ip;
        locationInfo.textContent = `${country} ${region}`;
        timezoneInfo.textContent = timezone;
        ispInfo.textContent = mapData.isp;

        map.setView([lat, lng]);

        if (currentMarker) {
            map.removeLayer(currentMarker);
        }

        currentMarker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);

        if (matchMedia("(max-width: 1024px)").matches) {
            addOffset(map);
        }
    }
}

btn.addEventListener("click", async () => {
    await fetchData();
});
ipInput.addEventListener("keydown", handleKey);