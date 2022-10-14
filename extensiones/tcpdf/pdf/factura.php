<?php

require_once "../../../controladores/ventas.controlador.php";
require_once "../../../modelos/ventas.modelo.php";

require_once "../../../controladores/clientes.controlador.php";
require_once "../../../modelos/clientes.modelo.php";

require_once "../../../controladores/usuarios.controlador.php";
require_once "../../../modelos/usuarios.modelo.php";

require_once "../../../controladores/productos.controlador.php";
require_once "../../../modelos/productos.modelo.php";


class imprimirFactura{

public $codigo;
	
public function traerImpresionFactura(){
$itemVenta = "codigo";
$valorVenta = $this->codigo;
$respuestaVenta = ControladorVentas::ctrMostrarVentas($itemVenta, $valorVenta);


$fecha = substr($respuestaVenta["fecha"],0,-8);
$productos = json_decode($respuestaVenta["productos"], true);
$total = number_format($respuestaVenta["total"],2);
$totalramo = number_format($respuestaVenta["ramo"],2);
$full = json_decode($respuestaVenta["full"],2);


//TRAEMOS LA INFORMACIÓN DEL CLIENTE

$itemCliente = "id";
$valorCliente = $respuestaVenta["id_cliente"];

$respuestaCliente = ControladorClientes::ctrMostrarClientes($itemCliente, $valorCliente);

//TRAEMOS LA INFORMACIÓN DEL VENDEDOR

$itemVendedor = "id";
$valorVendedor = $respuestaVenta["id_vendedor"];

$respuestaVendedor = ControladorUsuarios::ctrMostrarUsuarios($itemVendedor, $valorVendedor);


//REQUERIMOS LA CLASE TCPDF

require_once('tcpdf_include.php');

$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

$pdf->startPageGroup();

$pdf->AddPage();

// ---------------------------------------------------------

$bloque1 = <<<EOF
<table style="font-size:9px;">		
	<tr>
		<td style="width:300px" colspan="2" rowspan="2"><img src="images/fondo.png" width="350" height="100" ></td>
		<td style="width:240px" colspan="2">
			<div style="font-size:11px;   border: 1px solid black; text-align:center; line-height:20px;">	
			<b>COMERCIAL INVOICE $valorVenta</b>
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<div style="font-size:9px; text-align:center; line-height:20px;">	
				<b>Farm code</b><br>EC
			</div>
		</td>
		<td>
			<div style="font-size:9px; text-align:center; line-height:20px;">	
				<b>Date\Feche</b><br>$fecha
			</div>
		</td>
	</tr>
</table>
EOF;
$pdf->writeHTML($bloque1, false, false, false, false, '');
// ---------------------------------------------------------

// ---------------------------------------------------------

$bloque2 = <<<EOF
<table style="font-size:9px; padding:2px;">
	<tr>
		<td style="border: 1px solid black; background-color:white; width:290px; text-align:center">
		<b>Grower Name & Address \ Nombre & Dirección Cultivo</b>
		</td>
		<td style="width:20px; text-align:center">
		</td>
		<td style="border-top: 1px solid black; background-color:white; width:120px; text-align:center">
		<div style="font-size:7px; text-align:center;">
		<b>Country code \ código país</b>
		</div>
		</td>
		<td style="border-top: 1px solid black; background-color:white; width:120px; text-align:center">
		<b>INCOTERM</b>
		</td>
	</tr>
	<tr>
		<td style="border: 1px solid black; background-color:white; width:290px; text-align:center" rowspan="4">
		<div style="font-size:10px; text-align:center;">		
		<b>WENDY FLOWER \ CAMALLE CUMBAL LUIS MED</b>
		<br>
		SAN VICENTE DE POALO
		<br><br>
		LATACUNGA - ECUADOR
		<br>
		R.U.C.0502524929001
		</div>
		</td>
		<td style="background-color:white; width:20px; text-align:center">
		</td>
		<td style="background-color:white; width:120px; text-align:center">
		EC
		</td>
		<td style="background-color:white; width:120px; text-align:center">
		INCOTERM
		</td>
	</tr>
	<tr>
		<td style="width:20px; text-align:center">
		</td>
		<td style="border-top: 2px solid black; background-color:white; width:240px; text-align:center" colspan="2">
		<b>Master AWB No. \ Guía Aérea</b>
		</td>
	</tr>
	<tr>
		<td style="width:20px; text-align:center" colspan="2">
		</td>
		<td style="background-color:white; width:240px; text-align:center">
		865-1276 3984
		</td>
	</tr>
	<tr>
		<td style="width:20px; text-align:center" colspan="2">
		</td>
		<td style="border-top: 2px solid black; background-color:white; width:240px; text-align:center">
		<b>Carrier & Flight \ Línea Aérea</b>
		<br>
		AEROTRANSPORTES MAS DE CARGA
		</td>
	</tr>
	<tr>			
	<td style="width:540px"><img src="images/backFact2.jpg"></td>
	</tr>
</table>
EOF;
$pdf->writeHTML($bloque2, false, false, false, false, '');
// ---------------------------------------------------------
$bloque19 = <<<EOF
<table style="font-size:9px; padding:2px;">

	<tr>
		<td style="border: 1px solid black; background-color:white; width:290px; text-align:center">
		<b>Foreign Purchaser \ Comprador Extranjero</b>
		</td>
		<td style="width:20px; text-align:center">
		</td>
		<td style="border-top: 1px solid black; background-color:white; width:240px; text-align:center" colspan="2">
		<div style="font-size:7px; text-align:center;">
		<b>Cousin HAWB No. \ Guía hija</b>
		</div>
		</td>
	</tr>
	<tr>
		<td style="border: 1px solid black; background-color:white; width:290px; text-align:center" rowspan="4">
		<div style="font-size:10px; text-align:left;">		
		<b>Consignee:</b> $respuestaCliente[nombre]
		<br>
		<b>Address:</b> $respuestaCliente[direccion]
		<br>
		<br>
		<b>Phone:</b> $respuestaCliente[telefono]
		<br>
		<b>Country:</b> $respuestaCliente[pais]
		</div>
		<div style="font-size:9px; text-align:center;">		
		<b>Bill to \ Marca</b>
		<br>
		$respuestaCliente[nombre]
		</div>
		</td>
		<td style="background-color:white; width:20px; text-align:center">
		</td>
		<td style="background-color:white; width:120px; text-align:center">
		EC
		</td>
		<td style="background-color:white; width:120px; text-align:center">
		INCOTERM
		</td>
	</tr>
	<tr>
		<td style="width:20px; text-align:center">
		</td>
		<td style="border-top: 2px solid black; background-color:white; width:240px; text-align:center" colspan="2">
		<b>Cold Room \ Cuarto Frío</b>
		</td>
	</tr>
	<tr>
		<td style="width:20px; text-align:center" colspan="2">
		</td>
		<td style="background-color:white; width:240px; text-align:center">
		FRESH LOGISTICS
		</td>
	</tr>
	<tr>
		<td style="width:20px; text-align:center" colspan="2">
		</td>
		<td style="border-top: 2px solid black; background-color:white; width:240px; text-align:center">
		<b>DAE</b>
		<br>
		055-2022-40-00846682
		</td>
	</tr>
	<tr>			
	<td style="width:540px"><img src="images/backFact2.jpg"></td>
	</tr>
</table>
EOF;

$pdf->writeHTML($bloque19, false, false, false, false, '');


$bloque55 = <<<EOF

	<table style="font-size:8px; padding:5px 10px;">

		<tr>
		
		<td style="border: 1px solid #666; background-color:white; width:50px; text-align:center"><b>PIECES<br>PIEZAS</b></td>
		<td style="border: 1px solid #666; background-color:white; width:80px; text-align:center"><b>DESCRIPTION<br>DESCRIPCION</b></td>
		<td style="border: 1px solid #666; background-color:white; width:70px; text-align:center"><b>HTS</b></td>
		<td style="border: 1px solid #666; background-color:white; width:70px; text-align:center"><b>NANDINA</b></td>
		<td style="border: 1px solid #666; background-color:white; width:70px; text-align:center"><b>BUNCH<br>RAMO</b></td>
		<td style="border: 1px solid #666; background-color:white; width:70px; text-align:center"><b>STEM<br>TALLO</b></td>
		<td style="border: 1px solid #666; background-color:white; width:70px; text-align:center"><b>PRICE<br>PRECIO</b></td>
		<td style="border: 1px solid #666; background-color:white; width:70px; text-align:center"><b>TOTAL<br>TOTAL</b></td>
		</tr>

	</table>

EOF;

$pdf->writeHTML($bloque55, false, false, false, false, '');

// ---------------------------------------------------------

foreach ($productos as $key => $item) {

	$itemProducto = "descripcion";
	$valorProducto = $item["descripcion"];
	$orden = null;
	
	$respuestaProducto = ControladorProductos::ctrMostrarProductos($itemProducto, $valorProducto, $orden);

	$valorUnitario = number_format($respuestaProducto["precio_venta"], 2);

	$precioU = number_format($item["precio"], 2);

	$precioR = number_format($item["ramo"], 2);

	$precioT = number_format($item["tallo"], 2);

	$precioTotal = number_format($item["total"], 2);
// ---------------------------------------------------------
$bloque3 = <<<EOF

<table style="font-size:7px; padding:5px 10px;">

<tr>
<td style="border: 1px solid #666; color:#333; background-color:white; width:50px; text-align:center">
$item[cantidad] $item[full]
</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:80px; text-align:center">
$item[descripcion]
</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:70px; text-align:center">
0603.19.90.90
</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:70px; text-align:center">
0603.19.0000
</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:70px; text-align:center">
$precioR
</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:70px; text-align:center">
$precioT
</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:70px; text-align:center">$
$precioU
</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:70px; text-align:center">
$precioTotal
</td>

</tr>

</table>
EOF;

$pdf->writeHTML($bloque3, false, false, false, false, '');
}


$bloque4 = <<<EOF

<table style="font-size:7px; padding:5px 10px;">

<tr>
<td style="border: 1px solid #666; color:#333; background-color:white; width:50px; text-align:center">

</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:150px; text-align:center">
TOTAL INVOCE \ FACTURA
</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:70px; text-align:center">
</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:70px; text-align:center">
$totalramo
</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:70px; text-align:center">
24
</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:70px; text-align:center">

</td>
<td style="border: 1px solid #666; color:#333; background-color:white; width:70px; text-align:center">
$ $total
</td>

</tr>

</table>

EOF;

$pdf->writeHTML($bloque4, false, false, false, false, '');



// ---------------------------------------------------------

$bloque5 = <<<EOF
<table>
		
<tr>
	<td style="width:540px">

	</td>				
</tr>
<tr>	
<td style="width:20px">
</td>
<td style="width:50px">
<div style="font-size:9px; border: 1px solid black; text-align:center; line-height:20px;">
$full
</div>
</td>
<td style="width:200px">
<div style="font-size:9px; text-align:center; line-height:20px;">
<b>Total Full Boxes \ Total Cajas Full</b>
</div>
</td>
<td style="width:100px">
<div style="font-size:9px; text-align:center; line-height:20px;">
<b>Detail / Detalle</b>
</div>
</td>
<td style="width:160px">
<div style="font-size:9px; text-align:center; line-height:20px;">
<b>FUL&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;HB&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;QB&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;OCT&nbsp;&nbsp;&nbsp;&nbsp;0</b>
</div>
</td>
</tr>

</table>

EOF;

$pdf->writeHTML($bloque5, false, false, false, false, '');


$bloque7 = <<<EOF
<table style="font-size:9px; padding:10px 10px;">

	<tr>
		<td style="background-color:white; width:250px; text-align:center">
		<b>Name and Title of Person Preparing Invoice </b>
		</td>
		<td style="width:40px; text-align:center">
		</td>
		<td style=" background-color:white; width:250px; text-align:center">
		<b>Areight Forwarder \ Agencia de carga</b>
		</td>
	</tr>
	<tr>
		<td style="border: 1px solid black; background-color:white; width:250px; text-align:center">
		<div style="font-size:9px; text-align:center; line-height:20px;">
		$respuestaVendedor[nombre]
		</div>
		
		</td>
		<td style="width:40px; text-align:center">
		</td>
		<td style="border: 1px solid black; background-color:white; width:250px; text-align:center">
		<div style="font-size:9px; text-align:center; line-height:20px;">
		FRESH LOGISTICS
		</div>
		</td>
	</tr>
	<tr>
		<td style=" background-color:white; width:250px; text-align:center">
		<b>Custom use only</b>
		</td>
		<td style="width:40px; text-align:center">
		</td>
		<td style=" background-color:white; width:250px; text-align:center">
		<b>USDA, APHIS P.P.Q. use only</b>
		</td>
		</tr>
		<tr>
		<td style="border: 1px solid black; background-color:white; width:250px; text-align:center">	
		<div style="font-size:9px; text-align:center; line-height:50px;">
		</div>		
		</td>
		<td style="width:40px; text-align:center">
		<div style="font-size:9px; text-align:center; line-height:50px;">
		</div>
		</td>
		<td style="border: 1px solid black; background-color:white; width:250px; text-align:center">

	</td>
	</tr>
</table>
EOF;

$pdf->writeHTML($bloque7, false, false, false, false, '');

//SALIDA DEL ARCHIVO 

ob_end_clean();
$pdf->Output('factura.pdf');

}	
}

$factura = new imprimirFactura();
$factura -> codigo = $_GET["codigo"];
$factura -> traerImpresionFactura();
?>