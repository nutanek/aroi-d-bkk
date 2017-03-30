<?php
	header('Content-Type: application/json');
	require_once ("connect.php");

	if ($_SERVER['REQUEST_METHOD'] === 'POST') { /*ตรวจสอบว่าเป็น POST*/
		$json = file_get_contents('php://input');
		$obj = json_decode($json);
		$data = (array) $obj;


		if (!isset($data['areaRes']) ||
			!isset($data['keyword']) ) {
			echo json_encode(array(
				"status" => "error"
			));
			exit(0);
		}


		$sql = "select *
		        from   restaurant
		        where  (content like '%$data[keyword]%'
		            or type_res = '$data[keyword]'
		            or name_res = '$data[keyword]')
		            and area_res = '$data[areaRes]'";
                    

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
					"img" => $row->img,
					"content" => $row->content
				));
		   	}
			$restaurants = array_merge($header, array("body" => $body));
			echo json_encode($restaurants, JSON_UNESCAPED_UNICODE);
	
		} else {
			echo json_encode(array(
				"status" => "error"
			));
		}
	}
?>
