<?php

class Bookmarks extends Core {
    private $db;

    public function __construct() {
        $this->bookmark = new BookmarkModel;

    }

    // add bookmark
    public function addBookmark() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $data['title'] = $_POST['title'];
            $data['web'] = $_POST['web'];
            $data['bm_group'] = $_POST['group'];

            $bookmark_id = $this->bookmark->addSingleBookmark($data);
            if($bookmark_id) {
              echo $bookmark_id;
            }
        }
    }

    public function getBookmarks() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

            $bookmarks = $this->bookmark->getBookmarksByUser( $_SESSION['user_id'] );
            echo json_encode($bookmarks);
        }
    }


    // delete bookmark (delete methode, bookmark id in url param)
    public function deleteBookmark($url_param) {
        if(($_SERVER['REQUEST_METHOD'] == 'DELETE') && (isset($_SESSION['user_id'])))  {
            $bookmark_id = $url_param;

            $response = $this->bookmark->deleteSingleBookmark($bookmark_id);
            if($response) {
                $response = 'deleted';
            } else {
                $response = NULL;
            }
            echo $response;
        }
    }

}

?>
