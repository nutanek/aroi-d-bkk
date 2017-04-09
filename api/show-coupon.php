<?php
	header('Content-Type: application/json');
	require_once ("connect.php");

	if ($_SERVER['REQUEST_METHOD'] === 'GET') {

		if (!isset($_GET['id'])) {
			echo json_encode(array(
				"status" => "error"
			));
			exit();
		}

		$restaurants = array();
		$sql = "select *
				from restaurant as r, coupon as c
				where r.id_res=c.id_res and c.id_res=".$_GET['id'];
		if ($result = $conn->query($sql)) {
			$header = array("status" => "success");
			$body = array();
			while ($row = $result->fetch_object()) {
		         $body = array(
					"id" => $row->id_res,
					"name" => $row->name_res,
					"type" => $row->type_res,
					"address" => $row->address_res,
					"area" => $row->area_res,
					"tel" => $row->tel,
					"couponContent" => $row->coupon_content,
					"img" => $row->img,
					"couponCode" => $row->coupon_code
				);
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
