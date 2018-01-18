<?php
  $id = $_POST['id'];
  $bd = "mierder";
  $con = mysqli_connect("localhost", "root", "root", $bd);
  $sql = "SELECT * FROM productos  WHERE id_categoria=$id";
  $listaBD = mysqli_query($con, $sql);
  $lista = [];
  while ($row = mysqli_fetch_array($listaBD)) {
    $lista[] = $row;
  }
  echo json_encode($lista);
 ?>
