<?php
$conn = new mysqli('localhost', 'root', '', 'crud_db');

$id = $_POST['id'];
$sql = "DELETE FROM users WHERE id = $id";
$response = [];

if ($conn->query($sql) === TRUE) {
    $response['message'] = "User deleted successfully!";
} else {
    $response['message'] = "Error: " . $sql . "<br>" . $conn->error;
}

echo json_encode($response);

$conn->close();
?>
