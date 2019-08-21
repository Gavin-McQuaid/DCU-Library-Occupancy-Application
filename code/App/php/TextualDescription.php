<?php include '../inc/dbinfo.inc'; 

  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo 'Failed to connect to MySQL: ' . mysqli_connect_error();

  $database = mysqli_select_db($connection, DB_DATABASE);
  $json = file_get_contents('php://input');
  $jsonobject = json_decode($json,true);
  
  $floor = $jsonobject['floor'];
  $query = "SELECT * FROM text_descriptions WHERE floor='$floor'";
  $doCheck = mysqli_fetch_array(mysqli_query($connection,$query));
  if(isset($doCheck)){
	$loginSuccessMsg = $doCheck[2];
	$jsonEncodeMsg = json_encode($loginSuccessMsg);
	echo $jsonEncodeMsg;
}
else{
$descriptionFailureMsg = 'Failure';
$jsonEncodeFailure = json_encode($descriptionFailureMsg);
echo $jsonEncodeFailure;
}

mysqli_close($connection);
?>