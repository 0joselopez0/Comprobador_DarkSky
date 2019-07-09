
//Dibujado inicial 
var mapa = L.mapquest.key = 'NlIL499bafQ6JOm1bCWgTEPwGLCG3X5k';
var mapa = L.mapquest.map('map', {
    center: [40.4169473, -3.7035285], //KM.0 (Madrid)
    layers: L.mapquest.tileLayer('map'),
    zoom: 6}); //Zoom a toda España


//Dibujado de marca en el mapa
//PARAMS: Salida de invertgeocode()
function pintar(latitud, longitud, calle, temperatura, humedad, municipio, provincia) {
    mapa.setView([latitud, longitud], 13)
    L.marker([latitud, longitud], {
        icon: L.mapquest.icons.marker(),
        draggable: false
    }).bindPopup(calle + '<br>' + "Medidas:" + '<br> Temperatura: ' + temperatura + ' Cº <br> Humedad: ' + humedad + '%').addTo(mapa);
    apendear(calle, temperatura, humedad)
}

//Rellenado de la sección results
function apendear(calle, temperatura, humedad) {
    $('#resultados').append(
        '<div style=" background-color:white; border: solid 1px black"> <h4 style="background-color:white">' + calle + ' </h4>  <h5> Temperatura: ' + temperatura + ' ºC</h5>  <h5>Humedad:' + humedad + '%</h5>  <button onclick="borraesto(this)">X</button> </div>'
    )
}
//Adición del botón eliminar
function borraesto(entrada) {
    $(entrada).parent().remove();
}
