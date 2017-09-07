<?php

    error_reporting(E_ALL ^ E_NOTICE ^ E_DEPRECATED ^ E_STRICT);
    set_include_path("." . PATH_SEPARATOR . ($UserDir = dirname($_SERVER['DOCUMENT_ROOT'])) . "/pear/php" . PATH_SEPARATOR . get_include_path());
    require_once "Mail.php";

    if ($_POST['email']){
        $from_email = mysql_escape_string($_POST['email']);
        $from_subject = mysql_escape_string($_POST['subject']);
        $from_message = mysql_escape_string($_POST['message']);

        $order   = array("\r\n", "\n", "\r");
        $replace = '<br />';
        // Processes \r\n's first so they aren't converted twice.
        $message = str_replace($order, $replace, $from_message);
        $host = "ssl://smtp.gmail.com";
        $username = "erp@domain.com"; // email address used to send the mail
        $password = "lowndrre";
        $port = "465";
        $to = "mail@domain.com"; // your forward email address
        
        // Email 
        $email_from = $from_email;
        $email_subject = $from_subject;
        $email_body = "<div><h2>${from_subject} from ${from_email} via contact us </h2><h3>${message}</h3><h5><small>Message from sent via contact@graceco.com.ng</small></h5></div>";
        $email_address = $from_email;
        $headers = array ('From' => $email_from, 'To' => $to, 'Subject' => $email_subject, 'Reply-To' => $email_address,
                            'MIME-Version' => '1.0', 'Content-Type' => "text/html; charset=ISO-8859-1");
        $smtp = Mail::factory('smtp', array ('host' => $host, 'port' => $port, 'auth' => true, 'username' => $username, 'password' => $password));
        $mail = $smtp->send($to, $headers, $email_body);


        if (PEAR::isError($mail)) {
            echo $_POST['_log'] ? "<p>" . $mail->getMessage() . "</p>" : false;
        } else {
            echo $_POST['_log'] ? "<p>Message successfully sent!</p>" : true;
        }

    }else{
        echo 0
    }
?>