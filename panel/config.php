<?php
$con = mysqli_connect('localhost','dubizzle_QkamAD','kokowawa@123','dubizzle_Qkam');

if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"ajax_demo");

 
?>