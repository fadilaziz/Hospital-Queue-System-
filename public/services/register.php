<?php
//capture payload 
$json = file_get_contents('php://input');
$data = json_decode($json, 1);

//validasi data
$err=false;
$msg='';

foreach($data as $k => $v) {
    if ($v === '"' || $v === "'" || $v === '_' || $v === '-' ) {
        $err = true;
        $msg.= $k.' tidak boleh mengandung " \' _ -!\n';
    }
    if ($v === '') {
        $err = true;
        $msg.= $k.' wajib diisi!\n';
    }
}

if ($err) {
    die($msg);
}

include'db.php';

$name = $data['name'];
$username = $data['username'];
$password = $data['password'];
$email = $data['email'];

$sql = "INSERT INTO `users`(`name`,`user_login`,`user_pass`,`email`,`status`,`create_at`) VALUES ('$name','$username','$password','$email','inactive',NOW());";

if ($conn->query($sql) === true) {
    echo 'Data berhasil disimpan';
} else {
    echo 'Data gagal disimpan';
}

$conn->close();
?>