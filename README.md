# Easy Peasy EBook

### A prototype

Easy Peasy EBook is a prototype of a minimal epub creation tool based on GitHub, Mavo, CSS-grids, Puppeteer and Epubcheck. We probably don't really need another Github-based ebook tool, so this is mostly for experimenting with Mavo as a way to create frontends for datafiles used in a build processes. 

Mavo is a great tool for creating editable frontends for websites using different storage backends. One such storage option is Github, so if you reverse the usual usecase that means you can use Mavo to create different frontend editors for data files you need in your repository for building purposes. 

Another prototype i made (https://medium.com/@kjartanmuller/prototype-story-mapping-as-activity-mapping-f50bbf9bd2c3) explored this for testing purposes, but this time I wanted to experiment with a usecase where a part of a content production process is more like software build processes where you kind of compile the content, like with epub. I have a background in publishing industry, so it was a natural usecase.

Using GitHub as a content platform is great for OER and Open Access purposes. You have available mechanisms for versioning and collaboration, and a way to mix a stringent editorial processes with input from everyone.

Also I wanted to experiment with how to use CSS grid to implement the pattern where you have a grid width cards/tiles that expands underneath when activated. 

The prototype has been implemented technically using @Mavo (https://mavo.io) and CSS Grid Layout (https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), and the prototype aesthetics are a result of wiredjs (https://wiredjs.com/) and Architects Daughter (https://fonts.google.com/specimen/Architects+Daughter). The editor uses Markdown (https://en.wikipedia.org/wiki/Markdown).
Puppeteer (https://pptr.dev/) is used for generating a pdf and epubcheck (https://www.npmjs.com/package/epubcheck) is used for testing. Epub basics can be found at https://github.com/bmaupin/epub-samples.

At the moment there is no styling of the resulting epub or pdf. For epub Blitz (https://friendsofepub.github.io/Blitz/) could be something. And for pdf, maybe paged.js could be of help? (https://www.pagedmedia.org/)

The tool is demoed on https://kjartanm.github.io/easy-peasy-ebook/

- It most likely does not work on IE 11, and is not designed for small screens.
- You can use Export to look at the structure.

## Install

``` yarn ```

## Usage

Change the ```mv-storage``` attribute in the body element in ```docs/index.html``` to point to your own repository.

For local testing, cd to docs and use http-server.

To make it available for others, set up your repository to use GitHub pages with docs as directory.

When editing, every save will create a new commit. To build a new version of the epub you have to fetch the last data from GitHub and then use ``` yarn build ``` to start the process.

If you want to automate the process, hook your repository up to Netlify (https://www.netlify.com/) if CI tools are too much.

The build process creates an epub and a pdf that is available from docs. An epubcheck report is saved to reports directory.
