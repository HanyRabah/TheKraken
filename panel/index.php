<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
    <head>
        <title>دوبيزل</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="content-type" content="application/xhtml+xml; charset=UTF-8" />
        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/index.css" rel="stylesheet">
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
                <h1 class="navbar-brand navbar-right">مختبر دوبيزل&nbsp;&nbsp;</h1>
            </div>
        </nav>

 

        <div id="userInfo" class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <h2 style="text-align:center"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;من انت؟</h2>
                     <form action="verify.php" method="post">
                        <div class="row">
                            <div class="form-group col-md-12" style="text-align:right">
                                <label for="username">الاسم</label>
                                <input type="text" class="form-control" name="username" placeholder="Enter name">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12" style="text-align:right">
                                <label for="user_email">الباسورد</label>
                                <input type="password" class="form-control" name="password" placeholder="Enter Password">
                            </div>
                           
                        </div>
                         
                        <div class="row">
                            <div class="col-md-12">
                                <input type="submit" name="submit" class="btn btn-primary" value="submit"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

         

        <div class="footer">
            <div class="container">
                <p>مختبر دوبيزل - 2014</p>
            </div>
        </div>

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="js/jquery-1.9.1.js"></script>
        <script src="js/jquery.sortable.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="js/bootstrap.min.js"></script>
        <script src="js/jquery.validate.min.js" type="text/javascript"></script>
        <script>

            $(function(){

            });
        </script>
    </body>
</html>