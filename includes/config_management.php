<?php
if(is_dir('_config/')){
	// If there is a conf file, then take it
	include('_config/conf.php');
} else {
	// If there is not, make one with the default one, and then take it
	recurse_copy('_config_default/', '_config/');
	include('_config_default/conf.php');
}

function recurse_copy($src, $dst) {
	// NB: only one level, not the sub dirs
    $dir = opendir($src); 
    @mkdir($dst); 
    while(false !== ( $file = readdir($dir)) ) { 
        if (( $file != '.' ) && ( $file != '..' )) { 
            if ( is_dir($src . '/' . $file) ) { 
                // recurse_copy($src . '/' . $file,$dst . '/' . $file);
                // (not the sub directories)
            } 
            else { 
                copy($src . '/' . $file,$dst . '/' . $file); 
            } 
        } 
    } 
    closedir($dir); 
} 
?>