/*=============================================
CARGAR LA TABLA DINÁMICA DE VENTAS
=============================================*/
$('.tablaVentas').DataTable( {
    "ajax": "ajax/datatable-ventas.ajax.php",
    "deferRender": true,
	"retrieve": true,
	"processing": true,
	 "language": {

			"sProcessing":     "Procesando...",
			"sLengthMenu":     "Mostrar _MENU_ registros",
			"sZeroRecords":    "No se encontraron resultados",
			"sEmptyTable":     "Ningún dato disponible en esta tabla",
			"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
			"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
			"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
			"sInfoPostFix":    "",
			"sSearch":         "Buscar:",
			"sUrl":            "",
			"sInfoThousands":  ",",
			"sLoadingRecords": "Cargando...",
			"oPaginate": {
			"sFirst":    "Primero",
			"sLast":     "Último",
			"sNext":     "Siguiente",
			"sPrevious": "Anterior"
			},
			"oAria": {
				"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
				"sSortDescending": ": Activar para ordenar la columna de manera descendente"
			}

	}

} );


/*=============================================
AGREGANDO PRODUCTOS A LA VENTA DESDE LA TABLA
=============================================*/

$(".tablaVentas tbody").on("click", "button.agregarProducto", function(){

	var idProducto = $(this).attr("idProducto");

	$(this).removeClass("btn-primary agregarProducto");

	$(this).addClass("btn-default");

	var datos = new FormData();
    datos.append("idProducto", idProducto);

     $.ajax({

     	url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      	    var nombre = respuesta["nombre"];
          	var precio = respuesta["precio_venta"];


          	$(".nuevoProducto").append(

          	'<div class="row" style="padding:5px 15px">'+

			  '<!-- Descripción del producto -->'+
	          
	          '<div class="col-xs-4" style="padding-right:0px">'+
	          
	            '<div class="input-group">'+
	              
	              '<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto="'+idProducto+'"><i class="fa fa-times"></i></button></span>'+

	              '<input type="text" class="form-control nuevaDescripcionProducto" idProducto="'+idProducto+'" name="agregarProducto" value="'+nombre+'" readonly required>'+

	            '</div>'+

	          '</div>'+
                  
			  '<div class="col-xs-2 ingresoSelect"  style="padding-right:0px">'+
				
			  	'<div class="input-group">'+
			  
					'<select class="form-control nuevaPieza" id="nuevaPieza" name="nuevaPieza" required>'+
					'<option value="HB">HB</option>'+   
					'<option value="QB">QB</option>'+
					'<option value="OCT">OCT</option>'+             
					'</select>'+    
			  	'</div>'+
			  '</div>'+

	          '<!-- Cantidad del producto -->'+

	          '<div class="col-xs-2 ingresoCantidad">'+
	            
	             '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" id="nuevaCantidadProducto" min="1" value="0" required>'+

	          '</div>' +

	          '<!-- Precio del producto -->'+

	          '<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">'+

	            '<div class="input-group">'+

	              '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
	                 
	              '<input type="text" class="form-control nuevoPrecioProducto" precioReal="'+precio+'" name="nuevoPrecioProducto" id="nuevoPrecioProducto" value="'+precio+'" readonly required>'+
				  	                 
	              '<input type="hidden" class="form-control nuevoPrecioFull" name="nuevoPrecioFull" id="nuevoPrecioFull" value="0" readonly required>'+

				  '<input type="hidden" class="form-control nuevoPrecioRamo" name="nuevoPrecioRamo" id="nuevoPrecioRamo" value="0" readonly required>'+

				  '<input type="hidden" class="form-control nuevoFull" name="nuevoFull" id="nuevoFull" readonly required>'+
	 
	            '</div>'+
	             
	          '</div>'+

	        '</div>') 

	        // SUMAR TOTAL DE PRECIOS

	        sumarTotalPrecios()

			sumarFull()

			sumarRamo()

			listarProductos()

	        // PONER FORMATO AL PRECIO DE LOS PRODUCTOS

	        $(".nuevoPrecioProducto").number(true, 2);

      	}

     })

});

