<?php require(APP_ROOT.'inc/header.php'); ?>

<body>
    <div class="content">
        <header>
            <!-- Navbar -->
            <?php require(APP_ROOT.'inc/nav.php'); ?>
        </header>
        
        <div class="container mt-4">
            <div class="row mb-3">
                <div class="col-md-6">
                    <h1>Week events</h1>
                </div>
                <div class="col-md-6">
                    <a href="<?php echo URLROOT .'posts/add' ?>" class="btn btn-primary float_right">
                        <i class="fa fa-pencil"></i> Add Event
                    </a>
                </div>
            </div>
            
            <!-- Show events   -->
            <?php foreach( $data['events'] as $event ) : ?> 
                <div class="card card-body mb-3">
                    <h4 class="card-title"><?php echo $event->title; ?></h4>
                    <div class="bg-light p-2 mb-3">
                        Written by <?php echo $event->name; 
                        // name from user table because is joined to post table
                        ?> on <?php echo $event->postCreated; ?>
                    </div>
                    <p class="card-text"><?php echo $event->body; ?></p> 
                    <div class="row">
                        <div class="col-md-6">
                            <a href="<?php echo URLROOT .'/posts/show/' .$event->id ; ?>" class="btn btn-dark pull-left mx-1">More</a>

                            <?php 
                            if($event->user_id == $_SESSION['user_id']) : ?>
                            <a href="<?php echo URLROOT .'/calendar/edit/' .$post->id ; ?>" class="btn btn-success pull-left mx-1">Edit</a>
                            <?php endif; ?>    
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div> <!-- End of Container -- -->
        
    </div>
    
    <footer class="footer bg-dark text-light">
        <div class="container">
            <p class="">Sticky Footer</p>
        </div>
    </footer>
    

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    

    
</body>
</html>

