<?php
/*
* slots module: add and fetch slots from database
*/

class Slots extends Core {
    private $db;

    public function __construct() {
        $this->slots = new SlotModel;
    }


    //  get slots
    public function getSlots() {
        if($_SERVER['REQUEST_METHOD'] == 'POST')  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $start = date("Y-m-d", strtotime($_POST["mon"]));
            $end = date("Y-m-d", strtotime($_POST["sun"]));
            $usr = trim($_POST['usr']);

            // get user id
            $this->usr = new UserModel;
            $user_id = $this->usr->getUserByName($usr);

            $slots = $this->slots->getSlotsByDate($start, $end, $user_id);
            echo json_encode($slots);
        }
    }

    // set slots
    public function setSlots() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $start = trim($_POST['start']);
            $data['stop'] = trim($_POST['stop']);
            $data['date'] = date("Y-m-d", strtotime($_POST['date']));
            $week = trim($_POST['week']);
            if ($week == 'true') { // week checkbox no tactive now
                for ($i = 1; $i <= 5; $i++) {
                    $d = 'd'.$i;
                    $data['date'] = date("Y-m-d", strtotime($_POST[$d]));
                    $res = $this->slots->addUserSlots($data);

                }
            } else {
                for ($k = $start; $k <= $data['stop']; $k += 0.25) {
                    $data['start'] = sprintf('%05.2f', $k);
                    $res = $this->slots->addUserSlots($data);
                }

            }
            echo $res;
        }
    }

    // delete slots for one day
    public function deleteSlots($url_date) {
        if(($_SERVER['REQUEST_METHOD'] == 'DELETE') && (isset($_SESSION['user_id'])))  {

            $date = date("Y-m-d", strtotime($url_date));

            $response = $this->slots->deleteSlotsByDate($date);
            if($response) {
                $response = 'slots deleted';
            } else {
                $response = 'slots not deleted';
            }
            echo $response;
        }
    }


    public function bookSlot() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $data['id'] = trim($_POST['id']);

            $resp = $this->slots->bookSingleSlot($data);
            echo $res;
        }
    }

  }
