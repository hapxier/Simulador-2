//Diccionario de variables:
//Entradas
var CR = 0; //Capacidad de represa (lts)
var C = 0; //Numero de casas
var CM = 0; //costos por mantenimiento
var A = 0; //numero de años
//Estados
var PC = 30; //Porcentaje crecimiento poblacional
var CP = 200; //Consumo promedio de agua por casa
var CL = 0.3; //Costos por litro de agua
var PR = 30; //Porcentaje de recuperacion
//Salidas
var U = 0; //Utilidad

function calcular() {

	if (validacion()) {
		$('#div-salida').show();
		$('#div-carru').show();

		document.getElementById("btn-calcular").disabled = true;
	    document.getElementById("btn-cambiar").disabled = true;

	    document.getElementById("txt-capacidad").disabled = true;
	    document.getElementById("txt-casas").disabled = true;
	    document.getElementById("txt-costos").disabled = true;
	    document.getElementById("txt-anios").disabled = true;

		C = document.getElementById("txt-casas").value;
		A = document.getElementById("txt-anios").value;
		CR = document.getElementById("txt-capacidad").value;
		CM = document.getElementById("txt-costos").value;
		
		for (var i = 1; i <= A; i++) {
			C = parseInt(C) + parseInt(C * PC / 100);
			CR = parseInt(CR - ( C * ( CP * 365)) + (CR * (PR / 100)));
			U = C * CP * CL - CM;
			
			console.log('Año: '+ i);
			console.log('Casas: '+ C);
			console.log('Utilidad: '+U);
			console.log('Capacidad(lts): '+CR);

			//tabla de resultados
			document.getElementById("tbl").innerHTML +=
						"<tr><td>"+i+"</td><td>"+C+"</td><td>"+U+"</td><td>"+CR+"</td></tr>";
		}
	}else{
        reiniciar();
    }
}

function cambiar() {
	document.getElementById("btn-cambiar").disabled = true;
    document.getElementById("btn-guardar").disabled = false;

    document.getElementById("txt-crecimiento").disabled = false;
    document.getElementById("txt-cons-prom").disabled = false;
    document.getElementById("txt-costo-litro").disabled = false;
    document.getElementById("txt-recuperacion").disabled = false;

    document.getElementById("btn-calcular").disabled = true;
}

function guardar() {
	PC = document.getElementById("txt-crecimiento").value;
	CP = document.getElementById("txt-cons-prom").value;
	CL = document.getElementById("txt-costo-litro").value;
	PR = document.getElementById("txt-recuperacion").value;

    document.getElementById("btn-cambiar").disabled = false;
    document.getElementById("btn-guardar").disabled = true;

    document.getElementById("txt-crecimiento").disabled = true;
    document.getElementById("txt-cons-prom").disabled = true;
    document.getElementById("txt-costo-litro").disabled = true;
    document.getElementById("txt-recuperacion").disabled = true;

    document.getElementById("btn-calcular").disabled = false;
}

function reiniciar() {
    location.reload();
    document.getElementById("btn-calcular").disabled = false;
}

$( document ).ready(function() {
	$('#div-salida').hide();
	$('#div-carru').hide();
});

function validacion() {
	if ($('#txt-capacidad').val().length == 0) {
        alert('Ingrese la capacidad!');
        return false;
    }
    else if($('#txt-casas').val().length == 0) {
        alert('Ingrese el número de casas');
        return false;
    }
    else if ($('#txt-costos').val().length == 0) {
        alert('Ingrese el costo');
        return false;
    }else if ($('#txt-anios').val().length == 0) {
        alert('Ingrese la cantidad de años');
        return false;
    }else{
        return true;
    }
}