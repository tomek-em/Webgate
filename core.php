<?php

class Core {
    public function __construct() {
        if (isset($_GET['url'])) {
            // default module name
            $moduleName = 'Home';
            
            // make array from URL
            $url = $this->getUrl();
            
            if(file_exists('modules/' . ucfirst($url[0]). '.php')) {
                $moduleName = ucfirst($url[0]);
            } 
            $this->process($moduleName, $url[1]);
            //$this->render($_GET['url']);
        }
    }
    
    // Proces function -----------------------
    public function process($mod, $method){
        // create new instance of module class
        $this->currentModule = new $mod;
        unset($url[0]);
        // call module class method if exists
        if(method_exists($this->currentModule, $method)) {
            $this->currentMethod = $method;
            $data = [];
            $data[0] = $par;
            call_user_func_array([$this->currentModule, $this->currentMethod], $data);
            unset($url[1]);
        } else {
            //$this->currentModule
        }
          
    } // End of process 
    
    
    // Render fucntion ------------------------
    public function render($url='index', $data){
        require_once('web/' .$url. '.php' );
    } // End of Render 
    

    
    public function getUrl() {
        $url = rtrim($_GET['url'], '/');
        $url = filter_var( $url, FILTER_SANITIZE_URL);
        $url = explode('/', $url);
        //die(print_r($b));
        return $url;
    }
    
}


// process
// render


//class Controller {
//    // load model
//    // ... like Post class to handle db (see Pages.php extend class)
//    public function model( $model ) {
//        require_once '../app/models/' . $model . '.php';
//        
//        // instance model
//        return new $model();
//    }
//    
//    // load view
//    // .. like /views/pages/index.php (see Pages.php extend class)
//    public function view( $view, $data = [] ) {
//        
//        if( file_exists('../app/views/' . $view. '.php') ) {
//            require_once '../app/views/' . $view . '.php';
//        } else {
//            die('View does not exist'); // if view does not exist it will stop the app
//        }
//    }
//    
//}

?>
