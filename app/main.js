global.$ = $;

var path = require('path');
var shell = require('nw.gui').Shell;
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var gui = require('nw.gui');


$(document).ready(function() {

  $('#home').on('click', function(event) {
    event.preventDefault();
    myCmd = 'tools-v && ruby -v';
    exec(myCmd,  function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        $('#output').append('stdout: ' + stdout);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
  });

});