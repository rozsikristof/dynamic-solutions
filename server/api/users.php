<?php
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once("../models/users.model.php");

    $users = new Users();

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $image;
            $user = json_decode($_POST["user"]);

            if (isset($_FILES["image"])) {
                $image = $_FILES["image"];
            } else {
                $image = null;
            }

            $result = $users->updateUser($user, $image);
    
            if ($result) {
                http_response_code(200);
            }  else {
                http_response_code(400);
            }
            echo json_encode($result);
            break;

        case 'GET':
            $id = $_GET["id"];

            if ($id) {
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