$(document).ready( () => {
  cargarCategorias();
  var date = new Date();
  var dia = date.getDate();
  var mes = date.getMonth();
  var anyo = date.getFullYear();
  fecha = dia + "/" + mes + "/" + anyo;
  carrito = new Carrito(fecha);
});

function cargarCategorias() {
  $.ajax({
    url: 'php/categorias.php',
    dataType: 'json',
    success: function (data) {
      $("#categorias").empty();
      data.forEach( i => {
        $('<a href="#" id="categoria|'+i.id+'" class="list-group-item productos">'+i.nombre+'</a>').appendTo("#categorias");
      });
      $(".productos").click(cargarProductos);
    }
  });
}

function cargarProductos() {
  var id = this.id.split("|")[1];
  $.ajax({
    method: 'POST',
    data: {id: id},
    url: 'php/productos.php',
    dataType: 'json',
    success: function(data) {
      $("#productos").empty();
      data.forEach( i => {
        $('<div class="col-lg-4 col-md-6 mb-4">'+
          '<div class="card h-100">'+
            '<a href="#"><img class="card-img-top" src="'+i.imagen+'" alt=""></a>'+
            '<div class="card-body">'+
              '<h4 class="card-title">'+
                '<a href="#">'+i.nombre+'</a>'+
              '</h4>'+
              '<h5>'+i.precio+'€</h5>'+
              '<p class="card-text">'+i.descripcion+'</p>'+
              '<input class="anadirCarrito" type="submit" name="producto|'+i.id+';'+i.imagen+';'+i.nombre+';'+i.precio+';'+i.descripcion+'" value="Añadir a carrito" />'+
            '</div>'+
          '</div>'+
        '</div>').appendTo("#productos");
      });
      $(".anadirCarrito").click(anadirCarrito);
    }
  });
}

function Carrito(fecha) {
  this.fecha = fecha;
  this.articulos = [];
}

Carrito.prototype.existe = function(articulo) {
  var resultado = null;
  for (var i = 0; i < this.articulos.length; i++) {
    if (this.articulos[i].id == articulo.id) {
      resultado = this.articulos[i];
    }
  }
  return resultado;
}

Carrito.prototype.anyadir = function(articulo) {
  var existe = this.existe(articulo);
  if (existe == null) {
    this.articulos.push(articulo);
  } else {
    existe.cantidad++;
    existe.precioTotal += existe.precio;
  }
}

function Articulo(id, imagen, nombre, precio, descripcion) {
  this.id = id;
  this.imagen = imagen;
  this.nombre = nombre;
  this.precio = parseFloat(precio);
  this.descripcion = descripcion;
  this.cantidad = 1;
  this.precioTotal = this.precio;
}

function anadirCarrito() {
  var id = this.name.split(";")[0];
  var imagen = this.name.split(";")[1];
  var nombre = this.name.split(";")[2];
  var precio = this.name.split(";")[3];
  var descripcion = this.name.split(";")[4];
  var articulo = new Articulo(id, imagen, nombre, precio, descripcion);
  carrito.anyadir(articulo);
  console.log(carrito.articulos);
}
