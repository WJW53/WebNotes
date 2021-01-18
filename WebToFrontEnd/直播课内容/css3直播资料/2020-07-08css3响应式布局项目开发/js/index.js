var btn = document.querySelector('#head button');
var ul = document.querySelector('#head ul');

var display = true;
btn.onclick = function () {
	/* if(ul.offsetHeight==250){
		ul.style.height=0;
	} */
	
	ul.style.height = display ? '250px' : 0;
	display = !display;
};


var pic=document.getElementById('pic');
var picUl=document.querySelector('#pic ul');
//var picLis=document.querySelectorAll('#pic li');
var picLis=picUl.children;

var cn=0;

var head=picUl.firstElementChild.cloneNode(true);
picUl.appendChild(head);
picUl.style.width=picLis.length*100+'vw';

function move(){
	picUl.style.transition='left .5s';
	picUl.style.left=-cn*100+'vw';
}

function autoPlay(){
	cn++;
	if(cn>picLis.length){
		cn=0;
	}
	move();
}

var timer=setInterval(autoPlay,2000);

picUl.addEventListener('transitionend',function(){
	if(cn==picLis.length-1){
		picUl.style.left=0;
		picUl.style.transition='';
		cn=0;
	}
});

picUl.onmouseenter=function(){
	clearInterval(timer);
	timer=null;
};
picUl.onmouseleave=function(){
	timer=setInterval(autoPlay,2000);
};
