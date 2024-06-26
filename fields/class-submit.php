<?php
/**
 * The frontend-specific functionality of the plugin.
 *
 * @link       https://www.wecodeart.com/
 * @since      1.0.0
 *
 * @package    WeCodeArt\Support\Modules\ContactForm
 * @subpackage WeCodeArt\Support\Modules\ContactForm\Fields
 */

namespace WeCodeArt\Support\Modules\ContactForm\Fields;

defined( 'ABSPATH' ) || exit;

use WeCodeArt\Singleton;

/**
 * Submit Fields.
 */
class Submit extends Base {

	use Singleton;

	/**
	 * Module vars.
	 *
	 * @var mixed
	 */
	protected $name     = 'submit';
	protected $fields   = 'submit';

	/**
	 * Return field HTML.
	 *
	 * @param   object $tag
     * 
	 * @return  string Rendered field output.
	 */
	public function get_html( $tag ) {
		$class = wpcf7_form_controls_class( $tag->type, 'wp-block-button__link wp-element-button' );
        $class = array_filter( explode( ' ', $tag->get_class_option( $class ) ) );

        if( ! count( array_filter( $class, function( $i ) {
            return strpos( $i, '-background-color' );
        } ) ) ) {
            $class[] = 'has-primary-background-color has-white-color';
        }

        $attrs = [];
        $attrs['type']      = 'submit';
        $attrs['class']		= join( ' ', $class );
        $attrs['id'] 		= $tag->get_id_option();
        $attrs['tabindex'] 	= $tag->get_option( 'tabindex', 'signed_int', true );

        $value = isset( $tag->values[0] ) ? $tag->values[0] : '';

        if ( empty( $value ) ) {
            $value = __( 'Send', 'wecodeart' );
        }

        $html = wecodeart( 'markup' )::wrap( 'cf7-submit-field', [ [
            'tag' 	=> 'span',
            'attrs' => [
                'class' => self::get_wrap_class( $tag, 'wp-block-button' )
            ]
        ] ], 'wecodeart_input', [ 'button', [
            'label' => sprintf( '<span>%s</span><span class="has-spinner"></span>', $value ),
            'attrs' => $attrs
        ] ], false );

        return $html;
	}

    /**
	 * Get Module args.
	 *
	 * @return array
	 */
	protected function get_args() {
		return [];
	}
}
