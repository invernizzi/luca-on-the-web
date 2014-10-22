require 'rack'
require 'rack/contrib/try_static'

use Rack::TryStatic,
    root: "build",  # static files root dir
    urls: %w[/],     # match all requests
    try: ['.html', 'index.html', '/index.html'] # try these postfixes sequentially

# otherwise 404 NotFound
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
