<?php

class Bookmarks extends Core {
    private $db;
    
    public function __construct() {
        $this->bookmark = new BMark;
        
    }
    
    // add bookmark
    public function addBookmark() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $data['title'] = trim($_POST['title']);  
            $data['web'] = trim($_POST['web']);  
            $data['bm_group'] = trim($_POST['group']);  
            
            $bookmark_id = $this->bookmark->addSingleBookmark($data);
            echo bookmark_id;
        } 
    }
    
    public function getBookmarks() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {             
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            
            $bookmarks = $this->bookmark->getBookmarksByUser();
            echo json_encode($bookmarks);
        }
    }

    
    // delete bookmark
    public function deleteBookmark() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $bookmark_id = trim($_POST['id']);
            
            $response = $this->bookmark->deleteSingleBookmark($bookmark_id);
            if($response) {
                $response = 'deleted';
            } else {
                $response = 'bookamrk not deleted';
            }
            echo $response;
        }
    }
    
}

?>
