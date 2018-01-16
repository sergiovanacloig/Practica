<?php
  $bd = "mierder";
  $con = mysqli_connect("localhost", "root", "root", $bd);
  $sql = "SELECT * FROM categorias";
  $listaBD = mysqli_query($con, $sql);
  $lista = [];
  while ($row = mysqli_fetch_array($listaBD)) {
    $cat = [
      'id' => $row['id'],
      'nombre' => $row['nombre'],
    ];
    array_push($lista, $cat);
  }
  echo json_encode($lista);
 ?>
