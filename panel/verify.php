<?php 
 
if(isset($_POST['submit'])){ 
    $dbHost = "localhost";        //Location Of Database usually its localhost 
    $dbUser = "dubizzle_QkamAD";            //Database User Name 
    $dbPass = "kokowawa@123";            //Database Password 
    $dbDatabase = "dubizzle_Qkam";    //Database Name 
   

    $db = mysql_connect($dbHost,$dbUser,$dbPass)or die("Error connecting to database."); 
    mysql_select_db($dbDatabase, $db)or die("Couldn't select the database."); 
    
    $usr = mysql_real_escape_string($_POST['username']);
    $pas = mysql_real_escape_string($_POST['password']);
    $sql = mysql_query("SELECT * FROM user_login  
        WHERE username='$usr' AND 
        password='$pas' 
        LIMIT 1"); 

    if(mysql_num_rows($sql) == 1){ 
    	var_dump('in');
    	echo 'in';
        $row = mysql_fetch_array($sql); 
        session_start(); 
        $_SESSION['username'] = $row['username'];  
        $_SESSION['logged'] = TRUE; 
        header("Location: result.php"); // Modify to go to the page you would like 
        exit; 
    }else{ 
    	var_dump('out'); 
      //  header("Location: index.php"); 
        var_dump('wrong username or password');
        exit; 
    } 
}else{    //If the form button wasn't submitted go to the index page, or login page 
var_dump('very out');
echo 'out out';
    header("Location: index.php");  
    exit; 
} 
?>