<?php
	header('Content-Type: application/json');
	require_once("connect.php");

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	    /*ตรวจสอบว่าเป็น POST*/
	    $json = file_get_contents('php://input');
	    $obj  = json_decode($json);
	    $data = (array) $obj;

		// Searching by Maps
		if ($data['lat'] != "" && $data['lng'] != "" && $data['distance'] != "") {
			$dist = (float)$data['distance'] * 0.62137;
			$restaurants = array();

			$sql = "select *,
				 (
	    			3959 * acos (
	      			cos ( radians(".(float)$data['lat'].") )
	      			* cos( radians( map_lat ) )
	      			* cos( radians( map_lon ) - radians(".(float)$data['lng'].") )
	      			+ sin ( radians(".(float)$data['lat'].") )
	      			* sin( radians( map_lat ) )
	    		)
	  			) AS distance
				FROM restaurant
				HAVING distance < ".(float)$dist."
				ORDER BY distance;";


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
						"scoreTotal" => (float)$row->score_total,
						"location" => array(
							"lat" => (float)$row->map_lat,
							"lng" => (float)$row->map_lon
						),
						"distance" => getDistance((float)$row->distance)
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
			$sqlQuery = "select * from restaurant ";

		    if (isset($data['keyword'])) {
		        if ($data['keyword'] != null) {
		            $sqlAppend[0] = "(name_res like '%$data[keyword]%' or type_res like '%$data[keyword]%' or content like '%$data[keyword]%')";
		        }
		    }
		    if (isset($data['areaRes'])) {
		        if ($data['areaRes'] != null) {
		            $sqlAppend[1] = "area_res = '$data[areaRes]'";
		        }
		    }
			if (isset($data['type'])) {
		        if ($data['type'] != null) {
		            $sqlAppend[1] = "type_res = '$data[type]'";
		        }
		    }
		    if (isset($data['minPrice']) && isset($data['maxPrice'])) {
		        if ($data['minPrice'] != null && $data['maxPrice'] != null) {
		            $sqlAppend[2] = "min_price >= '$data[minPrice]' and max_price <= '$data[maxPrice]'";
		        }
		    }
		    if (isset($data['scoreTotal'])) {
		        if ($data['scoreTotal'] != null) {
		            $sqlAppend[3] = "score_total >= '$data[scoreTotal]'";
		        }
		    }
		    if (isset($data['service1'])) {
		        if ($data['service1'] != null) {
		            $sqlAppend[4] = "service_1 = '$data[service1]'";
		        }
		    }
		    if (isset($data['service2'])) {
		        if ($data['service2'] != null) {
		            $sqlAppend[5] = "service_2 = '$data[service2]'";
		        }
		    }
		    if (isset($data['service3'])) {
		        if ($data['service3'] != null) {
		            $sqlAppend[6] = "service_3 = '$data[service3]'";
		        }
		    }
		    if (isset($data['service4'])) {
		        if ($data['service4'] != null) {
		            $sqlAppend[7] = "service_4 = '$data[service4]'";
		        }
		    }
		    if (isset($data['service5'])) {
		        if ($data['service5'] != null) {
		            $sqlAppend[8] = "service_5 = '$data[service5]'";
		        }
		    }

		    if (isset($sqlAppend)) {
		        $sqlAppendAll = implode(" and ", $sqlAppend);
		        $sql          = $sqlQuery . " where " . $sqlAppendAll;
		    } else {
		        $sql = $sqlQuery;
		    }

		    if ($result = $conn->query($sql)) {
		        $header = array(
		            "status" => "success"
		        );
		        $body   = array();
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
		                "scoreTotal" => (float)$row->score_total
		            ));
		        }
		        $restaurants = array_merge($header, array(
		            "body" => $body
		        ));
		        echo json_encode($restaurants, JSON_UNESCAPED_UNICODE);

		    } else {
		        echo json_encode(array(
		            "status" => "error"
		        ));
		    }
		}

	}

	function getDistance($dist) {
		$newDist = 0;
		if ($dist <= 0) {
			$newDist = 0;
		} else if ($dist > 0 && $dist < 0.1) {
			$newDist = 0.1;
		} else {
			$newDist = number_format($dist, 1, '.', '');
		}
		return (float)$newDist;
	}
?>
