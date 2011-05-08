# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require 'lib/jquery'

Gem::Specification.new do |s|
  s.name        = "compass-jquery-plugin"
  s.version     = Compass::Jquery::Plugin::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Kosmas Schuetz"]
  s.email       = "kosmas.schuetz@gmx.com"
  s.homepage    = "http://github.com/kosmas58/compass-jquery-plugin"
  s.summary     = %q{A compass plugin to integrate jQuery}
  s.description = %q{This plugin integrates jQuery, jQuery UI and Themes, jqGrid and more into the Compass Sass framework.}
  
  s.add_dependency("haml", ["~> 3.1.1"])
  s.add_dependency("compass", ["~> 0.11.1"])
  s.add_dependency("ri_cal", [">= 0.8.8"])
   
  s.add_development_dependency("rspec", ["~> 2.5.0"])
  
  s.files  = Dir['lib/**/*.rb']
  s.files += Dir['templates/**/*']
  s.files += ['Rakefile', 'Gemfile', 'README.md', 'LICENSE.md', 'VERSION.yml']

  s.require_paths = ["lib"]
end
