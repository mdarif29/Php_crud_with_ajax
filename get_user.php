<?php
$conn = new mysqli('localhost', 'root', '', 'crud_db');

$id = $_GET['id'];
$sql = "SELECT * FROM users WHERE id = $id";
$result = $conn->query($sql);

$user = $result->fetch_assoc();
echo json_encode($user);

$conn->close();
?>
