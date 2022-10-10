$(document).ready(function () {

    
		$.ajax({
        type: "GET",
		url: 'http://localhost/stock_predictor/js/tcs.php',
        async:true,
        crossDomain:true,
        success: function(data, status, xhr) {
		//alert("Data: " + data + "\nStatus: " + status);
		document.getElementById("mytable").rows[1].cells[2].innerHTML=data;
		//document.getElementById("data1").value=data;
        }
    
	});
	



	$.ajax({
        type: "GET",
		url: 'http://localhost/stock_predictor/js/infy.php',
        async:true,
        crossDomain:true,
        success: function(data, status, xhr) {
		//alert("Data: " + data + "\nStatus: " + status);
		document.getElementById("mytable").rows[2].cells[2].innerHTML=data;

		//document.getElementById("data1").value=data;
        }
	});
		
		$.ajax({
        type: "GET",
		url: 'http://localhost/stock_predictor/js/cipla.php',
        async:true,
        crossDomain:true,
        success: function(data, status, xhr) {
		//alert("Data: " + data + "\nStatus: " + status);
		document.getElementById("mytable").rows[3].cells[2].innerHTML=data;

		//document.getElementById("data1").value=data;
        }
		});
});