var windowHeight = 0.99 * document.documentElement.clientHeight;
var windowWidth = 0.99 * document.documentElement.clientWidth;

var quizWidth;
if (windowWidth > 1000) {quizWidth =  "950px";}
else {quizWidth = (0.95 * windowWidth) + "px";}

var h1Size;
if (parseInt(quizWidth) / 20 > 25 ) {h1Size = 25 + "px";}
else {h1Size = (parseInt(quizWidth) / 20) + "px";}

for (let j = 1; j <=7; j+=1) {
	$("#q" + j)[0].style.width = quizWidth;
}
for (let j = 0; j <=7; j+=1) {
	$("#r" + j)[0].style.width = quizWidth;
}

$("#finish")[0].style.width = quizWidth;
