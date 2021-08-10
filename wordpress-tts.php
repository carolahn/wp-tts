<?php 
/**
 * Plugin Name: Leitor
 * Description: Plugin para leitura do texto.
 * Version: 1.0.0
 * Author: Carolina Ahn
 */

// segurança
if (!defined('ABSPATH')) {
	die;
}

require_once plugin_dir_path(__FILE__) . '/includes/wordpress-tts-shortcode.php';

require_once plugin_dir_path(__FILE__) . '/includes/wordpress-tts-scripts.php';