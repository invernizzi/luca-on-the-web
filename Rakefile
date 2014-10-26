desc "Check all external links"
task :check_links do
  require 'link_checker'
  LinkChecker.new(
    target: 'build',
    options: {
      warnings_are_errors: true
    }).check_uris
end

desc "Build static site"
task :build do
  `bundle exec middleman build`
end

desc "Test"
task :test do
  Rake::Task[:build].invoke
  Rake::Task[:check_links].invoke
end


desc 'Optimize images'
task :optimize_images do
  `bundle exec image_optim -r source/img`
end
