  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Administrar Usuarios
      </h1>
      <ol class="breadcrumb">
        <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li class="active">Administrar Usuarios</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
        <button class="btn btn-primary" data-toggle="modal" data-target="#modalAgregarUsuario">
        +
        </button>
      </div>

        <div class="box-body">
        <table class="table table-bordered table-striped dt-responsive tablas">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Foto</th>
              <th>Perfil</th>
              <th>Estado</th>
              <th>Ultimo acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>Usuario Administrador</td>
            <td>admin</td>
            <td><img src="vistas/img/usuarios/default/anonymous.png"class="img-thumbnail"width="40px"></td>
            <td>Administrador</td>
            <td><button class="btn btn-success btn-xs">Activado</button></td>
            <td>2017-12-11 12:05:32</td>
            <td>
              <div class="btn-group">
                <button class="btn btn-warning"><i class="fa fa-pencil"></i></button>
                <button class="btn btn-danger"><i class="fa fa-times"></i></button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>  
        </div>
        <!-- /.box-body -->

        <!-- /.box-footer-->
      </div>
      <!-- /.box -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
<!-- The Modal -->
<div class="modal" id="modalAgregarUsuario">
  <div class="modal-dialog">
    <div class="modal-content">
      <form role="form" method="post" enctype="multipart/form-data">
      <!-- Modal Header -->
      <div class="modal-header" style="background:#3c8dbc; color:white">
        <h4 class="modal-title">Agregar Usuario</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
      <div class="box-body">
         <!-- Nombre -->
      <div class="form-group">
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-user"></i></span>
          <input type="text"class="form-control input-lg"name="nuevoNombre"placeholder="Ingresar nombre"required>
        </div>
      </div>
       <!-- Usuario -->
      <div class="form-group">
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-key"></i></span>
          <input type="text"class="form-control input-lg"name="nuevoUsuario"placeholder="Numeo usuario"required>
        </div>
      </div>
             <!-- Contraseña -->
      <div class="form-group">
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-lock"></i></span>
          <input type="password"class="form-control input-lg"name="nuevoPassword"placeholder="Ingresar contraseña"required>
        </div>
      </div>

      <div class="form-group">
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-users"></i></span>
          <select class="form-control input-lg"name="nuevoPerfil">
            <option value="">Selecionar perfil</option>
            <option value="Administrador">Administrador</option>
            <option value="Especial">Especial</option>
            <option value="Vendedor">Vendedor</option>
          </select>
        </div>
      </div>

      <div class="form-group">
              <div class="panel">SUBIR FOTO</div>
                    <input type="file"id="nuevaFoto"name="nuevaFoto">
                          <pclass="help-block">Peso máximo de la foto 200 MB</p>
                                <img src="vistas/img/usuarios/default/anonymous.png"class="img-thumbnail"width="100px">
                                    </div>
                                        </div>
                                            </div>
  

      <!-- Modal footer -->
      <div class="modal-footer">
      <button type="button"class="btn btn-default pull-left"data-dismiss="modal">Salir</button>
      <button type="submit"class="btn btn-primary">Guardar usuario</button>
      </div>
</form>

    </div>
  </div>
</div>