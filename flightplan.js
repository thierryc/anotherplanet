// flightplan.js
var plan = require('flightplan');
var config = require('./flightplan.config');

// config
plan.target('production', {
  host: config.production.host,
  username: config.production.username,
  agent: process.env.SSH_AUTH_SOCK,
  privateKey: config.production.privateKey
},{
  webRoot: config.production.webRoot,
  sudoUser: config.production.sudoUser
});

var tmpdir;

// run commands on localhost
plan.local('deploy', function(local) {

  if(plan.runtime.target === 'production') {
    var input = local.prompt('Ready for deploying to production? [yes]');
    if(input.indexOf('yes') === -1) {
      plan.abort('User canceled flight');
    }
  }

  local.log('Create tag version');
  //local.exec('yarn version');
  local.exec('npm version patch -m "Upgrade to %s to deploy"') // npm is more powerfull than yarn to do this
  var tag = local.exec('git describe').stdout.trim();
  //tmpdir = 'apio_' + tag + '_' + new Date().getTime();
  tmpdir = tag;

  local.log('Run clean and build');
  local.exec('yarn build');
  local.exec('cp google.html out/' + config.production.googleVerificationFile + '.html')
  local.exec('cp manifest.json out/')
  local.exec('cp .htaccess out/')

  local.log('Copy files to remote hosts');
  local.hostname(); // prints the hostname of localhost
  //var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the target's remote hosts
  var webRoot = plan.runtime.options.webRoot;   // fly staging -> '/usr/local/www'
  console.log(webRoot);

  local.with('cd out', function() {
    local.exec('touch ./version.txt');
    local.exec('echo "'+ tag +'" >> ./version.txt');
    var files = local.find('. -type f', {silent: true}).stdout.split('\n');
    local.transfer(files, webRoot + '/' + tmpdir);
  });
});

plan.remote('deploy', function(remote) {
  var webRoot = plan.runtime.options.webRoot;   // fly staging -> '/usr/local/www'
  var sudoUser = plan.runtime.options.sudoUser;
  remote.log(webRoot);
  remote.with('cd ' + webRoot, function() {
    remote.exec('pwd')
    remote.log('Create link to html folder to web root');
    remote.exec('touch html')
    remote.exec('rm html')
    remote.exec('ln -s '+ tmpdir + ' html');
  });
});

plan.remote('test', function(remote) {

});
