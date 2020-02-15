<?php

class User extends Core {
    
    private $db;
    
    public function __construct() {
        $this->db = new Database;
    }
    
    public function test() {
        //
        $arr = [];
        $this->render('user/test', $arr);
    }
    
    
    // REGISTER
    
    public function register() {
        
        if(isset($_SESSION['user_id'])) {
            header('location: '.URL_ROOT);
        }
        // check for posts
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $valid = 'true';
            //die('submited');
            // process form - sanitize POST data
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            
            $data = [
                'name' => trim($_POST['name']),  
                'email' => trim($_POST['email']), 
                'password' => trim($_POST['password']), 
                'confirm_password' => trim($_POST['confirm_password']),  
                'name_error' => '',  
                'email_error' => '',  
                'password_error' => '',         
                'confirm_password_error' => '',         
                'recaptcha_errr' => '',         
            ];
                                           
            // validate name
            if(empty($data['name'])) {
                $data['name_err'] = 'Please enter user name';
                $valid = false;
            } else {
                // check email
                if($this->findUserByName($data['name'])) {
                    $data['name_err'] = 'This name is already taken.';
                    $valid = false;
                }
            } 

            // validate email
            if(empty($data['email'])) {
                $data['email_err'] = 'Please enter email';
                $valid = false;
            }

            // validate password
            if(empty($data['password'])) {
                $data['password_err'] = 'Please enter the password';
                $valid = false;
            } elseif (strlen($data['password']) < 5) {
                $data['password_err'] = 'Password must be at least 5 characters';
                $valid = false;
            } 

            // validate confirm password
            if(empty($data['confirm_password'])) {
                $data['confirm_password_err'] = 'Please confirm password';
                $valid = false;
            } else {
                if($data['password'] != $data['confirm_password']) {
                    $valid = false;
                    $data['confirm_password_err'] = 'Password do not match';
                }
            }
            
            //reCaptcha
            $cap_key = "6LfMAZsUAAAAAIB9LCi_Tu8L_YwaGrDwapf5VEKg";
            $recaptchaTest = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$cap_key.'&response='.$_POST['g-recaptcha-response']);
            
            $recaptchaResponse = json_decode($recaptchaTest);
            
            if($recaptchaResponse->success == false) {
                $valid = false;
                $data['recaptcha_err'] = "Confirm you are not a bot";
            }
            
            
            // make sure errors are empty ----
            if($valid == true) {
               // validated
                
               // Hash password
                $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
                
                // Register user
                if($this->registerUser($data)) {
                    flash('register_success', 'You are registered. Please log in');
                    header("Location: " .URL_ROOT. 'user/login');
                } else {
                    die('somethig went wrong');
                }
                
            } else {
                // load view with errors
                $this->render('user/register', $data);
            }
            
        
            
        } else {
            // load form
            $data = [
                'name' => '',  
                'email' => '',  
                'password' => '',  
                'confirm_password' => '',  
                'name_error' => '',  
                'email_error' => '',  
                'password_error' => '',         
                'confirm_password_error' => ''         
            ];
            
            // load the view
            $this->render('user/register', $data);
        }
    }
    
    
    
    // LOGIN --------------------------------------
    
    public function login() {
        if(isset($_SESSION['user_id'])) {
            header('location: '.URL_ROOT);
        }
        
        // check for posts
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            
            // process form - sanitize POST data
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            
            $data = [  
                'name' => trim($_POST['name']), 
                'password' => trim($_POST['password']), 
                'name_error' => '',  
                'password_error' => ''              
            ];
            
            
             // validate email
            if(empty($data['name'])) {
                $data['name_err'] = 'Please enter the email';
            }  
            // validate password
            if(empty($data['password'])) {
                $data['password_err'] = 'Please enter the password';
            } 
            //die($data['name']);
            // check for user / email
            if($this->findUserByName($data['name'])) {
                // user found
                    
                } else {
                    $data['name_err'] = 'no user found';
                    //die($data['name_err']);
                }
            
            // make sure errors are empty
            if(empty($data['name_err'])  && empty($data['password_err']) ) {
                
                // check pass
                $loggedInUser = $this->logInUser($data['name'], $data['password']);
                
                if($loggedInUser) {
                    //create session
                    $this->createUserSesssion($loggedInUser);
                } 
                // wrong pass
                else {
                    $data['password_err'] = 'incorect password'; 
                    $this->render('user/login', $data);
                } 
                
            } else {
                // errors not empty - load view with errors
                $this->render('user/login', $data);
            }

        } else {
            // load form
            $data = [
                'name' => '',  
                'password' => '',  
                'name_error' => '',              
                'password_error' => ''              
            ];
            
            // load the view
            $this->render('user/login', $data);
        }
    } // End of login 
    
    
    
    
    // register user function ---------------
        public function registerUser($data) {
            $this->db->query('INSERT INTO users (name, email, password) VALUES(:name, :email, :password)');
            $this->db->bind(':name', $data['name']);
            $this->db->bind(':email', $data['email']);
            $this->db->bind(':password', $data['password']);
            
            // execute
            if($this->db->execute()) {
                return true;
            } else {
                return false;
            }
        }
        
        // find user by name
        public function findUserByName($name) {
            //die('no user');
            $this->db->query("SELECT * FROM users WHERE name = :name");
            $this->db->bind(':name', $name);
            
            $row = $this->db->single();
            
            // check row
            if($this->db->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        }
        
        // login user
        public function logInUser($name, $password) {
            $this->db->query("SELECT * FROM users WHERE name = :name");
            $this->db->bind(':name', $name);
            
            $row = $this->db->single();
            
            $hashed_password = $row->password;
            if(password_verify($password, $hashed_password)) {;
                return $row;
            } else {
                return false;
            }
        }
    
    
    
    public function createUserSesssion($user) {
        $_SESSION['user_id'] = $user->id;
        $_SESSION['user_email'] = $user->email;
        $_SESSION['user_name'] = $user->name;
        header('location: '.URL_ROOT);
        
    }
    
    public function logout() {
        unset($_SESSION['user_id']);
        unset($_SESSION['user_email']);
        unset($_SESSION['user_name']);
        session_destroy();
        header('location: '.URL_ROOT.'user/login');
    }
    
}

?>