<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo APP_NAME; ?> </title>

    <!-- Google fonts -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Poppins&display=swap" rel="stylesheet">

    <!-- Bootstrap core CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font awesome -->
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <link rel="stylesheet" href="<?php echo URL_ROOT ?>web/css/week.css">
    <link rel="stylesheet" href="<?php echo URL_ROOT ?>web/css/main.css">

</head>

<body>
    <div class="content">
        <header class="nav_dark">
            <!-- Navbar -->
            <?php require(APP_ROOT.'inc/nav.php'); ?>
        </header>

        <div class="container-fluid" id="calendar_wrapper">
            <div class="row">
                <div class="col-lg-10 mx-auto">

                    <div class="row mt-4 mb-3">
                        <div class="col-lg-12 text-center">
                            <h2>Webgate event calendar</h2>
                        </div>

                    </div>

                    <!-- Show week events   -->

                    <div class="week_cal">
                        <div class="week_header mb-2">
                            <div class="week_cal_nav">
                                <a href="#" id="prev" class="nav_arr"> <i class="fa fa-chevron-circle-left"></i> </a>
                                <a href="#" id="next" class="nav_arr">  <i class="fa fa-chevron-circle-right"></i> </a>
                            </div>
                        </div>
                        <div class="week_body">
                            <div class="week_day" id="mon">
                                <div class="day_header">
                                    <span>Mon</span>
                                    <span class="wc_date"></span>
                                </div>
                                <div class="day_body">
                                    </div>
                            </div>
                            <div class="week_day" id="tue">
                                <div class="day_header">
                                    <span>Thu</span>
                                    <span class="wc_date"></span>
                                </div>
                                <div class="day_body">
                                </div>
                            </div>
                            <div class="week_day" id="wed">
                                <div class="day_header">
                                    <span>Wed</span>
                                    <span class="wc_date"></span>
                                </div>
                                <div class="day_body">
                                </div>
                            </div>
                            <div class="week_day" id="thu">
                                <div class="day_header">
                                    <span>Thu</span>
                                    <span class="wc_date"></span>
                                </div>
                                <div class="day_body">
                                </div>
                            </div>
                            <div class="week_day" id="fri">
                                <div class="day_header">
                                    <span>Fri</span>
                                    <span class="wc_date"></span>
                                </div>
                                <div class="day_body">
                                </div>
                            </div>
                            <div class="week_day" id="sat">
                                <div class="day_header">
                                    <span>Sat</span>
                                    <span class="wc_date"></span>
                                </div>
                                <div class="day_body">
                                </div>
                            </div>
                            <div class="week_day" id="sun">
                                <div class="day_header">
                                    <span>Sun</span>
                                    <span class="wc_date"></span>
                                </div>
                                <div class="day_body">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div> <!-- End of Container  -->

        <!-- Spinner on loading -->
        <img id="spinner" class="spinner" src="<?php echo URL_ROOT.'web/img/spinner.gif'; ?>">
    </div>



        <!--  Event forms -->

        <!-- Event Window  -->
        <div class="event_window">
            <div class="container mt-4" id="event_view">
                <h3 id="ev_title">Event title</h3>
                <p id="ev_body">Event body</p>
                <div class="row mt-5 mb-5">
                    <div class="col-md-6 mt-3">
                        <a href="#" class="btn btn_blue btn_fill" id="done_btn">Mark Done</a>
                    </div>
                    <div class="col-md-6 mt-3">
                        <a href="#" class="btn btn_blue btn_fill" id="edit_btn">Edit</a>
                    </div>
                    <div class="col-md-6 mt-3">
                        <a href="#" class="btn btn-danger btn-block" id="delete_btn">Delete</a>
                    </div>
                    <div class="col-md-6 mt-3">
                        <a href="#" class="btn btn-secondary btn-block" id="cancel_view_btn">Cancel</a>
                    </div>
                </div>
            </div>

        <!-- Event form if add new or edit event -->
        <div class="card card-body bg-light event_form" id="event_form_cont">
            <div id = "event_form">
                <h2 id="form_title">Add event</h2>
                <form action='' method="post">
                    <div class="form-group">
                        <label for="name">Event title: <sup>*</sup></label>
                        <input type="text" name="title" id="ev_form_title" class="form-control form-control-lg " value="">

                    </div>
                    <div class="form-group">
                        <label for="name">Event text: </label>
                        <textarea name="body" id="ev_form_body" class="form-control form-control-lg"></textarea>

                    </div>

                    <div class="form-group">
                        <label for="name">Date: <sup>*</sup></label>
                        <input type="date" name="date" id="ev_form_date" class="form-control form-control-lg" value="">

                    </div>

                    <!-- Event type -->
                    <div class="form-group mt-4 time_group">
                        <label for="event type">Event Type:</label>
                        <select name="event type" class="form_select" id="ev_type">
                            <option value="Type1" selected>Type1</option>
                            <option value="Type2">Type2</option>
                            <option value="Type3">Type3</option>
                            <option value="Wait">Wait</option>
                        </select>
                    </div>

                    <div class="row">
                        <div class="col mt-4">
                            <input type="submit" value="OK" class="btn btn_blue btn-block">
                        </div>
                        <div class="col mt-4">
                            <a href="#" class="btn btn-secondary btn-block" id="cancel_form_btn">Cancel</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div> <!-- End of content div -->


    <footer class="footer bg-dark text-light">
        <div class="container">
            <p class="">Sticky Footer</p>
        </div>
    </footer>
    <script>
        let temp_date = <?php echo json_encode($data['date']); ?>;
        let current_date;
        temp_date ? current_date = temp_date : current_date = 0;
        let SESSION_USR = '<?php echo $_SESSION['user_name']; ?>';
    </script>
    <script src="<?php echo URL_ROOT ?>web/js/main.js"></script>
    <script src="<?php echo URL_ROOT ?>web/js/api.js"></script>
    <script src="<?php echo URL_ROOT ?>web/js/week_proc.js"></script>
</body>
</html>
