<div class="content-wrapper">

  <section class="content-header">
    
    <h1>
      
      Administrar etiquetas
    
    </h1>

    <ol class="breadcrumb">
      
      <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>
      
      <li class="active">Administrar etiquetas</li>
    
    </ol>

  </section>

  <section class="content">

    <div class="box">

      <div class="box-header with-border">
  


      </div>

      <div class="box-body">
      <div class="container-fluid">
  <div class="col-md-12">
    <div class="row">
      <div class="card col-md-4 offset-md-4 mt-5">
        <div class="card-body text-center">
        <h4>Generador de Código de Barras Simple</h4>
          
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card col-md-6 mt-5 mr-5">
        <div class="card-body">
          <div class="form-group">
            <label for="" class="control-label ">Código</label>
            <input type="text" id="code" class="form-control">
          </div>
           <div class="form-group">
            <label for="" class="control-label">Etiqueta</label>
            <input type="text" id="label" class="form-control">
          </div>
          <div class="form-group">
            <label for="" class="control-label">Tipo de Código de Barras</label>
            <select class="browser-default custom-select" id="type">
              <option value="C128">Code 128</option>
              <option value="C128A">Code 128 A</option>
              <option value="C128B">Code 128 B</option>
              <option value="C39">Code 39</option>
              <option value="C39E">Code 39 E</option>
              <option value="C93">Code 93</option>
            </select>
          </div>
          <button type="button" class="col-md-2 btn-block float-right btn btn-primary btn-sm" id="generate">Generar</button>
        </div>
      </div>
      <div class=" card col-md-5 ml-5 mt-5" id='bcode-card'>
            <div class="card-body">
              <div id="display">
                <center>Código de Barras ConfiguroWeb</center>
              </div>
               
            </div>
            <div class="card-footer" style="display:none">
              <center>
                <button type="button" class=" btn-block btn btn-success btn-sm" id="print">Imprimir</button>
              <button type="button" class=" btn-block btn btn-primary btn-sm" id="save">Descargar</button>  
              </center>
              
            </div>
      </div>

    </div>
  </div>
  
</div>



      </div>

    </div>

  </section>

</div>

<!--=====================================
MODAL AGREGAR CLIENTE
======================================-->

<div id="modalAgregarEtiqueta" class="modal fade" role="dialog">
  
  <div class="modal-dialog">

    <div class="modal-content">

      <form role="form" method="post">

        <!--=====================================
        CABEZA DEL MODAL
        ======================================-->

        <div class="modal-header" style="background:#3c8dbc; color:white">

          <button type="button" class="close" data-dismiss="modal">&times;</button>

          <h4 class="modal-title">Agregar etiqueta</h4>

        </div>

        <!--=====================================
        CUERPO DEL MODAL
        ======================================-->

        <div class="modal-body">

          <div class="box-body">

            <!-- ENTRADA PARA EL codigo -->
            
            <div class="form-group">
              
              <div class="input-group">
              
                <span class="input-group-addon"><i class="fa fa-user"></i></span> 

                <input type="text" class="form-control input-lg" name="nuevoCodigo" placeholder="Ingresar codigo" required>

              </div>

            </div>

  
          </div>

        </div>

        <!--=====================================
        PIE DEL MODAL
        ======================================-->

        <div class="modal-footer">

          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>

          <button type="submit" class="btn btn-primary">Guardar cliente</button>

        </div>

      </form>

    </div>

  </div>

</div>


<script>
  $('#generate').on('click',function(){
    if($('#code').val() != ''){
      $.ajax({
        url:'barcode.php',
        method:"POST",
        data:{code:$('#code').val(),type:$('#type').val(),label:$('#label').val()},
        error:err=>{
          console.log(err)
        },
        success:function(resp){
          $('#display').html(resp)
          $('#bcode-card .card-footer').show('slideUp')
        }
      })
    }
  })

    $('#save').click(function(){
    html2canvas($('#field'), {
    onrendered: function(canvas) {                    
      var img = canvas.toDataURL("image/png");
      
      var uri = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
      
      var link = document.createElement('a');
          if (typeof link.download === 'string') {
              document.body.appendChild(link); 
              link.download = 'barcode_'+$('#code').val()+'.png';
              link.href = uri;
              link.click();
              document.body.removeChild(link);
          } else {
              location.replace(uri);
          }
      
    }
  }); 
  })
    $('#print').click(function(){
      var openWindow = window.open("", "", "_blank");
      openWindow.document.write($('#display').parent().html());
      openWindow.document.write('<style>'+$('style').html()+'</style>');
      openWindow.document.close();
      openWindow.focus();
      openWindow.print();
      // openWindow.close();
      setTimeout(function(){
      openWindow.close();
      },1000)
    })
</script>