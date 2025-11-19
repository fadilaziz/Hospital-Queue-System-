<?php
$id = $_GET['id'];

include 'db.php';

$sql = "DELETE FROM pasien WHERE id = $id";

if ($conn->query($sql) === true) {
    echo "Data berhasil dihapus";
} else {
    echo "Gagal menghapus data: " . $conn->error;
}