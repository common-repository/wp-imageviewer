
/*
	Copyright 2018 - 2021  Marcel Pol  (email: marcel@timelord.nl)

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
 * option:          type:                 default: description:
 * zoomValue        number in percentage  100      It defines the initial zoom value of an image.
 * maxZoom          number in percentage  500      It defines maximum percentage you can zoom an image.
 * snapView         boolean               true     Configuration to show/hide snap view.
 * refreshOnResize  boolean               true     Defines wether to refresh the viewer on resize of window.
 * zoomOnMouseWheel boolean               true     Defines weather to allow zoom with mouse scroll or not.
 *
 */


/*
 * Start the ImageViewer.
 *
 * @since 1.0.0
 */
jQuery(document).ready(function($) {

	/*
	 * Set data-high-res-src attribute for image, if there is a link with a href to an image.
	 * <a href="hi-res-image1.png"><img id="image" src="image1.png" data-high-res-src="hi-res-image1.png"></a>
	 */
	jQuery( 'a' ).each( function( index, a_element ) {

		var href = jQuery(this).attr('href');
		if ( typeof href == 'undefined' ) {
			href = '';
		}
		if ( href.length > 0 ) {
			// Remove ?get parameters from test_href so we can check for image.
			var test_href = href;
			var test_href_match = test_href.match(/\?(.*)?$/i);
			if ( test_href_match != null ) {
				test_href = test_href.replace(test_href_match[0], '');
			}

			// Check if it links to an image.
			if ( test_href.match(/.(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)$/i)) {

				if ( jQuery( this ).find('img') ) {
					var img = jQuery( this ).find('img');
					var high_res_src = jQuery(this).attr('data-high-res-src');
					// Do not overwrite data that is already there.
					if ( typeof high_res_src == 'undefined' ) {
						jQuery( img ).attr('data-high-res-src', href);
					}

					// Catch keycodes.
					jQuery( this ).on('keyup', function(e) {
						if (e.keyCode == 13) { // Enter key to open viewer.
							iv_show_image_from_enter( img );
						}
						if (e.keyCode == 27) { // Esc key to close viewer.
							iv_hide_viewer();
						}
					});

					// Make sure we don't follow the href on a click event.
					jQuery( this ).on( 'click', function( event ) {
						event.preventDefault();
					});
				}

			}
		}

	});


	/*
	 * Catch keycodes.
	 */
	jQuery( 'body' ).on('keyup', function(e) {
		if (e.keyCode == 27) { // Esc key closes the viewer.
			iv_hide_viewer();
		} else if (e.keyCode == 39) { // Arrow key.
			iv_show_image_prev();
		} else if (e.keyCode == 37) { // Arrow key.
			iv_show_image_next();
		}
	});

	/*
	 * Collect array of images and feed it to the monster.
	 * <img id="image" src="image1.png" data-high-res-src="hi-res-image1.png">
	 * images is an array.
	 * each item is an object: { small: high_res_src, big: high_res_src, alt: alt }
	 * each image gets a click event to show the image on click.
	 */
	var images = [];
	jQuery( 'img' ).each( function( index, img ) {

		var src = jQuery(this).attr('src');
		if ( typeof src == 'undefined' ) {
			src = '';
		}
		var high_res_src = jQuery(this).attr('data-high-res-src');
		if ( typeof high_res_src == 'undefined' ) {
			high_res_src = '';
		}
		var alt = jQuery(this).attr('alt');
		if ( typeof alt == 'undefined' ) {
			alt = '';
		}
		if ( src.length > 0 && high_res_src.length > 0 ) {
			// Set src to main image, not thumbnails. Some thumbnails have a hard crop and aspect ratio goes wrong.
			images.push({ small: high_res_src, big: high_res_src, alt: alt });
			var this_image = images.length;

			jQuery( this ).on( 'click', function() {
				iv_show_image( this_image );
			});
		}

	});


	var options = {};
	if ( typeof imageviewer_custom_options === 'object' ) {
		options = imageviewer_custom_options;
	}
	var viewer = new ImageViewer.FullScreenViewer( options );

	var current_image = 1;
	var total = images.length;

	// Add navigation and description.
	jQuery('.iv-container').append('<div class="iv-prev"></div><div class="iv-next"></div>');
	jQuery('.iv-image-wrap').append('<div class="iv-description"><span class="iv-total"></span>&nbsp;<span class="iv-img-alt"></span></div>');
	jQuery('.iv-total').html(total);


	/*
	 * Click events for navigation buttons.
	 */
	jQuery('.iv-next').on( 'click', function() {
		iv_show_image_prev();
	});

	jQuery('.iv-prev').on( 'click', function() {
		iv_show_image_next();
	});

	function iv_show_image_prev() {
		if ( iv_is_viewer_active() == false ) {
			return;
		}
		current_image++;
		if (current_image > total) {
			current_image = 1;
		}
		iv_show_image( current_image );
	}
	function iv_show_image_next() {
		if ( iv_is_viewer_active() == false ) {
			return;
		}
		current_image--;
		if (current_image == 0) {
			current_image = total;
		}
		iv_show_image( current_image );
	}

	/* Callback function to be fired after show function call. */
	var wp_imageviewer_show_callback = jQuery.Callbacks();

	/*
	 * Show the image in the viewer. Used by the click and keyboard events.
	 * @param int this_image integer where it is located in the images array (-1).
	 */
	function iv_show_image( this_image ) {
		current_image = this_image;
		var image_object = images[current_image - 1]; // array starts at 0, current_image starts at 1.
		viewer.show( image_object.small, image_object.big );
		jQuery('.iv-total').html( current_image + '/' + total + ' ');
		jQuery('.iv-img-alt').html( ' ' + image_object.alt);

		/*
		 * Add callback for adding custom code.
		 *
		 * @since 2.0.6
		 *
		 * Example code for using the callback:
		 *
		 * jQuery(document).ready(function($) {
		 *     wp_imageviewer_show_callback.add( my_callback_function );
		 * });
		 *
		 * function my_callback_function() {
		 *     console.log('This is the callback');
		 *     return false;
		 * }
		 *
		 */
		wp_imageviewer_show_callback.fire();

	}
	function iv_show_image_from_enter( img_obj ) {
		var high_res_src = jQuery( img_obj ).attr('data-high-res-src');
		for ( i=0; i < images.length; i++ ) {
			var img_big = images[i].big;
			if ( high_res_src == img_big ) {
				iv_show_image( i + 1 );
				return;
			}
		}
	}

	function iv_hide_viewer() {
		if ( iv_is_viewer_active() == false ) {
			return;
		}
		viewer.hide();
	}

	function iv_is_viewer_active() {
		var display = jQuery( 'div.iv-fullscreen' ).css( 'display' );
		if ( typeof display == 'undefined' || display == 'none' ) {
			return false;
		} else {
			return true;
		}
	}

	function iv_get_zoom() {
		var zoom = parseInt( viewer._state.zoomValue );
		return zoom;
	}

	/*
	 * Touch events for navigation swipes.
	 */
	var startx = null;
	var distx = null;

	onTouchStart = function(el) {
		var touchobj = el.originalEvent.changedTouches[0]; // reference first touch point (ie: first finger)
		startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser

		if ( el.originalEvent.touches.length > 1 ) {
			// We have multitouch, probably for zoom. Reset everything and do nothing.
 			startx = null;
			distx = null;
			return;
		}

		//el.originalEvent.preventDefault(); // No need to prevent clicks.
	};
	jQuery('.iv-container').on( 'touchstart', onTouchStart );

	onTouchEnd = function(el) {
		if ( startx == null ) {
			return;
		}

		var zoom = iv_get_zoom();
		if ( zoom > 100 ) {
			return;
		}

		var width = parseInt( jQuery('.iv-container').width() );
		var touchobj = el.originalEvent.changedTouches[0]; // reference first touch point (ie: first finger)
		distx = parseInt(touchobj.clientX) - startx;

		if ( distx > 0 ) {
			var perc = parseInt( ( distx / width ) * 80);
			if ( ( perc > 5 ) || ( distx > 100 ) ) {
				iv_show_image_next();
			}
		}
		if ( distx < 0 ) {
			distx = Math.abs(distx);
			var perc = parseInt( ( distx / width ) * 80);
			if ( ( perc > 5 ) || ( distx > 100 ) ) {
				iv_show_image_prev();
			}
		}

		startx = null;
		distx = null;
		//el.originalEvent.preventDefault(); // No need to prevent clicks.
	};
	jQuery('.iv-container').on( 'touchend', onTouchEnd );

});
