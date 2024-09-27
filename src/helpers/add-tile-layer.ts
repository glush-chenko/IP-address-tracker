import L from "leaflet";

export const addTileLayer = (map) => {
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="https://github.com/glush-chenko">Alena Glushchenko</a>.'
    }).addTo(map);
}