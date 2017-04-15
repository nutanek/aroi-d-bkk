<?php
	require_once ("connect.php");

	if ($_SERVER['REQUEST_METHOD'] === 'GET') { /*ตรวจสอบว่าเป็น POST*/
		$json = file_get_contents('php://input');
		$obj = json_decode($json);
		$data = (array) $obj;


		if (!isset($_GET['id'])) {
			echo json_encode(array(
				"status" => "error"
			));
			exit();
		}

		$sql = "delete from restaurant
				where id_res='$_GET[id]'";

		if ($conn->query($sql) === TRUE) {
			$sql2 = "delete from coupon
					where id_res='$_GET[id]'";
			if ($conn->query($sql2) === TRUE) {
				echo json_encode(array(
					"status" => "success"
				));
			}
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
