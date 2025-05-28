<?php
header("Content-Type: application/json");
include '../conn.php';
include 'create_user.php';
include 'get_user.php';
include 'update_user.php';
include 'delete_user.php';

function handleRequest() {
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        createUser($data);
    } elseif ($method === 'GET' && isset($_GET['id'])) {
        getUserById($_GET['id']);
    } elseif ($method === 'PUT' && isset($_GET['id'])) {
        $data = json_decode(file_get_contents('php://input'), true);
        updateUser($_GET['id'], $data);
    } elseif ($method === 'DELETE' && isset($_GET['id'])) {
        deleteUser($_GET['id']);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed or missing ID', 'data' => null]);
    }
}

handleRequest();
