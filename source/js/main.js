//= require "./libs/jquery.min.js"
//= require_directory "./libs"

var is_print = false;

function pretty_skills_animation(){
	$('.item-skills').each(function(){
		newWidth = $(this).parent().width() * $(this).data('percent');
		$(this).width(0);
    $(this).animate({
        width: newWidth,
    }, 1000);
	});
	$('.icons-red').each(function(){
		height = $(this).height();
    $(this).animate({
        height: 14,
    }, 2000);
	});
};

var resize;
window.onresize = function() {
    if ($('#skills').is(":hidden")) {
        return;
    }
    if (! is_print) {
        return;
    }
	clearTimeout(resize);
	resize = setTimeout(function(){
		pretty_skills_animation();
	}, 100);
};


// Obfuscate the phone number, so that only the finest scammers can call me.
$('#obnoxiousbtn').click(function() {
    $('.obnoxious').slideToggle();
    $(this).toggleClass('btn-info btn-warning');
    $('#phone_number').find('span').text( $('#phone_number').data('last') );
});


$('#show-resume-button').click(function() {
    $(this).hide();
    $('.frontpage-only').hide('slide');
    $('.not-frontpage').show('slide');
	$('.item-skills').each(function(){
		$(this).width(0);
    });
    $('#skills').show(complete=pretty_skills_animation);
    $('.box').show('slide');
    $('#buzzwords').show(complete=function(){
        setTimeout(show_buzzwords, 300);
    });
});

function big_resume_button() {
    $('#show-resume-button').animate({
        width: [ '300px', "easeOutBounce" ],
        height: [ '50px', "easeOutBounce" ],
        fontSize: "1.3em",
        opacity: "1.0"
    }, 200)
}
$('#show-resume-button').mouseover(big_resume_button);

$().on('ready', setTimeout(big_resume_button, 3000));

function reformat_for_print(){
    is_print = true;
    $('.obnoxious').show();
    $('#phone_number').find('span').text( $('#phone_number').data('last') );
    $('.job').map(function() {
        text = $(this).find('.year').text() + ' | ' + $(this).find('.where').text();
        profession = $(this).find('.profession').text();
        if (profession) {
            text += ' - ' + profession;
        }
        $(this).find('.profession').text(text);
    });
    $('#education li').map(function() {
        text = $(this).find('.year').text() + ' | ' + $(this).find('h3').text();
        $(this).find('h3').text(text);
    });
    $('.job .col-xs-9').removeClass('col-xs-9');
    $('.job .col-xs-3').removeClass('col-xs-3');
    $('.item-skills').width('80%');
    $('.contact-item .pull-right').removeClass('pull-right');
    offset = 0;
    links = {};
    $('a').each(function(i, a){
        if ($(a).hasClass('no-href-in-print')) {
            offset -= 1;
            return;
        }
        i += offset;
        if (!a.href) {
            // not a link we care about
            offset -= 1;
            return;
        }
        if (links[a.href] != undefined) {
            // saw that before!
            offset -= 1;
            i = links[a.href];
        }
        marker = '[' + i +']';
        a.innerHTML = a.text + '<sup>' + marker + '</sup>';
        if (links[a.href] == undefined) {
            row = $('<div>', {class: 'row'});
            row.append($('<div>', {class: 'col-xs-1', style: 'width:20px', text: marker}));
            row.append($('<div>', {class: 'col-xs-11', text: $.trim(a.href)}));
            $('#links ').append(row);
        }
        links[a.href] = i;
    });
    // Hyphenate everything!
    $('div').addClass('hyphenate');
    $('p').addClass('hyphenate');
    $('span').addClass('hyphenate');
    $('a').addClass('hyphenate');
    $('h2').addClass('hyphenate');
    $('h3').addClass('hyphenate');
    $('li').addClass('hyphenate');
    Hyphenator.config({
        displaytogglebox : false,
        minwordlength : 2
    });
    Hyphenator.run();
}

// Print button
$('#print').click(function() {
    reformat_for_print();
    // finally, print
    window.print();
    // if the user press cancel, reload the page
    location.reload();
});


function text_resume() {
    reformat_for_print();
    $('#hello').insertBefore('#about');
    $('#contact').insertAfter('#about');
    $('#skills').insertAfter('#contact');
    $('#press').insertAfter('#competitions');
    $('#patents').insertAfter('#press');
    $('#publications').insertAfter('#patents');
    $('#references').insertAfter('#publications');
}

function show_buzzwords() {
    var buzzwords = [
        ['Python', 50],
        ['Ruby', 40],
        ['C', 5],
        ['C++', 1],
        ['X-86 assembly', 3],
        ['TinyOs', 1],
        ['Postgresql', 8],
        ['Mysql', 6],
        ['CouchDB', 3],
        ['MongoDB', 5],
        ['Ruby on Rails', 50],
        ['JavaScript', 30],
        ['Chrome extensions', 30],
        ['Flask', 10],
        ['Sinatra', 6],
        ['IdaPRO', 5],
        ['Burp', 20],
        ['Tarantula', 20],
        ['Brakeman', 10],
        ['Scapy', 20],
        ['Snort', 5],
        ['Puppet', 10],
        ['Munin', 10],
        ['RabbitMQ', 10],
        ['Redis', 20],
        ['Eucaliptus', 10],
        ['OpenStack', 10],
        ['AWS EC2', 5],
        ['Matlab', 10],
        ['Simulink', 10],
        ['Mathematica', 5],
        ['Rapidminer', 20],
        ['Gensim', 20],
        ['Resque', 20],
        ['Sidekiq', 20],
        ['Vagrant', 20],
        ['Latex', 20],
    ];
  var fill = d3.scale.category20();
  var buzzwords_size = [$('#buzzwords').width(), $('#buzzwords').height()];
  console.log(buzzwords_size);
  // var buzzwords_size = [200, 200];
  d3.layout.cloud().size(buzzwords_size)
      .words(buzzwords.map(function(d) {
        return {text: d[0], size: 6 + Math.random() * 1 + d[1] * 0.5};
      }))
      .padding(5)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Ubuntu")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    d3.select("#buzzwords").append("svg")
        .attr("width", buzzwords_size[0])
        .attr("height", buzzwords_size[1])
      .append("g")
        .attr("transform", "translate(" + buzzwords_size[0]/2.0 + " ,"+ buzzwords_size[1]/2.0 +")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Ubuntu")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
}

$(document).ready(function() {
    $('.container')
    .css('opacity', 0)
    .slideDown()
    .animate(
        { opacity: 1 },
        { queue: false, duration: 'slow' }
      );
})

console.log('Ah, the console. What a wonderful thing!');
