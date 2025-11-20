<?php
//capture payload
$id = $_GET['id'];

$enc= openssl_decrypt($id, 'AES-128-ECB', 'sitri');

echo 'ID : '.$enc ."<br>"; 

//validasi payload 
if(!isset($_GET['id']) or $_GET['id'] === '') {
    die('Invalid payload');
}

// koneksi database
include'services/db.php';

if (!$conn) {
    echo 'Connection : Koneksi gagal<br>';
    die();
} else {
    echo 'Connection : Aman bang<br>';
}

// query update
$sql = "UPDATE `users` SET `status` = 'active' WHERE `id` = '$id';";
$query= mysqli_query($conn, $sql);
if ($query) {
    echo 'status : active <br>';
} else {
    echo 'status : inactive <br>';
}

// $conn->close();
?>