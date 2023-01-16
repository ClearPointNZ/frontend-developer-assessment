# Notes on packages

While care has been taken to resolve warnings/errors while fetching/updating packages, there are several packages that cannot be resolved due to the libraries we use not wanting to resolve their dependencies. 

Mainly this is react-scripts because this app was initialised via create-react-app:
- https://github.com/facebook/create-react-app/issues/12778#issuecomment-1349293323
- https://github.com/facebook/create-react-app/issues/11647#issuecomment-1243863292

All vulnerabilities were addressed at the time of writing this.

Overrides have been added to address warnings/errors where possible while keeping functionality stable:
- "make-fetch-happen": "^11.0.0"
    - fixes move-file and cacache versions
- "nth-check": "2.1.1"
    - fix react-scripts https://github.com/facebook/create-react-app/issues/11647#issuecomment-1243077493
- "svgo": "2.x.x"
    - fix unsupported 1.x version warning

# Node errors

If you find that your version of node is having issues and you installed it via nvm, you might need to reinstall nvm.

https://github.com/npm/cli/issues/4234#issuecomment-1381530054

Did not update to node 18 as react-scripts is depending on a version of node-sass that doesn't support node 18 yet.