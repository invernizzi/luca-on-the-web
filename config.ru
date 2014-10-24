require 'rack'
require 'rack/contrib/try_static'
require 'newrelic_rpm'
require 'new_relic/agent/instrumentation/rack'
require 'rack/rewrite'


class CacheSettings
  def initialize app, pat
    @app = app
    @pat = pat
  end


  def call env
    res = @app.call(env)
    path = env["REQUEST_PATH"]
    @pat.each do |pattern,data|
      if path =~ pattern
        res[1]["Cache-Control"] = data[:cache_control] if data.has_key?(:cache_control)
        res[1]["Expires"] = (Time.now + data[:expires]).utc.rfc2822 if data.has_key?(:expires)
        return res
      end
    end
    res
  end
end

# [ WEBSERVER ] ---------------------------------------------------------------

# First, normalize the requests
use Rack::Rewrite do
    rewrite '/cv.html', '/'
    rewrite '/pdf/Luca_Invernizzi_cv_english.pdf', '/files/luca_invernizzi_resume.pdf'
end

# Set expiration
use CacheSettings, {
  // =>
     { :cache_control => "max-age=86400, public",
      :expires => 86400
    }
}

# Compress
use Rack::Deflater

# Try the static content
use Rack::TryStatic,
    root: "build",  # static files root dir
    urls: %w[/],     # match all requests
    try: ['.html', 'index.html', '/index.html'] # try these postfixes sequentially
# Otherwise, 404
run proc { |app|
  [
    404,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=60'
    },
    File.open('build/404/index.html', File::RDONLY)
  ]
}
