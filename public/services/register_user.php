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

$query = mysqli_query($conn, $sql);
if ($query) {
    echo 'Data berhasil disimpan';
} else {
    echo 'Data gagal disimpan';
}

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings / Pengirim
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp-relay.brevo.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = '9c110e001@smtp-brevo.com';                     //SMTP username
    $mail->Password   = 'S1hPvK79fFyJXcgM';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients / Penerima
    $mail->setFrom('fadilaziz275@gmail.com', 'Sitri');
    $mail->addAddress($email, $name);    //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments / Lampiran
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    $url = "http://localhost/Sitri/public/activate.php?id=".$id;
    $text_url = "Klik disini untuk mengaktifkan akun anda";

    //Content / Konten
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Hallo '.$name.' Selamat Datang di Sitri';
    $mail->Body    = 'Hallo <b>'.$name.'</b>,<br>Selamat Datang di Sitri<br>Silahkan klik link berikut untuk mengaktifkan akun anda : <br><a href="'.$url.'">'.$text_url.'</a>';
    // $mail->AltBody = 'Hallo '.$name.',<br>Selamat Datang di Sitri<br>Silahkan klik link berikut untuk mengaktifkan akun anda : <br><a href="'.$url.'">'.$text_url.'</a>';

    //Send email
    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

$conn.close();
?>