<?php include '../inc/dbinfo.inc';

  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo 'Failed to connect to MySQL: ' . mysqli_connect_error();

  $database = mysqli_select_db($connection, DB_DATABASE);
  $json = file_get_contents('php://input');
  $jsonobject = json_decode($json,true);

  $email = $jsonobject['email'];
  $password = md5($jsonobject['password']);
  $password_confirmation =  md5($jsonobject['password_confirmation']);
  $email_pattern = '/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(dcu)\.ie$/';
  $email_match = preg_match($email_pattern, $email, $match);
if(strlen($password) >= 8 && $password_confirmation == $password && $email_match){

  $query = "SELECT * FROM users WHERE email = '$email'";
  $doCheck = mysqli_fetch_array(mysqli_query($connection,$query));
  if(isset($doCheck)){
        $emailAlreadyExistsMsg = 'This email account is already in use, please use another email account';
        $jsonEncodeMsg = json_encode($emailAlreadyExistsMsg);
        echo $jsonEncodeMsg;
}
else{

$insertionQuery = "INSERT INTO users(email, password) VALUES ('$email','$password')";
if(mysqli_query($connection,$insertionQuery)){
 $successMsg = 'User registered successfully';
 $jsonEncodeSuccess = json_encode($successMsg);
 echo $jsonEncodeSuccess;


}
else{
$failureMsg = 'Error, please try again';
//$jsonEncodeFailure = json_encode($failureMsg);
//echo $jsonEncodeFailure;
echo $failureMsg;
}
}
}

mysqli_close($connection);
?>

