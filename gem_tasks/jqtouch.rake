require 'fileutils'
require 'lib/handle_js_files'

# Compass generator for jqtouch 3.5+
JQTOUCH_SRC = File.join(GEM_ROOT, 'src', 'jqtouch')
JQTOUCH_SRC_STYLESHEETS = File.join(JQTOUCH_SRC, 'css')
JQTOUCH_SRC_IMAGES = File.join(JQTOUCH_SRC, 'images')
JQTOUCH_SRC_THEMES = File.join(JQTOUCH_SRC, 'themes')

JQTOUCH_DEST_TEMPLATES = File.join(GEM_ROOT, 'templates', 'jqtouch')
JQTOUCH_DEST_STYLESHEETS = File.join(JQTOUCH_DEST_TEMPLATES, 'jqtouch')
JQTOUCH_DEST_THEMES = File.join(JQTOUCH_DEST_TEMPLATES, 'jqtouch')
JQTOUCH_DEST_IMAGES = File.join(JQTOUCH_DEST_STYLESHEETS)

JQTOUCH_MESSAGE1 = "# Generated by compass-jquery-plugin/gem-tasks/jqtouch.rake\n# Install with: compass install jquery/jqtouch\n\n"
JQTOUCH_MESSAGE2 = "// Generated by compass-jquery-plugin/gem-tasks/jqtouch.rake\n\n"

all_scripts = [
  'js/jqtouch.js',
  'js/jqtouch.transitions.js',
  'js/mod_spinningwheel.js',
  'js/zflow.js',
  'js/jqtouch-ical.js',  
  'js/extensions/jqt.autotitles.js',
  'js/extensions/jqt.floaty.js',
  'js/extensions/jqt.gestures.js',
  'js/extensions/jqt.location.js',
  'js/extensions/jqt.offline.js',
  'js/extensions/jqt.scaling.js',
  'js/extensions/jqt.scrolling.js',
  'js/extensions/jqt.sliding.js'
].collect {|filename| File.read(File.join(JQTOUCH_SRC, filename))}.join "\n\n"

all_stylesheets = [
  'css/jqtouch.css',
  'css/scrolling.css',
  'css/spinningwheel.css',
  'css/zflow.css',
  'css/jqtouch-ical.css'  
].collect {|filename| File.read(File.join(JQTOUCH_SRC, filename))}.join "\n\n"

