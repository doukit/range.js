# range.js
[![range.js](https://img.shields.io/badge/range-.js-00ff00.svg)](http://rangejs.doukit.org/)  
A beautiful input slider (jQuery plugin) for HTML5 &lt;input type='range'&gt;. Now, chrome, safari, firefox, opera browser are supported.

## Usage
Different input can be configured with different background colors and styles.
```javascript
$('#gradient').range(options);
```
Example:
```javascript
$('#gradient').range({color : 'red', style : 'gradient'});
```
More detail usage visit  [http://rangejs.doukit.org/](http://rangejs.doukit.org/).

## Range input style
* Gradient style (default):
![](style/image/gradient.png "gradient style")
```javascript
   $('#gradient').range({
        color : 'red',
        style : 'gradient'
    });
```
* Basic style:
![](style/image/basic.png "basic style")
```javascript
  $('#basic').range({
        color : 'green',
        style : 'basic'
    });
```

## Dependency
[jQuery](https://jquery.com/)

## Browser Support
Chrome, Safari, Firefox, Opera

## License 
range.js is freely distributable under the terms of the [MIT license](./LICENSE).

## Create Date
2015-11-13

## Update
2015-11-21
