# ========================================================================
# Site settings
# ========================================================================
PRODUCTION_URL = 'http://www.lucainvernizzi.net'
DEVELOPEMENT_URL = 'http://127.0.0.1:4567/'
set :url_root,              PRODUCTION_URL
set :site_url_production,   PRODUCTION_URL
set :site_url_development,  DEVELOPEMENT_URL
set :site_url,              PRODUCTION_URL
configure :development do
  set :site_url,            DEVELOPEMENT_URL
end
set :site_title,            'Luca Invernizzi'
set :site_description,      "Luca Invernizzi's personal web site."
set :css_dir,               'css'
set :js_dir,                'js'
set :images_dir,            'img'

set :sass, line_comments: false, style: :nested

# Blog (has to be before directory_indexes)
set :haml, { ugly: true }
activate :blog do |blog|
  blog.prefix = "blog"
  blog.sources = "articles/:year-:month-:day-:title.html"
  blog.layout = "blog_article"
  blog.summary_separator = /(READMORE)/
  blog.summary_length = 250
  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page/{num}"
end
page "blog/feed.xml", layout: false
activate :syntax
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true

# Internationalization
activate :i18n
# Use relative URLs
activate :relative_assets
# Pretty URLs
activate :directory_indexes
# Enable Bourbon
activate :bourbon

# Sitemap URLs (use trailing slashes). Create additional variables here
# for referenceing your pages.
set :url_home,              "/"

# ========================================================================
# Page options, layouts, aliases and proxies
# ========================================================================

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html",
# :locals => {:which_fake_page => "Rendering a fake page with a local
# variable" }

# ========================================================================
# Helpers
# ========================================================================

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

helpers do

  # Gets partials from the _partials directory
  def _partial(partial_filename)
    partial "_partials/#{partial_filename}"
  end

  # Formats li item, and determines when to put class=active on li element
  # (according to Bootstrap 3.1.1 spec)
  def nav_li(label, url, css_class="", icon="")

    # Determine if icon is specified
    nav_icon = ""
    unless icon.nil? or icon.empty?
      nav_icon = " <i class='fa #{icon}'></i>"
    end

    # Normalize name string for use as HTML class
    li_classes = ""
    unless css_class.nil? or css_class.empty?
      # Assign processed name to variable
      li_classes = "#{css_class}"
    else
      label_formatted = label.downcase.tr(" ", "-")
      li_classes = "nav-item-#{label_formatted}"
    end

    if current_page.url == url
      li_classes += " active"
    end

    "<li class='#{li_classes}'><a href='#{url}'>#{label}#{nav_icon}</a></li>"
  end

end

# ========================================================================
# Analytics
# ========================================================================
activate :google_analytics do |ga|
  ga.tracking_id = 'UA-651614-13'
  ga.minify = true
end


# ========================================================================
# Comments
# ========================================================================
activate :disqus do |d|
    d.shortname = '0x1badfeed'
end


# ========================================================================
# Sitemap
# ========================================================================
# Workaround for: https://github.com/Aupajo/middleman-search_engine_sitemap/issues/2
# Filewatcher ignore list
set :file_watcher_ignore,[
    /^bin(\/|$)/,
    /^\.bundle(\/|$)/,
#        /^vendor(\/|$)/,
    /^node_modules(\/|$)/,
    /^\.sass-cache(\/|$)/,
    /^\.cache(\/|$)/,
    /^\.git(\/|$)/,
    /^\.gitignore$/,
    /\.DS_Store/,
    /^\.rbenv-.*$/,
    /^Gemfile$/,
    /^Gemfile\.lock$/,
    /~$/,
    /(^|\/)\.?#/,
    /^tmp\//
  ]
activate :search_engine_sitemap, default_change_frequency: 'daily'

# ========================================================================
# Spellcheck
# ========================================================================
require 'mkmf'
unless find_executable('aspell').nil?
  OK_SPELLINGS = File.readlines('spell.txt').map{|l|l.gsub!(/\n/ , '')}
  # activate :spellcheck, allow: OK_SPELLINGS, ignored_exts: [".xml", ".png"]
end

# ========================================================================
# Build-specific configuration
# ========================================================================
configure :build do
  set :site_url, "#{site_url_production}"
  set :sass, style: :compressed
  activate :minify_css
  activate :minify_html, remove_input_attributes: true
  activate :minify_javascript, inline: true
  activate :gzip
  # Enable cache buster
  activate :asset_hash, :exts => ['.css', '.png', '.jpg', '.gif']
  # Create favicon and device-specific icons
  activate :favicon_maker, :icons => {
    "img/favicon.ico" => [
      { icon: "apple-touch-icon-152x152-precomposed.png" },
      { icon: "apple-touch-icon-144x144-precomposed.png" },
      { icon: "apple-touch-icon-120x120-precomposed.png" },
      { icon: "apple-touch-icon-114x114-precomposed.png" },
      { icon: "apple-touch-icon-76x76-precomposed.png" },
      { icon: "apple-touch-icon-72x72-precomposed.png" },
      { icon: "apple-touch-icon-60x60-precomposed.png" },
      { icon: "apple-touch-icon-57x57-precomposed.png" },
      { icon: "apple-touch-icon-precomposed.png", size: "57x57" },
      { icon: "apple-touch-icon.png", size: "57x57" },
      { icon: "favicon-196x196.png" },
      { icon: "favicon-160x160.png" },
      { icon: "favicon-96x96.png" },
      { icon: "favicon-32x32.png" },
      { icon: "favicon-16x16.png" },
      { icon: "favicon.png", size: "16x16" },
      { icon: "favicon.ico", size: "64x64,32x32,24x24,16x16" },
      { icon: "mstile-144x144", format: "png" },
    ]
  }

end
