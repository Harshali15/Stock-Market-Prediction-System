<?php
session_start();
include("checklogin.php");
check_login();

	
?><!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Welcome </title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/heroic-features.css" rel="stylesheet">
	 <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.14.2/dist/tf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
</head>
<body>

    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="welcome.php">HOME !</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                   <li>
						<a href="#"><?php echo $_SESSION['name'];?></a>
                    </li>
					
					 <li>
                        <a href="home.php">Get Quote </a>
                    </li>
					
					<li>
                        <a href="home1.php">Get Prediction</a>
                    </li>
					
					<li>
                        <a href="graph.php">Graph</a>
                    </li>
						 
                    <li>
                        <a href="logout.php">Logout</a>
                    </li>
                  
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <header class="jumbotron hero-spacer">
             <div id="login-page">
	  	<div class="container">
      
	  	
		      <form class="form-login" action="demo2.php" method="post">
			  
		        <h2 class="form-login-heading">Current Value  </h2>
                  <p style="color:#F00; padding-top:20px;" align="center"></p>
		        <div class="login-wrap">
		           
					  
					 <table id="mytable" class="table table-striped table-advance table-hover">
	                  	  	
	                  	  	  <hr>
                              <thead>
                              <tr>
                                  <th>Sno.</th>
                                  <th class="hidden-phone">Company Name</th>
                                  <th> Current Stock Value</th>

                              </tr>
                              </thead>
                              <tbody>
                              <?php
                              $mysql_hostname ="localhost";
$mysql_user ="root";
$mysql_password ="";
$mysql_database ="stock";
$bd = mysql_connect($mysql_hostname, $mysql_user, $mysql_password) or die("Could not connect database");
mysql_select_db($mysql_database, $bd) or die("Could not select database");
							  $ret=mysql_query("select * from stock");
							  $cnt=1;
							  while($row=mysql_fetch_array($ret))
							  {?>
                              <tr>
                              <td><?php echo $cnt;?></td>
                                  <td><?php echo $row['camp'];?></td>
                                  <td><input type="text" id="data1" value="Stock Quote"></td>
                                  
                              </tr>
                              <?php $cnt=$cnt+1; }?>
                             
                              </tbody>
                          </table>	  
		        </div>
		      </form>	  	
	  	
	  	</div>
	  </div>
        </header>

        <hr>

        </div>

        <hr>


    </div>
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
	<script src="js/data.js"></script>
</body>

</html>
