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

			  '<div class="form-group row">'+
                  
			  '<div class="col-xs-2" style="padding-right:0px">'+
				
			  '<div class="input-group">'+
			  
			  '<select class="form-control nuevaPieza" id="nuevaPieza" name="nuevaPieza" required>'+
			  '<option value="Full">Full</option>'+
			  '<option value="HB">HB</option>'+   
			  '<option value="QB">QB</option>'+
			  '<option value="OCT">OCT</option>'+             
			  '</select>'+    
			  '</div>'+
			  '</div>'+

	          '<!-- Cantidad del producto -->'+

	          '<div class="col-xs-2">'+
	            
	             '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="1" value="0" required>'+

	          '</div>' +

	          '<!-- Precio del producto -->'+

	          '<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">'+

	            '<div class="input-group">'+

	              '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
	                 
	              '<input type="text" class="form-control nuevoPrecioProducto" precioReal="'+precio+'" name="nuevoPrecioProducto" value="'+precio+'" readonly required>'+
	 
	            '</div>'+
	             
	          '</div>'+

	        '</div>') 

	        // SUMAR TOTAL DE PRECIOS

	        sumarTotalPrecios()

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

		$("#nuevoImpuestoVenta").val(0);
		$("#nuevoTotalVenta").val(0);
		$("#totalVenta").val(0);
		$("#nuevoTotalVenta").attr("total",0);
		// PONER FORMATO AL PRECIO DE LOS PRODUCTOS

		$(".nuevoTotalVenta").number(true, 2);
		

	}else{

		// SUMAR TOTAL DE PRECIOS

    	sumarTotalPrecios()

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
	          
	          '<div class="col-xs-6" style="padding-right:0px">'+
	          
	            '<div class="input-group">'+
	              
	              '<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto><i class="fa fa-times"></i></button></span>'+

	              '<select class="form-control nuevaDescripcionProducto1" id="producto'+numProducto+'" idProducto name="nuevaDescripcionProducto1" required>'+

	              '<option>Seleccione el producto</option>'+

	              '</select>'+  

	            '</div>'+

	          '</div>'+

	          '<!-- Cantidad del producto -->'+

	          '<div class="col-xs-3 ingresoCantidad">'+
	            
	             '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="1" value="1" required>'+

	          '</div>' +
			  

	          '<!-- Precio del producto -->'+

	          '<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">'+

	            '<div class="input-group">'+

	              '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
	                 
	              '<input type="text" class="form-control nuevoPrecioProducto" precioReal="" name="nuevoPrecioProducto" readonly required>'+
	 
	            '</div>'+
	             
	          '</div>'+

	        '</div>');


	        // AGREGAR LOS PRODUCTOS AL SELECT 

	         respuesta.forEach(funcionForEach);

	         function funcionForEach(item, index){


		         	$("#producto"+numProducto).append(

						'<option idProducto="'+item.id+'" value="'+item.nombre+'">'+item.nombre+'</option>'
		         	)

				 	        // SUMAR TOTAL DE PRECIOS

							 sumarTotalPrecios()

							// PONER FORMATO AL PRECIO DE LOS PRODUCTOS

							 $(".nuevoPrecioProducto").number(true, 2);

	         }



      	}


	})

})


