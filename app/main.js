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

  function chooseFile(name) {
    var chooser = $(name);
    chooser.change(function(evt) {
      projectDir = $(this).val();

      folder.open(projectDir);
      addressbar.set(projectDir);
    
      cdProject = 'cd '+projectDir;
      runCommand('cd', projectDir);
      console.log(projectDir);
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
    //var fullCmd = newCmd;
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
    myCmd = 'node';
    runCommand(myCmd);
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
    // var ls  = spawn(name, [arg]);

    // ls.stdout.on('data', function (data) {
    //   detached: true,
    //   console.log('stdout: ' + data);
    // });

    // ls.stderr.on('data', function (data) {
    //   console.log('stderr: ' + data);
    // });

    // ls.on('close', function (code) {
    //   console.log('child process exited with code ' + code);
    // });
  };


  function openCmd(name) {
    var comands = spawn(name,  function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
       if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  }
});