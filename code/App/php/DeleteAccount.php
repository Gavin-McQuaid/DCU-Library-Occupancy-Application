<?php include '../inc/dbinfo.inc'; 

  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);
  if (mysqli_connect_errno()) echo 'Failed to connect to MySQL: ' . mysqli_connect_error();
  $database = mysqli_select_db($connection, DB_DATABASE);
  $json = file_get_contents('php://input');
  $jsonobject = json_decode($json,true); 
  $email = $jsonobject['email'];
  $query = "DELETE FROM users WHERE email = '$email'";
  if(mysqli_query($connection, $query)){
	$deleteSuccessMsg = 'Success';
	$jsonEncodeMsg = json_encode($deleteSuccessMsg);
	echo $jsonEncodeMsg;

}
else{
$deleteFailureMsg = 'Failed to delete account';
$jsonEncodeFailure = json_encode($deleteFailureMsg);
echo $jsonEncodeFailure;
}
mysqli_close($connection);
?>