(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n(2),l=n(3),s=n(5),u=n(4),c=n(6),i=n(0),o=n.n(i),f=n(8),m=n.n(f),h=(n(16),3);function y(e){var t=null!=e.finalPlay&&e.finalPlay.selectedCol===e.col&&e.finalPlay.selectedRow===e.row;return o.a.createElement("button",{className:t?"square finalPlay":"square",onClick:e.onClick},e.value)}var p=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(l.a)(t,[{key:"renderSquare",value:function(e){var t=this;return o.a.createElement(y,{key:e,col:e%h+1,row:Math.floor(e/h)+1,value:this.props.squares[e],onClick:function(){return t.props.onClick(e)},finalPlay:this.props.finalPlay})}},{key:"render",value:function(){var e=this,t=Array(h).fill(0).map(function(t,n){var a=Array(h).fill(0).map(function(t,a){return e.renderSquare(n*h+a)});return o.a.createElement("div",{key:n,className:"board-row"},a)});return o.a.createElement("div",null,t)}}]),t}(o.a.Component),d=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={history:[{squares:Array(h*h).fill(null),selectedCol:null,selectedRow:null}],stepNumber:0,xIsNext:!0,historyIsAsc:!0},n}return Object(c.a)(t,e),Object(l.a)(t,[{key:"calculateWinner",value:function(e){var t=Array(h).fill(0).map(function(e,t){return Array(h).fill(0).map(function(e,n){return t*h+n})}),n=Array(h).fill(0).map(function(e,t){return Array(h).fill(0).map(function(e,n){return t+n*h})}),r=Array(2).fill(0).map(function(e,t){return Array(h).fill(0).map(function(e,n){return t*(h-1)+(h+(-2*t+1))*n})}),l=[].concat(Object(a.a)(t),Object(a.a)(n),Object(a.a)(r)),s=null;return l.forEach(function(t){var n=null!=e[t[0]],a=e[t[0]],r=0===t.filter(function(t){return e[t]!==a}).length;n&&r&&(s=e[t[0]])}),null==s&&e.every(function(e){return null!=e})?"draw":s}},{key:"getAvoidNumber",value:function(e,t){var n=Array(h).fill(0).map(function(e,t){return Array(h).fill(0).map(function(e,n){return t*h+n})}),r=Array(h).fill(0).map(function(e,t){return Array(h).fill(0).map(function(e,n){return t+n*h})}),l=Array(2).fill(0).map(function(e,t){return Array(h).fill(0).map(function(e,n){return t*(h-1)+(h+(-2*t+1))*n})}),s=[].concat(Object(a.a)(n),Object(a.a)(r),Object(a.a)(l)),u=null;return s.forEach(function(n){var a=null;if(n.forEach(function(t){null!=e[t]&&(a=e[t])}),null!=a){var r=n.filter(function(t){return e[t]!==a});1===r.length&&t.includes(r[0])&&(u=r[0])}}),u}},{key:"computedPlay",value:function(){var e=this.state.history.slice(0,this.state.stepNumber+1),n=e[e.length-1].squares.slice();if(!this.calculateWinner(n)){var a=n.map(function(e,t){return e?null:t}).filter(function(e){return e}),r=this.getAvoidNumber(n,a),l=null!=r?r:a[Math.floor(Math.random()*a.length)];n[l]=t.getNextPlayer(this.state.xIsNext),this.setState({history:e.concat([{squares:n,selectedCol:l%h+1,selectedRow:Math.floor(l/h)+1}]),stepNumber:e.length,xIsNext:!this.state.xIsNext})}}},{key:"handleClick",value:function(e){var n=this,a=this.state.history.slice(0,this.state.stepNumber+1),r=a[a.length-1].squares.slice();this.calculateWinner(r)||r[e]||(r[e]=t.getNextPlayer(this.state.xIsNext),this.setState({history:a.concat([{squares:r,selectedCol:e%h+1,selectedRow:Math.floor(e/h)+1}]),stepNumber:a.length,xIsNext:!this.state.xIsNext}),setTimeout(function(){n.state.xIsNext||n.computedPlay()},1e3))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"toggleHistory",value:function(){this.setState({historyIsAsc:!this.state.historyIsAsc})}},{key:"resetGame",value:function(){this.setState({history:[{squares:Array(h*h).fill(null),selectedCol:null,selectedRow:null}],stepNumber:0,xIsNext:!0,historyIsAsc:!0})}},{key:"render",value:function(){var e=this,n=this.state.history,a=n[this.state.stepNumber],r=this.calculateWinner(a.squares),l=n.map(function(n,a){var r=n.selectedCol,l=n.selectedRow,s=a>0?"Go to move # ".concat(a," (").concat(r,", ").concat(l,", ").concat(t.getNextPlayer(a%2!==0),")"):"Go to game start";return o.a.createElement("li",{key:a},o.a.createElement("button",{className:e.state.stepNumber===a?"currentHistory":"",onClick:function(){return e.jumpTo(a)}},s))}),s=this.state.historyIsAsc?l:l.reverse(),u=null,c="";return null==r?c="Next player: ".concat(t.getNextPlayer(this.state.xIsNext)):"draw"===r?c="draw":(c="Winner: ".concat(r),u=a),o.a.createElement("div",{className:"main-board"},o.a.createElement("div",{className:"button-wrapper"},o.a.createElement("button",{className:"button",onClick:function(){return e.resetGame()}},"\u30ea\u30bb\u30c3\u30c8"),o.a.createElement("button",{className:"button",onClick:function(){return e.toggleHistory()}},"\u5c65\u6b74\u3092\u30bd\u30fc\u30c8")),o.a.createElement("div",{className:"game"},o.a.createElement("div",{className:"game-board"},o.a.createElement(p,{squares:a.squares,onClick:function(t){return e.handleClick(t)},finalPlay:u})),o.a.createElement("div",{className:"game-info"},o.a.createElement("div",null,c),o.a.createElement("ol",null,s))))}}],[{key:"getNextPlayer",value:function(e){return e?"X":"O"}}]),t}(o.a.Component);m.a.render(o.a.createElement(d,null),document.getElementById("root"))},16:function(e,t,n){},9:function(e,t,n){e.exports=n(10)}},[[9,1,2]]]);
//# sourceMappingURL=main.bc1ea928.chunk.js.map