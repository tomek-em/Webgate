<?php
/*
* new Api endpoint
* test version
*/

class Test extends Core {
    private $db;

    public function __construct() {
        $this->usr = new UserModel;
        $this->bmr = new BookmarkModel;

        if($_SERVER['REQUEST_METHOD'] != 'POST' ) {
          echo 'Welcome to test module <br/> ';

        }
    }


    // get all user names
    public function getUsers() {

      if($_SERVER['REQUEST_METHOD'] == 'POST' ) {
        $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
        $data = $_POST;

        if(API_KEY == $data['key']) {
          $users = $this->usr->getAllUsers();
          echo json_encode($users);
        } else {
          $err = array('err' => 'wrong access key');
          echo json_encode($err);
        }
      }
    }



    // get all bookmarks of specific user
    public function getBookmarks($url_param) {

      if($_SERVER['REQUEST_METHOD'] == 'POST' ) {
        $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
        $data = $_POST;

        if(API_KEY == $data['key']) {
          $res = $this->bmr->getBookmarksByUser($data['user_id']);
          if($res != NULL) {
            echo json_encode($res);
          } else {
            $er = array('err' => 'cant find any bookmark for this user id');
            echo json_encode($er);
          }
        } else {
          $err = array('err' => 'wrong access key');
          echo json_encode($err);
        }
      } else {
        echo 'Param: '. $url_param; 
      }
    }


  }
