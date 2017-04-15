<?php
	header('Content-Type: application/json');
	require_once ("connect.php");

	if ($_SERVER['REQUEST_METHOD'] === 'GET') {

		if (!isset($_GET['lat']) ||
			!isset($_GET['lng']) ||
			!isset($_GET['num'])) {
			echo json_encode(array(
				"status" => "error"
			));
			exit();
		}
		$dist = $_GET['distance']*0.62137;
		$restaurants = array();


			$sql = "select
  			id_res,name_res,type_res,area_res,min_price,max_price,img,score_total,
			 (
    			3959 * acos (
      			cos ( radians(".$_GET['lat'].") )
      			* cos( radians( map_lat ) )
      			* cos( radians( map_lon ) - radians(".$_GET['lng'].") )
      			+ sin ( radians(".$_GET['lat'].") )
      			* sin( radians( map_lat ) )
    		)
  			) AS distance
			FROM restaurant
			HAVING distance < ".$dist."
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
					"scoreTotal" => $row->score_total
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
