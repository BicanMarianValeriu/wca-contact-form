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
 * Date Fields.
 */
class Date extends Base {

	use Singleton;

	/**
	 * Module vars.
	 *
	 * @var mixed
	 */
	protected $name     = 'date';
	protected $fields   = [ 'date', 'date*' ];

	/**
	 * Return field HTML.
	 *
	 * @param   object $tag
     * 
	 * @return  string Rendered field output.
	 */
	public function get_html( $tag ) {
		if ( empty( $tag->name ) ) {
            return '';
        }
        
        $attrs = [];

        if ( wpcf7_support_html5() ) {
            $attrs['type'] = $tag->basetype;
        } else {
            $attrs['type'] = 'text';
        }

        $validation_error   = wpcf7_get_validation_error( $tag->name );
        $class              = explode( ' ', wpcf7_form_controls_class( $tag->type, 'form-control' ) );
        $class[]            = 'wpcf7-validates-as-date';
        
        if ( $validation_error ) {
            $class[] = 'wpcf7-not-valid';
            $attrs['aria-invalid'] = 'true';
            $attrs['aria-describedby'] = wpcf7_get_validation_error_reference( $tag->name );
        } else {
            $attrs['aria-invalid'] = 'false';
        }
    
        $attrs['name']      = $tag->name;
        $attrs['id']        = $tag->get_id_option();
        $attrs['class']		= $tag->get_class_option( $class );
        $attrs['tabindex']	= $tag->get_option( 'tabindex', 'signed_int', true );
        $attrs['min'] 		= $tag->get_date_option( 'min' );
        $attrs['max'] 		= $tag->get_date_option( 'max' );
        $attrs['step'] 		= $tag->get_option( 'step', 'int', true );
        $attrs['autocomplete'] = $tag->get_option( 'autocomplete', '[-0-9a-zA-Z]+', true );
        $attrs['readonly']  = $tag->has_option( 'readonly' );
    
        if ( $tag->is_required() ) {
            $attrs['required'] = true;
            $attrs['aria-required'] = 'true';
        }
    
        $label = $tag->has_option( 'first_as_label' ) ? (string) reset( $tag->values ) : false;
        $value = count( $tag->values ) > 1 ? (string) end( $tag->values ) : reset( $tag->values );
    
        if ( $tag->has_option( 'placeholder' ) or $tag->has_option( 'watermark' ) ) {
            $attrs['placeholder'] = $value;
            $value = '';
        }
    
        $value = $tag->get_default_option( $value );
    
        if ( $value ) {
            $datetime_obj = date_create_immutable( preg_replace( '/[_]+/', ' ', $value ), wp_timezone() );
            if ( $datetime_obj ) {
                $value = $datetime_obj->format( 'Y-m-d' );
            }
        }
    
        $value = wpcf7_get_hangover( $tag->name, $value );
    
        $attrs['value'] = $value;
    
        $html = wecodeart( 'markup' )::wrap( 'cf7-date-field', [ [
            'tag' 	=> 'span',
            'attrs' => [
                'class'     => self::get_wrap_class( $tag ),
                'data-name' => $tag->name
            ]
        ] ], 'wecodeart_input', [ $attrs['type'], [
            'label' 	=> $label,
            'attrs' 	=> $attrs,
            'messages' 	=> [
                'invalid' => [
                    'text'  => $validation_error,
                    'class' => 'invalid-feedback'
                ]
            ]
        ] ], false );

        return $html;
	}
}
