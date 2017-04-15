<?php
	header('Content-Type: application/json');
	require_once ("connect.php");

	if ($_SERVER['REQUEST_METHOD'] === 'GET') {

		if (!isset($_GET['num'])) {
			echo json_encode(array(
				"status" => "error"
			));
			exit();
		}

		$restaurants = array();

		if ($_GET['num'] == 0) {
			$sql = "select * from restaurant order by id_res desc";
		} else {
			$sql = "select * from restaurant order by id_res desc limit ".$_GET['num'];
		}

		if ($result = $conn->query($sql)) {
			$header = array("status" => "success");
			$body = array();
			while ($row = $result->fetch_object()) {
		        array_push($body, array(
					"id" => $row->id_res,
					"name" => $row->name_res,
					"type" => $row->type_res,
					"area" => $row->area_res,
					"price" => array(
						"min" => $row->min_price,
						"max" => $row->max_price
					),
					"img" => $row->img
				));
		    }
			$restaurants = array_merge($header, array("body" => $body));
			echo json_encode($restaurants);
		} else {
			echo json_encode(array(
				"status" => "error"
			));
		}
	} else {
		echo json_encode(array(
			"status" => "error"
		));
	}
?>
