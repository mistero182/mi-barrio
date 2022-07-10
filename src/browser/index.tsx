// Load polyfills (once, on the top of our web app)
import "core-js/stable";
import "regenerator-runtime/runtime";
import { BrowserRouter } from "react-router-dom";
const ReactDOM = require('react-dom/client');

import "./index.css";

/**
 * Frontend code running in browser
 */
import * as React from "react";
// import ReactDOM from "react-dom";

import ConfigContext from "../context/ConfigContext";
import { Config } from "../server/config";
import App from "../App";

const config = (window as any).__CONFIG__ as Config;
delete (window as any).__CONFIG__;

const rootElement = document.getElementById('root');
/** Components added here will _only_ be loaded in the web browser, never for server-side rendering */
if ({}.hasOwnProperty.call(module, 'hot')) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <>
      {/* The configuration is the outmost component. This allows us to read the configuration even in the theme */}
      <ConfigContext.Provider value={config}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigContext.Provider>
    </>,
  );

} else {
  const root = ReactDOM.hydrateRoot(rootElement, 
    <>
      {/* The configuration is the outmost component. This allows us to read the configuration even in the theme */}
      <ConfigContext.Provider value={config}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigContext.Provider>
    </>,
  );
}

// const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;



// const render = () => {
//   // hydrate(
//     renderMethod(
//     <>
//       {/* The configuration is the outmost component. This allows us to read the configuration even in the theme */}
//       <ConfigContext.Provider value={config}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </ConfigContext.Provider>
//     </>,
//     document.getElementById("root"),
//   );
// };

// render();
