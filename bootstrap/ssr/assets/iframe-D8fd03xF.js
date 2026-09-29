import{t as e}from"./utils-CVqKv8hr.js";import{usePage as t}from"@inertiajs/react";import{useEffect as n,useMemo as r,useRef as i,useState as a}from"react";import{jsx as o}from"react/jsx-runtime";import{createPortal as s}from"react-dom";var c=({children:c,className:l,previewTheme:u,...d})=>{let f=t(),p=i(null),[m,h]=a(null),[g,_]=a(!1),v=i({x:0,y:0});return n(()=>{if(p.current){let e=p.current.contentDocument;if(e){e.documentElement&&(v.current={x:e.documentElement.scrollLeft||e.body.scrollLeft,y:e.documentElement.scrollTop||e.body.scrollTop});let t=u===`system`?window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`:u,n=Array.from(window.document.styleSheets).map(e=>{try{if(e.href)return`<link rel="stylesheet" href="${e.href}" />`;if(e.ownerNode)return`<style>${e.ownerNode.innerHTML}</style>`}catch{if(e.href)return`<link rel="stylesheet" href="${e.href}" />`}return``}).filter(Boolean).join(`
`);e.open(),e.write(`
                  <!DOCTYPE html>
                  <html lang="en" class="${t}">
                    <head>
                      <meta charset="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      ${n}
                    </head>
                    <body id="previewIframe" class="min-h-screen">
                    </body>
                  </html>
                `),e.close(),setTimeout(()=>{let t=e.body;t&&(h(t),_(!0),requestAnimationFrame(()=>{e.documentElement&&v.current&&(e.documentElement.scrollTop=v.current.y,e.documentElement.scrollLeft=v.current.x)}))},100)}}},[u,r(()=>f.props.project.theme_config,[f.props.project.theme_config])]),o(`iframe`,{ref:p,className:e(`h-full max-h-screen w-full`,l),...d,children:m&&g&&s(c,m)})};export{c as default};