<?php
	header('Content-Type: application/json');
	require_once ("connect.php");

	if ($_SERVER['REQUEST_METHOD'] === 'POST') { /*ตรวจสอบว่าเป็น POST*/
		$json = file_get_contents('php://input');
		$obj = json_decode($json);
		$data = (array) $obj;


		if (!isset($data['idRes']) || !isset($data['scoreAtm']) || !isset($data['scoreTaste']) || !isset($data['scoreService'])) {
			echo json_encode(array(
				"status" => "error"
			));
			exit();
		}

		$sqlQuery = "select id_res, score_atm, score_taste, score_service, num_vote
		             from   restaurant
		             where  id_res = '$data[idRes]'";

		if ($result = $conn->query($sqlQuery)) {
			while ($row = $result->fetch_object()) {
				$newScoreAtm = $row->score_atm + $data['scoreAtm'];
				$newScoreTaste = $row->score_taste + $data['scoreTaste'];
				$newScoreService = $row->score_service + $data['scoreService'];
				$newNumVote = $row->num_vote + 1;
				$newScoreTotal = ($newScoreAtm + $newScoreTaste + $newScoreService) / ($newNumVote * 3);
				$newScoreTotal = number_format((float)$newScoreTotal, 1, '.', '');

				$sqlUpdate = "update restaurant
				              set score_atm = $newScoreAtm,
				                  score_taste = $newScoreTaste,
				                  score_service = $newScoreService,
				                  score_total = $newScoreTotal,
				                  num_vote = $newNumVote
				              where id_res = '$data[idRes]'";

				if ($conn->query($sqlUpdate) === TRUE) {
    				echo json_encode(array(
						"status" => "success"
					));
				} else {
    				echo json_encode(array(
						"status" => "error2"
					));
				}

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
