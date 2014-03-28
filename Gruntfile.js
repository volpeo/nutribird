module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      dev: {
        files: {
          'dist/app.js': 'scripts/app.coffee',
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          keepalive: true
        }
      }
    },

    watch: {
      options: {
          livereload: true
      },
      coffee: {
        files: ['**/*.coffee'],
        tasks: ['coffee', 'notify'],
        options: {
          spawn: false
        }
      },
    },

    notify: {
      watch: {
        options: {
          title: 'Assets are ready',
          message: 'You can reload your browser, or I can do it for you sir.'
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('default', ['coffee']);

};