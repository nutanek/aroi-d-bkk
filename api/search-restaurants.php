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
			            or  type_res like '%$data[keyword]%'
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
				$sqlAppend[0] = "(name_res like '%$data[keyword]%' or type_res like '%$data[keyword]%' or content like '%$data[keyword]%')"; 
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
			
        } else if ($_GET['type'] == 3) {
        	if (!isset($data['keyword']) ||
				!isset($data['areaRes']) ||
				!isset($data['minPrice']) ||
				!isset($data['maxPrice']) ||
				!isset($data['scoreTotal']) ||
				!isset($data['service1']) ||
				!isset($data['service2']) ||
				!isset($data['service3']) ||
				!isset($data['service4']) ||
				!isset($data['service5']) ) {
				echo json_encode(array(
					"status" => "error1"
				));
				exit(0);
			}

			$sqlQuery = "select * from restaurant ";

			if ($data[keyword] != null) {
				$sqlAppend[0] = "(name_res like '%$data[keyword]%' or type_res like '%$data[keyword]%' or content like '%$data[keyword]%')"; 
			}
			if ($data[areaRes] != null) {
				$sqlAppend[1] = "area_res = '$data[areaRes]'";
			}
			if ($data[minPrice] != null && $data[maxPrice] != null) {
				$sqlAppend[2] = "min_price >= '$data[minPrice]' and max_price <= '$data[maxPrice]'";
			}
			if ($data[scoreTotal] != null) {
				$sqlAppend[3] = "score_total >= '$data[scoreTotal]'";
			}
			if ($data[service1] != null) {
				$sqlAppend[4] = "service_1 = '$data[service1]'";
			}
			if ($data[service2] != null) {
				$sqlAppend[5] = "service_2 = '$data[service2]'";
			}
			if ($data[service3] != null) {
				$sqlAppend[6] = "service_3 = '$data[service3]'";
			}
			if ($data[service4] != null) {
				$sqlAppend[7] = "service_4 = '$data[service4]'";
			}
			if ($data[service5] != null) {
				$sqlAppend[8] = "service_5 = '$data[service5]'";
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
					"scoreTotal" => $row->score_total
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
