<?php
function deleteUser($id) {
    global $conn;

    $id = intval($id);
    $query = "DELETE FROM users WHERE id = $id";

    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => true, 'message' => 'User deleted successfully', 'data' => null]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . mysqli_error($conn), 'data' => null]);
    }
}