/*=============================================
CUANDO CARGUE LA TABLA CADA VEZ QUE NAVEGUE EN ELLA
=============================================*/

$(".tablaVentas").on("draw.dt", function(){

	if(localStorage.getItem("quitarProducto") != null){

		var listaIdProductos = JSON.parse(localStorage.getItem("quitarProducto"));

		for(var i = 0; i < listaIdProductos.length; i++){

			$("button.recuperarBoton[idProducto='"+listaIdProductos[i]["idProducto"]+"']").removeClass('btn-default');
			$("button.recuperarBoton[idProducto='"+listaIdProductos[i]["idProducto"]+"']").addClass('btn-primary agregarProducto');

		}


	}


})

/*=============================================
QUITAR PRODUCTOS DE LA VENTA Y RECUPERAR BOTÓN
=============================================*/

var idQuitarProducto = [];

localStorage.removeItem("quitarProducto");

$(".formularioVenta").on("click", "button.quitarProducto", function(){

	$(this).parent().parent().parent().parent().remove();

	var idProducto = $(this).attr("idProducto");

	/*=============================================
	ALMACENAR EN EL LOCALSTORAGE EL ID DEL PRODUCTO A QUITAR
	=============================================*/

	if(localStorage.getItem("quitarProducto") == null){

		idQuitarProducto = [];
	
	}else{

		idQuitarProducto.concat(localStorage.getItem("quitarProducto"))

	}

	idQuitarProducto.push({"idProducto":idProducto});

	localStorage.setItem("quitarProducto", JSON.stringify(idQuitarProducto));

	$("button.recuperarBoton[idProducto='"+idProducto+"']").removeClass('btn-default');

	$("button.recuperarBoton[idProducto='"+idProducto+"']").addClass('btn-primary agregarProducto');

	if($(".nuevoProducto").children().length == 0){

		$("#nuevoTotalVenta").val(0);
		$("#totalVenta").val(0);
		$("#nuevoTotalVenta").attr("total",0);
		// PONER FORMATO AL PRECIO DE LOS PRODUCTOS

		$(".nuevoTotalVenta").number(true, 2);
		

	}else{

		// SUMAR TOTAL DE PRECIOS

    	sumarTotalPrecios()

		sumarFull()

		sumarRamo()

		listarProductos()

    	// AGREGAR IMPUESTO

	}

})

/*=============================================
AGREGANDO PRODUCTOS DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/

var numProducto = 0;

$(".btnAgregarProducto").click(function(){

	numProducto ++;

	var datos = new FormData();
	datos.append("traerProductos", "ok");

	$.ajax({

		url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){
			$(".nuevoProducto").append(

				'<div class="row" style="padding:5px 15px">'+
  
				'<!-- Descripción del producto -->'+
				
				'<!-- Descripción del producto -->'+
	          
				'<div class="col-xs-4" style="padding-right:0px">'+
				
				  '<div class="input-group">'+
					
					'<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto><i class="fa fa-times"></i></button></span>'+
  
					'<select class="form-control nuevaDescripcionProducto" id="producto'+numProducto+'" idProducto name="nuevaDescripcionProducto" required>'+
  
					'<option>Seleccione el producto</option>'+
  
					'</select>'+  
  
				  '</div>'+
  
				'</div>'+
					
				'<div class="col-xs-3 ingresoSelect">'+
				  
					'<div class="input-group">'+
				
					  '<select class="form-control nuevaPieza" id="nuevaPieza" name="nuevaPieza" required>'+
					  '<option value="HB">HB</option>'+   
					  '<option value="QB">QB</option>'+
					  '<option value="OCT">OCT</option>'+             
					  '</select>'+    
					'</div>'+
				'</div>'+
  
				'<!-- Cantidad del producto -->'+
  
				'<div class="col-xs-2 ingresoCantidad">'+
				  
				   '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" id="nuevaCantidadProducto" min="1" value="0" required>'+
  
				'</div>' +
  
				'<!-- Precio del producto -->'+
  
				'<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">'+
  
				  '<div class="input-group">'+
  
					'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
					   
					'<input type="text" class="form-control nuevoPrecioProducto" name="nuevoPrecioProducto" id="nuevoPrecioProducto" readonly required>'+
										 
					'<input type="hidden" class="form-control nuevoPrecioFull" name="nuevoPrecioFull" id="nuevoPrecioFull" value="0" readonly required>'+

					'<input type="hidden" class="form-control nuevoPrecioRamo" name="nuevoPrecioRamo" id="nuevoPrecioRamo" value="0" readonly required>'+

					'<input type="hidden" class="form-control nuevoFull" name="nuevoFull" id="nuevoFull" readonly required>'+
	 
				  '</div>'+
				   
				'</div>'+
  
			  '</div>') 
	        // AGREGAR LOS PRODUCTOS AL SELECT 

	         respuesta.forEach(funcionForEach);

	         function funcionForEach(item, index){


		         	$("#producto"+numProducto).append(

						'<option idProducto="'+item.id+'" value="'+item.nombre+'">'+item.nombre+'</option>'
		         	)

				 	        // SUMAR TOTAL DE PRECIOS

							 sumarTotalPrecios()

							 sumarFull()

							 sumarRamo()

							// PONER FORMATO AL PRECIO DE LOS PRODUCTOS

							 $(".nuevoPrecioProducto").number(true, 2);

	         }



      	}


	})

})

/*=============================================
SELECCIONAR PRODUCTO
=============================================*/

