# Dev Notes
Make a set of examples, each in its own page. This means bundling the D3 module separately, to take advantage of browser caching. While the gulpfile covers the d3 bundling, it is only wrapping a call to the commandline:

````
browserify -r d3 > dist/d3.js
````

The folder structure should be flat, so an app "do fun stuff" is found at `dist/do-fun-stuff/index.html`. The common modules (in this case, d3.js) are found at `dist/`, to make script tags a bit easier: `<script src="../d3.js"></script>`
Nothing worse than forgetting where you put stuff/

