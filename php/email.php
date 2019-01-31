<?php 

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
    // initialize variables 
    // and convert all value to html format
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    // send the mail
    sendMail($name, $email, $message);
}


function sendMail($name, $email, $message)
{

    $header = "MIME-Version: 1.0" . "\r\n";
    $header .= 'From:"' . $name . '"<' . $email . '' . "\n";
    $header .= 'Content-type:text/html;charset=UTF-8' . "\n";
    $header .= 'Content-Transfer-Encoding: 8bit';

    $messageBody = '
<html>
<head>
<title>Messge From @ephraimIlunga</title>
<meta charset="utf-8" />
<style type="text/css">
td.header {
color: #e00303;
font-weight: 400;
}
</style>
</head>

<body>
<font color="#303030">
<div align="left">
<table with="600">
<tr>
<td class="header">User Name</td>
<td>: ' . $name . '</td>
</tr>

<tr>
<td class="header">User Email</td>
<td>: ' . $email . '</td>
</tr>

<tr>
<td class="header">User Message</td>
<td>: ' . $message . '</td>
</tr>

</table>
</div>
</body>
</html>
';
    mail('contact@ephraimilunga.co.za', "Message From CV", $messageBody, $header);

};
