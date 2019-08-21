<?php include '../inc/dbinfo.inc';

  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);
  if (mysqli_connect_errno()) echo 'Failed to connect to MySQL: ' . mysqli_connect_error();
  $database = mysqli_select_db($connection, DB_DATABASE);
  $json = file_get_contents('php://input');
  $jsonobject = json_decode($json,true);
  $email = $jsonobject['email'];
  $newPassword = md5($jsonobject['password']);
  $newPasswordConfirmation = md5($jsonobject['password_confirmation']);
 if(strlen($newPassword) >= 8 && $newPassword == $newPasswordConfirmation){

  $query = "UPDATE users SET password = '$newPassword' WHERE email = '$email'";
  if(mysqli_query($connection, $query)){
        $resetSuccessMsg = 'Success';
        $jsonEncodeMsg = json_encode($resetSuccessMsg);
        echo $jsonEncodeMsg;

}
else{
$resetFailureMsg = 'Failed to reset password';
$jsonEncodeFailure = json_encode($resetFailureMsg);
echo $jsonEncodeFailure;
}}
mysqli_close($connection);
?>
