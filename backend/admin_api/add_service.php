<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
include '../conn.php';
function addService($data) {
    global $conn;
    if(!$conn) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed', 'data' => null]);
        exit;
    }
    if (!isset($data['service_name'])) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields', 'data' => null]);
        exit;
    }
    $name = mysqli_real_escape_string($conn, $data['service_name']);


    $query = "INSERT INTO service_categories (name, created_at, updated_at) 
              VALUES ('$name', NOW(), NOW())";

    if (mysqli_query($conn, $query)) {
        $inserted_id = mysqli_insert_id($conn);
        $data['id'] = $inserted_id;
        echo json_encode(['success' => true, 'message' => 'Service created successfully', 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . mysqli_error($conn), 'data' => null]);
    }
}

function handleRequest() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        addService($data);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed', 'data' => null]);
    }
}
handleRequest();

?>
