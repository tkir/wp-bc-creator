<?php
/*
 * Template Name: business-card-creator-template
 * Description: A Page Template with a darker design.
 */
get_header(); ?>
    <div class="wrap">
        <div id="primary" class="content-area">
            <main id="main" class="site-main" role="main">

                <?php while (have_posts()) : the_post(); ?>

                    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>
                    <div class="entry-content">
                        <?php
                        the_content();
                        ?>
                    </div><!-- .entry-content -->
                    </article><!-- #post-## -->

                <?php endwhile; ?>

            </main><!-- #main -->
        </div><!-- #primary -->
    </div><!-- .wrap -->
<?php get_footer(); ?>