<?php
	header('Content-Type: application/json');
	require_once ("connect.php");

	if ($_SERVER['REQUEST_METHOD'] === 'POST') { /*ตรวจสอบว่าเป็น POST*/
		$json = file_get_contents('php://input');
		$obj = json_decode($json);
		$data = (array) $obj;


		if (isset($data['nameRes']) &&
			isset($data['typeRes']) &&
			isset($data['mapLat']) &&
			isset($data['mapLon']) &&
			isset($data['addressRes']) &&
			isset($data['areaRes']) &&
			isset($data['tel']) &&
			isset($data['content']) &&
			isset($data['minPrice']) &&
			isset($data['maxPrice']) &&
			isset($data['service1']) &&
			isset($data['service2']) &&
			isset($data['service3']) &&
			isset($data['service4']) &&
			isset($data['service5']) &&
			isset($data['img']) ) {


			$sql = "insert into restaurant (name_res,
											type_res,
											map_lat,
											map_lon,
											address_res,
											area_res,
											tel,
											content,
											min_price,
											max_price,
		                                    service_1,
		                                    service_2,
		                                    service_3,
		                                    service_4,
		                                    service_5,
		                                    img)
		                            values ('$data[nameRes]',
										   '$data[typeRes]',
		                                   '$data[mapLat]',
		                                   '$data[mapLon]',
		                                   '$data[addressRes]',
		                                   '$data[areaRes]',
		                                   '$data[tel]',
		                                   '$data[content]',
		                                   $data[minPrice],
		                                   $data[maxPrice],
		                                   $data[service1],
		                                   $data[service2],
		                                   $data[service3],
		                                   $data[service4],
		                                   $data[service5],
		                                   '$data[img]')";

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
	} else {
		echo json_encode(array(
			"status" => "error"
		));
	}
?>
