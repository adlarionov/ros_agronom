if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,c)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let o={};const d=e=>n(e,a),s={module:{uri:a},exports:o,require:d};i[a]=Promise.all(r.map((e=>s[e]||d(e)))).then((e=>(c(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"e4ef04ab3db9805288f43ba173559f61"},{url:"assets/index-c2ea85b9.js",revision:null},{url:"favicon.ico",revision:"da595002256d1e352bf250cdc0fdd577"},{url:"icon.svg",revision:"478161e4c5884df4ae3eb7cf1adc0c05"},{url:"images/profile.png",revision:"a18290358f5dc5c45763643fa5736541"},{url:"index.html",revision:"ee986427e63c30dd0fd860c7520394be"},{url:"maskable-icon-512x512.png",revision:"15f3caabe1fe67c4b480ede47ffdc527"},{url:"pwa-192x192.png",revision:"985583baafdb81ea4588a7ac4cb2a155"},{url:"pwa-512x512.png",revision:"8cd6f7d378d5789b4803ceaf8bee0ca1"},{url:"pwa-64x64.png",revision:"2cb76b0af1655c6814b5b81d17d21b27"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"da595002256d1e352bf250cdc0fdd577"},{url:"pwa-192x192.png",revision:"985583baafdb81ea4588a7ac4cb2a155"},{url:"pwa-512x512.png",revision:"8cd6f7d378d5789b4803ceaf8bee0ca1"},{url:"manifest.webmanifest",revision:"5160b60c732ea01eaa1f7a72866afb09"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
