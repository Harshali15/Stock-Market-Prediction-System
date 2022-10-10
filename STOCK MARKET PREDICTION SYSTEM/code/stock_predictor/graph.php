<?php
session_start();
include("checklogin.php");
check_login();

include 'excel_reader.php';     // include the class

// creates an object instance of the class, and read the excel file data
////////////////////TCS SVM
$excel = new PhpExcelReader;
$excel->read('C:\xampp\htdocs\sp\tcs_svm.xls');

$sheet=$excel->sheets[0];

  $date=array();
  $actual=array();
  $pred=array();
 
  $x = 2;
  while($x <= $sheet['numRows']) {
    
    $y = 1;
    while($y <= $sheet['numCols']) {
      $cell = isset($sheet['cells'][$x][$y]) ? $sheet['cells'][$x][$y] : '';
	  if($y==3){
		  //echo "y=3";
		  //echo $sheet['cells'][$x][$y];
		  $n=array_push($date,$sheet['cells'][$x][$y]);
		  //echo $n;
	  }
	  if($y==2)
		  array_push($pred,$sheet['cells'][$x][$y]);
	  if($y==1)
		  array_push($actual,$sheet['cells'][$x][$y]);
	  

	 //echo $cell;
	 ?>
	<?php
     
      $y++;
    }  
   
    $x++;
  }
/////////////////////////////////TCS CNN  
$excel = new PhpExcelReader;
$excel->read('C:\xampp\htdocs\sp\tcs_cnn.xls');

$sheet=$excel->sheets[0];

  $date1=array();
  $actual1=array();
  $pred1=array();
 
  $x = 2;
  while($x <= $sheet['numRows']) {
    
    $y = 1;
    while($y <= $sheet['numCols']) {
      $cell = isset($sheet['cells'][$x][$y]) ? $sheet['cells'][$x][$y] : '';
	  if($y==3){
		  //echo "y=3";
		  //echo $sheet['cells'][$x][$y];
		  $n=array_push($date1,$sheet['cells'][$x][$y]);
		  //echo $n;
	  }
	  if($y==2)
		  array_push($pred1,$sheet['cells'][$x][$y]);
	  if($y==1)
		  array_push($actual1,$sheet['cells'][$x][$y]);
	  

	 //echo $cell;
	 ?>
	<?php
     
      $y++;
    }  
   
    $x++;
  }
  
 /////////////////////////////INFOSYS SVM 
  $excel = new PhpExcelReader;
$excel->read('C:\xampp\htdocs\sp\infosys_svm.xls');

$sheet=$excel->sheets[0];

  $date2=array();
  $actual2=array();
  $pred2=array();
 
  $x = 2;
  while($x <= $sheet['numRows']) {
    
    $y = 1;
    while($y <= $sheet['numCols']) {
      $cell = isset($sheet['cells'][$x][$y]) ? $sheet['cells'][$x][$y] : '';
	  if($y==3){
		  //echo "y=3";
		  //echo $sheet['cells'][$x][$y];
		  $n=array_push($date2,$sheet['cells'][$x][$y]);
		  //echo $n;
	  }
	  if($y==2)
		  array_push($pred2,$sheet['cells'][$x][$y]);
	  if($y==1)
		  array_push($actual2,$sheet['cells'][$x][$y]);
	  

	 //echo $cell;
	 ?>
	<?php
     
      $y++;
    }  
   
    $x++;
  }
 
//////////////////////////////INFOSYS CNN 
  
  $excel = new PhpExcelReader;
$excel->read('C:\xampp\htdocs\sp\infosys_cnn.xls');

$sheet=$excel->sheets[0];

  $date3=array();
  $actual3=array();
  $pred3=array();
 
  $x = 2;
  while($x <= $sheet['numRows']) {
    
    $y = 1;
    while($y <= $sheet['numCols']) {
      $cell = isset($sheet['cells'][$x][$y]) ? $sheet['cells'][$x][$y] : '';
	  if($y==3){
		  //echo "y=3";
		  //echo $sheet['cells'][$x][$y];
		  $n=array_push($date3,$sheet['cells'][$x][$y]);
		  //echo $n;
	  }
	  if($y==2)
		  array_push($pred3,$sheet['cells'][$x][$y]);
	  if($y==1)
		  array_push($actual3,$sheet['cells'][$x][$y]);
	  

	 //echo $cell;
	 ?>
	<?php
     
      $y++;
    }  
   
    $x++;
  }
  
