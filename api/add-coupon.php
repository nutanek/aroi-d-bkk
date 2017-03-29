<?php
	require_once ("connect.php");

	if ($_SERVER['REQUEST_METHOD'] === 'POST') { /*ตรวจสอบว่าเป็น POST*/
		$json = file_get_contents('php://input');
		$obj = json_decode($json);
		$data = (array) $obj;


		if (!isset($data['idRes']) || !isset($data['couponContent'] || !isset($data['couponCode']) ) {
			echo json_encode(array(
				"status" => "error"
			));
			exit();
		}

		$sql = "insert into coupon (id_res, coupon_content, coupon_code)
		                    values ('$data[idRes]', '$data[couponContent]', '$data[couponContent]')";

		if ($conn->query($sql) === TRUE) {
    		echo json_encode(array(
				"status" => "success"
			));
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
