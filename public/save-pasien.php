<?php

//capture payload 
$json = file_get_contents('php://input');
$data = json_decode($json, 1);

//validasi data
$err=false;
$msg='';

if (!isset($data['nama_lengkap']) or $data['nama_lengkap'] === '') {
    $err = true;
    $msg.= 'Nama lengkap wajib diisi!\n';
}

if (!isset($data['username']) or $data['username'] === '') {
    $err = true;
    $msg.= 'Username wajib diisi!\n';
}
if (!isset($data['email']) or $data['email'] === '') {
    $err = true;
    $msg.= 'Email wajib diisi!\n';
}
if (!isset($data['password']) or $data['password'] === '') {
    $err = true;
    $msg.= 'Password wajib diisi!\n';
}
if (!isset($data['role']) or $data['role'] === '') {
    $err = true;
    $msg.= 'Role wajib diisi!\n';
}

if ($err) {
    die($msg);
}

//insert database 
echo print_r($data,1)

?>