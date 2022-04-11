<?php

require_once('../connect.php');

class Users {
    private $conn;
    private $table = "users";

    private $id;
    private $firstName;
    private $lastName;
    private $email;
    private $phone;
    private $birthday;
    private $about;
    private $image;

    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }

    public function getUserById($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM " . $this->table . " WHERE id = '" . $id . "'";
            $userInfo = $this->conn->query($sql)->fetch_assoc();

            //If image was sent then we send that data as well (since it's optional)
            if (isset($userInfo["image"])) {
                $userInfo["image"] = base64_encode($userInfo["image"]);
            }

            return $userInfo;
        }

        return false;
    }

    public function updateUser($user, $image) {
        if (isset($user->id)) {
            $sql = "UPDATE " . $this->table . " SET firstName = '" . $user->firstName . "', lastName = '" . $user->lastName . "', email = '" . $user->email . "', phone = '" . $user->phone . "', birthday = '" . $user->birthday . "', about = '" . $user->about . "' WHERE id = '" . $user->id . "'";
            $result = $this->conn->query($sql);

            // If image was sent as well, then we add the image data as well into the databse
            if (isset($image["tmp_name"])) {
                $imageData = addslashes(file_get_contents($image["tmp_name"]));
                $sql = "UPDATE " . $this->table . " SET image = '" . $imageData . "' WHERE id = '" . $user->id . "'";
                $this->conn->query($sql);
            }

            // If the data update was successful then we send back the new data to FE
            if ($result) {
                return $this->getUserById($user->id);
            }

            return false;
        }

        return false;
    }
}