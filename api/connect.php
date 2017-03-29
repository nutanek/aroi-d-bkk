<?php
    require_once ("config.php");
    $conn = new mysqli($hostname, $username, $password , $dbname);
    $conn->set_charset("utf8");
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>
