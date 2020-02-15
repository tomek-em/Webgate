<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo APP_NAME; ?> </title>
    
    <!-- Font awesome -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Poppins&display=swap" rel="stylesheet">
    
    <!-- Bootstrap core CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
    
    <link rel="stylesheet" href="<?php echo URL_ROOT ?>app/web/css/week.css">
    <link rel="stylesheet" href="<?php echo URL_ROOT ?>app/web/css/main.css">
    
</head>

<body>
    <div class="content">
        <header>
            <!-- Navbar -->
            <?php require(APP_ROOT.'inc/nav.php'); ?>
        </header>
        
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-10 mx-auto">
                    
                    <div class="row mt-4 mb-3">
                        <div class="col-lg-6">
                            <h2>Webgate calendar</h2>
                        </div>
                        <div class="col-lg-6">
                            <a href="<?php echo URLROOT .'posts/add' ?>" class="btn btn-primary float_right">
                                <i class="fa fa-pencil"></i> Add Event
                            </a>
                        </div>
                    </div>
                    
                    <!-- Show week events   -->
                    <div class="week_cal">
                        <div class="week_header text-center mb-2">
                            <div class="week_cal_nav">
                                <a href="#" id="prev"> << </a>
                                <a href="#" id="next"> >> </a>
                            </div>    
                            <p  class="lead">Week events</p>
                        </div>
                        <div class="week_body">
                            <div class="week_day" id="mon">
                                <div class="day_header"><span>Mon</span>
                                    <span class="wc_date"></span></div>
                                    <div class="day_body">
                                    </div>
                            </div>
                            <div class="week_day" id="tue">
                                <div class="day_header"><span>Thu</span>
                                <span class="wc_date"></span></div>
                                <div class="day_body">
                                </div>
                            </div>
                            <div class="week_day" id="wed">
                                <div class="day_header"><span>Wed</span>
                                <span class="wc_date"></span></div>
                                <div class="day_body">
                                </div>
                            </div>
                            <div class="week_day" id="thu">
                                <div class="day_header"><span>Thu</span>
                                <span class="wc_date"></span></div>
                                <div class="day_body">
                                </div>
                            </div>
                            <div class="week_day" id="fri">
                                <div class="day_header"><span>Fri</span>
                                <span class="wc_date"></span></div>
                                <div class="day_body">
                                </div>
                            </div>
                            <div class="week_day" id="sat">
                                <div class="day_header"><span>Sat</span>
                                <span class="wc_date"></span></div>
                                <div class="day_body">
                                </div>
                            </div>
                            <div class="week_day" id="sun">
                                <div class="day_header"><span>Sun</span>
                                <span class="wc_date"></span></div>
                                <div class="day_body">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> <!-- End of Container -- -->
        
        
        
        
        <!--  Event forms -->
        <div class="card card-body bg-light mb-4" id="event_form_cont">
                <?php flash('register_success'); ?>
                
                <h2>Add event</h2>
                <form action='' method="post" id="event_form">
                    <div class="form-group">
                        <label for="name">Event title: <sup>*</sup></label>
                        <input type="text" name="title" id="add_title" class="form-control form-control-lg <?php echo (!empty($data['name_err'])) ? 'is-invalid' : ' ' ?>" value="<?php echo $data['title']; ?>">
                        <span class="invalid-feedback"><?php echo $data['title_err']; ?></span>
                    </div>
                    <div class="form-group">
                        <label for="name">Event text: </label>
                        <textarea name="body" id="add_body" class="form-control form-control-lg <?php echo (!empty($data['body_err'])) ? 'is-invalid' : ' ' ?>"><?php echo $data['body']; ?></textarea>
                            <span class="invalid-feedback"><?php echo $data['body_err']; ?></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="name">Date: <sup>*</sup></label>
                        <input type="date" name="date" id="add_date" class="form-control form-control-lg <?php echo (!empty($data['date_err'])) ? 'is-invalid' : ' ' ?>" value="<?php echo $data['date']; ?>">
                        <span class="invalid-feedback"><?php echo $data['date_err']; ?></span>
                    </div>

                    <div class="row">
                        <div class="col mt-4">
                            <input type="submit" value="OK" class="btn btn-success btn-block">
                        </div>
                        <div class="col mt-4">
                            <a href="#" class="btn btn-secondary btn-block" id="add_cancel">Cancel</a>
                        </div>
                    </div>
                </form>
            </div>
        
        <!-- Event Window ------ -->
        <div id="event_window" class="side_window">
            <div class="container mt-4">
                <h3>Event title</h3>
                <p>Event body</p>
                <div class="row mt-5">
                    <div class="col mt-3">
                        <a href="#" class="btn btn-primary btn-block">Edit</a>
                    </div>
                    <div class="col mt-3">
                        <a href="#" class="btn btn-danger btn-block" id="delete_btn">Delete</a>
                    </div>
                    <div class="col mt-3">
                        <a href="#" class="btn btn-secondary btn-block" id="hide_event_window">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
        
        
        
        <!-- Messages ---- -->
        <div id="alert">
            <p>Info</p>
        </div> 
        
        
    </div> <!-- End of content div -->
    
    <footer class="footer bg-dark text-light">
        <div class="container">
            <p class="">Sticky Footer</p>
        </div>
    </footer>
    

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    

    
    <script src="<?php echo URL_ROOT ?>app/web/js/week.js"></script>
</body>
</html>

