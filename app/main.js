global.$ = $;

//var project_path = require('project_path');
var abar = require('address_bar');
var folder_view = require('folder_view');
var path = require('path');
var shell = require('nw.gui').Shell;
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var gui = require('nw.gui');


$(document).ready(function() {

  var folder = new folder_view.Folder($('#files'));
  var addressbar = new abar.AddressBar($('#addressbar'));

  function chooseFile(name) {
    var chooser = $(name);
    chooser.change(function(evt) {
      projectDir = $(this).val();
        folder.open(projectDir);
        addressbar.set(projectDir);
      console.log($(this).val());
      cdProject = 'cd '+projectDir;
      //console.log();
      runCommand(cdProject);

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
      //runCommand(myCmd);
    } else {
      shell.openItem(mime.path);
    }
  });

  addressbar.on('navigate', function(dir) {
    folder.open(dir);
  });

  
  $('#home').on('click', function(event) {
    event.preventDefault();
    myCmd = 'tools-v && ruby -v';
    runCommand(myCmd);
  });

  function runCommand(name) {
    exec(name,  function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
       if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  }
});