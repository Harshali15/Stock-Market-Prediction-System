<?php

include_once('simple_html_dom.php');
$html = file_get_html('https://in.finance.yahoo.com/quote/INFY.NS?p=INFY.NS&.tsrc=fin-srch');
foreach($html->find('div[class=D(ib) Mend(20px)]') as $element){
	$span = $element->find('span');
	echo $span[0]->plaintext . ' ' . $span[1]->plaintext; 
}
