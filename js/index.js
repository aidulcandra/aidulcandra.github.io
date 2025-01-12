var isMobile = {
Android: function() {
return navigator.userAgent.match(/Android/i);
},
BlackBerry: function() {
return navigator.userAgent.match(/BlackBerry/i);
},
iOS: function() {
return navigator.userAgent.match(/iPhone|iPad|iPod/i);
},
Opera: function() {
return navigator.userAgent.match(/Opera Mini/i);
},
Windows: function() {
return navigator.userAgent.match(/IEMobile/i);
},
any: function() {
return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
}
};
// Load a cross-origin image (using CORS).
// This continually updates an `img` element's `src` until an image's
// data URI has changed.
function loadExternalImage(uri, throbberUri) {
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var img = document.createElement('img');
var throbberDataURI;
var throbber = document.createElement('img');
throbber.crossOrigin = '';
throbber.src = throbberUri;
throbber.onload = function() {
canvas.width = throbber.width;
canvas.height = throbber.height;
ctx.drawImage(throbber, 0, 0);
throbberDataURI = canvas.toDataURL().substr(-64);
_load(uri);
};
this._load = function(uri) {
img.crossOrigin = '';
var loaded;
img.onload = function() {
canvas.width = img.width;
canvas.height = img.height;
ctx.drawImage(img, 0, 0);
// If we're still showing the loading throbber,
// then real image ain't yet loaded.
loaded = canvas.toDataURL().substr(-64) !== throbberDataURI;
};
var refreshInterval = setInterval(function() {
if (loaded === false) {
console.log(refreshInterval, 'loading...');
return src();
} else if (loaded === true) {
console.log(refreshInterval, 'loaded!');
clearInterval(refreshInterval);
}
}, 2800);
function src() {
img.src = uri;
}
src();
};
return img;
}
function getMatches(string, regex, index) {
index || (index = 1); // default to the first capturing group
var matches = [];
var match;
while (match = regex.exec(string)) {
matches.push(match[index]);
}
return matches;
}
$(document).ready(function(e) {
var myUrl = 'https://www.youtube.com/playlist?list=PLxXTdjyXA1UesEZGwjh02OPWFBkrvoiB3';
var x = new XMLHttpRequest();
x.open('GET', 'https://cors-anywhere.herokuapp.com/'+myUrl);
x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
x.setRequestHeader("Content-Type", "text/xml");
x.onload = function() {
console.log(x.responseText);
if( isMobile.any() ){
var konten="";
var regexidlink = new RegExp('"playlistVideoRenderer":{"videoId":"([a-zA-Z0-9-_]*)","thumbnail',"gi");
var regexjudul = new RegExp('\\{"isPreloaded":true\\}\\},"title":\\{"runs":\\[\\{"text":"([ a-zA-Z0-9-_\\[\\]]*)',"gi");
var match=getMatches(x.responseText, regexidlink, 1);
var match2=getMatches(x.responseText, regexjudul, 1);
var link=[];
var gambar=[]
//var imgg=[]
for(var i=0;i<match.length;i++){
link[i]="https://youtube.com/watch?v="+match[i];
gambar[i]="https://i.ytimg.com/vi/"+match[i]+"/hq720.jpg"
//imgg[i] = document.createElement("IMG");
//imgg[i].src=gambar[i];
//imgg[i].crossOrigin = "Anonymous";
konten+="<a href='"+link[i]+"' target='_blank'>";
konten+="<img data-image='"+gambar[i]+"' alt='"+link[i]+"'/>"+"</a><br/>";
konten+=match2[i]+"<br/>";
var konten="<div class='col-md-3' style='margin-bottom:10px;'><div class='card'>";
//konten+="<img src="+gambar[i]+" class='card-img-top' alt='...'>";
konten+="<div class='card-body'>";
konten+="<h6 class='card-title'><a target='_blank' href='"+link[i]+"'>"+match2[i]=="undefined"?"Youtube":match2[i]+"</a></h6>";
konten+="</div>";
konten+="<div class='card-footer'>";
konten+="<a target='_blank' class='btn btn-primary btn-sm' href='"+link[i]+"'>Watch</a> ";
konten+="<a target='_blank' class='btn btn-danger btn-sm' href='https://www.youtube.com/channel/UCZJLGfHVtah4VahnU7ZcRcA'>Subscribe</a>";
konten+="</div>";
konten+="</div></div>";
$("#kontenyutub").append(konten);
//$("#kontenyutub").append(imgg[i]);
}
}else{
var regexjudul= new RegExp('"title":{"accessibility":{"accessibilityData":{"label":"'+"(.*?)"+'"}},"simpleText":"',"gi");
var regexlink= new RegExp('"commandMetadata":{"webCommandMetadata":{"url":"\/watch'+"(.*?)"+'\\u002',"gi");
var match=getMatches(x.responseText, regexjudul, 1);
var match2=getMatches(x.responseText, regexlink, 1);
for(var i=0;i<match.length;i++){
var link=match2[i].replace(/\\/g, '');
link=link.replace(/\?v=/g, '');
regexlink2=new RegExp('{"videoId":"'+link+'","thumbnail":{"thumbnails":\\[{"url":"(.*?)\\?sqp=');
var hasil=x.responseText.match(regexlink2)[1];
var time=match[i].match(/([0-9]*)\s*([A-Za-z]*)\s*ago/g);
var duration=match[i].match(/([0-9]*)\s*minutes/g);
var viewer=match[i].match(/([0-9]*)\s*views/g);
var judul=match[i].substring(0, match[i].indexOf('by'));
var konten="<div class='col-md-3' style='margin-bottom:10px;'><div class='card'>";
//konten+="<div id='gambar"+i+"'></div>"
//konten+="<img src="+hasil+" class='card-img-top' alt='...' crossorigin='anonymous'>";
konten+="<img data-image="+hasil+" class='card-img-top' alt='loading'>";
konten+="<div class='card-body'>";
konten+="<h6 class='card-title'><a target='_blank' href='https://youtube.com/watch"+match2[i].replace(/\\/g, '')+"'>"+judul+"</a></h6>";
konten+="<span class='badge badge-primary'>"+time+"</span> ";
konten+="<span class='badge badge-info'>"+duration+"</span> ";
konten+="<span class='badge badge-success'>"+viewer+"</span> ";
konten+="</div>";
konten+="<div class='card-footer'>";
konten+="<a target='_blank' class='btn btn-primary btn-sm' href='https://youtube.com/watch"+match2[i].replace(/\\/g, '')+"'>Watch</a> ";
konten+="<a target='_blank' class='btn btn-danger btn-sm' href='https://www.youtube.com/channel/UCZJLGfHVtah4VahnU7ZcRcA'>Subscribe</a>";
konten+="</div>";
konten+="</div></div>";
$("#kontenyutub").append(konten);
$("[data-image]").each( function( index, element ){
convertImgToBase64($( this ).data('image'), function(base64Img){
$(element).attr('src', base64Img);
console.log(base64Img);
});
});
//$("#gambar"+i).append(loadExternalImage(hasil,'https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'));
}
}
};
x.send();
});
function getMatches(string, regex, index) {
index || (index = 1);
var matches = [];
var match;
while (match = regex.exec(string)) {
matches.push(match[index]);
}
return matches;
}
$(document).ready(function(e) {
var myUrl = 'https://github.com/sabrisangjaya?tab=repositories';
var xgit = new XMLHttpRequest();
xgit.open('GET', 'https://cors-anywhere.herokuapp.com/'+myUrl);
xgit.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
xgit.setRequestHeader("Content-Type", "text/xml");
xgit.onload = function() {
console.log(xgit.responseText);
var elslink=getMatches(xgit.responseText, /href="([a-zA-Z0-9/.-]*)" itemprop="name codeRepository"/g, 1);
var elsname=getMatches(xgit.responseText,/"name codeRepository" >\s*([0-9A-Za-z/.-]*)\s*<\/a>/g, 1);
var kontengit="";
var kontenlink="";
for (var i = 0; i < elslink.length; i++) {
console.log(elsname[i],elslink[i]);
if((!elslink[i].endsWith("/network"))){
elslink[i]="https://github.com"+elslink[i];
}
if(elslink[i]=="https://github.comhttps"
||elslink[i]=="/marketplace"
||elslink[i].endsWith("https")
||elslink[i].endsWith("network/members")
||elslink[i]=="https://github.com/manifest.json"
||elslink[i]=="https://github.com/marketplace"
||elslink[i]=="https://github.com/explore"
||elslink[i]=="https://github.com/login"
){
elslink.splice(i, 1);
}
}
if( isMobile.any() ){
var elslink=getMatches(xgit.responseText, /href="([a-zA-Z0-9/.-]*)" /g, 1);
var elsname=getMatches(xgit.responseText,/"text-bold">\s*([0-9A-Za-z/.-]*)\s*<\/span>/g, 1);
for (var i = 0; i < elslink.length; i++) {
console.log(elsname[i],elslink[i]);
if((!elslink[i].endsWith("/network"))){
elslink[i]="https://github.com"+elslink[i];
}
if(elslink[i]=="https://github.comhttps"
||elslink[i]=="/marketplace"
||elslink[i].endsWith("https")
||elslink[i].endsWith("network/members")
||elslink[i]=="https://github.com/manifest.json"
||elslink[i]=="https://github.com/marketplace"
||elslink[i]=="https://github.com/explore"
||elslink[i]=="https://github.com/login"
){
elslink.splice(i, 1);
}
}
elslink.splice(0, 15);
}
for (var i = 0; i < elslink.length; i++) {
kontenlink+=elslink[i]+"/["+i+"]<br/>";
kontengit+="<a href='"+elslink[i]+"' target='_blank' class='badge badge-secondary'>"+elsname[i]+"</a>";
kontengit+="<a href='"+elslink[i]+"' target='_blank' class='badge badge-success'>"+elslink[i]+"</a><br/>";
}
$("#kontengit").append(kontengit);
};
xgit.send();
});
$('#print-btn').click(() => {
var pdf = new jsPDF('p','mm', [297, 210]);
pdf.addHTML(document.body,function() {
pdf.save('cv-sabrisangjaya.pdf');
});
})
function convertImgToBase64(url, callback, outputFormat){
var canvas = document.createElement('CANVAS');
var ctx = canvas.getContext('2d');
var img = new Image;
img.crossOrigin = 'Anonymous';
var url='https://cors-anywhere.herokuapp.com/'+url;
img.onload = function(){
canvas.height = img.height;
canvas.width = img.width;
ctx.drawImage(img,0,0);
var dataURL = canvas.toDataURL(outputFormat || 'image/png');
callback.call(this, dataURL);
// Clean up
canvas = null;
};
img.src = url;
}

