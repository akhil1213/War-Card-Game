(this["webpackJsonpwar-game"]=this["webpackJsonpwar-game"]||[]).push([[0],{102:function(e,t,n){"use strict";n.r(t);var a=n(4),s=n(0),o=n.n(s),c=n(8),r=n.n(c),i=(n(77),n.p,n(78),n(47)),u=n(43),l=n.n(u),d=n(60),h=n(14),p=n(30),j=n.n(p),g=n(137),b=n(134),f=n(27);function m(e,t){this.suite=e,this.denomination=t}var O={Ace:14,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,Jack:11,Queen:12,King:13};m.prototype.biggerCard=function(e){return O[this.denomination]==O[e.denomination]?0:O[this.denomination]>O[e.denomination]?1:-1};var v=function(){var e=[],t=["Hearts","Spades","Clubs","Diamonds"],n=["Ace",2,3,4,5,6,7,8,9,10,"Jack","Queen","King"];for(var a in t)for(var s in n)e.push(new m(t[a],n[s]));return function(e){for(var t,n=e.length;n;){var a=[e[t=Math.floor(Math.random()*n--)],e[n]];e[n]=a[0],e[t]=a[1]}return e}(e)};var x=Object(f.b)((function(e){return{username:e.username}}),(function(e){return{setUsername:function(t){e({type:"SET_USERNAME",payload:t})}}}))((function(e){var t=Object(s.useState)([]),n=Object(h.a)(t,2),o=n[0],c=n[1],r=Object(s.useState)([]),u=Object(h.a)(r,2),p=u[0],f=u[1],m=Object(s.useState)([]),O=Object(h.a)(m,2),x=O[0],y=O[1],S=Object(s.useState)([]),w=Object(h.a)(S,2),k=w[0],C=w[1],N=Object(s.useState)(!1),E=Object(h.a)(N,2),T=E[0],U=E[1],I=Object(s.useState)(""),A=Object(h.a)(I,2),B=A[0],R=A[1],z=Object(s.useState)(""),L=Object(h.a)(z,2),W=L[0],D=L[1],F=Object(s.useState)(""),J=Object(h.a)(F,2),M=J[0],P=J[1],_=Object(s.useState)([]),K=Object(h.a)(_,2),Q=K[0],G=K[1],H=Object(s.useState)(!1),Y=Object(h.a)(H,2),$=Y[0],q=Y[1],V=Object(s.useState)(null),X=Object(h.a)(V,2),Z=X[0],ee=X[1],te=localStorage.getItem("token"),ne={headers:{"Content-type":"application/json","x-auth-token":"".concat(te)}};Object(s.useEffect)((function(){var t=v();c(t.slice(0,26)),f(t.slice(26,52)),""!=e.username&&null!=te&&void 0!=te&&""!=te||e.history.push("/"),j.a.get("http://ec2-18-217-213-221.us-east-2.compute.amazonaws.com:5000/api/score/".concat(e.username),ne).then((function(e){ee(e.data.score.games_won)})).catch((function(e){localStorage.setItem("token","")}))}),[]);var ae=function(){var t=Object(d.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:j.a.put("http://ec2-18-217-213-221.us-east-2.compute.amazonaws.com:5000/api/score",{username:e.username},ne).then((function(e){ee(Z+1)})).catch((function(e){localStorage.setItem("token",""),console.log(e)}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),se=function(e){var t=Q,n=o,a=p;if(null!=e&&(t.push(e),t.push(e)),n.length<4){if((n=n.concat(x)).length<4)return void R("The comp won, you doesnt have enough cards to finish WAR");c(n),y([])}if(a.length<4){if(a=a.concat(k),n.length<4)return void R("The user won, opponent doesnt have enough cards to finish WAR");f(a),C([])}for(var s=0;s<3;s++)t.push(n.pop()),t.push(a.pop());var r=n.pop(),i=a.pop(),u=r.biggerCard(i);t.push(r),t.push(i),U("The tie has been resolved and ".concat(1==u?"you":"the comp"," takes home all ").concat(t.length," cards")),1==u?(y(x.concat(t)),t=[],G([])):-1==u?(C(k.concat(t)),t=[],G([])):(U("There is another tie!"),G(t))},oe=function(e,t){if(o.length<=0&&x.length<=0)R("comp won");else{if(p.length<=0&&k.length<=0)return R("user won"),void ae();o.length<=0&&e.length>0&&(c(e),y([])),p.length<=0&&t.length>0&&(f(t),C([]))}};return e.username?Object(a.jsxs)("div",{children:[Object(a.jsx)(g.a,{onClick:function(){return e.setUsername(""),localStorage.setItem("token",""),void e.history.push("/")},children:"LOGOUT"}),Object(a.jsxs)(b.a,{children:[e.username,"'s win tally is ",Z]}),""==B?Object(a.jsx)(g.a,{"data-testid":"playButton",disabled:$,onClick:function(){return function(){if(Q.length>0)se(null);else{var e=o.pop(),t=p.pop();P(t),D(e);var n,a,s=e.biggerCard(t);1==s?(n=[].concat(Object(i.a)(x),[t,e]),a=k,y(n),U("")):-1==s?(a=[].concat(Object(i.a)(k),[t,e]),n=x,C(a),U("")):(U("Let's begin the WAR"),q(!0),setTimeout((function(){se(e),q(!1)}),1500)),void 0!=x&&void 0!=a&&oe(x,a)}}()},children:"Play"}):null,Object(a.jsxs)(b.a,{variant:"h3",children:[B,""!=B?Object(a.jsx)(g.a,{onClick:function(){return function(){var e=v();c(e.slice(0,26)),f(e.slice(26,52)),y([]),C([]),G([]),R(""),U("")}()},children:"Play again"}):null]}),Object(a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(a.jsxs)("div",{children:[Object(a.jsxs)(b.a,{children:["Users regular deck size",o.length]}),Object(a.jsxs)(b.a,{children:["Users won deck size:",x.length]})]}),Object(a.jsxs)("div",{children:[Object(a.jsxs)(b.a,{children:["You chose a ",W.denomination]}),Object(a.jsxs)(b.a,{children:["Computer chose a ",M.denomination]}),T]}),Object(a.jsxs)("div",{children:[Object(a.jsxs)(b.a,{children:["Comps regular deck size",p.length]}),Object(a.jsxs)(b.a,{children:["Comps won deck size:",k.length]})]})]})]}):null})),y=n(33),S=n(135),w=n(136),k=Object(S.a)((function(e){return{container:{display:"flex",flexDirection:"column",alignItems:"center"},width:{width:"30%"},button:{background:"#35578f",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px #33435e",color:"white",marginTop:30,height:"50px",textDecoration:"none",display:"block",textAlign:"center","&:hover":{background:"#33435e"}},textfield:{marginTop:20},header:{marginTop:60,fontWeight:"bold",color:"#7d2022"},errormessage:{color:"red"},options:{display:"flex"},optionButton:{padding:5,border:2},selectedButton:{backgroundColor:"gray"}}}));var C=Object(f.b)(null,(function(e){return{setUsername:function(t){e({type:"SET_USERNAME",payload:t})}}}))((function(e){var t=k(),n=Object(s.useState)(""),o=Object(h.a)(n,2),c=o[0],r=o[1],i=Object(s.useState)(""),u=Object(h.a)(i,2),l=u[0],d=u[1],p=Object(s.useState)(""),f=Object(h.a)(p,2),m=f[0],O=f[1],v=Object(s.useState)(""),x=Object(h.a)(v,2),S=x[0],C=x[1],N=Object(s.useState)("signup"),E=Object(h.a)(N,2),T=E[0],U=E[1];function I(e){if(function(){var e=function(){for(var e=0,t=0,n=0;n<l.length;n++){var a=l.charAt(n);a===a.toUpperCase()&&e++,new RegExp(/^[\d]$/).test(a)&&t++}return t>0&&t<l.length&&e>0&&e<l.length}();if(0===c.length)return O("Username is empty"),!1;if(0===l.length)return O(""),C("password is empty"),!1;if(!e)return O(""),C("password must have at least one uppercase and one digit"),!1;return!0}()){e.preventDefault();var t=c.toLowerCase();"signup"==T?B(t,l):A(t,l)}else e.preventDefault()}Object(s.useEffect)((function(){}),[]);var A=function(t,n){j.a.post("http://ec2-18-217-213-221.us-east-2.compute.amazonaws.com:5000/api/login",{username:t,password:n}).then((function(n){var a=n.data.token;localStorage.setItem("token",a),e.setUsername(t),setTimeout((function(){return e.history.push("/game")}),500)})).catch((function(e){404==e.response.status?(O(e.response.data),C("")):(O(""),C(e.response.data))}))},B=function(t,n,a){j.a.post("http://ec2-18-217-213-221.us-east-2.compute.amazonaws.com:5000/api/signup",{username:t,password:n}).then((function(n){var a=n.data.token;localStorage.setItem("token",a),e.setUsername(t),setTimeout((function(){return e.history.push("/game")}),1e3)})).catch((function(e){console.log(e),404==e.response.status?(O(e.response.data),C("")):(O(""),C(e.response.data))}))};return Object(a.jsxs)("div",{className:t.container,children:[Object(a.jsx)(b.a,{className:t.header,variant:"h4",children:"Let's play WAR!"}),Object(a.jsxs)("div",{className:t.options,children:[Object(a.jsx)(g.a,{onClick:function(){return U("signup")},className:[t.optionButton,"signup"==T?t.selectedButton:null],children:"Signup"}),Object(a.jsx)(g.a,{"data-testid":"setLogin",onClick:function(){return U("login")},className:[t.optionButton,"login"==T?t.selectedButton:null],children:"Login"})]}),Object(a.jsxs)("div",{className:t.width,children:[Object(a.jsxs)("div",{className:"spaceForInput",children:[m.length>0&&Object(a.jsx)("div",{className:t.errormessage,children:m}),Object(a.jsx)(w.a,{placeholder:"Enter Username*",name:"username",type:"text",variant:"outlined",fullWidth:!0,className:t.textfield,onChange:function(e){r(e.target.value)}})]}),Object(a.jsxs)("div",{className:"spaceForInput",children:[Object(a.jsx)(w.a,{placeholder:"Enter Password*",name:"password",type:"password",variant:"outlined",fullWidth:!0,onChange:function(e){d(e.target.value)},className:t.textfield,onKeyPress:function(e){return"Enter"===e.key?I(e):null}}),S.length>0&&Object(a.jsx)("div",{className:t.errormessage,children:S})]}),Object(a.jsx)(y.b,{to:{pathname:"/game",state:{username:c}},style:{textDecoration:"none"},onClick:function(e){return I(e)},children:Object(a.jsx)(g.a,{"data-testid":"login",fullWidth:!0,className:t.button,children:"signup"==T?"signup":"login"})})]})]})})),N=n(12),E=n(48),T=n(35),U=[n(65).a],I={username:""};var A=function(){try{var e=localStorage.getItem("state");if(null===e)return;return JSON.parse(e)}catch(t){return void console.log(t)}}(),B=Object(T.c)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USERNAME":return Object(E.a)(Object(E.a)({},e),{},{username:t.payload});default:return e}}),A,T.a.apply(void 0,U));B.subscribe((function(){return function(e){try{var t=JSON.stringify(e);localStorage.setItem("state",t)}catch(n){console.log(n)}}(B.getState())}));var R=B;var z=function(){return Object(a.jsx)(f.a,{store:R,children:Object(a.jsx)(y.a,{children:Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(N.a,{path:"/",exact:!0,component:C}),Object(a.jsx)(N.a,{path:"/game",component:x})]})})})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,139)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),a(e),s(e),o(e),c(e)}))};r.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(z,{})}),document.getElementById("root")),L()},77:function(e,t,n){},78:function(e,t,n){}},[[102,1,2]]]);
//# sourceMappingURL=main.a89de512.chunk.js.map