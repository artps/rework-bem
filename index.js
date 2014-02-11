var path = require('path');

function construct(filename, options, root, namespace) {
  options   = options || {};
  root      = options.root || '';
  namespace = options.namespace || 'b';

  var parts  = filename.split(path.sep),
      elements = 'elements',
      except = [elements].concat(root.split(path.sep)),
      mode   = +(parts.indexOf(elements) >= 0),
      prefixes = [
        [namespace + '-', '--'],
        [namespace + '-', '__', '--']
      ][mode];

  parts = parts.map(function(part) {
    return except.indexOf(part) === -1 ? part : false;
  }).filter(function(part) {
    return part;
  });

  var name = '.';
  
  for(var i = 0; i < parts.length; ++i) {
    var prefix = prefixes[i];
    var part   = parts[i];

    name += prefix + part;
  }

  return path.basename(name, path.extname(name));
}

module.exports = function(filename, options) {
  var prefix = construct(filename, options);
  return function(style){
    style.rules = style.rules.map(function(rule){
      if (!rule.selectors) {
        return rule;
      }

      rule.selectors = rule.selectors.map(function(selector){
        if (selector === ':root') {
          return prefix;
        }

        selector = selector.replace(/^\:root\s?/, '');
        return [prefix, selector].join(' ');
      });
      return rule;
    });
    return style;
  }
};
