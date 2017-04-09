<?php
	header('Content-Type: application/json');
	require_once("connect.php");

	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	    /*ตรวจสอบว่าเป็น POST*/
	    $json = file_get_contents('php://input');
	    $obj  = json_decode($json);
	    $data = (array) $obj;


	    $sql = "select id_res, name_res, area_res, img from restaurant order by name_res";

	    if ($result = $conn->query($sql)) {
	        $header = array(
	            "status" => "success"
	        );
	        $body   = array();
	        while ($row = $result->fetch_object()) {
	            array_push($body, array(
	                "id" => $row->id_res,
	                "name" => $row->name_res,
	                "area" => $row->area_res,
	                "img" => $row->img
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
?>
