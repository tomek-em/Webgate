<?php
/*
 * PDO Database Class
 * Connecot to db
 * Create prepared statements
 * Bind values
 * Return rows and results
 */

class Database {
    private $host = DB_HOST;
    private $user = DB_USER;
    private $pass = DB_PASS;
    private $dbname = DB_NAME;
    
    private $dbh;
    private $stmt;
    public $error;
    
    public function __construct() {
        // set DSN
        $dsn = 'mysql:host=' .$this->host .';dbname=' .$this->dbname;
        $options = array(
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        );  // increase performance by checking if there is connection established with db
        
        //create PDO instance in a try catch block
        try {
            $this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
            
        } catch(PDOException $e) {
            $this->error = $e->getMessage();
            echo $this->error;
        }
        
    }
    
    // prepare statement with query
    public function query($sql) {
        $this->stmt = $this->dbh->prepare($sql);
    }
    
    // bind values
    public function bind($param, $value, $type = null) {
        if(is_null($type)) {
            switch(true){
                // could be just "if" statement as well    
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
        }
        
        $this->stmt->bindValue($param, $value, $type);
    }
    
    // execute the prepered statement
    public function execute() {
        return $this->stmt->execute();
    }
    
    
    // get result set as array of objects
    public function resultSet() {
        $this->execute();
        return $this->stmt->fetchAll(PDO::FETCH_OBJ);
        // R: PDO::FETCH  because we want it as an array of obj instead of simple array of array
    }
    
    // get single record as obj
    public function single() {
        $this->execute();
        return $this->stmt->fetch(PDO::FETCH_OBJ);
    } 
    
    // get row count
    public function rowCount(){
        return $this->stmt->rowCount();
    }
}

?>