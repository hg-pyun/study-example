// Express
import express from 'express'

// React
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../client/App'
import Html from './Html'
import WDM from './WDM'

const app = express();
const port = 3000;

app.use(WDM);

app.get('/',function(req, res, next){

    let preloadState = {
        text : 'Server-Side Rendering'
    };

    let renderProps = {
        preloadState: `window.__PRELOADED_STATE__ =${JSON.stringify(preloadState).replace(/</g, '\\u003c')}`,
        script: 'http://localhost:3000/build/client.bundle.js',
        appComponent: ReactDOMServer.renderToString(<App data={preloadState}/>)
    };

    const html = ReactDOMServer.renderToStaticMarkup(<Html {...renderProps}/>); // server-side Rendering

    res.send(`<!doctype html>${html}`);
});

app.listen(port, ()=>{
    console.log('http://localhost:3000')
});