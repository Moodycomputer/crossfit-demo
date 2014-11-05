module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: 8000,
					livereload: false,
					base: ''
				}
			}
		},

		assemble: {
			options: {
				layout: 'layout.mmm',
				layoutdir: '_source/views/layouts/',
				partials: '_source/views/partials/*.mmm',
			},
			pages: {
				files: [{
					cwd: '_source/views/',
					dest: '',
					expand: true,
					src: '*.mmm',
				}]
			}
		},

		less: {
			master:{
				options: {
					paths: ["_source/public/styles"]
				},
				files: {
					"public/styleguide/master.css": "_source/public/styles/master.less"
				}
			},
		},

		copy: {
			public: {
				files:[ 
					{expand: true, flatten: true, src: ['_source/public/images/*'], dest: 'public/images' , filter: 'isFile'},
					{expand: true, flatten: true, src: ['_source/public/scripts/*'], dest: 'public/scripts' , filter: 'isFile'},
				]
			}
		},

		watch: {
			html: {
				files: ['_source/**/*.mmm'],
				tasks: ['assemble']
			},
			less: {
				files: ['_source/public/styles/*.less'],
				tasks: ['less']
			},
			uncompiled: {
				files: ['_source/public/images/*', '_source/public/scripts/*'],
				tasks: ['copy']
			}
		}

		
	});

	/* load every plugin in package.json */
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('assemble');

	/* grunt tasks */
	grunt.registerTask('serve', ['copy', 'less', 'assemble', 'connect:server', 'watch']);

};