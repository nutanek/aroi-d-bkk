<?php
function js_thai_encode($data) {	// fix all thai elements
	if (is_array($data)) {
		foreach($data as $a => $b) {
			if (is_array($data[$a])) {
				$data[$a] = js_thai_encode($data[$a]);
			}
			else {
				$data[$a] = iconv('UTF-8', 'TIS-620', $b);
			}
		}
	}
	else {
		$data = iconv('UTF-8', 'TIS-620', $data);
	}
	return $data;
}
?>