// SELECCIONAR PRODUCTO DE LA VENTA EN DISPOSITIVOS
$(".form-CrearVenta").on("change","select.nuevaDescripcionProducto1",function(){
	// Capturamos el id del producto seleccionado
	var idProductoSeleccionado=$(this).val();
	if(idProductoSeleccionado!=""){
            // AQUÍ DEBE CAPTURAR EL ID DONDE PONEMOS LOS PRODUCTOS COMO JSON, SEGÚN EL CURSO, SE LLAMA listaProductos
            // CONVIERTE ESA VARIABLE QUE SE CAPTURA EN UN ARRAY. USE JSON.parse
            // CREA UNA VARIABLE BOOLEANA QUE COMIENCE EN false
            // CREA UN CICLO FOR SOBRE EL ARRAY Y EMPIEZA A RECORRERLO
            // DENTRO DEL ARRAY VA A PREGUNTAR CON UN CONDICIONAL QUE SI EL  ID QUE TIENE CADA INDICE DEL ARRAY ES IGUAL A idProductoSeleccionado CAMBIE  LA VARIABLE BOOLEANA POR true
 
            // Y AQUÍ VALIDA QUE SI LA VARIABLE BOOLEANA ES IGUAL A false permita el ingreso del producto 
		var productoSeleccionado=$(this).parent().parent().parent().children().children().children(".productoSeleccionado");
		var precioProducto=$(this).parent().parent().parent().children(".divPrecio").children().children(".precioProducto");
		var datos=new FormData();
		datos.append("idProducto",idProductoSeleccionado);
		$.ajax({
			url:"ajax/productos.ajax.php",
			method:"POST",
			data:datos,
			cache:false,
			contentType:false,
			processData:false,
			dataType:"json",
			success:function(respuesta){
				$(productoSeleccionado).attr("idProducto",respuesta["id"]);
				$(precioProducto).val(respuesta["precio_venta"]);
				$(precioProducto).attr("precioReal",respuesta["precio_venta"]);
				sumarTotalPrecios(); // Sumar total de Precios
			}
		});}

		//$("#cantidadProducto").removeAttr("required");
		//$("#cantidadProducto").attr("readonly",true);}
 
        // SINO ES false LA VARIABLE BOOLEANA, PUEDE MOSTRAR UNA ALERTA O SIMPLEMENTE LIMPIA EL CAMPO SELECT Y NO PERMITE EL INGRESO DEL PRODUCTO
});


/*=============================================
SELECCIONAR PRODUCTO
=============================================*/

$(".formularioVenta").on("change", "select.nuevaDescripcionProducto", function(){

	var nombreProducto = $(this).val();

	console.log("nuevo=", nombreProducto);

	var nuevaDescripcionProducto = $(this).parent().parent().parent().children().children().children(".nuevaDescripcionProducto");


	var nuevoPrecioProducto = $(this).parent().parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");

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

	console.log("precio=", precio);

	var metodo = ($('#nuevaPieza').val());

	if(metodo == "Full"){
		var precioFinal = $(this).val()*12*precio.attr("precioReal");
	}

	if(metodo == "QB"){
		var precioFinal = $(this).val()*120*precio.attr("precioReal");
	}

	if(metodo == "HB"){
		var precioFinal = $(this).val()*5*precio.attr("precioReal");
	}

	precio.val(precioFinal);

	        // SUMAR TOTAL DE PRECIOS

	        sumarTotalPrecios()

			listarProductos()
	
})

/*=============================================
MODIFICAR LA PIEZA
=============================================*/

$(".formularioVenta").on("change", "select.nuevaPieza",function(){

	var precio = $(this).parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");
	//var precio = ($('#nuevoPrecioProducto').val());
	var metodo = $(this).val()
	if(metodo == "Full"){
		var precioFinal = 12*precio.attr("precioReal");
		console.log("1=", precioFinal);
		console.log("nuevo", metodo);
	}

	if(metodo == "QB"){
		var precioFinal = 120*precio.attr("precioReal");
	}

	if(metodo == "HB"){
		var precioFinal = 5*precio.attr("precioReal");
	}
	precioFinal=22;

	console.log("Precio", precioFinal);
	precio.val(precioFinal);


	        // SUMAR TOTAL DE PRECIOS

	        sumarTotalPrecios()
	
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

	for(var i = 0; i < descripcion.length; i++){

		listaProductos.push({ "id" : $(descripcion[i]).attr("idProducto"), 
							  "descripcion" : $(descripcion[i]).val(),
							  "cantidad" : $(cantidad[i]).val(),
							  "precio" : $(precio[i]).attr("precioReal"),
							  "total" : $(precio[i]).val()})

	}

	console.log("Lista=",listaProductos);

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
