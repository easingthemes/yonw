;// semi-colon for concatenation and minification
	var abar = require('address_bar');
	var folder_view = require('folder_view');
	var path = require('path');
	var shell = require('nw.gui').Shell;
	var sys = require('sys');
	var exec = require('child_process').exec;
	var spawn = require('child_process').spawn;
	var fs = require('fs');
	var gui = require('nw.gui');

	var projectDir = 'projects';
	var cdProject = 'cd '+projectDir;
	

/** @namespace */
var app = (function (app, $) {

	
	
	/**
	 * @property {Object} _app "inherits" app object via $.extend() at the end of this seaf 
	 * (Self-Executing Anonymous Function)
	 */
	var _app = {
		projectDir		: 'projects',
		projectOpened	: false,
		/**
		 * @name init
		 * @function
		 * @description Master page initialization routine
		 */
		init: function () {
			app.main.initUiCache();
			app.main.initModules();
			app.main.initFirst();
			// init specific global components
			app.main.init();
		}
	};
	return $.extend(app, _app);
}(window.app = window.app || {}, jQuery));

/**
@class app.main
*/
(function (app, $) {

	$cache = {
		element : $('.element')
	};
	app.main = {

		initUiCache : function() {
			app.ui = {
				main		: $('#main'),
				secondary	: $('#secondary')
			};
		},
		initModules : function() {
			var folder = new folder_view.Folder($('#files'));
			var addressbar = new abar.AddressBar($('#addressbar'));

			folder.on('navigate', function(dir, mime) {
				if (mime.type == 'folder') {
					addressbar.enter(mime);
				} else {
					shell.openItem(mime.path);
				}
			});

			addressbar.on('navigate', function(dir) {
				folder.open(dir);
			});
		},
		initFirst : function() {
			
		},
		init : function () {

			$('.browse').on('click', function(event) {
				event.preventDefault();
				app.chooseFile.init('#fileDialog');
			});
			$('#ran').on('click', function(event) {
				event.preventDefault();
				var newCmd = $('#konzola').val();
				var fullCmd = cdProject +' && '+ newCmd;
				console.log(fullCmd);
				app.runCommand.init(fullCmd);
			});
			var parentList = $('#tools-list');
			app.createList.init(parentList);
		}
	};

}(window.app = window.app || {}, jQuery));

/**
@class app.chooseFile
*/
(function (app, $) {

	app.chooseFile = {
		init : function (name) {
			var chooser = $(name);
			chooser.change(function(evt) {
				projectDir = $(this).val();
				folder.open(projectDir);
				addressbar.set(projectDir);
				cdProject = 'cd '+projectDir;
				app.runCommand.init('cd', projectDir);
			});
			chooser.trigger('click');
		}
	};

}(window.app = window.app || {}, jQuery));

/**
@class app.createList
*/
(function (app, $) {

	app.createList = {
		init : function (parent) {

			var list = {
				'nodev' : 'node -v',
				'npmv' : 'npm -v',
				'npmv' : 'ruby -v',
				'npmv' : 'yo -v',
				'npmv' : 'grunt -v',
				'npmv' : 'bower -v',
				'npmv' : 'git -v'
			};
			var toolsList = $('<ul/>')
				.addClass('tools-list');

			$.each(list, function(tool, command) {
				var toolItem = $('<li/>')
					.addClass(tool)
					.appendTo(toolsList);
				var toolLink = $('<a/>')
					.appendTo(toolItem);
				var tools = app.runCommand.output(command);
				tools.stdout.on('data', function (data) {
					toolLink.text(data);
				});
				tools.on('error', function (err) {
				  toolLink.text(err);
				});
			});

			parent.append(toolsList);	
		}
	};

}(window.app = window.app || {}, jQuery));

/**
@class app.runCommand
*/
(function (app, $) {

	app.runCommand = {
		init : function (name) {
			exec(name,  function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				$('#output').append(stdout +' <br /> '+ stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			});
		},
		output : function(name) {
			return exec(name);
		}
	};

}(window.app = window.app || {}, jQuery));

// initialize app
jQuery(window).load(function () {
	app.init();
});