$(".formularioVenta").on("change", "select.nuevaDescripcionProducto", function(){

	var nombreProducto = $(this).val();

	var nuevaDescripcionProducto = $(this).parent().parent().parent().children().children().children(".nuevaDescripcionProducto");

	var nuevoPrecioProducto = $(this).parent().parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");

	var nuevaCantidadProducto = $(this).parent().parent().parent().children(".ingresoCantidad").children(".nuevaCantidadProducto");

	var datos = new FormData();
    datos.append("nombreProducto", nombreProducto);


	  $.ajax({

     	url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){
      	    
      	    $(nuevaDescripcionProducto).attr("idProducto", respuesta["id"]);
      	    $(nuevoPrecioProducto).val(respuesta["precio_venta"]);
			$(nuevaCantidadProducto).attr("cantidad", respuesta["cantidad"]);
      	    $(nuevoPrecioProducto).attr("precioReal", respuesta["precio_venta"]);

  	      // AGRUPAR PRODUCTOS EN FORMATO JSON

	        listarProductos()

      	}

      })
})



/*=============================================
MODIFICAR LA CANTIDAD
=============================================*/

$(".formularioVenta").on("change", "input.nuevaCantidadProducto",function(){

	var precio = $(this).parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");

	var full = $(this).parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioFull");

	var ramo = $(this).parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioRamo");

	var pieza = $(this).parent().parent().children(".ingresoPrecio").children().children(".nuevoFull");
	
	var metodo = $(this).parent().parent().children(".ingresoSelect").children().children(".nuevaPieza").val();

	if(metodo == "HB"){
		var precioFinal = $(this).val()*240*precio.attr("precioReal");
		var preciofull = $(this).val()*0.50;
		var preciobunch = $(this).val()*24;
		var tipopieza='HB';

	}

	if(metodo == "QB"){
		var precioFinal = $(this).val()*120*precio.attr("precioReal");
		var preciofull = $(this).val()*0.25;
		var preciobunch = $(this).val()*12;
		var tipopieza='QB';
	}

	if(metodo == "OCT"){
		var precioFinal = $(this).val()*60*precio.attr("precioReal");
		var preciofull = $(this).val()*0.125;
		var preciobunch = $(this).val()*6;
		var tipopieza='OCT';
	}

	full.val(preciofull);
	precio.val(precioFinal);
	ramo.val(preciobunch);
	pieza.val(tipopieza);

	        // SUMAR TOTAL DE PRECIOS

	        sumarTotalPrecios()

			sumarFull()

			sumarRamo()

			listarProductos()
	
})

/*=============================================
MODIFICAR LA PIEZA
=============================================*/

