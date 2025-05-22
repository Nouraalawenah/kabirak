<?php
function getUserById($id) {
    global $conn;

    $id = intval($id);
    $query = "SELECT id, name, email, phone, city, address, created_at, updated_at FROM users WHERE id = $id";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        echo json_encode(['success' => true, 'message' => 'User found', 'data' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found', 'data' => null]);
    }
}
