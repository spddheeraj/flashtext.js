module.exports=class{constructor(a=!1){this._keyword='_keyword_',this._whiteSpaceChars=new Set(['.','\t','\n','a',' ',',']),this.nonWordBoundaries=(()=>{const a=(a,b,c)=>{const d=[];for(let e=a;e<=b;e++)d.push(c?String.fromCharCode(e):e);return d};return new Set([...a(0,9),...a(65,90,!0),...a(97,122,!0),'_'])})(),this.keywordTrieDict=new Map,this.caseSensitive=a}setNonWordBoundaries(a){this.nonWordBoundaries=new Set(a)}addNonWordBoundaries(a){return!(1!==a.length)&&(this.nonWordBoundaries.add(a),!0)}addKeyword(a,b){if(b||(b=a),a&&b){this.caseSensitive||(a=a.toLowerCase());let c=this.keywordTrieDict;a.split('').forEach((a)=>{c.get(a)||c.set(a,new Map),c=c.get(a)}),c.set(this._keyword,b)}}removeKeyword(a){let b=!1;if(a){this.caseSensitive||(a=a.toLowerCase());let c=this.keywordTrieDict;const d=[];if(a.split('').forEach((a)=>{c.has(a)&&(d.push([a,c]),c=c.get(a))}),c.has(this._keyword)){d.push([this._keyword,c]),d.reverse();for(let[a,b]of d)if(b.delete(a),1!==b.size)break;b=!0}}return b}addKeywordsFromObject(a){for(let[b,c]of Object.entries(a)){if('string'!=typeof b||c.constructor!==Array){throw'Please structure the Object as suggested for using addKeywordsFromObject'}c.forEach((a)=>{if('string'!=typeof a){throw'Keywords must be of String type'}this.addKeyword(a,b)})}}removeKeywordsFromObject(a){for(let[b,c]of Object.entries(a)){if('string'!=typeof b||c.constructor!==Array){throw'Please structure the Object as suggested for using removeKeywordsFromObject'}c.forEach((a)=>{if('string'!=typeof a){throw'Keywords must be of String type'}this.removeKeyword(a)})}}addKeywordsFromArray(a){if(a.constructor!==Array){throw'Please structure the Object as suggested for using removeKeywordsFromObject'}a.forEach((a)=>{if('string'!=typeof a){throw'Keywords must be of String type'}this.addKeyword(a)})}removeKeywordsFromArray(a){if(a.constructor!==Array){throw'Please structure the Object as suggested for using removeKeywordsFromObject'}a.forEach((a)=>{if('string'!=typeof a){throw'Keywords must be of String type'}this.removeKeyword(a)})}extractKeywords(a){const b=[],c=a.length;if('string'!=typeof a&&0===c)return b;this.caseSensitive||(a=a.toLowerCase());for(let d=this.keywordTrieDict,e=0,f=0;f<c;){let g,h,i,j,k=a[f];if(!this.nonWordBoundaries.has(k)){if(d.has(this._keyword)||d.has(k)){if(g='',h='',i=!1,d.has(this._keyword)&&(g=d.get(this._keyword),h=d.get(this._keyword),e=f),d.has(k)){let b=d.get(k);for(j=f+1;j<c;){let c=a[j];if(!this.nonWordBoundaries.has(c)&&b.has(this._keyword)&&(h=b.get(this._keyword),e=j,i=!0),b.has(c))b=b.get(c);else break;++j}j>=c&&b.has(this._keyword)&&(h=b.get(this._keyword),e=j,i=!0),i&&(f=e)}d=this.keywordTrieDict,h&&b.push(h)}else d=this.keywordTrieDict;}else if(d.has(k))d=d.get(k);else{for(d=this.keywordTrieDict,j=f+1;j<c&&(k=a[j],!!this.nonWordBoundaries.has(k));)++j;f=j}f+1>=c&&d.has(this._keyword)&&(g=d.get(this._keyword),b.push(g)),++f}return b}replaceKeywords(a){const b=a.length;if('string'!=typeof a&&0===b)return keywordsExtracted;const c=a;this.caseSensitive||(a=a.toLowerCase());let d='',e='',f=this.keywordTrieDict,g='',h=0,i=0;for(;i<b;){let j=a[i];e+=c[i];let k,l,m,n;if(!this.nonWordBoundaries.has(j)){if(g=j,f.has(this._keyword)||f.has(j)){if(k='',l='',m=!1,f.has(this._keyword)&&(k=f.get(this._keyword),l=f.get(this._keyword),h=i),f.has(j)){let d=f.get(j),k=e;for(n=i+1;n<b;){let b=a[n];if(k+=c[n],!this.nonWordBoundaries.has(b)&&d.has(this._keyword)&&(g=b,l=d.get(this._keyword),h=n,m=!0),d.has(b))d=d.get(b);else break;++n}n>=b&&d.has(this._keyword)&&(g='',l=d.get(this._keyword),h=n,m=!0),m&&(i=h,e=k)}f=this.keywordTrieDict,l?(d+=l+g,e='',g=''):(d+=e,e='',g='')}else f=this.keywordTrieDict,d+=e,e='',g='';}else if(f.has(j))f=f.get(j);else{for(f=this.keywordTrieDict,n=i+1;n<b&&(j=a[n],e+=c[n],!!this.nonWordBoundaries.has(j));)++n;i=n,d+=e,e='',g=''}i+1>=b&&f.has(this._keyword)&&(k=f.get(this._keyword),d+=k),++i}return d}};