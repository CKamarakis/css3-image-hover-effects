<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <title>CSS3 Image Hover Effects</title>
    <link
        href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900&subset=latin,greek,vietnamese,cyrillic'
        rel='stylesheet' type='text/css'/>


    <link type="text/css" rel="stylesheet" media="all" href="assets/css/style.css"/>

    <script type="text/javascript" src="assets/js/script.js"></script>
</head>
<body>

<section class="container-wrapper">
    <section class="container">
        <section class="content-wrapper intro">
            <h1>CSS3 Image Hover Effects</h1>

            <p>In every project a few image hover effects are needed so I decided to gather them. This collection is the
                result of the most common effects that I use and a few experiments.</p>

            <p>I hope that you will find it useful.</p>
        </section>

    </section>
    <nav>
        <section class="content-wrapper">
            <a href="#greyscale-effects" class="active">Greyscale</a>
            <a href="#fade-effects">Fade</a>
            <a href="#zoom-effects">Zoom</a>
            <a href="#shapes-effects">Shapes</a>
        </section>
        <div class="clearfix"></div>
    </nav>
    <div class="clearfix"></div>

    <ul id="selection-tabs">
        <li id="greyscale-effects"><?php echo include ('views/greyscale.php'); ?></li>
        <li id="fade-effects"><?php echo include ('views/fade.php'); ?></li>
        <li id="zoom-effects"><?php echo include ('views/zoom.php'); ?></li>
        <li id="shapes-effects"><?php echo include ('views/shapes.php'); ?></li>
    </ul>
</section>


</body>
</html>
