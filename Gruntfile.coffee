module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt);

  version = ->
    grunt.file.readJSON("package.json").version
  version_tag = ->
    "v#{version()}"

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    minified_comments: "/* range.js #{version_tag()} | (c) 2015-<%= grunt.template.today('yyyy') %> by doukit http://rangejs.doukit.org/ */\n"

    uglify:
      options:
        mangle:
          except: ['jQuery']
        banner: "<%= minified_comments %>"
      minified_range_js:
        files:
          'assets/range.min.js': ['assets/range.js']

    cssmin:
      minified_range_css:
        options:
          banner: "<%= minified_comments %>"
          keepSpecialComments: 0
        src: 'assets/range.css'
        dest: 'assets/range.min.css'

  grunt.registerTask 'postBuild', 'some post task after build', () ->
    content = grunt.file.read("README.md");
    len = content.length
    content = content.substring(0, len - 11)
    date = grunt.template.date(new Date(), 'yyyy-mm-dd');
    grunt.file.write("README.md", content + "\n" + date)

  grunt.registerTask 'default', ['build', 'postBuild']
  grunt.registerTask 'build', ['uglify', 'cssmin']
