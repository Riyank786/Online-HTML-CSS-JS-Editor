$(document).ready(function () {


    // for the togglig the code areas
    $(".toggle").click(function () {


        if (window.matchMedia('(max-width: 600px)').matches) {
            $('.codeContainer').hide();
            $('.toggle').removeClass('selected');

        }

        $(this).toggleClass('selected');

        var activeDiv = $(this).attr('href');

        $('#' + activeDiv).toggle(122);

        $('iframe').css({ height: '80vh', width: '100%' });


    });


      // to give the indent to the textarea on tab click
      $('.textBox').on('keydown', function (ev) {
        var keyCode = ev.keyCode || ev.which;

        if (keyCode == 9) {
            ev.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            var val = this.value;
            var selected = val.substring(start, end);
            var re, count;

            if (ev.shiftKey) {
                re = /^\t/gm;
                count = -selected.match(re).length;
                this.value = val.substring(0, start) + selected.replace(re, '') + val.substring(end);
                // todo: add support for shift-tabbing without a selection
            } else {
                re = /^/gm;
                count = selected.match(re).length;
                this.value = val.substring(0, start) + selected.replace(re, '\t') + val.substring(end);
            }

            if (start === end) {
                this.selectionStart = end + count;
            } else {
                this.selectionStart = start;
            }

            this.selectionEnd = end + count;
        }
    })


});

// function of the run button to run the code of the editor 
function run() {

    // collecting the content from the textarea
    let html = $('#htmlText').val();
    let css = $('#cssText').val();
    let js = $("#jsText").val();

    // adding the hmtl in the iframe
    var content = $("iframe").contents().find("body");
    content.html(html);

    // adding the css in the iframe
    var cssLink = "<style>" + css + "</style>";
    var head = $("iframe").contents().find("head");
    head.append(cssLink);

    var jsLink = '<script>' + js + '</script>';

    var content = $('iframe').contents();
    content.find('head').append('<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>');
    content.find('body').append(jsLink);

};