module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.initConfig({
        uglify: {
          my_target: {
            files: {
                '../js/script.js':['../_working/js/*.js'] 
            }
          }
        },
        compass: {
            dev: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        watch: {
            options: { livereload: true },
            scripts: {
                files: ['../_working/js/*.js'],
                tasks: ['uglify']
            },
            sass: {
                files: ['../_working/sass/*.scss'],
                tasks: ['compass:dev']
            }
        }
    }) //initconfig
    grunt.registerTask('default', 'watch');
} // exports