namespace :build do
  desc 'Build the stylesheets and templates for jqtouch.'
  task :jqtouch do    
    
    FileUtils.remove_dir JQTOUCH_DEST_TEMPLATES if File.exists? JQTOUCH_DEST_TEMPLATES 
    FileUtils.mkdir_p(File.join(JQTOUCH_DEST_TEMPLATES, 'config', 'initializers'))
    
    open File.join(JQTOUCH_DEST_TEMPLATES, 'manifest.rb'), 'w' do |manifest|
      manifest.print JQTOUCH_MESSAGE1
      
      open File.join(JQTOUCH_DEST_TEMPLATES, 'config', 'initializers', 'jqtouch.rb'), 'w' do |f|
        f.print(File.read(File.join(JQTOUCH_SRC, 'config', 'initializers', 'jqtouch.rb')))
      end
      manifest.print "file 'config/initializers/jqtouch.rb'\n"  
    
      #JavaScripts
    
      open File.join(JQTOUCH_DEST_TEMPLATES, 'jquery.jqtouch.js'), 'w' do |f|
        f.print concat_files(all_scripts)
      end
      manifest.print "javascript 'jquery.jqtouch.js'\n"
    
      open File.join(JQTOUCH_DEST_TEMPLATES, 'jquery.jqtouch.min.js'), 'w' do |f|
        f.print compress_js(all_scripts, "yui")
      end
      manifest.print "javascript 'jquery.jqtouch.min.js'\n"
      
      # Stylesheets
      FileUtils.mkdir_p(JQTOUCH_DEST_STYLESHEETS)
      
      open File.join(JQTOUCH_DEST_STYLESHEETS, 'jqtouch.scss'), 'w' do |f|
        sass = JQTOUCH_MESSAGE2 
        IO.popen("sass-convert -F css -T scss", 'r+') { |ff| ff.print(all_stylesheets); ff.close_write; sass += ff.read }
        f.print sass
      end
      manifest.print "stylesheet 'jqtouch/jqtouch.scss'\n"
      
      Dir.foreach File.join(JQTOUCH_SRC, 'css') do |file|
        next unless /\iphone-emulator.css$/ =~ file        
        css = File.read File.join(JQTOUCH_SRC, 'css', file)
        sass = ''
        IO.popen("sass-convert -F css -T scss", 'r+') { |f| f.print(css); f.close_write; sass = f.read }
        open(File.join(JQTOUCH_DEST_STYLESHEETS, file.gsub(/\.css$/,'.scss')), 'w') do |f|
          f.write JQTOUCH_MESSAGE2 + sass
        end
        manifest.print "stylesheet 'jqtouch/#{file.gsub(/\.css$/,'.scss')}'\n"
      end

      # iPhone Images  
      
      # Copy the images directory
      src_dir = JQTOUCH_SRC_IMAGES
      dest_dir = JQTOUCH_DEST_IMAGES   
      
      Dir.foreach(src_dir) do |image|
        next unless /\.png$/ =~ image
        FileUtils.cp(File.join(src_dir, image), dest_dir)    
        manifest.print "image 'jqtouch/#{image}'\n"
      end
      
      # iCal Images
      FileUtils.mkdir_p(File.join(JQTOUCH_DEST_IMAGES, 'ical'))    
      src_dir = File.join(JQTOUCH_SRC_IMAGES, 'ical')
      dest_dir = File.join(JQTOUCH_DEST_IMAGES, 'ical')      
      Dir.foreach(src_dir) do |image|
        next if /^\./ =~ image
        FileUtils.cp(File.join(src_dir, image), dest_dir)    
        manifest.print "image 'jqtouch/ical/#{image}'\n"
      end 
      
      # iPhone Icons    
      FileUtils.mkdir_p(File.join(JQTOUCH_DEST_IMAGES, 'icons'))    
      src_dir = File.join(JQTOUCH_SRC_IMAGES, 'icons')
      dest_dir = File.join(JQTOUCH_DEST_IMAGES, 'icons')      
      Dir.foreach(src_dir) do |image|
        next if /^\./ =~ image
        FileUtils.cp(File.join(src_dir, image), dest_dir)    
        manifest.print "image 'jqtouch/icons/#{image}'\n"
      end 
      
      # Spinning wheel images    
      FileUtils.mkdir_p(File.join(JQTOUCH_DEST_IMAGES, 'sw'))  
      src_dir = File.join(JQTOUCH_SRC_IMAGES, 'sw')
      dest_dir = File.join(JQTOUCH_DEST_IMAGES, 'sw')      
      Dir.foreach(src_dir) do |image|
        next if /^\./ =~ image
        FileUtils.cp(File.join(src_dir, image), dest_dir)    
        manifest.print "image 'jqtouch/sw/#{image}'\n"
      end      
      
      # glyphish Images
      FileUtils.mkdir_p(File.join(JQTOUCH_DEST_IMAGES, 'glyphish', 'icons'))   
       
      src_dir = File.join(JQTOUCH_SRC_IMAGES, 'glyphish', 'icons')
      dest_dir = File.join(JQTOUCH_DEST_IMAGES, 'glyphish', 'icons')      
      Dir.foreach(src_dir) do |image|
        next if /^\./ =~ image
        FileUtils.cp(File.join(src_dir, image), dest_dir)    
        manifest.print "image 'jqtouch/glyphish/icons/#{image}'\n"
      end
      FileUtils.mkdir_p(File.join(JQTOUCH_DEST_IMAGES, 'glyphish', 'mini-icons'))    
      src_dir = File.join(JQTOUCH_SRC_IMAGES, 'glyphish', 'icons')
      dest_dir = File.join(JQTOUCH_DEST_IMAGES, 'glyphish', 'mini-icons')      
      Dir.foreach(src_dir) do |image|
        next if /^\./ =~ image
        FileUtils.cp(File.join(src_dir, image), dest_dir)    
        manifest.print "image 'jqtouch/glyphish/mini-icons/#{image}'\n"
      end 
      
      open File.join(JQTOUCH_DEST_IMAGES, 'glyphish', 'Read me first - license.txt'), 'w' do |f|
        f.print(File.read(File.join(JQTOUCH_SRC_IMAGES, 'glyphish', 'Read me first - license.txt')))
      end
      manifest.print "image 'jqtouch/glyphish/Read me first - license.txt'\n"
      
      # jQuery jQTouch Themes

      FileUtils.mkdir_p(JQTOUCH_DEST_THEMES)
      
      Dir.foreach JQTOUCH_SRC_THEMES do |theme|
        next if /^\./ =~ theme
  
#        # Copy the stylesheets#      
#        Dir.foreach File.join(JQTOUCH_SRC_THEMES, "#{theme}") do |file|
#          next unless /\.css$/ =~ file          
#          css = File.read File.join(JQTOUCH_SRC_THEMES, "#{theme}", file)            
#          open File.join(JQTOUCH_DEST_THEMES, file), 'w' do |f|
#            f.print(css)
#          end
#          manifest.print "file 'public/stylesheets/jqtouch/#{file}'\n"
#        end
  
        # Convert the stylesheets      
        Dir.foreach File.join(JQTOUCH_SRC_THEMES, "#{theme}") do |file|
          next unless /\.css$/ =~ file
          css = File.read File.join(JQTOUCH_SRC_THEMES, "#{theme}", file)
          sass = ''
          IO.popen("sass-convert -F css -T scss", 'r+') { |f| f.print(css); f.close_write; sass = f.read }
          open File.join(JQTOUCH_DEST_THEMES, "jqt.#{theme}.scss"), 'w' do |f|
            f.write JQTOUCH_MESSAGE2 + sass
          end
          manifest.print "stylesheet 'jqtouch/jqt.#{theme}.scss', :media => 'screen, projection'\n"
        end

        # Copy the theme images directory
        src_dir = File.join(JQTOUCH_SRC_THEMES, theme, 'images')
        dest_dir = File.join(JQTOUCH_DEST_IMAGES, "#{theme}")
        FileUtils.mkdir_p dest_dir
        
        Dir.foreach(src_dir) do |image|
          next if /^\./ =~ image
          FileUtils.cp(File.join(src_dir, image), dest_dir)    
          manifest.print "image 'jqtouch/#{theme}/#{image}'\n"
        end
      end
    end
  end
end