<?php
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once("../models/users.model.php");

    $users = new Users();

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $result = $users->updateUser($_FILES, $_POST["user"]);
    
            if ($result) {
                http_response_code(200);
            }  else {
                http_response_code(400);
            }
            echo json_encode($result);
            break;

        case 'GET':
            $id = $_GET["id"];
            $image = $_GET["image"];

            if ($id && $image == "true") {
                $result = $users->getUserAvatar($id);

                if ($result) {
                    http_response_code(200);
                }  else {
                    http_response_code(400);
                }
            } else if ($id && $image == "false") {
                $result = $users->getUserbyId($id);

                if ($result) {
                    http_response_code(200);
                }  else {
                    http_response_code(400);
                }
            } else {
                http_response_code(404);
            }

            echo json_encode($result);
            break;
    }
?>