<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo APP_NAME; ?> </title>
    
    <!-- Google fonts -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Poppins|Staatliches&display=swap" rel="stylesheet">
    
    <!-- Bootstrap core CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font awesome -->
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    
    <link rel="stylesheet" href="<?php echo URL_ROOT ?>web/css/main.css">
    <link rel="stylesheet" href="<?php echo URL_ROOT ?>web/css/month.css">
    
</head>

<body>
    <header>
        <!-- Navbar -->
        <?php require(APP_ROOT.'inc/nav.php'); ?>
    </header>
    
    <div class="content container" id="month_wrapper">

        <div class="month_col" id="left_col">
            <div id="month_header">
                <a href="#" id="prev_month_btn" class="month_arrow"><<</a>
                <a id="month_name"></a>
                <a href ="#" id="next_month_btn" class="month_arrow">>></a>
                </div>
            <table id="month_tab">
                <thead class="month_tab_header"><tr><td>M</td><td>T</td><td>W</td><td>T</td><td>F</td><td>S</td><td class="sunday">S</td></tr></thead>
                <tbody id="month_body"></tbody>
            </table>
        </div>
        <div class="month_col" id="right_col"></div>
    </div>
    
    
    <footer class="footer bg-dark text-light">
        <div class="container">
            <p class="">Sticky Footer</p>
        </div>
    </footer>
    

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    
    
    <script>
        let SESSION_USR = '<?php echo $_SESSION['user_name']; ?>';
        let current_date = 0;
        // date from month claendar
    </script>
    <script src="<?php echo URL_ROOT ?>web/js/month.js"></script>
</body>
</html>

