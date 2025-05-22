<?php
function updateUser($id, $data) {
    global $conn;

    $id = intval($id);
    $name = mysqli_real_escape_string($conn, $data['name']);
    $email = mysqli_real_escape_string($conn, $data['email']);
    $phone = mysqli_real_escape_string($conn, $data['phone']);
    $city = mysqli_real_escape_string($conn, $data['city']);
    $address = mysqli_real_escape_string($conn, $data['address']);

    $query = "UPDATE users 
              SET name = '$name', email = '$email', phone = '$phone', city = '$city', address = '$address', updated_at = NOW()
              WHERE id = $id";

    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => true, 'message' => 'User updated successfully', 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . mysqli_error($conn), 'data' => null]);
    }
}
