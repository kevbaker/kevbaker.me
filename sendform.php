<?php
	// Change your informations here
	$your_name	  = "John Doe"; // This is your name
	$contact_mail = "dennis.osterkamp@doitmax.de"; // this is your email adress

	if(empty($_POST['inp_name']) or empty($_POST['inp_email']) or empty($_POST['inp_message'])){
		echo("<small class=\"red\">Please fill all the fields.</small>");
		exit;
	}else if(!eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $_POST['inp_email'])){		
		echo("<small class=\"red\">Please enter a valid email!</small>");
		exit;
	}else{
		$subject = "Contact request for ".$your_name;
		$sender = $_POST['inp_name'];
		if(send_mail($contact_mail, $subject, $_POST['inp_message'], $sender, $_POST['inp_email'])){
			echo("<small class=\"green\">Thank you for your request!&nbsp;&nbsp;</small>");
		}else{
			echo("<small class=\"red\">Message delivery failed...!&nbsp;&nbsp;</small>");
		}
	}
	
	function send_mail($to, $subject, $message, $from, $email) 
		{ 
          $content_type="text/plain"; 
          $message  = stripslashes($message); 
		  $msg  = "{$from} ({$email}) has sent you a contact request.\n";
		  $msg .= "-----------------------------------------------------\n\n";
		  $msg .= "{$message}\n";
    
		// Clean the from data 
          $from_array = preg_split("/[\r\n]+/is",trim($from),-1,PREG_SPLIT_NO_EMPTY); 
          $from = $from_array[0];	
	
		// From array cleaned     
          $headers  = 'MIME-Version: 1.0' . "\r\n"; 
          $headers .= 'Content-type: ' . $content_type . '; charset=UTF-8' . " \r\n"; 
          $headers .= 'From: ' . $from . " <".$email.">\r\n"; 
   		  $headers .= 'Reply-To: '.$email."\r\n";
		  $headers .= 'X-Mailer: PHP/' . phpversion();
          $bool = mail($to, $subject, $msg, $headers, "-f".$email); 
          return $bool; 
      }
	
?>
