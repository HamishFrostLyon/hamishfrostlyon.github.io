source "https://rubygems.org"

# Jekyll and plugins (for GitHub Actions build)
gem "jekyll", "~> 4.3.0"
gem "jekyll-sitemap"
gem "jekyll-feed"
gem "jekyll-responsive-image"

# Additional gems for development and testing
group :development, :test do
  gem "html-proofer"
  gem "rake"
end

# Windows and JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]