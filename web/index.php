<?php require(APP_ROOT.'inc/header.php'); ?>

<body>
    <div class="content">
        <header>
            <!-- Navbar -->
            <?php require(APP_ROOT.'inc/nav.php'); ?>
        </header>

        <main role="main" class="container mt-4 text-center">
            <h1>Welcome</h1>
                <p class="lead">This is <?php echo APP_NAME; ?> home page.</p>

        </main><!-- /.container -->
    </div>
    
    <footer class="footer bg-dark text-light">
        <div class="container">
            <p class="">Sticky Footer</p>
        </div>
    </footer>
    

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    

    
    <script src="<?php echo URL_ROOT ?>app/web/js/main.js"></script>
</body>
</html>

