<?php include '../inc/dbinfo.inc'; 

  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo 'Failed to connect to MySQL: ' . mysqli_connect_error();

  $database = mysqli_select_db($connection, DB_DATABASE);
  $json = file_get_contents('php://input');
  $jsonobject = json_decode($json,true);
  
  $email = $jsonobject['email'];
  $code = intval($jsonobject['code']);
  $time = time(); 
  $query = "SELECT * FROM password_reset_requests  WHERE email = '$email' AND reset_code = '$code' AND ('$time' - timestamp) <= 300";
  $doCheck = mysqli_fetch_array(mysqli_query($connection,$query));
  if(isset($doCheck)){
	$resetSuccessMsg = 'Success';
	$jsonEncodeMsg = json_encode($resetSuccessMsg);
	echo $jsonEncodeMsg;

}
else{
$resetFailureMsg = 'That code is incorrect or expired';
$jsonEncodeFailure = json_encode($resetFailureMsg);
echo $jsonEncodeFailure;
}

mysqli_close($connection);
?>
