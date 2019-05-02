//Diccionario de variables:
//Entradas
var CR = 0; //Capacidad de represa (lts)
var C = 0; //Numero de casas
var CM = 0; //costos por mantenimiento
var A = 0; //numero de años
//Estados
var PC = 30; //Porcentaje crecimiento poblacional
var CP = 200; //Consumo promedio de agua por casa
var CL = 0.01; //Costos por litro de agua
var PR = 30; //Porcentaje de recuperacion
//Salidas
var U = 0; //Utilidad

var años = [];
var data1 = [];
var data2 = [];

function calcular() {

	if (validacion()) {
		$('#div-salida').show();
		$('#div-carru').show();
		$('#div-grafica').show();

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
			CRT = parseInt(CR - ( C * ( CP * 365)));
			CR = parseInt(CR - ( C * ( CP * 365)) + (CR * (PR / 100)));
			U = (C * CP * CL * 365) - CM;
			
			console.log('Año: '+ i);
			console.log('Casas: '+ C);
			console.log('Utilidad: '+U);
			console.log('Capacidad(lts): '+CR);

			//tabla de resultados
			document.getElementById("tbl").innerHTML +=
						"<tr><td>"+i+"</td><td>"+C+"</td><td>"+U+"</td><td>"+CR+"</td></tr>";

			años.push(i);
			data1.push(CR);
			data2.push(CRT);
		}
		grafica();
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
	//div-grafica
	$('#div-grafica').hide();
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

function  grafica (){
	var data = {
	labels: años,
	datasets: [
	    {
	        label: "Nivel final del año",
	        fillColor: "rgba(220,220,220,0.5)",
	        strokeColor: "rgba(220,220,220,0.8)",
	        highlightFill: "rgba(220,220,220,0.75)",
	        highlightStroke: "rgba(220,220,220,1)",
	        data: data1
	    },
	    {
	        label: "Consumido del año",
	        fillColor: "rgba(151,187,205,0.5)",
	        strokeColor: "rgba(151,187,205,0.8)",
	        highlightFill: "rgba(151,187,205,0.75)",
	        highlightStroke: "rgba(151,187,205,1)",
	        data: data2
	    }
	]
	};

	var ctx = document.getElementById("myChart").getContext("2d");
	var myBarChart = new Chart(ctx).Bar(data);
}
