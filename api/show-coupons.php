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
			$sql = "select *
					from restaurant as r, coupon as c
					where r.id_res=c.id_res
					order by c.timestamp desc";
		} else {
			$sql = "select *
					from restaurant as r, coupon as c
					where r.id_res=c.id_res
					order by c.timestamp desc
					limit ".$_GET['num'];
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
					"couponContent" => $row->coupon_content,
					"timestamp" => $row->timestamp
				));
		    }
			$restaurants = array_merge($header, array("body" => $body));
			echo json_encode($restaurants, JSON_UNESCAPED_UNICODE);
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
