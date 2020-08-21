<?php

class User extends Core {
    public function __construct(){
        $this->userModel = new UserModel;
    }

    // REGISTER NEW USER
    public function register() {
        if(isset($_SESSION['user_id'])) {
            header('location: '.URL_ROOT);
        }
        // check for posts
        if($_SERVER['REQUEST_METHOD'] == 'POST') {

            // set validation flag
            $valid = 'true';
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
                if($this->userModel->findUserByName($data['name'])) {
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
                if($this->userModel->registerUser($data)) {
                    flash('register_success', 'You are registered. Please log in');
                    header("Location: " .URL_ROOT. 'user/login');
                } else {
                    die('somethig went wrong');
                }

            } else {
                // load view with errors
                $this->render('user/register', $data);  // this class extends Core (has render method)
            }


        // IF REQUEST_METHOD != 'POST'
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
            // check for user / email
            if($this->userModel ->findUserByName($data['name'])) {
                // user found

                } else {
                    $data['name_err'] = 'no user found';
                    //die($data['name_err']);
                }

            // make sure errors are empty
            if(empty($data['name_err'])  && empty($data['password_err']) ) {

                // check pass
                $loggedInUser = $this->userModel->logInUser($data['name'], $data['password']);

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
