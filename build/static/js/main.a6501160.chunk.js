(this["webpackJsonpwar-game"]=this["webpackJsonpwar-game"]||[]).push([[0],{102:function(e,t,n){"use strict";n.r(t);var a=n(4),o=n(0),s=n.n(o),c=n(8),r=n.n(c),i=(n(77),n.p,n(78),n(47)),l=n(43),u=n.n(l),d=n(60),h=n(14),p=n(30),j=n.n(p),g=n(137),b=n(134),f=n(27);function m(e,t){this.suite=e,this.denomination=t}var O={Ace:14,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,Jack:11,Queen:12,King:13};m.prototype.biggerCard=function(e){return O[this.denomination]==O[e.denomination]?0:O[this.denomination]>O[e.denomination]?1:-1};var v=function(){var e=[],t=["Hearts","Spades","Clubs","Diamonds"],n=["Ace",2,3,4,5,6,7,8,9,10,"Jack","Queen","King"];for(var a in t)for(var o in n)e.push(new m(t[a],n[o]));return function(e){for(var t,n=e.length;n;){var a=[e[t=Math.floor(Math.random()*n--)],e[n]];e[n]=a[0],e[t]=a[1]}return e}(e)};var x=Object(f.b)((function(e){return{username:e.username}}),(function(e){return{setUsername:function(t){e({type:"SET_USERNAME",payload:t})}}}))((function(e){var t=Object(o.useState)([]),n=Object(h.a)(t,2),s=n[0],c=n[1],r=Object(o.useState)([]),l=Object(h.a)(r,2),p=l[0],f=l[1],m=Object(o.useState)([]),O=Object(h.a)(m,2),x=O[0],y=O[1],S=Object(o.useState)([]),w=Object(h.a)(S,2),k=w[0],C=w[1],N=Object(o.useState)(!1),E=Object(h.a)(N,2),T=E[0],U=E[1],I=Object(o.useState)(""),A=Object(h.a)(I,2),B=A[0],R=A[1],L=Object(o.useState)(""),W=Object(h.a)(L,2),D=W[0],F=W[1],J=Object(o.useState)(""),M=Object(h.a)(J,2),P=M[0],z=M[1],_=Object(o.useState)([]),K=Object(h.a)(_,2),Q=K[0],G=K[1],H=Object(o.useState)(!1),Y=Object(h.a)(H,2),$=Y[0],q=Y[1],V=Object(o.useState)(null),X=Object(h.a)(V,2),Z=X[0],ee=X[1],te=localStorage.getItem("token"),ne={headers:{"Content-type":"application/json","x-auth-token":"".concat(te)}};Object(o.useEffect)((function(){var t=v();c(t.slice(0,26)),f(t.slice(26,52)),""!=e.username&&null!=te&&void 0!=te&&""!=te||e.history.push("/"),j.a.get("http://localhost:5000/api/score/".concat(e.username),ne).then((function(e){ee(e.data.score.games_won)})).catch((function(e){localStorage.setItem("token","")}))}),[]);var ae=function(){var t=Object(d.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:j.a.put("http://localhost:5000/api/score",{username:e.username},ne).then((function(e){ee(Z+1)})).catch((function(e){localStorage.setItem("token",""),console.log(e)}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),oe=function(e){var t=Q,n=s,a=p;if(null!=e&&(t.push(e),t.push(e)),n.length<4){if((n=n.concat(x)).length<4)return void R("The comp won, you doesnt have enough cards to finish WAR");c(n),y([])}if(a.length<4){if(a=a.concat(k),n.length<4)return void R("The user won, opponent doesnt have enough cards to finish WAR");f(a),C([])}for(var o=0;o<3;o++)t.push(n.pop()),t.push(a.pop());var r=n.pop(),i=a.pop(),l=r.biggerCard(i);t.push(r),t.push(i),U("The tie has been resolved and ".concat(1==l?"you":"the comp"," takes home all ").concat(t.length," cards")),1==l?(y(x.concat(t)),t=[],G([])):-1==l?(C(k.concat(t)),t=[],G([])):(U("There is another tie!"),G(t))},se=function(e,t){if(s.length<=0&&x.length<=0)R("comp won");else{if(p.length<=0&&k.length<=0)return R("user won"),void ae();s.length<=0&&e.length>0&&(c(e),y([])),p.length<=0&&t.length>0&&(f(t),C([]))}};return e.username?Object(a.jsxs)("div",{children:[Object(a.jsx)(g.a,{onClick:function(){return e.setUsername(""),localStorage.setItem("token",""),void e.history.push("/")},children:"LOGOUT"}),Object(a.jsxs)(b.a,{children:[e.username,"'s win tally is ",Z]}),""==B?Object(a.jsx)(g.a,{"data-testid":"playButton",disabled:$,onClick:function(){return function(){if(Q.length>0)oe(null);else{var e=s.pop(),t=p.pop();z(t),F(e);var n,a,o=e.biggerCard(t);1==o?(n=[].concat(Object(i.a)(x),[t,e]),a=k,y(n),U("")):-1==o?(a=[].concat(Object(i.a)(k),[t,e]),n=x,C(a),U("")):(U("Let's begin the WAR"),q(!0),setTimeout((function(){oe(e),q(!1)}),1500)),void 0!=x&&void 0!=a&&se(x,a)}}()},children:"Play"}):null,Object(a.jsxs)(b.a,{variant:"h3",children:[B,""!=B?Object(a.jsx)(g.a,{onClick:function(){return function(){var e=v();c(e.slice(0,26)),f(e.slice(26,52)),y([]),C([]),G([]),R(""),U("")}()},children:"Play again"}):null]}),Object(a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(a.jsxs)("div",{children:[Object(a.jsxs)(b.a,{children:["Users regular deck size",s.length]}),Object(a.jsxs)(b.a,{children:["Users won deck size:",x.length]})]}),Object(a.jsxs)("div",{children:[Object(a.jsxs)(b.a,{children:["You chose a ",D.denomination]}),Object(a.jsxs)(b.a,{children:["Computer chose a ",P.denomination]}),T]}),Object(a.jsxs)("div",{children:[Object(a.jsxs)(b.a,{children:["Comps regular deck size",p.length]}),Object(a.jsxs)(b.a,{children:["Comps won deck size:",k.length]})]})]})]}):null})),y=n(33),S=n(135),w=n(136),k=Object(S.a)((function(e){return{container:{display:"flex",flexDirection:"column",alignItems:"center"},width:{width:"30%"},button:{background:"#35578f",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px #33435e",color:"white",marginTop:30,height:"50px",textDecoration:"none",display:"block",textAlign:"center","&:hover":{background:"#33435e"}},textfield:{marginTop:20},header:{marginTop:60,fontWeight:"bold",color:"#7d2022"},errormessage:{color:"red"},options:{display:"flex"},optionButton:{padding:5,border:2},selectedButton:{backgroundColor:"gray"}}}));var C=Object(f.b)(null,(function(e){return{setUsername:function(t){e({type:"SET_USERNAME",payload:t})}}}))((function(e){var t=k(),n=Object(o.useState)(""),s=Object(h.a)(n,2),c=s[0],r=s[1],i=Object(o.useState)(""),l=Object(h.a)(i,2),u=l[0],d=l[1],p=Object(o.useState)(""),f=Object(h.a)(p,2),m=f[0],O=f[1],v=Object(o.useState)(""),x=Object(h.a)(v,2),S=x[0],C=x[1],N=Object(o.useState)("signup"),E=Object(h.a)(N,2),T=E[0],U=E[1];function I(e){if(function(){var e=function(){for(var e=0,t=0,n=0;n<u.length;n++){var a=u.charAt(n);a===a.toUpperCase()&&e++,new RegExp(/^[\d]$/).test(a)&&t++}return t>0&&t<u.length&&e>0&&e<u.length}();if(0===c.length)return O("Username is empty"),!1;if(0===u.length)return O(""),C("password is empty"),!1;if(!e)return O(""),C("password must have at least one uppercase and one digit"),!1;return!0}()){e.preventDefault();var t=c.toLowerCase();"signup"==T?B(t,u):A(t,u)}else e.preventDefault()}Object(o.useEffect)((function(){}),[]);var A=function(t,n){j.a.post("http://localhost:5000/api/login",{username:t,password:n}).then((function(n){var a=n.data.token;localStorage.setItem("token",a),e.setUsername(t),setTimeout((function(){return e.history.push("/game")}),500)})).catch((function(e){404==e.response.status?(O(e.response.data),C("")):(O(""),C(e.response.data))}))},B=function(t,n,a){j.a.post("http://localhost:5000/api/signup",{username:t,password:n}).then((function(n){var a=n.data.token;localStorage.setItem("token",a),e.setUsername(t),setTimeout((function(){return e.history.push("/game")}),1e3)})).catch((function(e){console.log(e),404==e.response.status?(O(e.response.data),C("")):(O(""),C(e.response.data))}))};return Object(a.jsxs)("div",{className:t.container,children:[Object(a.jsx)(b.a,{className:t.header,variant:"h4",children:"Let's play WAR!"}),Object(a.jsxs)("div",{className:t.options,children:[Object(a.jsx)(g.a,{onClick:function(){return U("signup")},className:[t.optionButton,"signup"==T?t.selectedButton:null],children:"Signup"}),Object(a.jsx)(g.a,{"data-testid":"setLogin",onClick:function(){return U("login")},className:[t.optionButton,"login"==T?t.selectedButton:null],children:"Login"})]}),Object(a.jsxs)("div",{className:t.width,children:[Object(a.jsxs)("div",{className:"spaceForInput",children:[m.length>0&&Object(a.jsx)("div",{className:t.errormessage,children:m}),Object(a.jsx)(w.a,{placeholder:"Enter Username*",name:"username",type:"text",variant:"outlined",fullWidth:!0,className:t.textfield,onChange:function(e){r(e.target.value)}})]}),Object(a.jsxs)("div",{className:"spaceForInput",children:[Object(a.jsx)(w.a,{placeholder:"Enter Password*",name:"password",type:"password",variant:"outlined",fullWidth:!0,onChange:function(e){d(e.target.value)},className:t.textfield,onKeyPress:function(e){return"Enter"===e.key?I(e):null}}),S.length>0&&Object(a.jsx)("div",{className:t.errormessage,children:S})]}),Object(a.jsx)(y.b,{to:{pathname:"/game",state:{username:c}},style:{textDecoration:"none"},onClick:function(e){return I(e)},children:Object(a.jsx)(g.a,{"data-testid":"login",fullWidth:!0,className:t.button,children:"signup"==T?"signup":"login"})})]})]})})),N=n(12),E=n(48),T=n(35),U=[n(65).a],I={username:""};var A=function(){try{var e=localStorage.getItem("state");if(null===e)return;return JSON.parse(e)}catch(t){return void console.log(t)}}(),B=Object(T.c)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USERNAME":return Object(E.a)(Object(E.a)({},e),{},{username:t.payload});default:return e}}),A,T.a.apply(void 0,U));B.subscribe((function(){return function(e){try{var t=JSON.stringify(e);localStorage.setItem("state",t)}catch(n){console.log(n)}}(B.getState())}));var R=B;var L=function(){return Object(a.jsx)(f.a,{store:R,children:Object(a.jsx)(y.a,{children:Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(N.a,{path:"/",exact:!0,component:C}),Object(a.jsx)(N.a,{path:"/game",component:x})]})})})},W=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,139)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),a(e),o(e),s(e),c(e)}))};r.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(L,{})}),document.getElementById("root")),W()},77:function(e,t,n){},78:function(e,t,n){}},[[102,1,2]]]);
//# sourceMappingURL=main.a6501160.chunk.js.map