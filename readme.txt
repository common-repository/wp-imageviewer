=== WP ImageViewer ===
Contributors: mpol
Tags: iv-viewer, imageviewer, fancybox, lightbox, colorbox, modal
Requires at least: 4.1
Tested up to: 6.6
Stable tag: 2.0.6
Requires PHP: 7.0

A zooming and panning plugin inspired by google photos for your web images.

== Description ==

ImageViewer is an image viewer inspired by Google Photo's.
It may also look familiar to users of Ebay.com or Tweakers.net.

It provides a modal for images, similar to modals as lightbox, colorbox and fancybox, just in a somewhat more abstract way.

= Features =

* Smooth dragging and panning images.
* Support touch devices.
* Double tap to zoom in/zoom out.
* Pinch in / pinch out to zoom in/out.
* Snap view for easier panning and zooming experience.
* Exposed API to control zoom programmatically.

= Anti-Features =

* Clean user interface, no bells, no whistles, no horns.
* Lightweight code (no PHP, 2 JS files and 1 CSS file).
* No settings page (really).
* No database queries.

= Upstream Project =

You can look at [Github](https://github.com/s-yadav/iv-viewer) for the original code.
This project is integrated in this WordPress plugin and all ready to use.

= Compatibility =

This plugin is compatible with [ClassicPress](https://www.classicpress.net).

= Contributions =

This plugin is also available in [Codeberg](https://codeberg.org/cyclotouriste/wp-imageviewer).


== Installation ==

= Installation =

* Install the plugin through the admin page "Plugins".
* Alternatively, unpack and upload the contents of the zipfile to your '/wp-content/plugins/' directory.
* Activate the plugin through the 'Plugins' menu in WordPress.
* That's it.

It should just work on the standard WordPress gallery and images.


== Frequently Asked Questions ==

= I have an image, but when I click nothing happens =

This plugin expects the same html layout as lightbox, colorbox and fancybox. The image/thumbnail should be inside a link, an a element.
That link should point to the main media image, not the attachment page or a custom link. Only when the link points to an image file, it will show the viewer,

= I am using Nextgen Gallery =

You can go to Gallery > Other Options > Lightbox Effect-tab and select None for the Lightbox Effect.

= I would like to use custom options for the viewer =

This code should help you, you can change these default values and put this PHP code in the functions.php file of your theme (preferably a child theme).

	<?php
	function imageviewer_custom_options() {
		?>
		<script>
		imageviewer_custom_options = {
			zoomValue: 100,
			snapView: true,
			maxZoom: 500,
			refreshOnResize: true,
			zoomOnMouseWheel: true
		};
		</script>
		<?php
	}
	add_action( 'wp_footer', 'imageviewer_custom_options' );
	?>


== Changelog ==

= 2.0.7 =
* 2023-
* Set z-index to 10000 for Twenty Twelve theme.

= 2.0.6 =
* 2022-10-28
* Add callback for after showing an image.

= 2.0.5 =
* 2021-08-12
* Add possibility to use custom options for the viewer.

= 2.0.4 =
* 2021-02-22
* Fix deprecated jQuery calls with WP 5.6 and jQuery 3.5.

= 2.0.3 =
* 2020-11-03
* Support images which have extra ?get parameters.

= 2.0.2 =
* 2020-10-19
* Do not slide on touch when zoomed in.

= 2.0.1 =
* 2020-02-21
* Fix check for active viewer.

= 2.0.0 =
* 2020-02-18
* Update to upstream 2.0.0 iv-viewer.
* Add navigation with arrow keys.
* Only add hide-event to 'body' once, not for every image.
* Only run expensive code when viewer is active.

= 1.2.0 =
* 2019-07-12
* Support Enter and Esc key to open or close viewer.

= 1.1.2 =
* 2019-04-16
* Do not swipe on multitouch.

= 1.1.1 =
* 2019-03-29
* Add z-index to close button.

= 1.1.0 =
* 2019-03-11
* Support touch events for swiping.

= 1.0.2 =
* 2019-01-03
* Slightly bigger navigation buttons again, should be less sticky.

= 1.0.1 =
* 2018-12-01
* Slightly bigger navigation buttons.
* Add z-index to navigation.

= 1.0.0 =
* 2018-11-30
* Initial release.