$(".formularioVenta").on("change", "select.nuevaPieza",function(){
//Hacer que el valor del input cantidad llegue a cero
	var metodo = $(this).val()

	var precio = $(this).parent().parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");

	var cantidad = $(this).parent().parent().parent().children(".ingresoCantidad").children(".nuevaCantidadProducto").val();

	var full = $(this).parent().parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioFull");

	var ramo = $(this).parent().parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioRamo");

	var pieza = $(this).parent().parent().parent().children(".ingresoPrecio").children().children(".nuevoFull");
	

	if(metodo == "HB"){
		var precioFinal = cantidad*240*precio.attr("precioReal");
		var preciofull = cantidad*0.50;
		var preciobunch = cantidad*24;
		var tipopieza='HB';

	}

	if(metodo == "QB"){
		var precioFinal = cantidad*120*precio.attr("precioReal");
		var preciofull = cantidad*0.25;
		var preciobunch = cantidad*12;
		var tipopieza='QB';
	}

	if(metodo == "OCT"){
		var precioFinal = cantidad*60*precio.attr("precioReal");
		var preciofull = cantidad*0.125;
		var preciobunch = cantidad*6;
		var tipopieza='OCT';
	}


	full.val(preciofull);
	precio.val(precioFinal);
	ramo.val(preciobunch);
	pieza.val(tipopieza);

	        // SUMAR TOTAL DE PRECIOS

	        sumarTotalPrecios()

			sumarFull()

			sumarRamo()

			listarProductos()

	
})


/*=============================================
SUMAR TODOS LOS PRECIOS
=============================================*/

function sumarTotalPrecios(){

	var precioItem = $(".nuevoPrecioProducto");
	var arraySumaPrecio = [];  

	for(var i = 0; i < precioItem.length; i++){

		 arraySumaPrecio.push(Number($(precioItem[i]).val()));
		 
	}

	function sumaArrayPrecios(total, numero){

		return total + numero;

	}

	var sumaTotalPrecio = arraySumaPrecio.reduce(sumaArrayPrecios);
	
	$("#nuevoTotalVenta").val(sumaTotalPrecio);
	$("#totalVenta").val(sumaTotalPrecio);
	$("#nuevoTotalVenta").attr("total",sumaTotalPrecio);

	// PONER FORMATO AL PRECIO DE LOS PRODUCTOS

}

/*=============================================
SUMAR FULL
=============================================*/
function sumarFull(){
 var precioFull=$(".nuevoPrecioFull");

 var arraySumaFull = [];  

 for(var i = 0; i < precioFull.length; i++){

	arraySumaFull.push(Number($(precioFull[i]).val()));
	  
 }

 function sumaArrayPreciosFull(totalfull, numerofull){

	return totalfull + numerofull;

}
var sumaTotalPreciosFull = arraySumaFull.reduce(sumaArrayPreciosFull);

$("#nuevoTotalCajas").val(sumaTotalPreciosFull);




}

/*=============================================
SUMAR RAMO
=============================================*/
function sumarRamo(){
	var precioRamo=$(".nuevoPrecioRamo");
   
	var arraySumaRamo = [];  
   
	for(var i = 0; i < precioRamo.length; i++){
   
	   arraySumaRamo.push(Number($(precioRamo[i]).val()));
		 
	}
   
	function sumaArrayPreciosRamo(totalramo, numeroramo){
   
	   return totalramo + numeroramo;
   
   }
   var sumaTotalPreciosRamo = arraySumaRamo.reduce(sumaArrayPreciosRamo);
   
   $("#nuevoTotalRamos").val(sumaTotalPreciosRamo);
   
   
   
   
   }
   


/*=============================================
FORMATO AL PRECIO FINAL
=============================================*/

$("#nuevoTotalVenta").number(true, 2);


/*=============================================
LISTAR TODOS LOS PRODUCTOS
=============================================*/

