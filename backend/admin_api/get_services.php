<?php
header('Content-Type: application/json');
require_once '../conn.php';

function getServices() {
    global $conn;

    $query = "SELECT * FROM service_categories";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $services = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $services[] = $row;
        }
        echo json_encode(['success' => true, 'message' => 'Services found', 'data' => $services]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No services found', 'data' => []]);
    }
}

function handleRequest() {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        getServices();
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    }
}

handleRequest();