(this.webpackJsonpgame_of_life=this.webpackJsonpgame_of_life||[]).push([[0],{145:function(e,t,n){},176:function(e,t,n){"use strict";n.r(t);var a,r,c,o,i,l,s,d,b,u,j,h,g,O,f,p,m,x,v,w,y,k,C,S=n(0),B=n.n(S),N=n(21),D=n.n(N),_=(n(145),n(146),n(147),n(29)),E=n(10),I=n(9),P=n(188),F=n(16),T=n(45),A=n(88),L=n(95),R=n(14),z=n(189),H={background:"#2F3437",text:"#EBEBEB",sidebar:"#151515",cellBorder:"#000000",cellAlive:"#0E0F1E",cellDead:"#586268",cellHover:"#48AFF0",header:"#19A6FF",scrollBarBg:"#4F585D",scrollBarThumb:"#2F3437"},K={background:"#EBEBEB",text:"#37352F",sidebar:"#FFFFFF",cellBorder:"#343434",cellAlive:"#0E0F10",cellDead:"#EEEEEE",cellHover:"#48AFF0",header:"#19A6FF",scrollBarBg:"#EBEBEB",scrollBarThumb:"#888888"},G=n(3),J=function(e){var t=Object(S.createContext)({});return[function(n){var a=n.children,r=e();return Object(G.jsx)(t.Provider,{value:r,children:a})},function(){return Object(S.useContext)(t)},t]},V=J((function(){var e=Object(z.a)("isDark",!0),t=Object(R.a)(e,2),n=t[0],a=t[1],r=Object(S.useState)(H),c=Object(R.a)(r,2),o=c[0],i=c[1],l=Object(S.useCallback)((function(){console.log("Toggle theme"),i(n?K:H),a(!n)}),[a,n,i]);return{theme:o,isDark:!!n,toggleTheme:l}})),M=Object(R.a)(V,2),U=M[0],q=M[1],Q=Object(I.b)(P.f)(a||(a=Object(E.a)(["\n    font-size: 3.5em !important;\n    line-height: .9em !important;\n    font-weight: bold;\n    align-self: flex-start;\n"]))),W=I.b.header(r||(r=Object(E.a)(["\n    position: relative;\n    width: 100%;\n"]))),X=Object(I.b)(P.u)(c||(c=Object(E.a)(["\n    position: absolute;\n    bottom: 0;\n    right: 0;\n"]))),Y=Object(I.b)(P.i)(o||(o=Object(E.a)(["\n    display: inline-block;\n    vertical-align: super;\n    margin-left: .2em;\n"]))),Z=function(){var e=q(),t=e.isDark,n=e.toggleTheme;return Object(G.jsxs)(W,{children:[Object(G.jsx)(L.a,{content:ee,position:F.a.RIGHT,children:Object(G.jsxs)(Q,{children:["Game ",Object(G.jsx)("br",{}),"of ",Object(G.jsx)("br",{}),"Life",Object(G.jsx)(Y,{icon:"info-sign",intent:"primary"})]})}),Object(G.jsx)(X,{alignIndicator:T.a.RIGHT,checked:t,onChange:n,innerLabel:"\ud83c\udf1e",innerLabelChecked:"\ud83c\udf1a",large:!0})]})},$=I.b.div(i||(i=Object(E.a)(["\n    width: 40vw;\n    max-width: 1000px;\n    min-width: 500px;\n    padding: 1em;\n"]))),ee=Object(G.jsxs)($,{children:[Object(G.jsxs)("h1",{children:["Conway's Game of Life ",Object(G.jsxs)("span",{className:"bp3-text-muted",children:[" - v",A.version]})]}),Object(G.jsxs)("p",{children:["\u2003 Is a ",Object(G.jsx)("strong",{children:"cellular automaton"})," devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.",Object(G.jsx)("br",{}),"\u2003 One interacts with the Game of Life by creating an initial configuration and observing how it evolves."]}),Object(G.jsx)("h2",{children:"How to play?"}),Object(G.jsxs)("p",{children:["\u2003 Click on a cell to change its state. Change as many cells as you want and press ",Object(G.jsxs)("strong",{children:[Object(G.jsx)(P.i,{icon:"play"})," Play"]}),"!",Object(G.jsx)("br",{}),"\u2003 Alternatively, click the ",Object(G.jsxs)("strong",{children:[Object(G.jsx)(P.i,{icon:"step-forward"})," Step by step "]}),"button to evolve the board one cycle at a time."]}),Object(G.jsx)("h2",{children:"Rules"}),Object(G.jsxs)("ul",{children:[Object(G.jsx)("li",{children:"Any live cell with fewer than two live neighbours dies, as if by underpopulation."}),Object(G.jsx)("li",{children:"Any live cell with two or three live neighbours lives on to the next generation."}),Object(G.jsx)("li",{children:"Any live cell with more than three live neighbours dies, as if by overpopulation."}),Object(G.jsx)("li",{children:"Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction."})]})]}),te=n(185),ne=function(e,t,n){var a=e.length,r=e[0].length,c=e[t][n],o=t-1,i=t+1,l=n-1,s=n+1,d=s<r,b=i<a,u=o>=0,j=l>=0,h=(j&&u?Number(e[o][l].alive):0)+(u?Number(e[o][n].alive):0)+(d&&u?Number(e[o][s].alive):0)+(j?Number(e[t][l].alive):0)+(d?Number(e[t][s].alive):0)+(j&&b?Number(e[i][l].alive):0)+(b?Number(e[i][n].alive):0)+(b&&d?Number(e[i][s].alive):0);return 3===h||c.alive&&2===h},ae=function(e){return JSON.parse(JSON.stringify(e))},re="\n0000000000000000000000000100000000000000\n0000000000000000000000000000000100000000\n0000000000100000000000010000000100000000\n0001100011000000100000000000000100000110\n0000100001000000010000000000000000000010\n0000000000000000001000000000000000000000\n0000000000000000000000000000000000000000\n0000000000000000000000000000000001000000\n0000000000000000000000000010000000000000\n0000000000000000000000000000000000000000\n0000000000000000011000110000000000000000\n0000000000000000111101111000000000000000\n0001100000000001111111111100000000000000\n0011000000000001111111111100000000000000\n0010000000000000111111111000000011000001\n0000000000000000011111110000000000000000\n0000100001000000001111100000000000000010\n0000100001001000000111000000000000000010\n0000100001011100000010000000000000000010\n0000000000110000000000000000000000000000\n0000000000000000000000000000000000000000\n0000000000000000000000000000000000000000\n0000000000000000000000000010000000000000\n0000000000000000000000000111000000000000\n0000000000000000000000000010000100000000\n0000011100001110000000000000000010000000\n0000000000000010000000000000000001000000\n0000000000000000000000000000000000000000\n0000000000000000000000110000000011000000\n1000010000000000000000100000000001100000\n",ce=function(e,t,n,a){for(var r,c,o=[],i=0;i<e;i++){r=[];for(var l=0;l<t;l++)c=n?!!Math.round(Math.random()):!!(null===a||void 0===a?void 0:a.length)&&!!parseInt(a[i*t+l]),r.push({alive:c,age:0,row:i,column:l});o.push(r)}return o},oe=function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=re.replaceAll("\n","");return a?ce(e,t,n,r):ce(e,t,n)},ie=function(e){return"saved/".concat(e.replaceAll(" ","_"))},le=function(e){return new Promise((function(t,n){if(window.localStorage.hasOwnProperty(ie(e))){var a,r,c,o,i,l=null!==(a=window.localStorage.getItem(ie(e)))&&void 0!==a?a:"{}",s=JSON.parse(l);return t({name:null!==(r=s.name)&&void 0!==r?r:"undefined",created:null!==(c=s.created)&&void 0!==c?c:new Date,edited:null!==(o=s.edited)&&void 0!==o?o:new Date,board_content:null!==(i=s.board_content)&&void 0!==i?i:[[]]})}return t(void 0)}))},se=P.w.create({className:"recipe-toaster",position:F.a.TOP}),de=function(e,t){se.show({message:e,intent:t})},be=n(97),ue=n(98),je=function(){function e(t,n,a){var r,c,o;(Object(be.a)(this,e),this.name="",this.created=new Date,this.edited=new Date,this.board_content=[[]],t)?(console.log("Creating board from: ".concat(t)),this.name=null!==(r=t.name)&&void 0!==r?r:"undefined",this.created=null!==(c=t.created)&&void 0!==c?c:new Date,this.edited=null!==(o=t.edited)&&void 0!==o?o:new Date,this.board_content=t.board_content):n&&(this.name=null!==a&&void 0!==a?a:"untitled_board",this.created=new Date,this.edited=new Date,this.board_content=n)}return Object(ue.a)(e,[{key:"getRows",value:function(){return this.board_content.length}},{key:"getCols",value:function(){return this.board_content[0].length}}]),e}(),he=n(18),ge=n(65),Oe=function(e){var t=function(e){for(var t="",n="",a=0;a<e.length;a+=8)n=e.substring(a,a+8).padEnd(8,"0"),t+=String.fromCharCode(parseInt(n,2));return t}(e);return btoa(t).replaceAll("/","_")},fe=function(e){var t=e.getCols(),n=e.getRows(),a=function(e){var t,n="",a=Object(ge.a)(e);try{for(a.s();!(t=a.n()).done;){var r,c=t.value,o=Object(ge.a)(c);try{for(o.s();!(r=o.n()).done;)n+=r.value.alive?"1":"0"}catch(i){o.e(i)}finally{o.f()}}}catch(i){a.e(i)}finally{a.f()}return n}(e.board_content),r=Oe(a),c=window.location;return c.host+c.pathname+"#/shared/".concat(n,"x").concat(t,"/").concat(function(e){for(var t="",n="",a=!1,r=0;r<e.length;r++)if([n=e[r],r<e.length-1?e[r+1]:""].every((function(e){return"A"===e}))){var c=0;for(a=!0;a&&r<e.length;)c++,a=e[++r]===n;t+="&".concat(c,";"),r--}else t+=n;return t}(r))},pe=function(e,t,n){var a=function(e){return function(e){for(var t="",n=0;n<e.length;n++)t+=e[n].charCodeAt(0).toString(2).padStart(8,"0");return t}(atob(e.replaceAll("_","/")))}(function(e){for(var t="",n=0;n<e.length;n++)if("&"!==e[n])t+=e[n];else{var a=e.indexOf(";",n),r=parseInt(e.substring(n+1,a));n=a,t+="A".repeat(r)}return t}(n)),r=ce(e,t,!1,a);return{name:"Shared board",created:new Date,edited:new Date,board_content:r}},me=Object(S.createContext)((function(e,t){console.log("Not yet configured")})),xe=J((function(){var e=Object(S.useState)(40),t=Object(R.a)(e,2),n=t[0],a=t[1],r=Object(S.useState)(30),c=Object(R.a)(r,2),o=c[0],i=c[1],l=Object(S.useState)(),s=Object(R.a)(l,2),d=s[0],b=s[1],u=Object(S.useState)(),j=Object(R.a)(u,2),h=j[0],g=j[1],O=Object(S.useState)(10),f=Object(R.a)(O,2),p=f[0],m=f[1],x=Object(S.useState)(!1),v=Object(R.a)(x,2),w=v[0],y=v[1],k=Object(S.useState)(0),C=Object(R.a)(k,2),B=C[0],N=C[1],D=Object(z.a)("highlightNew",!1),_=Object(R.a)(D,2),E=_[0],I=_[1],P=Object(S.useState)(""),F=Object(R.a)(P,2),T=F[0],A=F[1],L=Object(S.useState)(),H=Object(R.a)(L,2),K=H[0],G=H[1],J=Object(he.f)(),V=function(){Array.isArray(d)&&(b(function(e){var t,n,a,r,c=ae(e),o=e.length,i=e[0].length;for(t=0;t<o;t++)for(n=0;n<i;n++)a=ne(e,t,n),(r=c[t][n]).alive=a,a?r.age+=1:r.age=0;return c}(d)),N((function(e){return e+1})))},M=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];b(oe(e,t,n,a)),N(0)};return Object(S.useEffect)((function(){var e;K?(b(K.board_content),A(K.name),e=K.board_content):(console.log("Initialize heart board"),M(o,n,!1,!0),e=oe(o,n,!1,!0)),g(e)}),[o,n,K]),Object(te.a)((function(){V()}),w?1e3/p:null),{colCount:n,setColCount:a,rowCount:o,setRowCount:i,content:d,setContent:b,resetCheckpoint:h,setResetCheckpoint:g,speed:p,setSpeed:m,isPlaying:w,setIsPlaying:y,iterationCount:B,setIterationCount:N,highlightNew:!!E,setHighlightNew:I,name:T,setName:A,toggleState:function(e,t){if(Array.isArray(d)){console.log("Toggling cell: [".concat(t,"][").concat(e,"]"));var n=ae(d);n[t][e].alive=!n[t][e].alive,b(n)}},iterateOnce:V,resetBoard:function(){b(h),N(0),de("Reset board","primary")},randomizeBoard:function(){M(o,n,!0,!1),de("Randomized cells","primary")},clearBoard:function(){M(o,n,!1,!1),de("Cleared board","primary")},togglePlaying:function(){y((function(e){return!e}))},toggleHighlightNew:function(){I(!E)},handleSave:function(){T.length?(console.log("Saving... ".concat(T)),function(e){var t=ie(e.name);window.localStorage.hasOwnProperty(t)&&(e.edited=new Date);var n=function(e){return{name:e.name,created:e.created,edited:e.edited,board_content:e.board_content}}(e),a=JSON.stringify(n);window.localStorage.setItem(t,a)}(new je(null,d,T)),J.push("/"+ie(T)),de("Saved board: ".concat(T),"success")):alert("Invalid name")},getShareableLink:function(){var e=fe(new je(null,d,T));navigator.clipboard.writeText(e),de("Link copied to clipboard.","primary")},initializeBoard:M,loadedBoard:K,setLoadedBoard:G}})),ve=Object(R.a)(xe,2),we=ve[0],ye=ve[1],ke=I.b.span(l||(l=Object(E.a)(["\n    color: ",";\n"])),H.header),Ce=Object(I.b)(P.h)(s||(s=Object(E.a)(["\n    font-size: .9em !important;\n\n    a &:not(:hover) {\n        color: inherit;\n    }\n"]))),Se=I.b.footer(d||(d=Object(E.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-self: end;\n    margin-top: 8px;\n    width: 100%;\n    background-color: ",";\n"])),(function(e){return e.theme.sidebar})),Be=function(){var e=ye().iterationCount;return Object(G.jsxs)(Se,{children:[Object(G.jsxs)(P.g,{children:["Iteration count: ",Object(G.jsx)(ke,{children:e})]}),Object(G.jsxs)(Ce,{className:"bp3-text-muted",children:["Made with \ud83d\udc96 by\xa0",Object(G.jsx)("a",{href:"https://github.com/diegoasanch",target:"_blank",rel:"noopener noreferrer",children:"Diego."})]})]})},Ne=Object(I.b)(P.d)(b||(b=Object(E.a)(["\n    width: 100%;\n"]))),De=function(e){var t=e.value,n=e.maxValue,a=e.placeholder,r=e.handleInput;return Object(G.jsx)(P.o,{allowNumericCharactersOnly:!1,min:0,max:n,onValueChange:r,placeholder:a,value:t,fill:!0})},_e=function(e){var t=e.value,n=e.setValue;return Object(G.jsx)(P.s,{value:t,onChange:n,max:30,labelStepSize:4,min:1})},Ee=I.b.div(u||(u=Object(E.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    width: 100%;\n\n    > * {\n        margin: .5em 0;\n    }\n"]))),Ie=I.b.div(j||(j=Object(E.a)(["\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    justify-items: center;\n    align-items: center;\n\n    > * {\n        padding: 0 5%;\n    }\n"]))),Pe=function(){var e=ye(),t=e.rowCount,n=e.colCount,a=e.setRowCount,r=e.setColCount,c=e.iterateOnce,o=e.speed,i=e.setSpeed,l=e.isPlaying,s=e.togglePlaying,d=e.resetBoard,b=e.randomizeBoard,u=e.clearBoard,j=e.highlightNew,h=e.toggleHighlightNew;return Object(G.jsxs)(Ee,{children:[Object(G.jsx)(P.u,{alignIndicator:T.a.RIGHT,checked:j,onChange:h,label:"Highlight new cells"}),Object(G.jsxs)(Ie,{children:[Object(G.jsxs)(P.k,{children:["Rows",Object(G.jsx)(De,{value:t,maxValue:250,placeholder:"Row count",handleInput:function(e,t,n){a(e)}})]}),Object(G.jsxs)(P.k,{children:["Columns",Object(G.jsx)(De,{value:n,maxValue:250,placeholder:"Column count",handleInput:function(e,t,n){r(e)}})]})]}),Object(G.jsxs)(P.k,{children:["Iteration Speed",Object(G.jsx)("span",{className:"bp3-text-muted",children:" (Hz)"}),Object(G.jsx)(_e,{value:o,setValue:function(e){i(e)}})]}),Object(G.jsxs)(P.b,{large:!0,children:[Object(G.jsx)(L.a,{content:"".concat(l?"Stop":"Start"," iterating"),position:F.a.TOP,children:Object(G.jsx)(P.a,{text:l?"Pause":"Play",icon:l?"pause":"play",intent:"primary",onClick:s})}),Object(G.jsx)(L.a,{content:"Step-by-step",position:F.a.TOP,children:Object(G.jsx)(P.a,{rightIcon:"step-forward",onClick:function(e){c()},disabled:l})})]}),Object(G.jsxs)(P.b,{children:[Object(G.jsx)(L.a,{content:"Reset board",position:F.a.TOP,children:Object(G.jsx)(P.a,{onClick:d,icon:"reset",intent:"danger"})}),Object(G.jsx)(L.a,{content:"Clear board",position:F.a.TOP,children:Object(G.jsx)(P.a,{onClick:u,icon:"eraser"})}),Object(G.jsx)(L.a,{content:"Randomize cells",position:F.a.TOP,children:Object(G.jsx)(P.a,{text:"Random",onClick:b,icon:"random"})})]})]})},Fe=I.b.div(h||(h=Object(E.a)(["\n    display: flex;\n    align-items: center;\n    height: 3em;\n    cursor: pointer;\n"]))),Te=Object(I.b)(P.c)(g||(g=Object(E.a)(["\n    padding-left: .5em;\n"]))),Ae=function(e){var t=e.name,n=e.startOpen,a=e.Component,r=Object(S.useState)(n),c=Object(R.a)(r,2),o=c[0],i=c[1];return Object(G.jsxs)("section",{children:[Object(G.jsx)(Fe,{onClick:function(){i((function(e){return!e}))},children:Object(G.jsxs)("h3",{children:[Object(G.jsx)(P.i,{icon:o?"chevron-down":"chevron-right"}),Object(G.jsx)("code",{children:t})]})}),Object(G.jsx)(Te,{isOpen:o,children:a})]})},Le=I.b.div(O||(O=Object(E.a)(["\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n    overflow-y: scroll;\n    padding-right: 2px;\n\n    &::-webkit-scrollbar {\n        background-color: ",";\n        width: 7px;\n        border-radius: 3px;\n    }\n    &::-webkit-scrollbar-thumb {\n        background-color: ",";\n        border-radius: 3px;\n    }\n    &:hover::-webkit-scrollbar {\n        background-color: ",";\n    }\n    &:hover::-webkit-scrollbar-thumb {\n        background-color: ",";\n    }\n"])),(function(e){return e.theme.sidebar}),(function(e){return e.theme.scrollBarBg}),(function(e){return e.theme.scrollBarBg}),(function(e){return e.theme.scrollBarThumb})),Re=[{name:"Settings",startOpen:!0,Component:Object(G.jsx)(Pe,{})},{name:"Saved Boards",startOpen:!1,Component:Object(G.jsx)(P.v,{large:!0,minimal:!0,children:"Coming soon..."})}],ze=function(){return Object(G.jsx)(Le,{children:Re.map((function(e){return Object(G.jsx)(Ae,Object(_.a)({},e))}))})},He=I.b.div(f||(f=Object(E.a)(["\n    position: relative;\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    background-color: ",";\n    padding: 8px;\n    align-items: center;\n    justify-content: space-around;\n"])),(function(e){return e.theme.sidebar})),Ke=function(){return Object(G.jsxs)(He,{children:[Object(G.jsx)(Z,{}),Object(G.jsx)(Ne,{}),Object(G.jsx)(ze,{}),Object(G.jsx)(Ne,{}),Object(G.jsx)(Be,{})]})},Ge=I.b.div(p||(p=Object(E.a)(["\n    height: 20px;\n    width: 20px;\n    background-color: ",";\n    border: solid 1px ",";\n    cursor: pointer;\n\n    &:hover {\n        border: solid 3px ",";\n    }\n"])),(function(e){return e.background}),(function(e){return e.theme.cellBorder}),(function(e){return e.hoverBorder})),Je=function(e){var t=e.cellData,n=e.highlightNew,a=Object(S.useContext)(me),r=q().theme,c=Object(S.useState)({background:r.cellDead,hoverBorder:r.cellHover}),o=Object(R.a)(c,2),i=o[0],l=o[1];return Object(S.useEffect)((function(){var e={background:r.cellDead,hoverBorder:r.cellHover};t.alive&&(1===t.age&&n?(e.background=r.header,e.hoverBorder=r.sidebar):e.background=r.cellAlive),l(e)}),[t,n]),Object(G.jsx)(Ge,Object(_.a)(Object(_.a)({},i),{},{onClick:function(){a(t.column,t.row)}}))},Ve=I.b.div(m||(m=Object(E.a)(["\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    overflow: scroll;\n    height: 100%;\n    width: 100%;\n    justify-content: center;\n\n    &::-webkit-scrollbar {\n        background-color: ",";\n        width: 10px;\n        height: 10px;\n    }\n    &::-webkit-scrollbar-thumb {\n        background-color: ",";\n    }\n"])),(function(e){return e.theme.scrollBarBg}),(function(e){return e.theme.scrollBarThumb})),Me=I.b.div(x||(x=Object(E.a)(["\n    display: flex;\n    flex-direction: row;\n    margin: 0;\n"]))),Ue=function(e){var t=e.isLoading,n=ye(),a=n.content,r=n.highlightNew;return Object(G.jsxs)(Ve,{children:[t&&Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(P.f,{children:"Loading..."}),Object(G.jsx)("br",{}),Object(G.jsx)(P.t,{size:80,intent:"primary"})]}),!t&&(null===a||void 0===a?void 0:a.length)&&a[0].length?a.map((function(e,t){return Object(G.jsx)(Me,{children:e.map((function(e){return Object(G.jsx)(Je,{cellData:e,highlightNew:r},"cell_".concat(e.row,"_").concat(e.column))}))},"row_".concat(t))})):Object(G.jsx)(P.f,{children:"Not enough cells to display \ud83d\ude22"})]})},qe=n(186),Qe=Object(I.b)(P.e)(v||(v=Object(E.a)(["\n    padding: 0 0 5px 5px;\n    width: calc(100% - 10px);\n    margin: 0;\n\n    .save-btn {\n        margin-top: 5px;\n    }\n"]))),We=function(){var e=ye(),t=e.iterateOnce,n=e.isPlaying,a=e.togglePlaying,r=e.resetBoard,c=e.randomizeBoard,o=e.clearBoard,i=e.name,l=e.setName,s=e.handleSave,d=e.getShareableLink;return Object(G.jsxs)(P.l,{children:[Object(G.jsx)(P.n,{text:n?"Pause":"Play",icon:n?"pause":"play",onClick:a,intent:"primary",labelElement:Object(G.jsx)("span",{className:"bp3-text-muted",children:"P"})}),Object(G.jsx)(P.n,{text:"Iterate once",icon:"step-forward",onClick:t,disabled:n,labelElement:Object(G.jsx)("span",{className:"bp3-text-muted",children:Object(G.jsx)(P.i,{icon:"arrow-right"})})}),Object(G.jsx)(P.m,{}),Object(G.jsxs)(Qe,{label:"Save board",labelFor:"name-input",labelInfo:Object(G.jsxs)(G.Fragment,{children:["(",Object(G.jsx)(P.i,{icon:"key-shift"}),"S)"]}),children:[Object(G.jsx)(P.j,{onChange:function(e){l(e.target.value)},value:i,placeholder:"untitled_board",id:"name-input",autoFocus:!0}),Object(G.jsx)(P.a,{className:"save-btn",text:"Save",icon:"floppy-disk",onClick:s,fill:!0})]}),Object(G.jsx)(P.n,{text:"Share",icon:"share",onClick:d,labelElement:Object(G.jsxs)("span",{className:"bp3-text-muted",children:[Object(G.jsx)(P.i,{icon:"key-shift"}),"D"]})}),Object(G.jsx)(P.m,{}),Object(G.jsx)(P.n,{text:"Randomize cells",icon:"random",onClick:c,labelElement:Object(G.jsxs)("span",{className:"bp3-text-muted",children:[Object(G.jsx)(P.i,{icon:"key-shift"}),"N"]})}),Object(G.jsx)(P.n,{text:"Clear",icon:"eraser",onClick:o,labelElement:Object(G.jsxs)("span",{className:"bp3-text-muted",children:[Object(G.jsx)(P.i,{icon:"key-shift"}),"C"]})}),Object(G.jsx)(P.n,{text:"Reset",icon:"reset",onClick:r,intent:"danger",labelElement:Object(G.jsxs)("span",{className:"bp3-text-muted",children:[Object(G.jsx)(P.i,{icon:"key-shift"}),"R"]})}),Object(G.jsx)(P.m,{}),Object(G.jsx)(P.n,{text:"View on GitHub",icon:"code",labelElement:Object(G.jsx)(P.i,{icon:"arrow-top-right"}),href:"https://github.com/diegoasanch/Game-of-life",target:"_blank"})]})},Xe=n(187),Ye=I.b.div(w||(w=Object(E.a)(["\n    width: 100%;\n    height: 100%;\n    background-color: ",";\n    color: ",";\n    display: flex;\n    flex-direction: row;\n"])),(function(e){return e.theme.background}),(function(e){return e.theme.text})),Ze=I.b.div(y||(y=Object(E.a)(["\n    width: 17em;\n    z-index: 1;\n"]))),$e=I.b.div(k||(k=Object(E.a)(["\n    width: calc(100% - 17em);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    height: 100%;\n"]))),et=Object(I.b)(qe.a)(C||(C=Object(E.a)(["\n    height: 100vh;\n    width: 100vw;\n"]))),tt=function(e){var t=e.loadedBoard,n=e.isLoading,a=ye(),r=a.speed,c=a.isPlaying,o=a.toggleState,i=a.iterateOnce,l=a.setLoadedBoard;Object(S.useEffect)((function(){l(t)}),[t,l]),Object(te.a)((function(){i()}),c?1e3/r:null);var s=function(){var e=ye(),t=e.togglePlaying,n=e.iterateOnce,a=e.randomizeBoard,r=e.clearBoard,c=e.resetBoard,o=e.toggleHighlightNew,i=e.handleSave,l=e.getShareableLink,s=e.highlightNew,d=q().toggleTheme;return Object(S.useMemo)((function(){return[{combo:"p",global:!0,label:"Play",onKeyDown:t},{combo:"right",global:!0,label:"Iterate once",onKeyDown:n},{combo:"shift + n",global:!0,label:"Randomize cells",onKeyDown:a},{combo:"shift + c",global:!0,label:"Clear board",onKeyDown:r},{combo:"shift + r",global:!0,label:"Reset Board",onKeyDown:c},{combo:"shift + l",global:!0,label:"Toggle theme",onKeyDown:d},{combo:"shift + h",global:!0,label:"Toggle theme",onKeyDown:o},{combo:"shift + s",global:!0,label:"Save board",onKeyDown:i},{combo:"shift + d",global:!0,label:"Share board",onKeyDown:l}]}),[t,n,a,r,c,o,i,l,s,d])}(),d=Object(Xe.a)(s),b=d.handleKeyDown,u=d.handleKeyUp;return Object(G.jsx)("div",{onKeyDown:b,onKeyUp:u,children:Object(G.jsx)(me.Provider,{value:o,children:Object(G.jsx)(et,{content:Object(G.jsx)(We,{}),children:Object(G.jsxs)(Ye,{children:[Object(G.jsx)(Ze,{children:Object(G.jsx)(Ke,{})}),Object(G.jsx)($e,{children:Object(G.jsx)(Ue,{isLoading:!!n})})]})})})})},nt=function(e){return Object(G.jsx)(we,{children:Object(G.jsx)(tt,Object(_.a)({},e))})},at=n(190),rt=n(177),ct=n(40),ot=n.n(ct),it=n(56),lt={name:"undefined",created:new Date,edited:new Date,board_content:[[],[]]};var st=function(){var e=Object(he.g)().name,t=Object(S.useState)(lt),n=Object(R.a)(t,2),a=n[0],r=n[1],c=Object(S.useState)(!0),o=Object(R.a)(c,2),i=o[0],l=o[1];return Object(S.useEffect)((function(){var t=function(){var t=Object(it.a)(ot.a.mark((function t(){var n;return ot.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,le(e);case 3:(n=t.sent)?(r(n),se.show({message:'Loaded board "'.concat(e,'"'),intent:"primary"})):(r(lt),se.show({message:"Couldn't load board \"".concat(e,'"'),intent:"danger"})),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),se.show({message:"Error loading the board.",intent:"danger"});case 10:return t.prev=10,l(!1),t.finish(10);case 13:case"end":return t.stop()}}),t,null,[[0,7,10,13]])})));return function(){return t.apply(this,arguments)}}();l(!0),t()}),[e]),Object(G.jsx)(nt,{loadedBoard:a,isLoading:i})},dt={name:"undefined",created:new Date,edited:new Date,board_content:[[],[]]};var bt,ut=function(){var e=Object(he.g)(),t=e.dimensions,n=e.content,a=Object(S.useState)(dt),r=Object(R.a)(a,2),c=r[0],o=r[1],i=Object(S.useState)(!0),l=Object(R.a)(i,2),s=l[0],d=l[1],b=function(e,t,n){return new Promise((function(a,r){var c;try{if(e&&t&&n)return c=pe(e,t,n),de("Loaded shared ".concat(e," x ").concat(t," board"),"primary"),o(c),a();throw new Error("invalid board")}catch(i){return r()}}))};return Object(S.useEffect)((function(){var e=0,a=0;if(t.includes("x")){var r=t.split("x"),c=Object(R.a)(r,2),i=c[0],l=c[1];e=parseInt(i)||0,a=parseInt(l)||0}else if(t.length&&!isNaN(parseInt(t))){var s=parseInt(t);e=s,a=s}console.log({dimensions:t,parsed_rows:e,parsed_cols:a,content:n}),function(){var t=Object(it.a)(ot.a.mark((function t(){return ot.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return d(!0),t.prev=1,t.next=4,b(e,a,n);case 4:t.next=10;break;case 6:t.prev=6,t.t0=t.catch(1),o(dt),console.error("Invalid board"),de("Invalid board","danger");case 10:return t.prev=10,d(!1),t.finish(10);case 13:case"end":return t.stop()}}),t,null,[[1,6,10,13]])})));return function(){return t.apply(this,arguments)}}()()}),[t,n]),Object(G.jsx)(nt,{loadedBoard:c,isLoading:s})},jt=n(43);at.a.onlyShowFocusOnTabs();var ht=I.b.div(bt||(bt=Object(E.a)(["\n  height: 100vh;\n  width: 100vw;\n"])));var gt=function(){return Object(G.jsx)(rt.b,{children:Object(G.jsx)(U,{children:Object(G.jsx)(Ot,{children:Object(G.jsx)(ft,{children:Object(G.jsx)(jt.a,{basename:"/",children:Object(G.jsxs)(he.c,{children:[Object(G.jsx)(he.a,{exact:!0,path:"/saved/:name",children:Object(G.jsx)(st,{})}),Object(G.jsx)(he.a,{exact:!0,path:"/shared/:dimensions/:content",children:Object(G.jsx)(ut,{})}),Object(G.jsx)(he.a,{path:"/",exact:!0,children:Object(G.jsx)(nt,{})})]})})})})})})},Ot=function(e){var t=e.children,n=q(),a=n.theme,r=n.isDark,c=n.toggleTheme;return Object(G.jsx)(I.a,{theme:Object(_.a)(Object(_.a)({},a),{},{isDark:r,toggleTheme:c}),children:t})},ft=function(e){var t=e.children,n=q().isDark;return Object(G.jsx)(ht,{className:".bp3-ui-text ".concat(n?"bp3-dark":""),children:t})},pt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,191)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),a(e),r(e),c(e),o(e)}))};D.a.render(Object(G.jsx)(B.a.StrictMode,{children:Object(G.jsx)(gt,{})}),document.getElementById("root")),pt()},88:function(e){e.exports=JSON.parse('{"name":"game_of_life","version":"0.4.0","private":true,"homepage":"http://diegoasanch.github.io/Game-of-life","dependencies":{"@blueprintjs/core":"^3.42.0","@blueprintjs/popover2":"^0.4.0","@testing-library/jest-dom":"^5.11.4","@testing-library/react":"^11.1.0","@testing-library/user-event":"^12.1.10","@types/jest":"^26.0.24","@types/node":"^12.0.0","@types/react":"^17.0.0","@types/react-dom":"^17.0.0","@types/react-router-dom":"^5.1.7","@types/styled-components":"^5.1.9","add":"^2.0.6","gh-pages":"^3.1.0","react":"^17.0.2","react-dom":"^17.0.2","react-router-dom":"^5.2.0","react-scripts":"4.0.3","react-use":"^17.2.1","styled-components":"^5.2.3","typescript":"^4.1.2","web-vitals":"^1.0.1","yarn":"^1.22.10"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject","predeploy":"yarn build","deploy":"gh-pages -d build"},"eslintConfig":{"extends":["react-app","react-app/jest"]},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"@babel/preset-typescript":"^7.14.5"}}')}},[[176,1,2]]]);
//# sourceMappingURL=main.f99f08ca.chunk.js.map