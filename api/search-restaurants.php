<?php
	header('Content-Type: application/json');
	require_once ("connect.php");

	if ($_SERVER['REQUEST_METHOD'] === 'POST') { /*ตรวจสอบว่าเป็น POST*/
		$json = file_get_contents('php://input');
		$obj = json_decode($json);
		$data = (array) $obj;

		if ($_GET['type'] == 1) {
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
			            or  type_res = '$data[keyword]'
			            or  name_res like '%$data[keyword]%')
			            and area_res = '$data[areaRes]'";
        } else if ($_GET['type'] == 2) {
        	if (!isset($data['areaRes']) ||
				!isset($data['keyword']) ||
				!isset($data['minPrice']) ||
				!isset($data['maxPrice']) ) {
				echo json_encode(array(
					"status" => "error"
				));
				exit(0);
			}

			$sqlQuery = "select * from restaurant ";


			if ($data[keyword] != null) {
				$sqlAppend[0] = "(name_res like '%$data[keyword]%' or type_res = '$data[keyword]' or content like '%$data[keyword]%')"; 
			}
			if ($data[areaRes] != null) {
				$sqlAppend[1] = "area_res = '$data[areaRes]'";
			}
			if ($data[minPrice] != null && $data[maxPrice] != null) {
				$sqlAppend[2] = "min_price >= '$data[minPrice]' and max_price <= '$data[maxPrice]'";
			}

			$sqlAppendAll = implode(" and ", $sqlAppend);
			if (sizeof($sqlAppend) > 0) {
				$sql = $sqlQuery." where ".$sqlAppendAll;
			} else {
				$sql = $sqlQuery.$sqlAppendAll;
			}
			
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
