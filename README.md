Sample Angular2 BPMN-JS project
---


Features: 
---
- Angular2-based single-page-application
- Webpack-based build (not angular-cli)
- Dev-server with auto-refresh
- Dist-build
- Inclusion of javascript, css, less, fonts etc from various BPMN-JS npm repos
- bpmn-related stuff is put in a separate bundle
- Properties panel
- Custom properties
- Custom palette (with icons from font-awesome)
 
 
 
Setup / Installation
---

- `npm install`
- `npm start` to start dev-server on localhost:8080
- `npm run build` to build distribution into `dist` directory.  



How to (get) help / feedback / comments / suggestions
---

This is a sample project, set up by an generally experienced programmer without experience 
with Angular2 / webpack. Hopefully people will find it useful. 

It is _NOT_ a super-project set up by experts, nor by the BPMN-JS team. 
 
If you have comments, ideas, suggestions, improvements, praise, blame, whatever - 
please, bring them on! Either as issues / pull-requests / whatever here on github, 
or on the BPMN-IO forum: 

https://forum.bpmn.io/t/bpmn-js-with-angular2-and-webpack/1291


Misc todo's, suggestions welcome:  
---

- Coordination/integration between Angular-components and the BPMN.IO _providers_ seems to be difficult. How should one implement (e.g.) _save_ functionality? 

- Improve development tools. Stacktrace in browser doesn't match typescript files. 
it is not possible to debug from IntelliJ. Any ideas?  

- bpmn-bundling is done by adding lots of stuff into src/bpmn.ts. Is it possible to 
automate this process somehow? 
 
- Further typescriptify some of the javascript code

- Typings for bpmn-libs? Autocomplete / suggestions in IDEs would be _very_ nice.  

- Add some tests (probably standard webpack/angular2-stuff)
