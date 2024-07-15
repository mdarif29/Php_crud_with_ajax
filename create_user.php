<?php
$conn = new mysqli('localhost', 'root', '', 'crud_db');

$name = $_POST['name'];
$email = $_POST['email'];
$age = $_POST['age'];

$sql = "INSERT INTO users (name, email, age) VALUES ('$name', '$email', $age)";
$response = [];

if ($conn->query($sql) === TRUE) {
    $response['message'] = "User created successfully!";
    $response['id'] = $conn->insert_id; // Get the ID of the newly created user
} else {
    $response['message'] = "Error: " . $sql . "<br>" . $conn->error;
}

echo json_encode($response);

$conn->close();
?>
