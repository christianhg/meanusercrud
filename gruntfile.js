module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concurrent: {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        }
    },

    nodemon: {
      dev: {
        script: 'app.js'
      }
    },

    watch: {
      js: {
        files: [
          'src/js/app.js'
        ],
        tasks: [
          'jshint', 
          'concat', 
          'uglify'
        ],
        options: {
          livereload: true
        }
      },
      css: {
        files: [
          'src/sass/*.scss'
        ],
        tasks: [
          'sass', 
          'cssmin'
        ],
        options: {
          livereload: true
        }
      },
      images: {
        files: ['public/img/**/*.{png,jpg,gif}', 'public/img/**/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          livereload: true
        }
      },
      html:{
        files: [
          'public/**/*.html'
        ],
        tasks: [],
        options: {
          livereload: true
        }
      }
    },

    concat: {
      dist: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/angular-resource/angular-resource.js',
          'src/js/app.js'
        ],
        dest: 'public/js/app.js',
      }
    },

    uglify: {
        build: {
            src: 'public/js/app.js',
            dest: 'public/js/app.min.js'
        }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/css/style.css': 'src/sass/style.scss'
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          'public/css/style.min.css': [
            'public/css/style.css'
          ]
        }
      }
    },

    jshint: {
      all: {
        src: ['gruntfile.js', 'app.js', 'app/**/*.js', 'src/js/app.js'],
        options: {
            jshintrc: true
        }
      }
    }

  });
  
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.option('force', true);

  grunt.registerTask('default', ['jshint', 'concurrent']);

};