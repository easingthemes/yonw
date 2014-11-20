// semi-colon to assure functionality upon script concatenation and minification
;


global.$ = $;

var abar = require('address_bar');
var folder_view = require('folder_view');
var path = require('path');
var shell = require('nw.gui').Shell;
var sys = require('sys');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var gui = require('nw.gui');
//var yez = require('yez');

//app.listen(port);

$(document).ready(function() {

	var folder = new folder_view.Folder($('#files'));
	var addressbar = new abar.AddressBar($('#addressbar'));
	var projectDir = 'projects';
	var cdProject = 'cd '+projectDir;

	function chooseFile(name) {
		var chooser = $(name);
		chooser.change(function(evt) {
			projectDir = $(this).val();
			folder.open(projectDir);
			addressbar.set(projectDir);
			cdProject = 'cd '+projectDir;
			runCommand('cd', projectDir);
		});
		chooser.trigger('click');  
	}

	$('.browse').on('click', function(event) {
		event.preventDefault();
		chooseFile('#fileDialog');
	});
	$('#ran').on('click', function(event) {
		event.preventDefault();
		var newCmd = $('#konzola').val();
		var fullCmd = cdProject +' && '+ newCmd;
		console.log(fullCmd);
		runCommand(fullCmd);
	});


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

	function runCommand(name) {
		exec(name,  function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			$('#output').append(stdout +' <br /> '+ stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
		});
	};

	function openCmd(name) {
		var comands = spawn(name,  function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
		});
	};

	function createList(name) {
		var tools = ['United States', 'Canada', 'Argentina', 'Armenia'];
		var toolsList = $('ul.tools-list');
		$.each(tools, function(i) {
			var toolItem = $('<li/>')
			.addClass('ui-menu-item')
			.attr('role', 'menuitem')
			.appendTo(cList);
			var toolLink = $('<a/>')
			.addClass('ui-all')
			.text(tools[i])
			.appendTo(toolItem);
		});
	}
});