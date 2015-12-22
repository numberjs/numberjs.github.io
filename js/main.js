(function() {
  var stylelist = function() {
    var id = 'current_theme';
    var themes = [
      "atelier-cave-dark",
      "atelier-dune-dark",
      "atelier-estuary-dark",
      "atelier-forest-dark",
      "atelier-heath-dark",
      "atelier-lakeside-dark",
      "atelier-plateau-dark",
      "atelier-savanna-dark",
      "atelier-seaside-dark",
      "atelier-sulphurpool-dark",
      "dark",
      "darkula",
      "ir-black",
      "kimbie.dark",
      "paraiso-dark",
      "railscasts",
      "solarized-dark",
    ]
    
    var change_theme = function(theme) { 
      ((theme || '').length > 0) && $('#theme').attr('href', ['/css/', theme, '.css'].join('')) 
      $('#styles select').val(theme);
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
    document.theme_switcher && (function() { clearInterval(document.theme_switcher); delete theme_switcher; })(); //stop halt auto theme changer
  });

  ($_ = function(){ $('#clock').html((0).seconds().from_now().to_human()) })(); 
  setInterval($_, (1).second());

  $( document ).tooltip({
    tooltipClass:'tooltip'
  });

   
  (demo = function() {

        //cascade example methods using send & reduce

    var build_demo = function(n, methods) { 
          return { 
            method: [ "(", n, ").",methods.map(function(m) {return m + "()";}).join(".")].join('') + ';',
            output: (methods.reduce(function(n, method) { return n.send(method)}, n) + "").replace(/(\d{2}:\d{2}:\d{2})/, "<em>$1</em>")
          }
        }, 

        //keep comments vertically aligned and easy to read 

        pad = function(n, s) {
          return (n - s.length).map(function() { return ' ' }).join('');
        },
      
        //with the two helpers above iterate through basic methods and cascade them with the 
        //human friendly method <i> to_human </i>

        recompute_timestamps = ["", "from_now", "ago"].map(function(time_method) {
          return ["milliseconds", "seconds", "minutes", "hours", "days"].map(function(duration) { 
             //return (time_method.length == 0)? build_demo((30).random(), [duration]) : build_demo((30).random(), [duration, time_method, 'to_human']);
             return (time_method.length == 0)? build_demo(30, [duration]) : build_demo(30, [duration, time_method, 'to_human']);
          });
        }), 

        //build markup after flatting array generated above

        markup = [].concat.apply([], recompute_timestamps).map(function(example, i) {
          return [example.method, pad(42, example.method), "//&#8594; ", example.output, (((i+1)%5)==0)? "\n": ""].join("");
        }).join("\n");
    
    //apply markup and reload syntax highlighting

    $($('pre code')[0]).html(["//Legible Date/Time calculations\n\n", markup].join(''));
    hljs.highlightBlock($('pre code')[0]);
    //$('code em').css('color', '#2ee');

  })();
  setInterval(demo, (1).second()); //reload example every second

  hljs.initHighlightingOnLoad();
})();
