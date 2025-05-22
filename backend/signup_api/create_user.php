<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
include '../conn.php';
function createUser($data) {
    global $conn;
    if(!$conn) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed', 'data' => null]);
        exit;
    }
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields', 'data' => null]);
        exit;
    }
    $name = mysqli_real_escape_string($conn, $data['name']);
    $email = mysqli_real_escape_string($conn, $data['email']);
    $password = password_hash($data['password'], PASSWORD_BCRYPT);
    $phone = mysqli_real_escape_string($conn, $data['phone']);
    $city = mysqli_real_escape_string($conn, $data['city']);
    $address = mysqli_real_escape_string($conn, $data['address']);

    $check = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email'");
    if (!$check) {
        echo json_encode(['success' => false, 'message' => 'Error checking user', 'data' => null]);
        exit;
    }
    if (mysqli_num_rows($check) > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered', 'data' => null]);
        exit;
    }

    $query = "INSERT INTO users (name, email, password, phone, city, address, created_at, updated_at) 
              VALUES ('$name', '$email', '$password', '$phone', '$city', '$address', NOW(), NOW())";

    if (mysqli_query($conn, $query)) {
        $inserted_id = mysqli_insert_id($conn);
        $data['id'] = $inserted_id;
        echo json_encode(['success' => true, 'message' => 'User created successfully', 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . mysqli_error($conn), 'data' => null]);
    }
}