/////////////////////////////////CIPLA SVM  
  $excel = new PhpExcelReader;
$excel->read('C:\xampp\htdocs\sp\cipla_svm.xls');

$sheet=$excel->sheets[0];

  $date4=array();
  $actual4=array();
  $pred4=array();
 
  $x = 2;
  while($x <= $sheet['numRows']) {
    
    $y = 1;
    while($y <= $sheet['numCols']) {
      $cell = isset($sheet['cells'][$x][$y]) ? $sheet['cells'][$x][$y] : '';
	  if($y==3){
		  //echo "y=3";
		  //echo $sheet['cells'][$x][$y];
		  $n=array_push($date4,$sheet['cells'][$x][$y]);
		  //echo $n;
	  }
	  if($y==2)
		  array_push($pred4,$sheet['cells'][$x][$y]);
	  if($y==1)
		  array_push($actual4,$sheet['cells'][$x][$y]);
	  

	 //echo $cell;
	 ?>
	<?php
     
      $y++;
    }  
   
    $x++;
  }
  
/////////////////////////////CIPLA CNN  
  $excel = new PhpExcelReader;
$excel->read('C:\xampp\htdocs\sp\cipla_cnn.xls');

$sheet=$excel->sheets[0];

  $date5=array();
  $actual5=array();
  $pred5=array();
 
  $x = 2;
  while($x <= $sheet['numRows']) {
    
    $y = 1;
    while($y <= $sheet['numCols']) {
      $cell = isset($sheet['cells'][$x][$y]) ? $sheet['cells'][$x][$y] : '';
	  if($y==3){
		  //echo "y=3";
		  //echo $sheet['cells'][$x][$y];
		  $n=array_push($date5,$sheet['cells'][$x][$y]);
		  //echo $n;
	  }
	  if($y==2)
		  array_push($pred5,$sheet['cells'][$x][$y]);
	  if($y==1)
		  array_push($actual5,$sheet['cells'][$x][$y]);
	  

	 //echo $cell;
	 ?>
	<?php
     
      $y++;
    }  
   
    $x++;
  }
  
  
	
?><!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Welcome </title>
	 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.14.2/dist/tf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/heroic-features.css" rel="stylesheet">
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
			  
		        <h2 class="form-login-heading">Graph</h2>
                  <p style="color:#F00; padding-top:20px;" align="center"></p>
				  <p>Comapany name: TCS</p>
                  <p>Actual and predicted value comparison using SVM</p>
				  
				  <canvas id='canvas'></canvas>
				  <p>Actual and predicted value comparison using CNN</p>
				  <canvas id='canvas1'></canvas>

                  <p>Comapany name: CIPLA</p>
                  <p>Actual and predicted value comparison using SVM</p>
				  
				  <canvas id='canvas4'></canvas>
				  <p>Actual and predicted value comparison using CNN</p>

				  <canvas id='canvas5'></canvas>
				  <p>Comapany name: INFOSYS</p>
                  <p>Actual and predicted value comparison using SVM</p> 
				  
				  <canvas id='canvas2'></canvas>
				  
				  <p>Actual and predicted value comparison using CNN</p> 

				  <canvas id='canvas3'></canvas>


		        <div class="login-wrap">
                
					  
	
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
	<script type="text/javascript">
//////////////////////////////////////////////SVM TCS///////////////////////////
    var date = <?php echo json_encode($date); ?>;
	var actual = <?php echo json_encode($actual); ?>;
    var pred = <?php echo json_encode($pred); ?>;

     console.log(date)
	 console.log(actual)
     console.log(pred)
	 
	
  //line
  var ctxL = document.getElementById("canvas").getContext('2d');
     // var N = label ? label : [...Array(Math.max(actual.length, pred.length)).keys()];

  var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
      labels:date,
      datasets: [{
          label: "Predicted",
          data:pred,
          backgroundColor: [
            'rgba(105, 0, 132, .2)',
          ],
          borderColor: [
            'rgba(200, 99, 132, .7)',
          ],
          borderWidth: 1
        },
        {
          label: "Actual",
          data: actual,
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  });
  