function listarProductos(){

	var listaProductos = [];

	var descripcion = $(".nuevaDescripcionProducto");

	var cantidad = $(".nuevaCantidadProducto");

	var precio = $(".nuevoPrecioProducto");
	
	var full  = $(".nuevoFull");

	var cantidadCajas = $(".nuevoPrecioFull");

	var ramo  = $(".nuevoPrecioRamo");

	for(var i = 0; i < descripcion.length; i++){

		listaProductos.push({ "id" : $(descripcion[i]).attr("idProducto"), 
							  "descripcion" : $(descripcion[i]).val(),
							  "cantidad" : $(cantidad[i]).val(),
							  "full" : $(full[i]).val(),
							  "cantidadCajas" : $(cantidadCajas[i]).val(),
							  "ramo" : $(ramo[i]).val(),
							  "tallo" : $(ramo[i]).val()*10,
							  "precio" : $(precio[i]).attr("precioReal"),
							  "total" : $(precio[i]).val()})

	}

	//console.log("Lista=",JSON.stringify(listaProductos));

	$("#listaProductos").val(JSON.stringify(listaProductos)); 

}


/*=============================================
BOTON EDITAR VENTA
=============================================*/
$(".tablas").on("click", ".btnEditarVenta", function(){

	var idVenta = $(this).attr("idVenta");

	window.location = "index.php?ruta=editar-venta&idVenta="+idVenta;


})


/*=============================================
IMPRIMIR FACTURA
=============================================*/

$(".tablas").on("click", ".btnImprimirFactura", function(){

	var codigoVenta = $(this).attr("codigoVenta");

	window.open("extensiones/tcpdf/pdf/factura.php?codigo="+codigoVenta, "_blank");

})

/*=============================================
FUNCIÓN PARA DESACTIVAR LOS BOTONES AGREGAR CUANDO EL PRODUCTO YA HABÍA SIDO SELECCIONADO EN LA CARPETA
=============================================*/

function quitarAgregarProducto(){

	//Capturamos todos los id de productos que fueron elegidos en la venta
	var idProductos = $(".quitarProducto");

	//Capturamos todos los botones de agregar que aparecen en la tabla
	var botonesTabla = $(".tablaVentas tbody button.agregarProducto");

	//Recorremos en un ciclo para obtener los diferentes idProductos que fueron agregados a la venta
	for(var i = 0; i < idProductos.length; i++){

		//Capturamos los Id de los productos agregados a la venta
		var boton = $(idProductos[i]).attr("idProducto");
		
		//Hacemos un recorrido por la tabla que aparece para desactivar los botones de agregar
		for(var j = 0; j < botonesTabla.length; j ++){

			if($(botonesTabla[j]).attr("idProducto") == boton){

				$(botonesTabla[j]).removeClass("btn-primary agregarProducto");
				$(botonesTabla[j]).addClass("btn-default");

			}
		}

	}
	
}


/*=============================================
CADA VEZ QUE CARGUE LA TABLA CUANDO NAVEGAMOS EN ELLA EJECUTAR LA FUNCIÓN:
=============================================*/

$('.tablaVentas').on( 'draw.dt', function(){

	quitarAgregarProducto();

})

