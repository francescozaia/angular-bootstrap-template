"use strict";

module.exports = function (grunt) {

    grunt.initConfig({

        _developmentPath    : "development",
        _buildPath          : "build",
        _outputPath         : "output",

        pkg: grunt.file.readJSON("package.json"),

        clean: {
            test    : [".grunt", "_SpecRunner.html", "<%= _outputPath %>/test-reports"],
            docs    : ["<%= _outputPath %>/docs"],
            build   : ["<%= _buildPath %>/*.*"]
        },

        connect: {
            livereload: {
                options: {
                    open: true,
                    base: ["build"]
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ["<%= _buildPath %>/index.html"]
            },
            css: {
                files: "<%= _buildPath %>/less/**/*.less",
                tasks: ["less"]
            },
            js: {
                files: ["<%= _buildPath %>/js/app/**/*.js"],
                tasks: ["jshint"]
            }
        },

        uglify: {
            options: {
                banner:
                    "/*\n" +
                    " * <%= pkg.description %> v<%= pkg.version %>\n" +
                    " * (c) <%= grunt.template.today(\"yyyy/mm/dd\") %> <%= pkg.copyright %>\n" +
                    " */\n"
            },
            build: {
                files: [
                    {
                        expand  : true,
                        cwd     : "<%= _developmentPath %>",
                        src     : "js/app/**/*.js",
                        dest    : "<%= _developmentPath %>/js/app.min/",
                        ext     : ".js"
                    }
                ]
            }
        },

        copy: {
            all: {
                files: [
                    {
                        expand  : true,
                        cwd     : "<%= _developmentPath %>",
                        src     : ["**", "!js/app/*.*", "!less/*.*"],
                        dest    : "<%= _buildPath %>",
                        filter  : "isFile",
                        options: {
                            process: function (content, srcpath) {
                                return content.replace("js/app", "js/app.min"); // doesn't work yet
                            }
                        }
                    }
                ]
            }
        },

        // LESS

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "<%= _developmentPath %>/css/main.css": "<%= _developmentPath %>/less/main.less"
                }
            }
        },

        // TEST

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            app: {
                files: {
                    src: [
                        "<%= _developmentPath %>/js/app/**/*.js",
                        "Gruntfile.js"
                    ]
                }
            }
        },

        jasmine: {
            dev: {
                src: ["<%= _developmentPath %>/js/app/**/*.js"],
                options: {
                    keepRunner  : true,
                    vendor      : [
                        "http://ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.min.js",
                        "<%= _developmentPath %>/js/vendor/**/*.js"
                    ],
                    helpers     : "test/jasmine/helpers/**/*.js",
                    specs       : "test/jasmine/spec/**/*.spec.js",
                    junit       : {
                        path    : "<%= _outputPath %>/test-reports"
                    }
                }
            }
        },

        // DOCS

        jsdoc: {
            build: {
                src: ["<%= _developmentPath %>/js/app/**/*.js"],
                options: {
                    configure: "JSDocConf.json",
                    destination: "<%= _outputPath %>/docs"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jsdoc");

    // Default task(s).
    grunt.registerTask("test", "JS testing task.", ["jshint", "clean:test", "jasmine"]);
    grunt.registerTask("docs", "Generate JSDoc.", ["clean:jsdoc", "jsdoc"]);
    grunt.registerTask("deploy-dev", ["clean", "build", "copy", "uglify"]);
    grunt.registerTask("server", ["connect", "watch"]);

};