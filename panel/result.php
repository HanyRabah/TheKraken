<?php
session_start(); 
if(!$_SESSION['logged']){ 
    header("Location: index.php"); 
    exit; 
} 

include ('paginate.php'); //include of paginat page
$con = mysqli_connect('localhost','dubizzle_QkamAD','kokowawa@123','dubizzle_Qkam');

if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"ajax_demo");

$sql="SELECT * FROM `dubizzle_agent_info` ORDER BY `submit_date` ASC";
$result = mysqli_query($con,$sql);
 
$per_page = 20;         // number of results to show per page

$total_results = mysqli_num_rows($result);
$total_pages = ceil($total_results / $per_page);//total pages we going to have

//-------------if page is setcheck------------------//

if (isset($_GET['page'])) {
    $show_page = $_GET['page'];             //it will telles the current page
    if ($show_page > 0 && $show_page <= $total_pages) {
        $start = ($show_page - 1) * $per_page;
        $end = $start + $per_page;
    } else {
        // error - show first set of results
        $start = 0;              
        $end = $per_page;
    }
} else {
    // if page isn't set, show first set of results
    $start = 0;
    $end = $per_page;
}
// display pagination
$page = intval($_GET['page']);

$tpages=$total_pages;
if ($page <= 0)
    $page = 1;


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
        <title>دوبيزل</title> 
        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/index.css" rel="stylesheet">
 <link href="css/bootstrap-theme.min.css" rel="stylesheet">
<style>
.pagination {
    height:40px;
    margin:20px 0
}
.pagination ul {
    display:inline-block;
    *display:inline;
    margin-bottom:0;
    margin-left:0;
    -webkit-border-radius:3px;
    -moz-border-radius:3px;
    border-radius:3px;
    *zoom:1;
    -webkit-box-shadow:0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow:0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow:0 1px 2px rgba(0, 0, 0, 0.05)
}
.pagination li {
    display:inline
}
.pagination a, .pagination span {
    float:left;
    padding:0 14px;
    line-height:38px;
    text-decoration:none;
    background-color:#fff;
    border:1px solid #ddd;
    border-left-width:0
}
.pagination a:hover, .pagination .active a, .pagination .active span {
    background-color:#f5f5f5
}
.pagination .active a, .pagination .active span {
    color:#999;
    cursor:default
}
.pagination .disabled span, .pagination .disabled a, .pagination .disabled a:hover {
    color:#999;
    cursor:default;
    background-color:transparent
}
.pagination li:first-child a, .pagination li:first-child span {
    border-left-width:1px;
    -webkit-border-radius:3px 0 0 3px;
    -moz-border-radius:3px 0 0 3px;
    border-radius:3px 0 0 3px
}
.pagination li:last-child a, .pagination li:last-child span {
    -webkit-border-radius:0 3px 3px 0;
    -moz-border-radius:0 3px 3px 0;
    border-radius:0 3px 3px 0
}
.pagination-centered {
    text-align:center
}
.pagination-right {
    text-align:right
}
.accept{ background: #d0ffe5}
.refuse{ background: #eee}
.seller{ background: #feffd0}</style>
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>

        <nav class="navbar navbar-default" role="navigation">
            <div class="container">
				<div class="col-md-2"><?php echo 'Welcome, '.$_SESSION['username'];  ?><span><a href="logout.php"> logout</a></span></div>

                <h1 class="navbar-brand navbar-right ">مختبر دوبيزل&nbsp;&nbsp;</h1>
                <!--<img src="http://dubizzlelab.com/Qkam-counter/panel/img/logo_side.png" style="width:55px; margin:0 auto" />-->
            </div>
        </nav>

      

        <div id="userInfo" class="container">
            <div class="row">
                <div class="col-md-12">
             
				<?php
				function mysqli_result($res, $row, $field=0) { 
				    $res->data_seek($row); 
				    $datarow = $res->fetch_array(); 
				    return $datarow[$field]; 
				} 
                    $reload = $_SERVER['PHP_SELF'] . "?tpages=" . $tpages;
                  
                    // display data in table
                    echo "<strong>Total Results</strong>  " . $total_results;
                   	echo "<table border='1' class='table table-bordered table-hover'><tr class='success'><th>Agent Name</th><th>Submit date</th><th>Approved</th><th>Deleted Ads</th><th>Moved to Wow</th><th>Moved to Quality</th></tr>";
                    // loop through results of database query, displaying them in the table  table-striped

                    
                    for ($i = $start; $i < $end; $i++) {
                        // make sure that PHP doesn't try to show results that don't exist
                        
                        if ($i == $total_results) {
                            break;
                        }

                        // echo out the contents of each row into a table 
                        echo "<tr class=". mysqli_result($result , $i ,'Response') .">";
						echo "<td>" . mysqli_result($result , $i ,'agent_name') . "</td>";
						echo "<td>" . mysqli_result($result , $i ,'submit_date') . "</td>";
						echo "<td>" . mysqli_result($result , $i ,'approved_ads') . "</td>";
						echo "<td>" . mysqli_result($result , $i ,'deleted_ads') . "</td>";
						echo "<td>" . mysqli_result($result , $i ,'moved_wow_ads') . "</td>";
						echo "<td>" . mysqli_result($result , $i ,'moved_quality_ads') . "</td>";
						echo "</tr>";
                    }       
                    // close table>
                echo "</table>";
                  echo '<div class="pagination"><ul>';
                    if ($total_pages > 1) {
                        echo paginate($reload, $show_page, $total_pages);
                    }
                    echo "</ul></div>";
            // pagination
            ?>


                     </table>
            </div>
        </div>

         

        <div class="footer">
            <div class="container">
                <p>مختبر دوبيزل - 2014</p>
            </div>
        </div>
    <script src="js/jquery-1.9.1.js"></script>
         <script src="js/bootstrap.min.js"></script>
    </body>
</html>