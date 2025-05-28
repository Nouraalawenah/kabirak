<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
include '../conn.php';
function createAdmin($data) {
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


    $check = mysqli_query($conn, "SELECT * FROM admins WHERE email = '$email'");
    if (!$check) {
        echo json_encode(['success' => false, 'message' => 'Error checking user', 'data' => null]);
        exit;
    }
    if (mysqli_num_rows($check) > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered', 'data' => null]);
        exit;
    }

    $query = "INSERT INTO admins (name, email, password, created_at, updated_at) 
              VALUES ('$name', '$email', '$password',  NOW(), NOW())";

    if (mysqli_query($conn, $query)) {
        $inserted_id = mysqli_insert_id($conn);
        $data['id'] = $inserted_id;
        echo json_encode(['success' => true, 'message' => 'User created successfully', 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . mysqli_error($conn), 'data' => null]);
    }
}

function handleRequest() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        createAdmin($data);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed', 'data' => null]);
    }
}
handleRequest();

?>
