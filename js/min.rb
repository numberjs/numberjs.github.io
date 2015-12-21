require 'uglifier'
File.open('number.min.js', 'w') {|fd|
  fd.write(Uglifier.compile(File.read('number.js')))
}
