# PAGES TO ADD THE SHORTCODE:

At files: **single.php**, **single-carta-servico.php**, **single-noticia.php**

# HOW TO USE:

Replace:

```
<span class="text-to-speach float-right d-none">
    <?php echo do_shortcode('[responsivevoice_button voice="Brazilian Portuguese Female" buttontext="Ouvir o texto"]'); ?>
</span>
```

For:

```
<?php echo do_shortcode('[wordpress_tts]'); ?>
```
