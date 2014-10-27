require 'watir-webdriver'


module Resume

  URL = 'http://www.lucainvernizzi.net'

  def self.build
    browser.goto(URL)
    browser.button(id: 'show-resume-button').when_present.click
    sleep 1
    browser.link(id: 'print').when_present.click
  rescue Exception => e
    puts e.message
  ensure
    browser.close
  end

  def self.browser
    @browser ||= Watir::Browser.new :chrome
  end

end
