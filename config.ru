require 'rack'
require 'rack/contrib/try_static'
require 'newrelic_rpm'
require 'new_relic/agent/instrumentation/rack'
require 'rack/rewrite'
require 'rack-zippy'

# First, normalize the requests
use Rack::Rewrite do
    rewrite '/cv.html', '/'
end

use Rack::Zippy::AssetServer, 'build'

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
