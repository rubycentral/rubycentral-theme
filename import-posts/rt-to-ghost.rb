#!/usr/bin/env ruby

if (ARGV & %w[-h --help]).any?
  puts "USAGE: #{File.basename(__FILE__)} [posts.yaml] [posts.json]"
  exit 1
end

def filter_html(html)
  html
    .gsub(/\A\n*<h1.*?>.*?<\/h1>\n+/, '')
    .gsub(/\A\n*<h2.*?>.*?<\/h2>\n+/, '')
end

require "yaml"
require "json"
require "time"

infile = ARGV[0] || "posts.yaml"
outfile = ARGV[1] || "posts.json"

posts = YAML.load_file(infile)
ghost_posts = posts.map do |post|
  {
    title: post["title"],
    status: "published",
    published_at: Time.parse(post["published_at"]).to_i*1000,
    html: filter_html(post["content_cache"])
  }
end

# pp posts.last
# pp ghost_posts.last
# ghost_posts.each do |post|
#   puts post[:html].lines.grep(/h1|h2/)
#   puts
# end

# ghost_posts = ghost_posts.find_all do |post|
#   post[:title] =~ /Navigating RubyConf2022 As A Newcomer/i
# end

# ghost_posts = ghost_posts.sample(2)

ghost_data = {
  meta: {
    exported_on: Time.now.to_i*1000,
    version: "5.23.0"
  },
  data: {
    posts: ghost_posts
  }
}

File.write outfile, JSON.pretty_generate(ghost_data)

system("node json-to-ghost.js")

puts "Import available at: ruby-together-posts.json"
