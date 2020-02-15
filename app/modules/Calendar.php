<?php

class Calendar extends Core {
    
    private $db;
    
    public function __construct() {
        $this->db = new Database;
    }

    
    public function events() {
        
        // CHANGE GET to Post !!!!!!!!!!!!!!!!!!1
        if(($_SERVER['REQUEST_METHOD'] == 'GET') && (isset($_SESSION['user_id'])))  {
             
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $data = [];
            
            // show events --
            $type = 'week';
            $date = '13-02-2020';
            
            $data['events'] = $this->getEvents($type, $date);
        } 
        
        $this->render('calendar/events', $data);
    }
    
    
    // WEEK CALENDAR --------------------------------------
    
    public function week() {
        //die('done');
        // CHANGE GET to Post !!!!!!!!!!!!!!!!!!1
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
             
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $data = [];
            
            // show events --
            $type = 'week';
            $date = '13-02-2020';
            
            $data['events'] = $this->getEvents($type, $date);
        } 
        
        $this->render('calendar/week', $data);
    }
    
    
    
    // get all events
    public function getEvents($type, $date) {
        $this->db->query('SELECT * FROM events WHERE user_id = :user_id ORDER BY date DESC');
            $this->db->bind(':user_id', $_SESSION['user_id']);
            
            $results = $this->db->resultSet();
            return $results;
    }
    
    
    public function getEventsByDate($data) {
        //$start = '2020-02-02 00:00:00';
        $this->db->query('SELECT * FROM events 
        WHERE user_id = :user_id
        AND date >= :start
        AND date <= :end
        ORDER BY date DESC');
            $this->db->bind(':user_id', $_SESSION['user_id']);
            $this->db->bind(':start', $data['start']);
            $this->db->bind(':end', $data['end']);
            
            $results = $this->db->resultSet();
            return $results;
    }
    
    
    
    public function addEvent($data) {
            $time = $data['date']. ' ';
            $timestamp = strtotime($old_date);
            $d = date("Y-m-d H:i:s");  
            
            $this->db->query('INSERT INTO events (title, user_id, body, type, date) VALUES(:title, :user_id, :body, :type, :date)');
            $this->db->bind(':title', $data['title']);
            $this->db->bind(':user_id', $_SESSION['user_id']);
            $this->db->bind(':body', $data['body']);
            $this->db->bind(':date', $data['date']);
            $this->db->bind(':type', 0);
            
            //die('php: '. $d. ' js: '.$data['date']);
            // execute
            if($this->db->execute()) {
                return true;
            } else {
                return false;
            }
        }
    
    
    
    // fetch week events 
    
    public function fetchWeekEvents() {
        // CHANGE GET to Post !!!!!!!!!!!!!!!!!!1
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
             
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            
            $start = date("Y-m-d", strtotime($_POST["mon"]));
            $end = date("Y-m-d", strtotime($_POST["sun"]));
                
            $data = [];
            $data = [
                'start' => $start,
                'end' => $end
            ];
            //die($new_start);
            $events = $this->getEventsByDate($data);
            echo json_encode($events);
        }
    } //end fetchWeekEvents()
    
    
    
    public function add() {
        if(($_SERVER['REQUEST_METHOD'] == 'POST') && (isset($_SESSION['user_id'])))  {
             
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            
            $date = date("Y-m-d", strtotime($_POST["date"]));
            $data = [
                'title' => trim($_POST['title']),  
                'body' => trim($_POST['body']),  
                'date' => $date
                ];
            
            if($this->addEvent($data)) {
                $resp = 'Event added';
                
            } else {
                $resp = 'Error. Event nopt added';
            }   
            echo $resp;
        }
    }
    
}

?>