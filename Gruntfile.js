module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      dev: {
        files: {
          'dist/app.js': ['scripts/load.coffee', 'scripts/app.coffee', 'scripts/menu.coffee', 'scripts/gameover.coffee', 'scripts/game.coffee'],
        },
        options: {
          join: true
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
    },

    bowerInstall: {

      target: {

        // Point to the files that should be updated when
        // you run `grunt bower-install`
        src: [
          '*.html'   // .html support
        ],

        // Optional:
        // ---------
        cwd: '',
        dependencies: true,
        devDependencies: false,
        exclude: [],
        fileTypes: {},
        ignorePath: ''
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-bower-install');

  grunt.registerTask('default', ['coffee']);

};