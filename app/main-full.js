global.$ = $;

var abar = require('address_bar');
var folder_view = require('folder_view');
var path = require('path');
var shell = require('nw.gui').Shell;
var sys = require('sys');
var exec = require('child_process').exec;
//var spawn = require('child_process').spawn;
//var shell = require('shelljs');
var fs = require('fs');
var gui = require('nw.gui');
//var appjs = require('appjs');
//shell.echo('hello world');
//var toolsv = (process.platform === "win32" ? "tools-v.cmd" : "tools-v");
//console.log(tools-v);



$(document).ready(function() {
  var folder = new folder_view.Folder($('#files'));
  var addressbar = new abar.AddressBar($('#addressbar'));

  folder.open(process.cwd());
  addressbar.set(process.cwd());

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

  $('#home').on('click', function(event) {
    event.preventDefault();
    myCmd = "bower -v";
    exec(myCmd,  function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        $('.bower .info').append(stdout);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
  });
  $('.bower').on('click', '.update', function(event) {
    event.preventDefault();
    updateCmd = "yo";
    exec(updateCmd,  function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        $('.bower .output').append(stdout);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
  });
});
