let arregloTareas = new Array();
let elementosGuardados = 0;

let done = new Audio('done.mp3');
let undone = new Audio('undone.mp3');

function init(){

	if('serviceWorker' in navigator){
		navigator.serviceWorker.register('sw.js').then(function(registration){
		//Si es exitoso
		console.log('SW registrado correctamente');
	}, function(err){
		//si falla
		console.log('SW fallo', err);
	});
	}else{
		console.log("ERROR")
	}

	let fecha = new Date();
	let mesNumero = fecha.getMonth();
	let mes = "";

	//si ya existe treas guardadas en el local storage, las vamos a obtener de la interfaz 
	if (localStorage.getItem('tareas')){
		tareas = JSON.parse(localStorage.getItem('tareas'));
		for(i = 0; i < tareas.length; i++){
			arregloTareas.push(tareas[i])
		}
		//mandar llmar funcion que cargue las treas en la interfaz
		//loadTareas();
		loadTareas()
	}else{
		//si no hay tareas crear su espacio de memeoria  en local storage 
		//creamos el objeto vacio
		jsonTarea = {};
		localStorage.setItem('tareas',JSON.stringify(jsonTarea))
	}

	switch(mesNumero){
		case 0: 
			mes = "Enero";
			break;

		case 1: 
			mes = "Febrero";
			break;

		case 2: 
			mes = "Marzo";
			break;

		case 3: 
			mes = "Abril";
			break;

		case 4: 
			mes = "Mayo";
			break;

		case 5: 
			mes = "Junio";
			break;

		case 6: 
			mes = "Julio";
			break;

		case 7: 
			mes = "Agosto";
			break;

		case 8: 
			mes = "Septiembre";
			break;

		case 9: 
			mes = "Octubre";
			break;

		case 10: 
			mes = "Noviembre";
			break;

		case 11: 
			mes = "Diciembre";
			break;

	}
	document.getElementById('fechas').innerHTML = fecha.getDate()+" de "+mes;
}

function loadTareas(){
	//antes de cargar las tareas limpiamos la interfaz
	document.querySelector('.porhacer').innerHTML="";
	document.querySelector('.terminado').innerHTML="";

	//cargar las tareas de LS
	for(i = 0; i < tareas.length; i++){
		//crear el elemento en html
        elemento = "<div class='tarea'>"+
                    	"<input type='checkbox' class='checkbox-label' name='myCheckbox' id = '"+i+"'onclick='cambiarEstado(this.id)'>"+
                		"<label for='myCheckbox' class='labelcheck'>"+tareas[i].valor+"</label>"+"<br>"+
                    	"</div>";

    	//dividir la streas por su estado paqra poderlas plasmar en el espacio html correspondiente 
    	if (tareas[i].estatus == "pendiente"){
    		document.querySelector('.porhacer').innerHTML += elemento;
    	}else if(tareas[i].estatus == "terminado"){
    		document.querySelector('.terminado').innerHTML += elemento;
    	}

	}//for
	elementosGuardados = tareas.length;
}

function agregar(){
	//capturar ele lemento de la entrada de texto
	tareaTexto = document.getElementById('nuevaTarea');


	//Nuevo objeto JS
	jsonTarea ={
		'valor':tareaTexto.value,
		'estatus': 'pendiente'
	};

	// Agregar al arreglo de JSON la nueva tarea
    arregloTareas.push(jsonTarea);

	//crear nuevo elemento en la interfaz de usuario
	elemento = "<div class='tarea'  id = '" + elementosGuardados + "' onclick='cambiarEstado(this.id)'>"+
                    	"<input type='checkbox' class='checkbox-label' name='myCheckbox'>"+
                		"<label for='myCheckbox' class='labelcheck'>"+ jsonTarea.valor + "</label"+"<br>"+
                    	"</div>";
//lo agrego a la interfaz
document.querySelector('.porhacer').innerHTML += elemento;


//agregar al arreglo de JSON la nueva tarea
arregloTareas.push(jsonTarea);

//agregar al LS el arreglo de JSON  en formato de text
localStorage.setItem('tareas',JSON.stringify(arregloTareas));

// Limpiar cuadro de texto(input)
    tareaTexto.value="";

    // Incrementamos los elementos guardados
    elementosGuardados++;
}


function cambiarEstado(id){
	tareas = JSON.parse(localStorage.getItem('tareas'));
	if(tareas[id].estatus == 'terminado'){
		tareas[id].estatus = 'pendiente';
		//ejecutar sonido
		undone.play();
	}else{
		//ejecutar sonido
		done.play();
		tareas[id].estatus = 'terminado';
	}
	//guardarlo nuevamente en LS
	localStorage.setItem('tareas', JSON.stringify(tareas));
	
	//recargar
	loadTareas();
}