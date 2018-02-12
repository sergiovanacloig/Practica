$(document).ready( () => {
 carrito = JSON.parse(localStorage.getItem("carrito"));
  if (carrito === null || carrito.articulos.length === 0) {
    $("<p>Carrito vacío</p>").appendTo("#carrito");
  } else {
    cargarCarrito(carrito);
  }
});

function anyadir() {
  var id = this.name;
  carrito.articulos[id].cantidad++;
  actualizar();
  cargarCarrito();
}

function eliminar() {
  var id = this.name;
  carrito.articulos[id].cantidad--;
  actualizar();
  cargarCarrito();
}

function actualizar() {
  localStorage.removeItem("carrito");
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  $("#carrito").html("");
  var texto = "<table><tr><th>Nombre</th><th>Precio</th><th>Cantidad</th></tr>";
  carrito.articulos.forEach( (n, i) => {
    texto += "<tr><td>"+n.nombre+"</td><td>"+n.precio+"</td><td>"+n.cantidad+"</td><td><input class='mas' type='submit' name='"+i+"' value='+'></td><td><input class='menos' type='submit' name='"+i+"' value='-'></td></tr>";
  });
  texto += "</table>";
  $(texto).appendTo("#carrito");
  $(".mas").click(anyadir);
  $(".menos").click(eliminar);
}
