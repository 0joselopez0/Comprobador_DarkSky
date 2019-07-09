function geocode(eljson) {
    //Convierte el nombre natural de la vía a coordenadas (MAPQUEST API)
    //PARAM 1 (eljson): JSON convertido a partir del CSV de entrada (formato neta) 
    eljson.forEach(function (object) {

        $.ajax({
            method: 'GET',
            url: "http://www.mapquestapi.com/geocoding/v1/address",
            data: {
                "key": "NlIL499bafQ6JOm1bCWgTEPwGLCG3X5k",
                "location": object.TIPOVIA_DES + " " + object.NOMBREVIA + ", " + object.MUNICIPIO
            },
            dataType: 'json',
            success: calldarksky
        });

    });

}

function directgeocode(){
    //Similar a geocode() pero cogiendo realizando una sola consulta a partir del texto introducido en la página
var calle = $('#callesimple').val();

        $.ajax({
            method: 'GET',
            url: "http://www.mapquestapi.com/geocoding/v1/address",
            data: {
                "key": "NlIL499bafQ6JOm1bCWgTEPwGLCG3X5k",
                "location": calle
            },
            dataType: 'json',
            success: calldarksky
        });

 
}

function invertgeocode(json) {
    //Función en cargada de volver a traducir desde coordenadas a lenguaje natural 
    //Añadida a modo de comprobación del funcionamiento correcto de geocode()
    //Muestra todos los resultados por consola (comprobación) y pinta localización y estadísticas climatológicas tanto en mapa como en seccion resultados
    //PARAM 1 (json): JSON respuesta de DarkSky
    $.ajax({
        method: 'GET',
        url: "http://www.mapquestapi.com/geocoding/v1/reverse",
        data: {
            "key": "NlIL499bafQ6JOm1bCWgTEPwGLCG3X5k",
            "location": json.latitude + "," + json.longitude
        },
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta["results"][0].locations[0].street);
            console.log(respuesta["results"][0].locations[0].adminArea5);
            console.log(respuesta["results"][0].locations[0].adminArea3);
            console.log("Temperatura: " + json.currently["temperature"] + " ºC");
            console.log("Humedad: " + json.currently["humidity"] * 100 + "%");
            console.log("Sensación Térmica: " + json.currently["apparentTemperature"] + " ºC");
            console.log("Probabilidad de lluvias: " + json.currently["precipProbability"]);
            console.log("____________________________________________");
            pintar(json.latitude,json.longitude,respuesta["results"][0].locations[0].street, json.currently["temperature"],json.currently["humidity"] * 100,respuesta["results"][0].locations[0].adminArea5,respuesta["results"][0].locations[0].adminArea3);
        }
    });

}

function calldarksky(json) {
    //Llamada get a DarkSky, retorno de un número de variables en formato JSON
    //PARAM 1 (json): JSON con los resultados de geocode()
    var i;

    $.ajax({
        method: 'GET',
        url: "https://api.darksky.net/forecast/fa7764e918990ccd0ab501e8f6643863/" + json.results[0].locations[0].latLng.lat + "," + json.results[0].locations[0].latLng.lng + "?units=si",
        dataType: 'jsonp',

        success: invertgeocode,
        error: function (json) {
            alert("Error con darksky");
        }
    });
}

function directdarksky(){
    //Llamada directa a darkSky tras rellenar los campos de coordenadas existentes en el html
    var lat= $('#simplelat').val();
    var lon =$('#simplelng').val();
    $.ajax({
        method: 'GET',
        url: "https://api.darksky.net/forecast/fa7764e918990ccd0ab501e8f6643863/" + lat + "," + lon + "?units=si",
        dataType: 'jsonp',

        success: invertgeocode,
        error: function (json) {
            alert("Error con darksky");
        }
    });

}