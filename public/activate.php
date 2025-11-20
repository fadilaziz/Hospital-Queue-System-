<?php
//capture payload
$id = $_GET['id'];

echo 'ID : '.$id ."<br>"; 

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
    echo 'status : <span style="color: green">active</span> <br>';
} else {
    echo 'status : <span style="color: red">inactive</span> <br>';
}

// $conn->close();
?>