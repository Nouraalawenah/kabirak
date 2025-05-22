<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "kabirak";
$conn = mysqli_connect($host, $username, $password, $database);


if (!$conn) {
    die("Database failed connection " . mysqli_connect_error());
}
?>
