<?php
/* 
* calendar module: add and fetch events from database
*/

class Calendar extends Core {
    private $db;
    
    public function __construct() {
        $this->events = new Cal;
        
    }
    
    // get multiple events from database
    public function getEvents() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {             
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $start = date("Y-m-d", strtotime($_POST["first"]));
            $end = date("Y-m-d", strtotime($_POST["last"]));
            
            $events = $this->events->getEventsByDate($start, $end);
            echo json_encode($events);
        }
    }
    
    // get single event by id
    public function getSingleEvent() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {             
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $id = trim($_POST['id']);
            
            $event = $this->events->getEventById($id);
            echo json_encode($event);
        }
    }
    
    // add event
    public function addEvent() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $data['date'] = date("Y-m-d", strtotime($_POST["date"]));
            $data['title'] = trim($_POST['title']);  
            $data['body'] = trim($_POST['body']);  
            $data['type'] = trim($_POST['type']);  
            $event_id = $this->events->addSingleEvent($data);
            if ($event_id) {
                echo $event_id;
            } 
        } 
    }
    
    // update event
    public function updateEvent() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $data['date'] = date("Y-m-d", strtotime($_POST["date"]));
            $data['title'] = trim($_POST['title']);  
            $data['body'] = trim($_POST['body']);   
            $data['type'] = trim($_POST['type']);   
            $data['id'] = trim($_POST['id']); 
            
            $resp = $this->events->updateSingleEvent($data);
            echo $res;
        } 
    }
    
    // delete event
        public function deleteEvent() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $event_id = trim($_POST['id']);
            
            $response = $this->events->deleteSingleEvent($event_id);
            if($response) {
                $response = 'deleted';
            } else {
                $response = 'not';
            }
            echo $response;
        }
    }
    
    
    // get all events
    public function getAllEvents($type, $date) {
        $this->db->query('SELECT * FROM events WHERE user_id = :user_id ORDER BY date DESC');
            $this->db->bind(':user_id', $_SESSION['user_id']);
            
            $results = $this->db->resultSet();
            return $results;
    }
    


    
    // SHOW WEEK CALENDAR METHODES--------------------------------------
    public function month() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            // if there is date set from month calendar do sth...
        } 
        $this->render('calendar/month', $data);
    }
    
    public function week($data) {
        if($_SERVER['REQUEST_METHOD'] == 'POST')  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $data['date'] = trim($_POST['date']); 
        } else {
            $data['date'] = 0;
        }
        $this->render('calendar/week', $data);
    }
    
    public function slots() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            // if there is date set from month calendar do sth...
        } 
        $this->usr = new Usr;
        $data = $this->usr->getAllUsers();
        $this->render('calendar/slots', $data);
    }
    
    
    // show user event list
    public function events() {        
        $this->render('calendar/events', $data);
    }
    
    
    public function test() {
        $i = 0;
        for ($k = '6.0'; $k <= '11.25'; $k += 0.25) {
            $start[$i] = sprintf('%05.2f', $k);
            $i++;
        }
        echo print_r($start);
        
    }
    
    
    // SLOTS
    
    //  get slots
    public function getSlots() {
        if($_SERVER['REQUEST_METHOD'] == 'POST')  {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $start = date("Y-m-d", strtotime($_POST["mon"]));
            $end = date("Y-m-d", strtotime($_POST["sun"]));
            $usr = trim($_POST['usr']);
            
            // get user id
            $this->usr = new Usr;
            $user_id = $this->usr->getUserByName($usr);
            
            $slots = $this->events->getSlotsByDate($start, $end, $user_id);
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
                    $res = $this->events->addUserSlots($data);
                    
                }
            } else {
                for ($k = $start; $k <= $data['stop']; $k += 0.25) {
                    $data['start'] = sprintf('%05.2f', $k);
                    $res = $this->events->addUserSlots($data);
                }
                
            }
            echo $res;
        } 
    }
    
    public function deleteSlots() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
            // delete slots for one day
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $date = date("Y-m-d", strtotime($_POST['date']));
            
            $response = $this->events->deleteSlotsByDate($date);
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
            
            $resp = $this->events->bookSingleSlot($data);
            echo $res;
        } 
    }

    
}

?>