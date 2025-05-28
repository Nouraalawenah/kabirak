<?php
header('Content-Type: application/json');
require_once './conn.php';
function getTechnicianById($id) {
    global $conn;

    $id = intval($id);
    $query = "SELECT  name, email, phone, service_category_id, city, profile_image, bio FROM technicians WHERE id = $id";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        echo json_encode(['success' => true, 'message' => 'User found', 'data' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found', 'data' => null]);
    }
}


function handelRequest() {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            getTechnicianById($id);
        } else {
            echo json_encode(['success' => false, 'message' => 'ID parameter is missing']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    }
}

handelRequest();