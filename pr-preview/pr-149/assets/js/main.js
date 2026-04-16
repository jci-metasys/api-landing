$(document).ready(function() {
    
    /* ===== Affix Sidebar ===== */
    /* Ref: http://getbootstrap.com/javascript/#affix-examples */

        
    $('#toc-menu').affix({
        offset: {
            top: ($('#header').outerHeight(true) + $('#doc-header').outerHeight(true)) + 45,
            bottom: ($('#footer').outerHeight(true) + $('#promo-block').outerHeight(true)) + 75
        }
    });
    
    /* Hack related to: https://github.com/twbs/bootstrap/issues/10236 */
    $(window).on('load resize', function() {
        $(window).trigger('scroll'); 
    });

    /* Activate scrollspy menu */
    $('body').scrollspy({target: '#toc-nav', offset: 100});
    
    /* Smooth scrolling */
    $('a.scrollto').on('click', function(e){
        //store hash
        var target = this.hash;    
        e.preventDefault();
        $('body').scrollTo(target, 800, {offset: 0, 'axis':'y'});
        
    });
    
    
    /* ======= jQuery Responsive equal heights plugin ======= */
    /* Ref: https://github.com/liabru/jquery-match-height */
    
     $('.cards-wrapper .item-inner').matchHeight();
     $('#showcase .card').matchHeight();
     
    /* Bootstrap lightbox */
    /* Ref: http://ashleydw.github.io/lightbox/ */

    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    });    
});

$('a').on('click', function(e) {
    const current = e.originalEvent.currentTarget.href;
    const urlParts = current.split('/');
    if (urlParts.length < 2) return;

    const last = urlParts[urlParts.length - 1];
    if (last == 'v4' || last == 'v5' || last == 'v6' || last == 'v6-14-1' || last == 'v6-15') {
      e.originalEvent.currentTarget.href = current + ".html";
      return;
    }
    if (last === '' || last.indexOf('.') === -1) {
        e.originalEvent.currentTarget.href = current + (last === '' ? '' : '/') + 'index.html';
    }
});
