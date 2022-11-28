#!/usr/bin/env ruby

if ARGV.empty?
  puts "USAGE: #{File.basename(__FILE__)} [posts.yaml] [ghost-posts.json]"
  exit 1
end

require "yaml"
require "json"

infile = ARGV[0] || "posts.yaml"
outfile = ARGV[1] || "ghost-posts.json"

posts = YAML.load_file(infile)
ghost_posts = posts.map do |post|
  {
    title: post["title"]
  }
end

p ghost_posts.last

ghost_data = {
  meta: {
    "exported_on": Time.now.to_i*1000,
    "version": "5.32.0"
  },
  data: {
    posts: posts
  }
}

File.write outfile, JSON.pretty_generate(ghost_data)
