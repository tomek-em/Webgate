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

    <link rel="stylesheet" href="<?php echo URL_ROOT ?>web/css/main.css">
    <link rel="stylesheet" href="<?php echo URL_ROOT ?>web/css/week.css">

</head>

<body>
        <div class="content">
        <header class="nav_dark">
            <!-- Navbar -->
            <?php require(APP_ROOT.'inc/nav.php'); ?>
        </header>

        <div id="confirm_del_alert" class="">
                <p>Are you sure you want to delete slots for this day?</p>
            <div class="row">
                <div class="col-6">
                    <a href="#" id="conf_del" class="btn btn_blue">OK</a>
                </div>
                <div class="col-6">
                    <a href="#" id="cancel_del" class="btn btn-secondary">Cancel</a>
                </div>
            </div>
        </div>

        <div class="container-fluid" id="calendar_wrapper">
            <div class="row">
                <div class="col-lg-10 mx-auto">

                    <div class="row mt-4 mb-3">
                        <div class="col-lg-12 text-center">
                            <h2 id="cal_title">Webgate slot calendar </h2>
                        </div>

                    </div>

                    <!-- Show week events   -->

                    <div class="week_cal">
                        <div class="week_header mb-2">
                            <div class="week_cal_nav">
                                <a href="#" id="prev" class="nav_arr"> <i class="fa fa-chevron-circle-left"></i> </a>
                                <a href="#" id="next" class="nav_arr">  <i class="fa fa-chevron-circle-right"></i> </a>
                            </div>

                            <div id="select_usr">
                                <a href="#" id="cur_usr" class="btn btn_blue">Select user</a>
                                <ul class="usr_list">
                                    <?php
                                        $users = data['users'];
                                        foreach($data as $usr) {
                                            $name = $usr->name;
                                            echo '<li class="user_list_item">'.$name.'</li>';
                                        }
                                    ?>
                                </ul>
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
        </div> <!-- End of Container - - -->




        <!--  ADD SLOTS WINDOW -->
        <div class="card card-body bg-light mb-4 event_window" id="slot_form_cont">
            <h2 id="form_title">Add slots</h2>
            <form action='' method="post" id="slot_form">

                <!-- Start time -->
                <div class="form-group mt-4 time_group">
                    <label for="start_time">Start Time:<sup>*</sup></label>
                    <select name="start_time" id="start_time">
                        <?php
                            for($hours=6; $hours<20; $hours++){
                                for($mins=0; $mins<60; $mins+=15) {
                                    echo '<option>'.str_pad($hours,2,'0',STR_PAD_LEFT).':'.str_pad($mins,2,'0',STR_PAD_LEFT).'</option>';
                                }
                            }
                        ?>
                    </select>
                </div>
                <!-- End time -->
                <div class="form-group mt-4 time_group">
                    <label for="end_time">End Time: <sup>*</sup></label>
                    <select name="end_time" id="end_time">
                        <?php
                            for($hours=6; $hours<20; $hours++){
                                for($mins=0; $mins<60; $mins+=15) {
                                    echo '<option>'.str_pad($hours,2,'0',STR_PAD_LEFT).':'.str_pad($mins,2,'0',STR_PAD_LEFT).'</option>';
                                }
                            }
                        ?>
                    </select>
                </div>


                <div class="form-group">
                    <label for="name">Date: <sup>*</sup></label>
                    <input type="date" name="date" id="form_date" class="form-control form-control-lg">
                    <span class="invalid-feedback"></span>
                </div>

                <div class="row">
                    <div class="col mt-4">
                        <input type="submit" value="OK" class="btn btn_blue btn-block">
                    </div>
                    <div class="col mt-4">
                        <a href="#" class="btn btn-secondary btn-block" id="cancel_form">Cancel</a>
                    </div>
                </div>
            </form>
        </div>


    </div> <!-- End of content div -->

    <footer class="footer bg-dark text-light">
        <div class="container">
            <p class="">&copy; 2020 - Webgate</p>
        </div>
    </footer>



    <script>

        let current_date = 0;
        let SESSION_USR = '<?php echo $_SESSION['user_name']; ?>';
        // date from month claendar
    </script>
    <script src="<?php echo URL_ROOT ?>web/js/main.js"></script>
    <script src="<?php echo URL_ROOT ?>web/js/slots.js"></script>
</body>
</html>
