<?php
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, PUT");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once("../models/users.model.php");

    $users = new Users();
    $data = json_decode(file_get_contents("php://input"));

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'PUT':
            $result = $users->updateUser($data);

            if ($result) {
                http_response_code(200);
                echo json_encode($data);
            }  else {
                http_response_code(400);
            }

        case 'GET':
            $id = $_GET["id"];

            if ($id) {
                $result = $users->getUserbyId($id);

                if ($result) {
                    http_response_code(200);
                    echo json_encode($data);
                }  else {
                    http_response_code(400);
                }
            }
    }
?>