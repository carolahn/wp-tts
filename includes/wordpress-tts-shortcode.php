<?php

add_shortcode('wordpress_tts', 'wordpressTtsAddSpeaker');
function wordpressTtsAddSpeaker() 
{
    // $endereco = get_option('al_local_dia_palestra_endereco');
    // $cidade = get_option('al_local_dia_palestra_cidade');

    return '
        <div class="wordpress-tts-wrapper">
            <center>
                <button id="btn-speak" class="btn btn-success mt-4">Speak</button>
            </center>
      
        </div>
    ';
}