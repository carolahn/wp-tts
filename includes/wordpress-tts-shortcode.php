<?php

add_shortcode('wordpress_tts', 'wordpress_tts_add_speaker');
function wordpress_tts_add_speaker() 
{
    // $endereco = get_option('al_local_dia_palestra_endereco');
    // $cidade = get_option('al_local_dia_palestra_cidade');
    
    $tts_icon = "&#128266;";
    $tts_text = "Ouvir o texto";
    $tts_button = '
        <div class="tts-wrapper">
            <button id="tts-button" class="tts-button">' . $tts_icon . ' ' . $tts_text . '</button>
        </div>
    ';

    return $tts_button;
}