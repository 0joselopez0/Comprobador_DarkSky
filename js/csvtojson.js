//Apertura del CSV bruto descargado de NEta

function abrircsv(ruta) {
    var fileInput = ruta[0],
        readFile = function () {
            var reader = new FileReader();
            reader.onload = function () {
                csvJSON(reader.result);
            };
            reader.readAsBinaryString(fileInput);
        };
    readFile();
}
//CSV Parser 
//Convierte el archivo csv a json con una simple separación de filas y columnas 
function csvJSON(csv) {


    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split("\t");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split("\t");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];

        }

        result.push(obj);

    }
    console.log(result);

    geocode(result);

}
//Trigger para tecla enter dentro del input de calle
$('#callesimple').bind('keypress', function (e) {
    if (e.keyCode == 13) {
        $('#buscarcallesimple').trigger('click');
    }
});
