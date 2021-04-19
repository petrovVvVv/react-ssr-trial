const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );
const { equals, head, ifElse, complement, prop, always, when, flatten, find, isNil } = require('ramda');
const compose = require('ramda/src/compose');
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const { StaticRouter, matchPath } = require( 'react-router-dom' );

const contentJson = require('./content_1.json').page
const STATIC_PAGE_URLS = flatten(contentJson.map(pageObj => Object.keys(pageObj)))
const staticPageExists = (url) => Boolean(find(equals(url), STATIC_PAGE_URLS))
const findPageInJson = (url) => find(
    compose(
      equals(url),
      head,
      Object.keys
    )
  )
const getStaticPageForUrl = (url) => 
  compose(when(complement(isNil), prop(url)), findPageInJson(url))(contentJson)

// create express application
const app = express();

// import App component
const { App } = require( '../src/components/app' );

// import routes
const routes = require( './routes' );

// serve static assets
app.get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '../dist' ) ) );

// for any other requests, send `index.html` as a response
app.use( '*', async ( req, res ) => {
    const hasStaticPageForUrl = staticPageExists(req.originalUrl)
    // get matched route
    const matchRoute = routes.find( route => matchPath( req.originalUrl, route ) );

    // fetch data of the matched component
    let componentData = null;
    if (hasStaticPageForUrl) {
        componentData = { 
            pageData: getStaticPageForUrl(req.originalUrl) 
        }
    } else if( typeof matchRoute.component.fetchData === 'function' ) {
        componentData = await matchRoute.component.fetchData();
    }

    // read `index.html` file
    let indexHTML = fs.readFileSync( path.resolve( __dirname, '../dist/index.html' ), {
        encoding: 'utf8',
    } );

    // get HTML string from the `App` component
    let appHTML = ReactDOMServer.renderToString(
        <StaticRouter location={ req.originalUrl } context={ componentData }>
            <App />
        </StaticRouter>
    );

    // populate `#app` element with `appHTML`
    indexHTML = indexHTML.replace( '<div id="app"></div>', `<div id="app">${ appHTML }</div>` );

    // set value of `initial_state` global variable
    // indexHTML = indexHTML.replace(
    //     'var initial_state = null;',
    //     `var initial_state = ${ JSON.stringify( componentData ) };`
    // );

    if (hasStaticPageForUrl) {
        const { pageData } = componentData
        indexHTML = indexHTML
            .replace(
                `<html lang="bg" />`,
                `<html lang="${pageData.language}" />`
            ).replace(
                `<meta name="description" content="Page Description">`,
                `<meta name="description" content="${pageData.meta.meta_description}">`,
            ).replace(
                `<title>Website Title</title>`,
                `<title>${pageData.meta.meta_title}</title>`
            )
    }

    // set header and status
    res.contentType( 'text/html' );
    res.status( 200 );

    return res.send( indexHTML );
} );

// run express server on port 9000
app.listen( '9000', () => {
    console.log( 'Express server started at http://localhost:9000' );
} );
