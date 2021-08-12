<?php

add_action('wp_enqueue_scripts', 'wordpress_tts_add_scripts');
function wordpress_tts_add_scripts() 
{
    $curr_post = get_post(get_the_ID());
    $content = $curr_post->post_content;
    $content = wp_strip_all_tags($content);

    // scripts js
    wp_enqueue_script('wordpress-tts-app', plugins_url() . '/wordpress-tts/js/wordpress-tts-app.js', null, null, true);

    // scripts styles
    wp_enqueue_style('wordpress-tts-style', plugins_url() . '/wordpress-tts/css/wordpress-tts-style.css');

    // add custom js variables
    wp_localize_script('wordpress-tts-app', 'post_object', array(
        'content' => $content
    ));
}