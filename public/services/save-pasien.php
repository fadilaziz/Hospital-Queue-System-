<?php

//capture payload 
$json = file_get_contents('php://input');
$data = json_decode($json, 1);

//validasi data
$err=false;
$msg='';

if (!isset($data['namaLengkap']) or $data['namaLengkap'] === '') {
    $err = true;
    $msg.= 'Nama lengkap wajib diisi!\n';
}

if (!isset($data['nik']) or $data['nik'] === '') {
    $err = true;
    $msg.= 'NIK wajib diisi!\n';
}
if (!isset($data['jenisKelamin']) or $data['jenisKelamin'] === '') {
    $err = true;
    $msg.= 'Jenis kelamin wajib diisi!\n';
}
if (!isset($data['tanggalLahir']) or $data['tanggalLahir'] === '') {
    $err = true;
    $msg.= 'Tanggal lahir wajib diisi!\n';
}
if (!isset($data['alamat']) or $data['alamat'] === '') {
    $err = true;
    $msg.= 'Alamat wajib diisi!\n';
}

if ($err) {
    die($msg);
}

echo $msg;

//DB Connection
include'db.php';

$nama = $data['namaLengkap'];
$nik = $data['nik'];
$jenisKelamin = $data['jenisKelamin'];
$alamat = $data['alamat'];
$tanggalLahir = $data['tanggalLahir'];
$gender = $data['gender'];

$sql = "INSERT INTO `pasien`(`nama`, `nik`, `jenis_kelamin`, `alamat`, `tanggal_lahir`, `genderPhoto`) VALUES ('$nama','$nik','$jenisKelamin','$alamat','$tanggalLahir','$gender')";

if ($conn->query($sql) === true) {
    echo 'Data berhasil disimpan';
} else {
    echo 'Data gagal disimpan';
}

$conn->close();

?>