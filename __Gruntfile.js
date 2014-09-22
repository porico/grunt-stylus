module.exports = function(grunt) {

	//plugin
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/*
		task: {
			- targetは、taskをグループ化したもの
			- 複数のtargetを記述できる
			- target名は自分で決めてよい
			- target名は省略もできるが、省略するとsettingができない
			target1: {
				setting
			},
			target2: {
				setting
			}
		}
		*/
		stylus: {
			//options for all targets
			options: {
				compress: false
			},
			
			compile1: {
				src: 'src/css/**/*.styl',
				dest: 'htdocs/css/style.css'
				
				// files: {
					// 'htdocs/css/style.css': ['src/css/style1.styl', 'src/css/style2.styl'] 
					// 'htdocs/css/style.css': 'src/css/**/*.styl'
				//}
			},
			compile2: {
				/*options: {
					compress: false
				},*/
				files: {
					'htdocs/css/style2.css': ['src/css/style2.styl']
				}
			}
		},

		csslint: {
			strict: {
				options: {
					import: 2
				},
				// src: 'htdocs/css/**/*.css'
				files: '<%= stylus.compile1.dest %>'
			}
		},

		cssmin: {
			combine: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
				},
				files: {
					'htdocs/css/styles.min.css': '<%= stylus.compile1.dest %>'
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 1001,
					// hostname: '0.0.0.0',
					base: 'htdocs',
					livereload: true,
					// open: true
				}
			}
		},
		
		watch: {
			css: {
				files: 'src/css/**/*.styl',
				tasks: ['stylus', 'csslint', 'cssmin'],
				options: {
					livereload: true
				}
			}
		}

	});

	//task
	grunt.registerTask('default', ['stylus', 'csslint', 'cssmin', 'connect', 'watch']);

	grunt.registerTask('compile1', 'stylus:compile1');
	grunt.registerTask('compile2', 'stylus:compile2');


};