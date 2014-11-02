<?php
header("content-type: application/json");

$con = mysqli_connect('localhost','dubizzle_QkamAD','kokowawa@123','dubizzle_Qkam');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

//$id = $_GET['id'];
$agentName = $_GET['agent'];
$approve = $_GET['approveNum'];
$delete = $_GET['deleteNum'];
$moveWow = $_GET['moveWowNum'];
$moveQuality = $_GET['moveWowNum'];


$sql="SELECT * FROM dubizzle_agent_info Where agent_name = '$agentName'";
$result = mysqli_query($con,$sql);
$rows = mysqli_fetch_array($result);


$sql="INSERT INTO dubizzle_agent_info (agent_name, submit_date,	approved_ads,deleted_ads,moved_wow_ads,moved_quality_ads ) VALUES ('$agentName',now(),'$approve','$delete','$moveWow','$moveQuality')";
$response_array['status'] = 'success'; 
mysqli_query($con , $sql);


echo $_GET['callback'] . '('.json_encode($response_array).')';
mysqli_close($con);
?>