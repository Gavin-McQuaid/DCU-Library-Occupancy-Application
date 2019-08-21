<?php include '../inc/dbinfo.inc'; 

  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo 'Failed to connect to MySQL: ' . mysqli_connect_error();

  $database = mysqli_select_db($connection, DB_DATABASE);
  $json = file_get_contents('php://input');
  $jsonobject = json_decode($json,true);
  
  $email = $jsonobject['email'];
  
  $query = "SELECT * FROM users WHERE email = '$email'";
  $doCheck = mysqli_fetch_array(mysqli_query($connection,$query));
  if(isset($doCheck)){
	$resetSuccessMsg = 'Success';
	$jsonEncodeMsg = json_encode($resetSuccessMsg);
	echo $jsonEncodeMsg;
	$deletePreviousCodes = "DELETE FROM  account_authentication WHERE email='$email'";
        mysqli_query($connection, $deletePreviousCodes);
	$code = rand(100000,999999);
	$timestamp = time();
	$generateCodeQuery = "INSERT INTO account_authentication(authentication_code, email, timestamp) VALUES ('$code', '$email', '$timestamp')";
	mysqli_query($connection, $generateCodeQuery);
        $subject = 'Account authentication';
        $message = 'Your authentication code is ' .$code;
        mail($email, $subject, $message);

}
else{
$resetFailureMsg = 'Error!';
$jsonEncodeFailure = json_encode($resetFailureMsg);
echo $jsonEncodeFailure;
}

mysqli_close($connection);
?>