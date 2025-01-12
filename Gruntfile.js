/**
 * Grunt Tasks JavaScript.
 *
 * @package    Wplegalpages
 * @subpackage Wplegalpages
 * @author     wpeka <https://club.wpeka.com>
 */

module.exports = function (grunt) {

	'use strict';

	// Project configuration.
	grunt.initConfig(
		{

			pkg: grunt.file.readJSON( 'package.json' ),
			clean: {
				build: ['release/<%= pkg.version %>']
			},
			uglify: {
				options: {

				},
				admin: {
					files: [{
						expand: true,
						cwd: 'release/<%= pkg.version %>/admin/js/',
						src: [
						'*.js',
						'!*.min.js',
						'!vue/'
						],
						dest: 'release/<%= pkg.version %>/admin/js/',
						ext: '.min.js'
					}]
				},
				frontend: {
					files: [{
						expand: true,
						cwd: 'release/<%= pkg.version %>/public/js/',
						src: [
						'*.js',
						'!*.min.js'
						],
						dest: 'release/<%= pkg.version %>/public/js/',
						ext: '.min.js'
					}]
				},
			},
			cssmin: {
				options: {

				},
				admin: {
					files: [{
						expand: true,
						cwd: 'release/<%= pkg.version %>/admin/css/',
						src: [
						'*.css',
						'minicolor/*.css',
						'vue/*.css',
						'!*.min.css'
						],
						dest: 'release/<%= pkg.version %>/admin/css/',
						ext: '.min.css'
					}]
				},
				frontend: {
					files: [{
						expand: true,
						cwd: 'release/<%= pkg.version %>/public/css/',
						src: [
						'*.css',
						'!*.min.css'
						],
						dest: 'release/<%= pkg.version %>/public/css/',
						ext: '.min.css'
					}]
				},
			},
			copy: {
				build: {
					options: {
						mode: true,
						expand: true,
					},
					src: [
					'**',
					'!node_modules/**',
					'!vendor/**',
					'!release/**',
					'!build/**',
					'!tests/**',
					'!.git/**',
					'!Gruntfile.js',
					'!package.json',
					'!package-lock.json',
					'!.gitignore',
					'!.gitmodules',
					'!.github/**',
					'!bin/**',
					'!composer.lock',
					'!composer.json',
					'!README.md',
					'!*.yml',
					'!*.xml',
					'!*.config.*'
					],
					dest: 'release/<%= pkg.version %>/'
				}
			},
			compress: {
				build: {
					options: {
						mode: 'zip',
						archive: './release/<%= pkg.name %>.<%= pkg.version %>.zip'
					},
					expand: true,
					cwd: 'release/<%= pkg.version %>/',
					src: ['**/*'],
					dest: '<%= pkg.name %>'
				}
			},

			addtextdomain: {
				options: {
					textdomain: 'wplegalpages',
				},
				update_all_domains: {
					options: {
						updateDomains: true
					},
					src: ['*.php', '**/*.php', '!\.git/**/*', '!bin/**/*', '!node_modules/**/*', '!tests/**/*', '!vendor/**/*', '!analytics/**/*']
				}
			},

			wp_readme_to_markdown: {
				your_target: {
					files: {
						'README.md': 'readme.txt'
					}
				},
			},

			makepot: {
				target: {
					options: {
						domainPath: '/languages',
						exclude: ['\.git/*', 'bin/*', 'node_modules/*', 'tests/*', '!vendor/**/*', '!analytics/**/*'],
						mainFile: 'wplegalpages.php',
						potFilename: 'wplegalpages.pot',
						potHeaders: {
							poedit: true,
							'x-poedit-keywordslist': true
						},
						type: 'wp-plugin',
						updateTimestamp: true
					}
				}
			},
		}
	);

	grunt.loadNpmTasks( 'grunt-wp-i18n' );
	grunt.loadNpmTasks( 'grunt-wp-readme-to-markdown' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.registerTask( 'default', ['i18n', 'readme'] );
	grunt.registerTask( 'i18n', ['addtextdomain', 'makepot'] );
	grunt.registerTask( 'readme', ['wp_readme_to_markdown'] );
	grunt.registerTask( 'build', ['clean:build', 'copy:build', 'uglify:admin', 'uglify:frontend', 'cssmin:admin', 'cssmin:frontend', 'compress:build'] );

	grunt.util.linefeed = '\n';

};
