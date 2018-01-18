<?php
  $bd = "mierder";
  $con = mysqli_connect("localhost", "root", "root", $bd);
  $sql = "SELECT * FROM categorias";
  $listaBD = mysqli_query($con, $sql);
  $lista = [];
  while ($row = mysqli_fetch_array($listaBD)) {
    $lista[] = $row;
  }
  echo json_encode($lista);
 ?>
