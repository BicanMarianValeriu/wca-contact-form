<?php
/**
 * The frontend-specific functionality of the plugin.
 *
 * @link       https://www.wecodeart.com/
 * @since      1.0.0
 *
 * @package    WeCodeArt\Support\Modules
 * @subpackage WeCodeArt\Support\Modules\Condition
 */

namespace WeCodeArt\Support\Modules\ContactForm\Condition;

defined( 'ABSPATH' ) || exit;

use WeCodeArt\Config\Interfaces\Conditional;

/**
 * Conditional that is only met when plugin is active.
 */
class Form implements Conditional {

	/**
	 * @inheritdoc
	 */
	public function is_met(): bool {
		global $post, $_wp_current_template_content;

		$has_form = false;

		if( is_object( $post ) ) {
			if( 
				has_shortcode( $post->post_content, 'contact-form' ) ||
				has_shortcode( $post->post_content, 'contact-form-7' ) ||
				has_block( 'contact-form-7/contact-form-selector', $post )
			) {
				$has_form = true;
			}
		}

		if( is_string( $_wp_current_template_content ) ) {
			if(
				has_shortcode( $_wp_current_template_content, 'contact-form' ) ||
				has_shortcode( $_wp_current_template_content, 'contact-form-7' ) ||
				has_block( 'contact-form-7/contact-form-selector', $_wp_current_template_content )
			) {
				$has_form = true;
			}
		}

		return $has_form;
	}
}