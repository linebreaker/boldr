'use strict';

var _caporal = require('caporal');

var _caporal2 = _interopRequireDefault(_caporal);

var _updateNotifier = require('update-notifier');

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

var _boldrTools = require('boldr-tools');

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _updateNotifier2.default)({ pkg: _package2.default }).notify();

const VERSION = _package2.default.version;
_caporal2.default
// default command
.STRING = value => typeof value === 'string' ? value : null;

_caporal2.default.version(VERSION).description('A command line scaffolding tool and helper for Boldr.');

_caporal2.default.command('develop', 'Start development server').alias('dev').action(() => new Promise(function ($return, $error) {
  var $Try_1_Post = function () {
    try {
      return $return();
    } catch ($boundEx) {
      return $error($boundEx);
    }
  }.bind(this);var $Try_1_Catch = function (error) {
    try {
      console.log(error);
      process.exit(1);
      return $Try_1_Post();
    } catch ($boundEx) {
      return $error($boundEx);
    }
  }.bind(this);
  try {
    return Promise.resolve((0, _boldrTools.cleanClient)()).then(function ($await_5) {
      try {
        return Promise.resolve((0, _boldrTools.cleanServer)()).then(function ($await_6) {
          try {
            return Promise.resolve((0, _boldrTools.startDevServer)()).then(function ($await_7) {
              try {
                Promise.all([$await_5, $await_6, $await_7]).catch(err => console.log(err));
                return $Try_1_Post();
              } catch ($boundEx) {
                return $Try_1_Catch($boundEx);
              }
            }.bind(this), $Try_1_Catch);
          } catch ($boundEx) {
            return $Try_1_Catch($boundEx);
          }
        }.bind(this), $Try_1_Catch);
      } catch ($boundEx) {
        return $Try_1_Catch($boundEx);
      }
    }.bind(this), $Try_1_Catch);
  } catch (error) {
    $Try_1_Catch(error)
  }
}.bind(this)));
_caporal2.default.command('clean', 'Clean compiled files').action(() => new Promise(function ($return, $error) {
  var $Try_2_Post = function () {
    try {
      return $return();
    } catch ($boundEx) {
      return $error($boundEx);
    }
  }.bind(this);var $Try_2_Catch = function (error) {
    try {
      console.log(error);
      process.exit(1);
      return $Try_2_Post();
    } catch ($boundEx) {
      return $error($boundEx);
    }
  }.bind(this);
  try {
    return Promise.resolve((0, _boldrTools.cleanClient)()).then(function ($await_8) {
      try {
        return Promise.resolve((0, _boldrTools.cleanServer)()).then(function ($await_9) {
          try {
            Promise.all([$await_8, $await_9]).catch(err => console.log(err));
            return $Try_2_Post();
          } catch ($boundEx) {
            return $Try_2_Catch($boundEx);
          }
        }.bind(this), $Try_2_Catch);
      } catch ($boundEx) {
        return $Try_2_Catch($boundEx);
      }
    }.bind(this), $Try_2_Catch);
  } catch (error) {
    $Try_2_Catch(error)
  }
}.bind(this)));
_caporal2.default.command('build', 'Build the client and server bundles for production').action(() => new Promise(function ($return, $error) {
  var $Try_3_Post = function () {
    try {
      return $return();
    } catch ($boundEx) {
      return $error($boundEx);
    }
  }.bind(this);var $Try_3_Catch = function (error) {
    try {
      console.log(error);
      process.exit(1);
      return $Try_3_Post();
    } catch ($boundEx) {
      return $error($boundEx);
    }
  }.bind(this);
  try {
    return Promise.resolve((0, _boldrTools.cleanClient)()).then(function ($await_10) {
      try {
        return Promise.resolve((0, _boldrTools.cleanServer)()).then(function ($await_11) {
          try {
            return Promise.resolve((0, _boldrTools.buildClient)()).then(function ($await_12) {
              try {
                return Promise.resolve((0, _boldrTools.buildServer)()).then(function ($await_13) {
                  try {
                    Promise.all([$await_10, $await_11, $await_12, $await_13]).catch(err => console.log(err));
                    return $Try_3_Post();
                  } catch ($boundEx) {
                    return $Try_3_Catch($boundEx);
                  }
                }.bind(this), $Try_3_Catch);
              } catch ($boundEx) {
                return $Try_3_Catch($boundEx);
              }
            }.bind(this), $Try_3_Catch);
          } catch ($boundEx) {
            return $Try_3_Catch($boundEx);
          }
        }.bind(this), $Try_3_Catch);
      } catch ($boundEx) {
        return $Try_3_Catch($boundEx);
      }
    }.bind(this), $Try_3_Catch);
  } catch (error) {
    $Try_3_Catch(error)
  }
}.bind(this)));
_caporal2.default.command('start:ssr', 'Start the application rendernig on the server.').action(() => {
  try {
    (0, _boldrTools.startRenderServer)();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});

_caporal2.default.parse(process.argv);

//# sourceMappingURL=boldr.js.map