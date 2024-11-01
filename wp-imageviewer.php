<?php
/*
Plugin Name: WP ImageViewer
Plugin URI: https://wordpress.org/plugins/wp-imageviewer/
Description: A zooming and panning plugin inspired by google photos for your web images.
Text Domain: wp-imageviewer
Version: 2.0.6
Author: Marcel Pol
Author URI: https://timelord.nl
License: GPLv2 or later


Copyright 2018 - 2022  Marcel Pol  (email: marcel@timelord.nl)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/


/*
 * Todo:
 *
 *
 */


if ( ! defined( 'ABSPATH' ) ) exit;


define( 'WP_IMAGEVIEWER_VERSION', '2.0.6' );


/*
* Enqueue styles and scripts.
*/
function wp_imageviewer_enqueue() {
	wp_enqueue_script( 'wp-imageviewer', plugins_url('imageviewer/iv-viewer.js', __FILE__), false, WP_IMAGEVIEWER_VERSION, true );
	wp_enqueue_script( 'wp-imageviewer-init', plugins_url('wp-imageviewer-init.js', __FILE__), array('wp-imageviewer','jquery'), WP_IMAGEVIEWER_VERSION, true );

	wp_enqueue_style('wp-imageviewer', plugins_url('imageviewer/iv-viewer.css', __FILE__), false, WP_IMAGEVIEWER_VERSION, 'screen');
}
add_action('wp_enqueue_scripts', 'wp_imageviewer_enqueue');

