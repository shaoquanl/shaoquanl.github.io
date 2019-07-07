#!/usr/bin/env node

var path = require("path")
var fs = require("fs")
var dev = "<!DOCTYPE html>\n" +
  "<html>\n" +
  "  <head>\n" +
  "    <meta charset=\"utf-8\">\n" +
  "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
  "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
  "    <title>组件库 Lei</title>\n" +
  "    <link rel=\"icon\" href=\"{{ root }}favicon.ico\" type=\"image/x-icon\">\n" +
  "    <link rel=\"stylesheet\" type=\"text/css\" href=\"{{ root }}index.css\"/>\n" +
  "    <link rel=\"stylesheet\" type=\"text/css\" href=\"//at.alicdn.com/t/font_3e1jf8aduk2csor.css\"/>\n" +
  "  </head>\n" +
  "  <body>\n" +
  "    <div id=\"react-content\"></div>\n" +
  "    <div class=\"site-loading\" id=\"site-loading\">\n" +
  "      <div class=\"spinner\"></div>\n" +
  "      <div class=\"say\">雷雷</div>\n" +
  "    </div>\n" +
  "    <script src=\"{{ root }}common.js\"></script>\n" +
  "    <script src=\"{{ root }}index.js\"></script>\n" +
  "  </body>\n" +
  "</html>\n" +
  "\n"
var pro = "<!DOCTYPE html>\n" +
  "<html>\n" +
  "  <head>\n" +
  "    <meta charset=\"utf-8\">\n" +
  "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
  "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
  "    <title>组件库 Lei</title>\n" +
  "    <link rel=\"icon\" href=\"{{ root }}comp/favicon.ico\" type=\"image/x-icon\">\n" +
  "    <link rel=\"stylesheet\" type=\"text/css\" href=\"{{ root }}comp/index.css\"/>\n" +
  "    <link rel=\"stylesheet\" type=\"text/css\" href=\"//at.alicdn.com/t/font_3e1jf8aduk2csor.css\"/>\n" +
  "  </head>\n" +
  "  <body>\n" +
  "    <div id=\"react-content\"></div>\n" +
  "    <div class=\"site-loading\" id=\"site-loading\">\n" +
  "      <div class=\"spinner\"></div>\n" +
  "      <div class=\"say\">雷雷</div>\n" +
  "    </div>\n" +
  "    <script src=\"{{ root }}comp/common.js\"></script>\n" +
  "    <script src=\"{{ root }}comp/index.js\"></script>\n" +
  "  </body>\n" +
  "</html>\n" +
  "\n"

module.exports = function(type){
  var env_config = path.join(__dirname, "site/theme/static/template.html");
  fs.writeFileSync(env_config, type[2] == 'dev'? dev: pro, 'utf8')
}(process.argv)

