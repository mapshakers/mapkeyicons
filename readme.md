<div style="text-align:center" align="center">
    <img src="http://mapkeyicons.com/demo/img/mapkeyIcons.svg" alt="mapkeyicons"/>
    <img src="http://www.mapkeyicons.com/demo/img/MapkeyIconsPromo.svg" alt="mapkeyicons"/>
</div>
The icon font especially for cartographical use.

For demo see project page on [mapkeyicons.com](http://www.mapkeyicons.com)<br/>
Production files are located in ```dist``` ditrectory.<br/>
**Stay tuned! We will soon provide ArcMap, QGIS symbol set and simple Leaflet plugin for web cartography!**

### License  
**CC0 1.0 Universal**
(feel free to use it everywhere)

### Try it right now!
Insert this code to your project.
```html
<!-- Link rawgit MapkeyIcons.css for development purposes! -->
<link href='https://rawgit.com/mapshakers/mapkeyicons/master/dist/MapkeyIcons.css' rel='stylesheet' type='text/css'>

<!-- use it within html document -->
Hello this is <span class='mki-intext mki-mapkeyicons'></span> mapkeyicons! 
You can <span class='mki-intext mki-download'></span> download it and use it. For free!
```


## CSS 
Use MapkeyIcons in your web project! It´s very easy, as you can see:
``` html
<!-- LOAD CSS FILE IN HEAD ELEMENT-->
<link rel="stylesheet" type="text/css" href="MapkeyIcons.css">

<!-- USE EVERYWHERE IN DOCUMENT BODY ELEMENT-->
<!-- MINIMAL USAGE-->
<span class="mki mki-theatre"></span>
<!-- FOR INLINE USAGE-->
<span class="mki-intext mki-theatre"></span>
```
Predefined sizes:
```css
.mki-intext { font-size: 1.2em; }
.mki-short { font-size: small; }
.mki-tall { font-size: large; }
.mki-grande { font-size: 32px; }
.mki-venti { font-size: 64px; }
```

## FONTS
There are generated 4 font types:

**Glyphs started at U+E000 position (PUA)**
* ```MapkeyIcons.ttf```
* ```MapkeyIcons.woff```
* ```MapkeyIcons.svg```
* ```MapkeyIcons.eot```

## SVG
### Id
Root element `svg` contains attribute `id`. The value is **name of icon**.

### About SVG styling
All icons use two colors representation. 
The colors are styled using **element class** styling:

class `st0` represents background and `st1` foreground

See default style element:
``` xml
<style type="text/css">
<![CDATA[
	.st0{fill:#D1D1D1;}
	.st1{fill:#454545;}
]]>
</style>
```

##PNG
You can use rendered PNG icons. The image size is 256×256px.

##Versioning
* x.0.0: major changes, icon removed, icons renamed
* 0.y.0: icon added, large shape modifications
* 0.0.z: small shape modifications



---
*For similar project visit: [FontAwesome](https://fortawesome.github.io/Font-Awesome/) or [MAKI](https://www.mapbox.com/maki/)*<br/>
*(c) [mapshakers](http://www.mapshakers.com), 2015*

