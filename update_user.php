<?php
$conn = new mysqli('localhost', 'root', '', 'crud_db');

$id = $_POST['id'];
$name = $_POST['name'];
$email = $_POST['email'];
$age = $_POST['age'];

$sql = "UPDATE users SET name = '$name', email = '$email', age = $age WHERE id = $id";
$response = [];

if ($conn->query($sql) === TRUE) {
    $response['message'] = "User updated successfully!";
} else {
    $response['message'] = "Error: " . $sql . "<br>" . $conn->error;
}

echo json_encode($response);

$conn->close();
?>
