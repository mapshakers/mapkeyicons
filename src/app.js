//var console = require("clim")();
var fs = require('fs');
var bufferToArrayBuffer = require('b3b').bufferToArrayBuffer;
var fontBuffer = fs.readFileSync('../src/MapkeyIcons.ttf');
var fontArrayBuffer = bufferToArrayBuffer(fontBuffer);

/** read TTF font data**/
var TTFReader = require('fonteditor-core').TTFReader;
var ttfReader = new TTFReader({ hinting: true });
var fontData = ttfReader.read(fontArrayBuffer);

var array =fontData.glyf;

// read JSON fonts
var iconList= fs.readFileSync('MapkeyIcons.json');

iconList = JSON.parse(iconList);

/** CREATING FONT LIST **/

var glyphs = [];

var names = [];

array.forEach(function(item){
    var glyph = {};

    var uniDEC = parseInt(item.unicode[0]);

    if (uniDEC && uniDEC >= parseInt('E000', 16) && uniDEC <= parseInt('F8FF', 16) ){

        var uniHEX = uniDEC.toString(16);
        var name = item.name;

        var data = iconList[name];

        if (!data || !data.hasOwnProperty('name')){
            console.error("ERROR: >> "+ name);
            return;
        }

        glyph['name'] = name;
        glyph['unicode'] = uniHEX;
        glyph['decimal'] = uniDEC;
        glyph['lang'] = data.lang;
        glyph['type']= data.type;
        glyph['keywords']= data.keywords;
        glyph['version']= data.version;
        glyphs.push(glyph)

        names.push(name)
    }
});


var output = {}
output['name'] =  "MapkeyIcons";
output['version'] =  iconList.version;
output['license'] = iconList.license;
output['author'] = iconList.author;
output['organisation'] = iconList.organisation;
output['types'] = (iconList.types);
output['icons'] = glyphs;


fs.writeFile("../dist/MapkeyIconsList.json",JSON.stringify(output), function(err) {
    if(err) {
        return console.error("ERROR: "+err);
    }
});



/** CREATING CSS **/
var css = fs.readFileSync('base.css');

var styleDocument = css.toString();

var comments = "/**********************************\n***********************************\n"
comments+= "   MapkeyIcons - css style\n   license: "+iconList.license+"\n   author: "+iconList.author+", www."+ iconList.organisation+".com, 2015\n   version: "+iconList.version+"\n"+"***********************************\n***********************************/\n\n"
//.mki-university:before { content: '\0056' }
glyphs.forEach(function(item){
    styleDocument += "\n.mki-"+item.name+":before { content: '\\"+item.unicode+"';}"
});
styleDocument = comments + styleDocument

fs.writeFile("../dist/MapkeyIcons.css",styleDocument, function(err) {
    if(err) {
        return console.error("ERROR: "+err);
    }
});

/** CREATING FONTS **/

var Fontmin = require('fontmin');
var fontmin = new Fontmin()
    .src('../src/MapkeyIcons.ttf')
    .dest('../dist')
    .use(Fontmin.ttf2woff({}))
    .use(Fontmin.ttf2eot())
    .use(Fontmin.ttf2svg())


fontmin.run(function (err, files) {
    if (err) {
        console.error("ERROR:"+err);
        return;
    }

    files.forEach(function(item){

    });

});

var svg2png = require('svg2png');

/** CHECK COPY SVG FILE AND CREATE PNG **/
array.forEach(function(item) {
    var uniDEC = parseInt(item.unicode[0]);
    if (uniDEC && uniDEC >= parseInt('E000', 16) && uniDEC <= parseInt('F8FF', 16) ) {
        fs.exists("svg/" + item.name + ".svg", function (exists) {
            if (exists) {
                // COPY FILE TO DIST
                fs.createReadStream("svg/" + item.name + ".svg").pipe(fs.createWriteStream("../dist/svg/" + item.name + ".svg"));

                // CREATE PNG
                svg2png("svg/" + item.name + ".svg", "../dist/png/" + item.name + ".png", 1, function (err) {
                   if (err){
                       console.error("ERROR: creating png file: " + item.name)
                   }
                });
            } else {
                console.error("ERROR: SVG file does not exist: " + item.name)
            }
        })
    }
});


/* CREATE zip */
var EasyZip = require('easy-zip').EasyZip;
var zipPNG = new EasyZip();
zipPNG.zipFolder('../dist/png',function(){
    zipPNG.writeToFile('../dist/png.zip');
});
var zipSVG = new EasyZip();
zipSVG.zipFolder('../dist/svg',function(){
    zipSVG.writeToFile('../dist/svg.zip');
});

var zipCSS = new EasyZip();
var files = [
    {source : '../dist/MapkeyIcons.css', target: 'MapkeyIcons.css'},
    {source : '../dist/MapkeyIcons.svg', target: 'MapkeyIcons.svg'},
    {source :'../dist/MapkeyIcons.ttf', target: 'MapkeyIcons.ttf'},
    {source :'../dist/MapkeyIcons.woff', target: 'MapkeyIcons.woff'},
    {source : '../dist/MapkeyIcons.eot', target: 'MapkeyIcons.eot'}
];
zipCSS.batchAdd(files,function(){
    zipCSS.writeToFile('../dist/MapkeyIcons.zip');
});
