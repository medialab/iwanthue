
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/libs/jquery-1.8.0.min.js"><\/script>')</script>

<script src="js/libs/bootstrap.min.js"></script>

<script src="js/libs/chroma.js"></script>
<script src="js/libs/chroma.palette-gen.js"></script>

<?php
if(isset($googleAnalyticsId) && $googleAnalyticsId != ""){
?>

<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', '<?php echo $googleAnalyticsId; ?>']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>

<?php
}
?>