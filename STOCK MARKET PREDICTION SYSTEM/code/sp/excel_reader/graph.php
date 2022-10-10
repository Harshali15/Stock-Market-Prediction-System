<?php
include 'excel_reader.php'; // include the class
$excel = new PhpExcelReader; // creates object instance of the class
$excel->read('C:\xampp\htdocs\sp\tcs_svm.xls'); // reads and stores the excel file data
echo '<pre>';
$sheet=array();
$sheet=var_export($excel->sheets);
echo '</pre>';

echo $sheet;


/*$sheet=array();
array_push($sheet,$excel->sheets);
//echo $sheet;*/
$date=array();
$actual=array();
$predicted=array();
  //$x=1;
  /*while($x <= $sheet['numRows']) {
  
	  array_push($actual,$sheet['cells'][$x+1][0]);
	     array_push($predicted,$sheet['cells'][$x+1][1]);
      array_push($date,$sheet['cells'][$x+1][2]);
     
    
  }*/
 
   $x = 1;
   echo "hello";
   echo $sheet['numRows'];
  while($x <= $sheet['numRows']) {
    echo "in while";
    $y = 1;
    while($y <= $sheet['numCols']) {
      $cell =  $sheet['cells'][$x][$y];
	  echo "cell";
      echo $cell;
      $y++;
    }  
	
    $x++;
  }
  
  
    ?><br><br><br><br><br><br><br><br><br><br><br><br>
 <?php
 //echo $date;
 ?><br><br><br><br><br><br><br><br><br><br><br><br>
 <?php
   //echo $actual;
  ?><br><br><br><br><br><br><br><br><br><br><br><br>
 <?php
  //echo $predicted;
 

// Test to see the excel data stored in $sheets property

