<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require "/assets/vendor/phpmailer/PHPMailer.php";
require "/assets/vendor/phpmailer/SMTP.php";
require "/assets/vendor/phpmailer/Exception.php";

$ajax = true;
$honeypot = '';

if( !empty(trim($honeypot)) ) {
    return 'OK';
}

$subject = $_POST['subject'];
//$emailBody = $_POST['emailBody'];
$emailBody = nl2br($_POST['emailBody']);

$mail = new PHPMailer(true);  
$mail->ContentType = 'text/html';
$mail->CharSet = 'utf-8';                            // Passing `true` enables exceptions
try {
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.naver.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'wjchin';                 // SMTP username
    $mail->Password = 'JYJ5CDHGWTY5';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('wjchin@naver.com', '아워팀건강센터');
    $mail->addAddress('wjcin26@gmail.com');     // Add a recipient

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = '팀 정보 종합 보고서';
    $mail->Body    = '제목:' .$subject .'내용:' .$emailBody;
    
    $mail->send();
    echo 'OK';

} catch (Exception $e) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}

?>