/*=============================================
BORRAR VENTA
=============================================*/
$(".tablas").on("click", ".btnEliminarVenta", function(){

	var idVenta = $(this).attr("idVenta");
  
	swal({
		  title: '¿Está seguro de borrar la venta?',
		  text: "¡Si no lo está puede cancelar la accíón!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  cancelButtonText: 'Cancelar',
		  confirmButtonText: 'Si, borrar venta!'
		}).then(function(result){
		  if (result.value) {
			
			  window.location = "index.php?ruta=ventas&idVenta="+idVenta;
		  }
  
	})
  
  })

  /*=============================================
RANGO DE FECHAS
=============================================*/

 
$('#daterange-btn').daterangepicker(
	{
	  ranges   : {
		'Hoy'       : [moment(), moment()],
		'Ayer'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		'Últimos 7 días' : [moment().subtract(6, 'days'), moment()],
		'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
		'Este mes'  : [moment().startOf('month'), moment().endOf('month')],
		'Último mes'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	  },
	  startDate: moment(),
	  endDate  : moment(),
	  "locale": {
	  "monthNamesShort": ["Ene","Feb","Mar","Abr", "May","Jun","Jul","Ago","Sep", "Oct","Nov","Dic"],
	  "dayNames": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
	  "dayNamesShort": ["Dom","Lun","Mar","Mié","Juv","Vie","Sáb"],
	  "dayNamesMin": ["Do","Lu","Ma","Mi","Ju","Vi","Sá"],
	  "daysOfWeek": [
			  "Do",
			  "Lu",
			  "Ma",
			  "Mi",
			  "Ju",
			  "Vi",
			  "Sa"
		  ],
	  "monthNames": [
			  "Enero",
			  "Febrero",
			  "Marzo",
			  "Abril",
			  "Mayo",
			  "Junio",
			  "Julio",
			  "Augosto",
			  "Septiembre",
			  "Octubre",
			  "Noviembre",
			  "Diciembre"
		  ],
	  "firstDay": 1
	  }
   
	},
	function (start, end) {
	  $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
   
	  var fechaInicial = start.format('YYYY-MM-DD');
   
	  var fechaFinal = end.format('YYYY-MM-DD');
   
	  var capturarRango = $("#daterange-btn span").html();
	 
		 localStorage.setItem("capturarRango", capturarRango);
   
		 window.location = "index.php?ruta=ventas&fechaInicial="+fechaInicial+"&fechaFinal="+fechaFinal;
   
	}
   
  )


  /*=============================================
CANCELAR RANGO DE FECHAS
=============================================*/

$(".daterangepicker.opensleft .range_inputs .cancelBtn").on("click", function(){

	localStorage.removeItem("capturarRango");
	localStorage.clear();
	window.location = "ventas";
})


/*=============================================
CAPTURAR HOY
=============================================*/

$(".daterangepicker.opensleft .ranges li").on("click", function(){

	var textoHoy = $(this).attr("data-range-key");

	if(textoHoy == "Hoy"){

		var d = new Date();
		
		var dia = d.getDate();
		var mes = d.getMonth()+1;
		var año = d.getFullYear();

		if(mes < 10){

			var fechaInicial = año+"-0"+mes+"-"+dia;
			var fechaFinal = año+"-0"+mes+"-"+dia;

		}else if(dia < 10){

			var fechaInicial = año+"-"+mes+"-0"+dia;
			var fechaFinal = año+"-"+mes+"-0"+dia;

		}else if(mes < 10 && dia < 10){

			var fechaInicial = año+"-0"+mes+"-0"+dia;
			var fechaFinal = año+"-0"+mes+"-0"+dia;

		}else{

			var fechaInicial = año+"-"+mes+"-"+dia;
	    	var fechaFinal = año+"-"+mes+"-"+dia;

		}	

    	localStorage.setItem("capturarRango", "Hoy");

    	window.location = "index.php?ruta=ventas&fechaInicial="+fechaInicial+"&fechaFinal="+fechaFinal;

	}

})


/*=============================================
CAPTURAR HOY
=============================================*/

$(".daterangepicker.opensright .ranges li").on("click", function(){

	var textoHoy = $(this).attr("data-range-key");

	if(textoHoy == "Hoy"){

    var d = new Date();
    
    var dia = d.getDate();
    var mes = d.getMonth()+1;
    var año = d.getFullYear();

    if(mes < 10){

      var fechaInicial = año+"-0"+mes+"-"+dia;
      var fechaFinal = año+"-0"+mes+"-"+dia;

    }else if(dia < 10){

      var fechaInicial = año+"-"+mes+"-0"+dia;
      var fechaFinal = año+"-"+mes+"-0"+dia;

    }else if(mes < 10 && dia < 10){

      var fechaInicial = año+"-0"+mes+"-0"+dia;
      var fechaFinal = año+"-0"+mes+"-0"+dia;

    }else{

      var fechaInicial = año+"-"+mes+"-"+dia;
        var fechaFinal = año+"-"+mes+"-"+dia;

    } 

    	localStorage.setItem("capturarRango2", "Hoy");

    	window.location = "index.php?ruta=reportes&fechaInicial="+fechaInicial+"&fechaFinal="+fechaFinal;

	}

})