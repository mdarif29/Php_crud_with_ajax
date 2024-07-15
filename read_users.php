<?php
$conn = new mysqli('localhost', 'root', '', 'crud_db');

$sql = "SELECT * FROM users";
$result = $conn->query($sql);

$output = '';
while ($row = $result->fetch_assoc()) {
    $output .= '<tr>';
    $output .= '<td>' . $row['id'] . '</td>';
    $output .= '<td>' . $row['name'] . '</td>';
    $output .= '<td>' . $row['email'] . '</td>';
    $output .= '<td>' . $row['age'] . '</td>';
    $output .= '<td>';
    $output .= '<button class="btn btn-sm btn-warning editUser" data-id="' . $row['id'] . '">Edit</button>';
    $output .= '<button class="btn btn-sm btn-danger deleteUser" data-id="' . $row['id'] . '">Delete</button>';
    $output .= '</td>';
    $output .= '</tr>';
}

echo $output;

$conn->close();
?>
