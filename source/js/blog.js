//= require "./skulpt/skulpt.min.js"
//= require "./skulpt/skulpt-stdlib.js"



/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2014 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
});

$(document).ready(function() {
    $('header')
    .css('opacity', 0)
    .slideDown()
    .animate(
        { opacity: 1 },
        { queue: false, duration: 'slow' }
      );
})


function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
}

$('pre .python').each(function() {
    container = $('<div/>', {class: 'code-container'}).insertAfter($(this));
    $(this).appendTo(container);

    $('<button/>', {class: 'btn pull-right', text: 'Run this code!'}).appendTo(container)
    .click(function(){
        container = $(this).closest('.code-container');
        highlight = container.find('.python');
        output = container.find('.output');
        program = highlight.text();

        output.html('');
        $('<h4/>', {text: 'Code output:'}).appendTo(output);
        Sk.pre = "";
        Sk.configure({
            output: function(text) {
                        output.html(output.html() + text);
                    },
            read:builtinRead
        });
        try {
            eval(Sk.importMainWithBody("<stdin>",false, program));
        }
        catch(e) {
            alert(e.toString())
        }
    });
    $('<div/>', {class: 'output'}).appendTo(container);

});


$('img').addClass('img-responsive');
