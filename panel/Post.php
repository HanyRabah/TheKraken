<?php
header("content-type: application/json");

$con = mysqli_connect('localhost','dbzlabco_hany','kokowawa@123','dbzlabco_convert_buyer');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$id = $_GET['id'];
$type = $_GET['type'];
$mail = $_GET['email'];
$Mobile = $_GET['phone'];
$page = $_GET['page'];



	$sql="SELECT * FROM user_info Where cookie_id = '$id'";
	$result = mysqli_query($con,$sql);
	$rows = mysqli_fetch_array($result);


if($page == 'details'){


	if(empty($rows)){
		$sql="INSERT INTO user_info (cookie_id, Response, Response_date) VALUES ('$id ','$type',now())";
		$response_array['status'] = 'success'; 
		mysqli_query($con , $sql);
	}
	else{
		echo 'record already exists'.PHP_EOL;
	}

}else{


	if (empty($rows[5])) {
	    	echo 'PAA Insert'.PHP_EOL;
			mysqli_query($con,"UPDATE user_info SET PAA_date_start=now(), PAA_email_addr='$mail', PAA_Mobile='$Mobile', counter=counter + 1 WHERE cookie_id='$id' ");
		}else{
			echo 'PAA is here'.PHP_EOL;
	    	mysqli_query($con,"UPDATE user_info SET counter=counter + 1  WHERE cookie_id='$id' ");
			
		}


		
	

	
}
echo $_GET['callback'] . '('.json_encode($response_array).')';
mysqli_close($con);
?>



