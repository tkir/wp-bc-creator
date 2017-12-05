<base href="<?= site_url() . '/' . get_option('BusinessCardCreator_url'); ?>">
<link rel="stylesheet" href="https://unpkg.com/bootstrap@3.3.7/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
<script>
//    edge polyfills
    (function () {
        if ( typeof NodeList.prototype.forEach === "function" ) return false;
        NodeList.prototype.forEach = Array.prototype.forEach;
    })();
</script>

<link href="<?= plugins_url() . '/business-card-creator' . '/BusinessCardCreator/styles.bundle.css'; ?>"
      rel="stylesheet"/>
