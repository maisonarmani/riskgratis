jQuery(document).ready(function() {

    //jQuery.removeCookie('violator-shown', { path: '/' });

    jQuery('.violator .close').click(function () {
        var violatorbar = jQuery('.violator');
        TweenMax.to(violatorbar,.5, {autoAlpha:0,rotationX:90,x:10});
    });

    var violatorbar = jQuery('.violator');
    TweenMax.set(violatorbar, {autoAlpha:0,rotationX:90,transformPerspective:900, transformOrigin:'50% 100%'});

    //if (jQuery.cookie('violator-shown') == undefined && ipb.vars['member_id'] == 0) {
    if (jQuery.cookie('violator-shown') == undefined && ipb_member_id < 4) {
        TweenMax.to(violatorbar, .75, {autoAlpha:1,rotationX:0,x:0,ease:Back.easeOut,delay:30,onComplete:updateViolatorCookie});
    }
});

function updateViolatorCookie() {
    jQuery.cookie('violator-shown', 'true', { expires: 7, path: '/' });
}
