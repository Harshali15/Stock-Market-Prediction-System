<?php

$mysql_hostname ="localhost";
$mysql_user ="root";
$mysql_password ="";
$mysql_database ="stock";
$bd = mysql_connect($mysql_hostname, $mysql_user, $mysql_password) or die("Could not connect database");
mysql_select_db($mysql_database, $bd) or die("Could not select database");

$fname=$_POST['fname'];

	$lname=$_POST['lname'];

	$email=$_POST['email'];
	
	
	$password=$_POST['password'];

	$contact=$_POST['contact'];

	
	$a=date('Y-m-d');

	$msg=mysql_query("insert into users(fname,lname,email,password,contactno,posting_date) values('$fname','$lname','$email','$password','$contact','$a')");
if($msg)
{
	$_SESSION['action1']="Register successfully";
$extra="index.php";
$host  = $_SERVER['HTTP_HOST'];
$uri  = rtrim(dirname($_SERVER['PHP_SELF']),'/\\');
header("location:http://$host$uri/$extra");
exit();
}
else
{
	echo "<script>alert('Not Register successfully');</script>";
}
?>