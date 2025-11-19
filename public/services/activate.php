<?php
//capture payload
$id = $_GET['id'];

//validasi payload 
if(!isset($_GET['id']) or $_GET['id'] === '') {
    die('Invalid payload');
}

// koneksi database
include'db.php';

// query update
$sql = "UPDATE `users` SET `status` = 'active' WHERE `id` = '$id';";

if ($conn->query($sql) === true) {
    echo 'Data berhasil diaktifkan';
} else {
    echo 'Data gagal diaktifkan';
}

$conn->close();
?>