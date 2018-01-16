$(document).ready( () => {
  cargarCategorias();
});

function cargarCategorias() {
  $.ajax({
    url: 'php/categorias.php',
    dataType: 'json',
    success: function (data) {
      $("#categorias").empty();
      data.forEach( i => {
        $('<a href="#" id="categoria/'+i.id+'" onclick="cargarProductos(this.id)" class="list-group-item productos">'+i.nombre+'</a>').appendTo("#categorias");
      });
    }
  });
}

function cargarProductos(categoria) {
  var id = categoria.split("/")[1];
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
            '</div>'+
          '</div>'+
        '</div>').appendTo("#productos");
      });
    }
  });
}
