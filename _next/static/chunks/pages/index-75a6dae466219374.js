(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(5075)}])},5075:function(a,b,c){"use strict";c.r(b);var d=c(6042),e=c(9396),f=c(253),g=c(5893),h=c(7294),i=c(9008),j=c.n(i),k=c(1664),l=c.n(k),m=c(3724),n=c(4128),o=c.n(n),p=function(){var a=(0,h.useState)(!0),b=a[0],c=a[1],i=(0,h.useState)(!0),k=i[0],n=i[1],p=(0,h.useState)("blue"),q=p[0],r=p[1],s=(0,h.useState)("red"),t=s[0],u=s[1],v=(0,h.useState)(0),w=v[0],x=v[1],y=(0,h.useState)(!0),z=y[0],A=y[1],B=(0,h.useState)([275,50]),C=B[0],D=B[1],E=(0,h.useState)(!0),F=E[0],G=E[1],H=(0,h.useState)(!0),I=H[0],J=H[1],K=(0,h.useState)([{id:1,center:[100,100],size:[50,50],fillColor:"red"},{id:2,center:[120,120],size:[50,50],fillColor:"green"},{id:3,center:[140,140],size:[50,50],fillColor:"orange"},]),L=K[0],M=K[1],N=(0,h.useCallback)(function(){var a=(0,f.Z)(C,2),b=a[0],c=a[1];c>=250&&J(!1),c<=50&&J(!0),D([b,c+(I?3:-3)])},[C,I]),O=(0,h.useCallback)(function(){x(w<360?w+3:0)},[w]);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(j(),{children:[(0,g.jsx)("title",{children:"react-paper-bindings"}),(0,g.jsx)("meta",{name:"description",content:"react-paper-bindings demo"}),(0,g.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,g.jsx)(l(),{href:"/editor",children:"Editor"}),(0,g.jsxs)("div",{className:o().container,children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("button",{onClick:function(){return c(!b)},children:"canvas1"}),(0,g.jsx)("button",{onClick:function(){return n(!k)},children:"canvas2"})]}),b&&(0,g.jsx)(m.Xz,{className:o().canvas,width:400,height:300,children:(0,g.jsx)(m.G7,{onClick:function(){return G(!F)},onFrame:F?N:null,children:(0,g.jsxs)(m.mh,{children:[(0,g.jsx)(m.Ae,{center:C,fillColor:q,size:[50,50],onClick:function(){return r("blue"===q?"cyan":"blue")}}),L.map(function(a){return(0,h.createElement)(m.Ae,(0,e.Z)((0,d.Z)({},a),{key:a.id,onClick:function(){var a,b,c;return M((b=0,c=2,(a=L).reduce(function(a,d,e,f){return b===c&&a.push(d),e===b||(b<c&&a.push(d),e===c&&a.push(f[b]),b>c&&a.push(d)),a},[])))}}))})]})})}),k&&(0,g.jsx)(m.Xz,{className:o().canvas,width:400,height:300,children:(0,g.jsx)(m.G7,{onClick:function(){return A(!z)},onFrame:z?O:null,children:(0,g.jsxs)(m.mh,{children:[(0,g.jsx)(m.Ae,{center:[200,150],fillColor:t,size:[100,100],rotation:w,onClick:function(){return u("red"===t?"gray":"red")}}),(0,g.jsxs)(m.Op,{selected:!0,fillColor:"black",children:[(0,g.jsx)(m.Cd,{center:[50,50],radius:30}),(0,g.jsx)(m.Cd,{center:[50,50],radius:10})]})]})})})]})]})};b.default=p},3724:function(a,b,c){"use strict";c.d(b,{Xz:function(){return D},Cd:function(){return r},Op:function(){return q},mh:function(){return o},"y$":function(){return p},nS:function(){return t},Ae:function(){return s},UA:function(){return u},G7:function(){return n}});var d=c(4924),e=c(2670),f=c(6042),g=c(9396),h=c(9534),i=c(5861),j=c.n(i),k=c(4078),l=c(4725),m=c.n(l),n="View",o="Layer",p="Path",q="CompoundPath",r="Circle",s="Rectangle",t="Raster",u="Tool",v=function(a,b,c,e){c[a]!==e[a]&&Object.assign(b,(0,d.Z)({},a,c[a]))},w={data:function(a,b,c){b.data!==c.data&&(0,e.Z)(a,m().Item)&&(a.data=(0,g.Z)((0,f.Z)({},a.data,b.data),{type:a.type}))},active:function(a,b,c){b.active&&b.active!==c.active&&(0,e.Z)(a,m().Tool)&&a.activate()},point:function(a,b,c){b.point!==c.point&&(0,e.Z)(a,m().Item)&&a.translate([b.point[0]-c.point[0],b.point[1]-c.point[1],])},center:function(a,b,c){b.center!==c.center&&(0,e.Z)(a,m().Item)&&a.translate([b.center[0]-c.center[0],b.center[1]-c.center[1],])},radius:function(a,b,c){b.radius!==c.radius&&(0,e.Z)(a,m().Item)&&a.scale(b.radius/c.radius)},rotation:function(a,b,c){b.rotation!==c.rotation&&(0,e.Z)(a,m().Item)&&(b.rotation&&c.rotation?a.rotate(b.rotation-c.rotation):a.rotation=b.rotation)},size:function(a,b,c){b.size!==c.size&&(0,e.Z)(a,m().Item)&&a.scale(b.size[0]/c.size[0],b.size[1]/c.size[1])}},x=function(a,b){for(var c=arguments.length>2&& void 0!==arguments[2]?arguments[2]:{},d=Object.keys(b),e=d.length,f=0;f<e;){var g=d[f];"id"!==g&&"children"!==g&&(w[g]?w[g](a,b,c):v(g,a,b,c)),f++}},y=function(a,b){var c=b.id,d=b.name,e=b.svg,f=c||d;if(!f)throw Error("Missing id or name prop on SymbolItem");if(!e)throw Error("Missing svg prop on SymbolItem");if(a.symbols&&a.symbols[f])return a.symbols[f];a.symbols||(a.symbols={});var g=new(m()).SymbolDefinition(a.project.importSVG(e));return a.symbols[f]=g,g},z=j()({createInstance:function(a,b,c){b.children;var d,e=(0,h.Z)(b,["children"]),i=(0,g.Z)((0,f.Z)({},e),{project:c.project});switch(a){case n:(d=c.view).project=c.project;break;case u:d=new c.Tool;break;case o:d=new c.Layer(i);break;case"Group":d=new c.Group(i);break;case p:d=new c.Path(i);break;case q:d=new c.CompoundPath(i);break;case"Arc":d=new c.Path.Arc(i);break;case r:d=new c.Path.Circle(i);break;case"Ellipse":d=new c.Path.Ellipse(i);break;case"Line":d=new c.Path.Line(i);break;case s:d=new c.Path.Rectangle(i);break;case"RegularPolygon":d=new c.Path.RegularPolygon(i);break;case"PointText":d=new c.PointText(i);break;case"SymbolItem":var j=y(c,i);d=new c.SymbolItem(j,i.center);break;case t:var k=i.onLoad,l=(0,h.Z)(i,["onLoad"]);d=new c.Raster(l),"function"==typeof k&&(d.onLoad=function(){return k(d)});break;default:throw Error('PaperRenderer does not support the type "'.concat(a,'"'))}return d.props=e,d.type=a,d},createTextInstance:function(){throw Error("PaperRenderer does not support text children")},getPublicInstance:function(a){return a},prepareForCommit:function(){return null},prepareUpdate:function(){return!0},resetAfterCommit:function(){},resetTextContent:function(){},getRootHostContext:function(){return null},getChildHostContext:function(){return null},shouldSetTextContent:function(){return!1},getCurrentEventPriority:function(){return k.DefaultEventPriority},getInstanceFromNode:function(){},getInstanceFromScope:function(){},preparePortalMount:function(){},prepareScopeUpdate:function(){},beforeActiveInstanceBlur:function(){},afterActiveInstanceBlur:function(){},detachDeletedInstance:function(){},clearContainer:function(){},scheduleTimeout:setTimeout,cancelTimeout:clearTimeout,noTimeout:-1,isPrimaryRenderer:!1,warnsIfNotActing:!1,supportsMutation:!0,supportsHydration:!1,supportsPersistence:!1,appendInitialChild:function(a,b){(0,e.Z)(a,m().Group)&&(0,e.Z)(b,m().Item)&&b.addTo(a),(0,e.Z)(a,m().CompoundPath)&&(0,e.Z)(b,m().Item)&&b.addTo(a),(0,e.Z)(a,m().View)&&(0,e.Z)(b,m().Item)&&b.addTo(a.project)},finalizeInitialChildren:function(a,b,c){return((0,e.Z)(a,m().View)||(0,e.Z)(a,m().Tool))&&x(a,c),!1},appendChild:function(a,b){(0,e.Z)(a,m().Group)&&(0,e.Z)(b,m().Item)&&b.addTo(a),(0,e.Z)(a,m().View)&&(0,e.Z)(b,m().Item)&&b.addTo(a.project)},appendChildToContainer:function(a,b){if(!((0,e.Z)(b,m().View)||(0,e.Z)(b,m().Tool)))throw Error("Container can only hold View and Tool nodes")},insertBefore:function(a,b,c){(0,e.Z)(a,m().Group)&&(0,e.Z)(b,m().Item)&&(0,e.Z)(c,m().Item)&&b.insertAbove(c)},insertInContainerBefore:function(a,b,c){if(!((0,e.Z)(b,m().View)||(0,e.Z)(b,m().Tool))||!((0,e.Z)(c,m().View)||(0,e.Z)(c,m().Tool)))throw Error("Container can only hold View and Tool nodes")},removeChild:function(a,b){"function"==typeof b.remove&&b.remove()},removeChildFromContainer:function(a,b){"function"==typeof b.remove&&b.remove()},commitTextUpdate:function(){},commitMount:function(){},commitUpdate:function(a,b,c,d,e){x(a,e,d)}}),A=c(5893),B=c(7294),C=function(a){var b=(0,B.useRef)(a),c=(0,B.useRef)(),d=(0,B.useRef)(!1),e=(0,B.useRef)(!1),f=(0,B.useState)(0)[1];d.current&&(e.current=!0),(0,B.useEffect)(function(){return d.current||(c.current=b.current(),d.current=!0),f(1),function(){e.current&&c.current&&c.current()}},[])},D=function(a){var b=a.children,c=a.width,d=a.height,i=a.settings,j=a.onScopeReady,m=(0,h.Z)(a,["children","width","height","settings","onScopeReady"]),n=(0,B.useRef)(null),o=(0,B.useRef)(null),p=(0,B.useRef)(null);return C(function(){return(0,e.Z)(n.current,HTMLCanvasElement)&&(o.current=new l.PaperScope,Object.assign(o.current.settings,(0,g.Z)((0,f.Z)({},i),{insertItems:!1})),o.current.setup(n.current),p.current=z.createContainer(o.current,k.ConcurrentRoot,null,!1,null,"",console.error,null),z.updateContainer(null,p.current,null,function(){return null}),"function"==typeof j&&j(o.current)),function(){p.current&&z.updateContainer(null,p.current,null,function(){return null}),n.current=null,o.current=null,p.current=null}}),(0,B.useEffect)(function(){o.current&&p.current&&z.updateContainer(b,p.current,null,function(){return null})},[b]),(0,B.useEffect)(function(){o.current&&(o.current.view.viewSize=new o.current.Size(c,d))},[c,d]),(0,A.jsx)("canvas",(0,g.Z)((0,f.Z)({},m),{ref:n}))}},4128:function(a){a.exports={container:"Styles_container__6hGck",editor:"Styles_editor__S5iy_",canvas:"Styles_canvas__ThDsp"}},4169:function(){},9845:function(){}},function(a){a.O(0,[711,494,774,888,179],function(){var b;return a(a.s=8312)}),_N_E=a.O()}])