//////////////////////////////////////////////CNN TCS///////////////////////////

  var date = <?php echo json_encode($date1); ?>;
	var actual = <?php echo json_encode($actual1); ?>;
    var pred = <?php echo json_encode($pred1); ?>;
	 
	
  //line
  var ctxL = document.getElementById("canvas1").getContext('2d');
     // var N = label ? label : [...Array(Math.max(actual.length, pred.length)).keys()];

  var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
      labels:date,
      datasets: [{
          label: "Predicted",
          data:pred,
          backgroundColor: [
            'rgba(105, 0, 132, .2)',
          ],
          borderColor: [
            'rgba(200, 99, 132, .7)',
          ],
          borderWidth: 1
        },
        {
          label: "Actual",
          data: actual,
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  });

//////////////////////////////////////////////SVM INFOSYS///////////////////////////

   var date = <?php echo json_encode($date2); ?>;
	var actual = <?php echo json_encode($actual2); ?>;
    var pred = <?php echo json_encode($pred2); ?>;

     console.log(date)
	 console.log(actual)
     console.log(pred)
	 
	
  //line
  var ctxL = document.getElementById("canvas2").getContext('2d');
     // var N = label ? label : [...Array(Math.max(actual.length, pred.length)).keys()];

  var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
      labels:date,
      datasets: [{
          label: "Predicted",
          data:pred,
          backgroundColor: [
            'rgba(105, 0, 132, .2)',
          ],
          borderColor: [
            'rgba(200, 99, 132, .7)',
          ],
          borderWidth: 1
        },
        {
          label: "Actual",
          data: actual,
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  });
 //////////////////////////////////////////////CNN INFOSYS///////////////////////////

  
   var date = <?php echo json_encode($date3); ?>;
	var actual = <?php echo json_encode($actual3); ?>;
    var pred = <?php echo json_encode($pred3); ?>;

     console.log(date)
	 console.log(actual)
     console.log(pred)
	 
	
  //line
  var ctxL = document.getElementById("canvas3").getContext('2d');
     // var N = label ? label : [...Array(Math.max(actual.length, pred.length)).keys()];

  var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
      labels:date,
      datasets: [{
          label: "Predicted",
          data:pred,
          backgroundColor: [
            'rgba(105, 0, 132, .2)',
          ],
          borderColor: [
            'rgba(200, 99, 132, .7)',
          ],
          borderWidth: 1
        },
        {
          label: "Actual",
          data: actual,
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  });
 //////////////////////////////////////////////SVM CIPLA///////////////////////////

  
   var date = <?php echo json_encode($date4); ?>;
	var actual = <?php echo json_encode($actual4); ?>;
    var pred = <?php echo json_encode($pred4); ?>;

     console.log(date)
	 console.log(actual)
     console.log(pred)
	 
	
  //line
  var ctxL = document.getElementById("canvas4").getContext('2d');
     // var N = label ? label : [...Array(Math.max(actual.length, pred.length)).keys()];

  var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
      labels:date,
      datasets: [{
          label: "Predicted",
          data:pred,
          backgroundColor: [
            'rgba(105, 0, 132, .2)',
          ],
          borderColor: [
            'rgba(200, 99, 132, .7)',
          ],
          borderWidth: 1
        },
        {
          label: "Actual",
          data: actual,
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  });
  
//////////////////////////////////////////////CNN CIPLA///////////////////////////
   var date = <?php echo json_encode($date5); ?>;
	var actual = <?php echo json_encode($actual5); ?>;
    var pred = <?php echo json_encode($pred5); ?>;

     console.log(date)
	 console.log(actual)
     console.log(pred)
	 
	
  //line
  var ctxL = document.getElementById("canvas5").getContext('2d');
     // var N = label ? label : [...Array(Math.max(actual.length, pred.length)).keys()];

  var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
      labels:date,
      datasets: [{
          label: "Predicted",
          data:pred,
          backgroundColor: [
            'rgba(105, 0, 132, .2)',
          ],
          borderColor: [
            'rgba(200, 99, 132, .7)',
          ],
          borderWidth: 1
        },
        {
          label: "Actual",
          data: actual,
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  });
  
  
  
	 
 </script>

	
</body>

</html>
