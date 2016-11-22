var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
        dev: {
            tasks: [ 'webpack:dev', 'exec:watch_server' ],
            options: { logConcurrentOutput: true }
        }
    },
    webpack: {
        options: require('./webpack.config'),
        dev: {
            watch: true,
            keepalive: true
        },
        build: {}
    },
    exec: { watch_server: 'babel-watch ./server.js' }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('build', [ 'webpack:build' ]);
  grunt.registerTask('dev', [ 'concurrent:dev' ]);
};
