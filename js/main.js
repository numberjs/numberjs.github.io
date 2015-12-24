(function() {
  var stylelist = function() {
    var id = 'current_theme';
    var themes = ["agate", "atelier-forest-dark", "atelier-seaside-dark", "docco", "paraiso-dark", "tomorrow-night-blue", "androidstudio", "atelier-forest-light", "atelier-seaside-light", "far", "ir-black", "paraiso-light", "tomorrow-night-bright", "arta", "atelier-heath-dark", "atelier-sulphurpool-dark", "foundation", "pojoaque", "tomorrow-night", "ascetic", "atelier-heath-light", "atelier-sulphurpool-light", "github", "kimbie.dark", "railscasts", "tomorrow-night-eighties", "atelier-cave-dark", "atelier-lakeside-dark", "brown-paper", "github-gist", "kimbie.light", "rainbow", "vs", "atelier-cave-light", "atelier-lakeside-light", "codepen-embed", "googlecode", "magula", "xcode", "atelier-dune-dark", "atelier-plateau-dark", "color-brewer", "grayscale", "mono-blue", "solarized-dark", "zenburn", "atelier-dune-light", "atelier-plateau-light", "dark", "hopscotch", "monokai", "solarized-light", "atelier-estuary-dark", "atelier-savanna-dark", "darkula", "hybrid", "monokai-sublime", "sunburst", "atelier-estuary-light", "atelier-savanna-light", "default", "idea", "obsidian", "tomorrow"];

    var add_or_hide_shadow = function() {
      var darkness_ratio = $('.hljs').css('background-color')
                                        .replace(/rgba?\((\d+, \d+, \d+)\).*/, "$1")
                                        .split(/\s*,/)
                                        .reduce(function(s, c) { return s + parseFloat(c) }, 0)/3;
      
/*
      console.log($('.hljs').css('background'), $('.hljs').css('background-color'));
      console.log(darkness_ratio);
      if(darkness_ratio > 127.5) $('pre code').addClass('shadow');
      else $('pre code').removeClass('shadow')
*/
    }
    document.add_or_hide_shadow = add_or_hide_shadow;

    var change_theme = function(theme) { 
      ((theme || '').length > 0) && $('#theme').attr('href', ['/css/', theme, '.css'].join('')) 
      $('#styles select').val(theme);
      add_or_hide_shadow();
    }

    document.theme_switcher = setInterval(function() { change_theme(themes[themes.length.random()]) }, (10).seconds());
    
    var sorted_by_strlen = themes.map(function(s) { return s.length }).sort(function (a, b) { return (a < b)? -1: 1}),
        max = sorted_by_strlen[sorted_by_strlen.length-1],
        nspaces = function(theme) { return (parseInt((max - theme.length)/2)).map(function(e) { return '&nbsp;';}).join('')},
        options = themes.map(function(theme) {
          return ['<option value ="', theme, '" title= "',theme,'">', nspaces(theme) , theme, '</option>'].join("");
        }).join('');
    return ['<select title="change code style" id ="', id, '" >', options, '</select>'].join('');
  }

  $('#styles').append(stylelist());
  $('select').on('change', function() { 
    $('#theme').attr('href', ['/css/', $(this).val(), '.css'].join('')) 
    document.add_or_hide_shadow();
    document.theme_switcher && (function() { clearInterval(document.theme_switcher); delete theme_switcher; })(); //stop halt auto theme changer
  });

  ($_ = function(){ $('#clock').html((0).seconds().from_now().to_human()) })(); 
  setInterval($_, (1).second());

  $( document ).tooltip({
    tooltipClass:'tooltip'
  });
   
  (demo = function() {

        //cascade example methods using <i>send</i> and <i>reduce</i>

    var build_demo = function(n, methods) { 
          return { 
            method: ["(", n, ").",
                      methods.map(function(m) {
                        return m + "()";
                      }).join(".")
                    ].join('') + ";",
            output: (methods.reduce(function(n, method) { 
              return n.send(method)
            }, n) + "").replace(/(\d{2}:\d{2}:\d{2})/, "<em>$1</em>")
          }
        }, 

        //keep comments vertically aligned and easy to read 
        //emulates printf "%42s" since the maximum cascaded method
        //is 42 characters in length

        pad = function(n, s) {
          return (n - s.length).map(function() { 
            return ' ' 
          }).join('');
        },
      
        //with the two helpers above, 
        //iterate through date methods and cascade them with the 
        //date calcuclations: <i> from_now </i> / <i> ago </i> 
        //finished with the 
        //readable date method <i> to_human </i>

        recompute_timestamps = ["", 
          "from_now", 
          "ago"].map(function(time_method) {
          return ["milliseconds", 
                  "seconds", 
                  "minutes", 
                  "hours", 
                  "days"].map(function(duration) { 
                     return (time_method.length == 0)? 
                       build_demo(30, [duration]) : 
                       build_demo(30, [duration, time_method, 'to_human']);
                  });
        }), 

        //build markup after flatting array generated above

        code_demo = [].
                    concat.
                    apply([], recompute_timestamps).
                    map(function(example, i) {
                      return [example.method, 
                              pad(42, example.method), 
                              "//&#8594; ", 
                              example.output, 
                              (((i+1)%5)==0)? "\n": ""].join("");
                    }).join("\n");
    
    //apply <em>code demo</em> and reload syntax highlighting

    $($('#live_example')[0]).html(
      ["//Legible Date/Time calculations\n\n", 
       code_demo].join('')
    );
    hljs.highlightBlock($('#live_example')[0]);

  })();

  setInterval(demo, (1).second()); //reload demo every second

  hljs.initHighlightingOnLoad();
  $('pre code').addClass('shadow');

  $('#release').on('click', function() {
    var escapeHTML =function escapeHtml(string) {
      return String(string).replace(/[&<>"'\/]/g, function (s) {
        return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': '&quot;', "'": '&#39;', "/": '&#x2F;' }[s];
      });
    }
    $.get('http://numberjs.dragonwrench.com/js/number.js', function(src) {
      $('body').prepend(['<pre><code class="JavaScript">', escapeHTML(src), '</code></pre>'].join(''))
      hljs.highlightBlock($('pre code')[0]);
      $($('pre code')[0]).addClass('shadow');
    });
  });


})();
