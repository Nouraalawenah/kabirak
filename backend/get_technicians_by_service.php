<?php
header('Content-Type: application/json');
require_once 'conn.php';

function getTechniciansByService() {
    global $conn;

    // Check if service_id is provided in the GET request
    if (!isset($_GET['service_id'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Missing service_id parameter'
        ]);
        return;
    }

    $service_id = mysqli_real_escape_string($conn, $_GET['service_id']);

    $query = "SELECT 
    technicians.id,
    technicians.name,
    technicians.phone,
    technicians.city,
    technicians.bio,
    technicians.profile_image,
    service_categories.name AS service_name
    FROM technicians
    INNER JOIN service_categories 
    ON technicians.service_category_id = service_categories.id
    WHERE technicians.service_category_id = '$service_id'";


    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $services = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $services[] = $row;
        }
        echo json_encode([
            'success' => true,
            'message' => 'Technicians found',
            'data' => $services
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No technicians found for this service',
            'data' => []
        ]);
    }
}

function handleRequest() {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        getTechniciansByService();
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid request method'
        ]);
    }
}

handleRequest();
