<!--
    Page Name:  Join Project
    Project:    unEATn
    Author:     Simone Lorengo
    Date:       21.11.2017
-->

<!DOCTYPE html>
<html lang="it">
<head>
    <!-- METADATA -->
    <meta charset="utf-8">
    <meta name="description" content="Prima di mangiare, mensa">
    <meta name="author" content="Simone Lorengo">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- TITLE -->
    <title>unEATn</title>
    <!-- FAVICON -->
    <link rel="icon" href="img/favicon.png" type="image/png" />
    <!-- THEME COLOR -->
    <meta name="theme-color" content="#222222">
    <meta name="msapplication-navbutton-color" content="#222222">
    <meta name="apple-mobile-web-app-status-bar-style" content="#222222">
    <!-- STYLESHEETS -->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
    <link rel="stylesheet" href="https://cdn.anychart.com/releases/8.0.1/css/anychart-ui.min.css" />
    <link rel="stylesheet" href="/css/styles.css">
    <!-- EXTERNAL SCRIPTS -->
    <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-base.min.js"></script>
    <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-ui.min.js"></script>
    <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-exports.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <!--[if lt IE 9]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
    <![endif]-->
</head>

<body>
<div class="container-fluid">
    <!-- HEADER -->
    <div class="row">
        <div class="col-lg-12 logo cursor-pointer" onclick="window.location='/';">
        </div>
    </div>
    <!-- BODY -->
    <div class="row">
        <!-- TEXT -->
        <div class="col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 body-padding">
            <div class="alignment-wrapper txt-justify">
                <span class="txt-center txt-bold"><p style="margin-bottom: 25px">VUOI AIUTARCI A<br>MIGLIORARE LE PREVISIONI?</p></span>
                <p>Collaborare con noi a questo progetto è più facile di quanto tu possa immaginare!</p>
                <p>Conosci già Telegram? E’ un’app di instant messaging come Whatsapp, ma dotato di funzionalità più avanzate.</p>
                <p>Ti basterà scaricarlo dallo Store e collegarti al nostro bot @uneatn_bot per iniziare a fornirci dati utili e migliorare il servizio.</p>
                <p>Prova, ti aspettano dei premi intererssanti!</p>
            </div>
        </div>
    </div>
        <!-- BUTTON  -->
    <div class="row">
        <div class="col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 body-padding">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6 bottom-margin">
                        <div class="alignment-wrapper margin-right-null">
                            <button type="button" class="btn btn-primary expand" id="telegram-download"">SCARICA TELEGRAM &nbsp;<i class="zmdi zmdi-download"></i></button>
                        </div>
                    </div>
                    <div class="col-sm-6 bottom-margin">
                        <div class="alignment-wrapper margin-left-null">
                            <button type="button" class="btn btn-primary expand" onclick="window.open('https://telegram.me/uneatn_bot', '_blank');">BOT @UNEATN_BOT &nbsp;<i class="zmdi zmdi-code"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FOOTER -->
    <div class="row">
        <div class="col-lg-12 footer">
            Copyright &copy; 2017 unEATn software engineering ii project
        </div>
    </div>
</div>

<script type="text/javascript">
    var downloadUrl = "https://telegram.org/";

    if(navigator.userAgent.match(/Android/i)){
        downloadUrl = "https://telegram.org/dl/android";
    } else if(navigator.userAgent.match(/iPhone|iPad/i)){
        downloadUrl = "https://telegram.org/dl/ios";
    } else if(navigator.userAgent.match(/Windows Phone|Lumia/i)){
        downloadUrl = "https://telegram.org/dl/wp";
    } else if(navigator.userAgent.match(/Mac/i)){
        downloadUrl = "https://macos.telegram.org/";
    } else if(navigator.userAgent.match(/Linux/i)){
        downloadUrl = "https://desktop.telegram.org/";
    } else {
        downloadUrl = "https://desktop.telegram.org/";
    }

    $("#telegram-download").click(function () {
        window.open(
            downloadUrl,
            '_blank'
        );
    });
</script>
</body>
</html>