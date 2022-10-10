<?php
include 'excel_reader.php';     // include the class

// creates an object instance of the class, and read the excel file data
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
	  

	 // echo $cell;
	 ?>
	<?php
     
      $y++;
    }  
   
    $x++;
  }

/*$arrlength = count($date);

for($x = 0; $x < $arrlength; $x++) {
    echo $date[$x];
    echo "<br>";
}

$arrlength = count($actual);

for($x = 0; $x < $arrlength; $x++) {
    echo $actual[$x];
    echo "<br>";
}


$arrlength = count($pred);

for($x = 0; $x < $arrlength; $x++) {
    echo $pred[$x];
    echo "<br>";
}

*/

 

?>
<html>
<canvas id="canvas"></canvas>
</html>
