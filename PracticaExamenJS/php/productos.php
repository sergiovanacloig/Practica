<?php
  $id = $_POST['id'];
  $bd = "mierder";
  $con = mysqli_connect("localhost", "root", "root", $bd);
  $sql = "SELECT * FROM productos  WHERE id_categoria=$id";
  $listaBD = mysqli_query($con, $sql);
  $lista = [];
  while ($row = mysqli_fetch_array($listaBD)) {
    $pro = [
      'id' => $row['id'],
      'nombre' => $row['nombre'],
      'descripcion' => $row['descripcion'],
      'precio' => $row['precio'],
      'imagen' => $row['imagen'],
      'id_categoria' => $row['id_categoria'],
    ];
    array_push($lista, $pro);
  }
  echo json_encode($lista);
 ?>
