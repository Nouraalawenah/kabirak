<?php
header("Content-Type: application/json");
include 'conn.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['technician_id']) ||
    !isset($data['user_id']) ||
    !isset($data['rating']) ||
    !isset($data['feedback'])
) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$technician_id = intval($data['technician_id']);
$user_id = intval($data['user_id']);
$rating = intval($data['rating']);
$feedback = mysqli_real_escape_string($conn, $data['feedback']);

//Prevent duplicate ratings by the same user for the same technician
$checkQuery = "SELECT id FROM feedback WHERE technician_id = $technician_id AND user_id = $user_id";
$checkResult = mysqli_query($conn, $checkQuery);

if ($checkResult && mysqli_num_rows($checkResult) > 0) {
    echo json_encode(['success' => false, 'message' => 'You have already rated this technician.']);
    exit;
}

$query = "INSERT INTO feedback (technician_id, user_id, rating, comment, created_at)
          VALUES ($technician_id, $user_id, $rating, '$feedback', NOW())";

if (mysqli_query($conn, $query)) {
    echo json_encode(['success' => true, 'message' => 'Rating submitted successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . mysqli_error($conn)]);
}