function mouseOnElement(elem){
	elem.hover(()=>{elem[0].style.opacity = 0.5;}, ()=>{elem[0].style.opacity = 1;});
}

function stopMouse(id){
	for (let j = 1; j<=4; j+=1) {
		let elem = $("#ans_" + id + "_" + j);
		elem.off();
	}
}

money = 0;
mood = 0;

function quizBoxInit(id){
	box = $("#q" + id);
	box.append($('<h2>', {id:('num_'+ id)}))
	if (id) {$('#num_'+ id)[0].innerText = id + "/7";}
	box.append($('<div>', {class: ('indicators'), id : ("i_" + id)}));
	$("#i_"+id).append($('<div>', {class: "ind", id: "money_" + id}));
	$("#i_"+id).append($('<div>', {class: "ind", id: "mood_" + id}));
	$('#money_'+id)[0].innerHTML='Деньги: ' + money;
	$('#mood_'+id)[0].innerHTML='Настроение: ' + mood;
	box.append($('<h1>', {id:('question_'+ id)}));

	$('#question_'+ id)[0].style.fontSize = h1Size;
	$('#question_'+ id)[0].innerText = questions[id][0];
	box.append($('<img>',{id:('img_' + id),src:('images/img_' + id + '.png'), class:"quiz-img"}));

	if (id){
	box.append($('<div>', {id: ('ans-box_'+id), class:"ans-box"}));

	for (let j = 1; j<=3; j+=1) {
		$("#ans-box_" + id).append($('<div>', {id:('ans_' + id + "_" + j), class: "ans-button bottom-border"}));
		$('#ans_' + id + "_" + j)[0].innerText = questions[id][j];
		mouseOnElement($("#ans_" + id + "_"+j));
	}
	$('#ans_' + id + "_" + 3)[0].className =  "ans-button";
	}
}

function resultBoxInit(id, a) {
	box =  $("#r" + id);
	rand = parseInt(Math.random() * 2);
	box.append($('<h2>', {id:('num_'+ id+"_0")}));
	if (id) {
		$('#num_'+ id + "_0")[0].innerText = id + "/7";
		box.append($('<div>', {class: ('indicators'), id : ("i_" + id + "_0")}));
		$("#i_"+id+ "_0")[0].style.marginBottom = 0;
		$("#i_"+id+ "_0").append($('<div>', {class: "ind", id: "money_" + id+ "_0"}));
		$("#i_"+id+ "_0").append($('<div>', {class: "ind", id: "mood_" + id+ "_0"}));
		$('#money_'+id+ "_0")[0].innerHTML='Деньги: ' + money;
		$('#mood_'+id+ "_0")[0].innerHTML='Настроение: ' + mood;
	}
	box.append($('<h1>', {id:('res_'+ id)}));
	$('#res_'+ id)[0].style.marginTop = "4vh";
	$('#res_'+ id)[0].style.fontSize = h1Size;
	if (id) {
		$('#res_'+ id)[0].innerText = results[id][a - 1][rand][0];
		box.append($('<img>',{id:('img_' + id),src:(results[id][a - 1][rand][3]), class:"quiz-img res-img"}));

	}
	else{
		$('#res_'+ id)[0].innerText = results[id][0];
		box.append($('<img>',{id:('img_' + id),src:('images/img_' + id + '.png'), class:"quiz-img"}));

	}

	function indChangeToStr(num){
		if (num >= 0) {return " + " + num;}
		else {return " - " + Math.abs(num);}
	}

	if (id) {
		$('#num_'+ id)[0].innerText = id + "/7";
		box.append($('<div>', {class: ('indicators'), id : ("i_" + id + "_1")}));
		$("#i_"+id+ "_1")[0].style.backgroundColor = "rgb(230, 230, 230)"
		$("#i_"+id+ "_1")[0].style.marginBottom = 0;
		$("#i_"+id+ "_1").append($('<div>', {class: "ind", id: "money_" + id + "_1"}));
		$("#i_"+id+ "_1").append($('<div>', {class: "ind", id: "mood_" + id + "_1"}));
		$('#money_'+id+ "_1")[0].innerHTML='Деньги ' + indChangeToStr(results[id][a - 1][rand][1]);
		$('#mood_'+id+ "_1")[0].innerHTML='Настроение ' + indChangeToStr(results[id][a - 1][rand][2]);
	}

	box.append($('<div>', {class: "next-button", id: ("next_"+id)}));
	$("#next_"+id)[0].innerText = "ДАЛЬШЕ";
	mouseOnElement($("#next_"+id));
	$("#next_"+id).click (()=>{
		box[0].style.display = "none";
		clickAns(id+1);
	})

	return(rand);
}

function start(){
	resultBoxInit(0, 0);
	let box = $("#r0");
	box[0].style.display = "inline-block";
			$("#next_0").click(()=>{
				box[0].style.display = "none";
				window.scrollTo(0, 0);
			})
}

function clickAns(id) {
	if (id == 8) {exit(); return;}
	quizBoxInit(id);

	let box = $("#q" + id);
	box[0].style.display = "inline-block";
	for (let j = 1; j <= 3; j+=1){
		let b = $("#ans_" + id + "_" + j);
		b.click(()=>{
			stopMouse(id);
			box[0].style.display = "none";
			goToRes(id, j);
			window.scrollTo(0, 0);
		})
	}
}

function goToRes(id, a) {
	var rand = resultBoxInit(id, a);
	$("#r" + id)[0].style.display = "inline-block";
	money += results[id][a-1][rand][1];
	mood += results[id][a-1][rand][2];
}

function points(s){
	if (s == 1) {return("1 балл");}
	else if (s > 1 && s < 5) {return(s + " балла");}
	else  {return(s + " баллов");}

}

function exit(){
	var id = 8;
	box = $("#finish");
	box.append($('<h1>', {id: 'finish-text'}));
	$('#finish-text')[0].style.marginTop = "50px";
	$('#finish-text')[0].style.fontSize = h1Size;
	$('#finish-text')[0].innerText = "Ваш результат:";
	box.append($('<div>', {class: ('indicators'), id : ("i_" + id + "_0")}));
		$("#i_"+id+ "_0")[0].style.marginBottom = 0;
		$("#i_"+id+ "_0").append($('<div>', {class: "ind", id: "money_" + id+ "_0"}));
		$("#i_"+id+ "_0").append($('<div>', {class: "ind", id: "mood_" + id+ "_0"}));
		$('#money_'+id+ "_0")[0].innerHTML='Деньги: ' + money;
		$('#mood_'+id+ "_0")[0].innerHTML='Настроение: ' + mood;

	if (money <=-100 || mood <=-100){
		box.append($('<img>',{id:('img_final'),src:('images/finish_bad.jpg'), class:"quiz-img res-img"}));
		box.append($('<div>', {id:'f-text', class: "ans-box"}));
		$('#f-text')[0].style.fontSize = (parseInt(h1Size)/1.2) + "px";
		$('#f-text')[0].innerHTML = "Хммммм, возможно, что-то пошло не так… <p></p><a href = https://girolle.github.io/kindaQuest/> Попробуйте еще раз:) </a>";
	}
	else if  (money >=150 && mood >=150){
		box.append($('<img>',{id:('img_final'),src:('images/finish_good.jpg'), class:"quiz-img res-img"}));
		box.append($('<div>', {id:'f-text', class: "ans-box"}));
		$('#f-text')[0].style.fontSize = (parseInt(h1Size)/1.2) + "px";
		$('#f-text')[0].innerHTML = "Поздравляем! Вы супер-молодец!";
	}
	else { 
		box.append($('<img>',{id:('img_final'),src:('images/finish_ok.jpg'), class:"quiz-img res-img"}));
		box.append($('<div>', {id:'f-text', class: "ans-box"}));
		$('#f-text')[0].style.fontSize = (parseInt(h1Size)/1.2) + "px";
		$('#f-text')[0].innerHTML = "Поздравляем! Хороший результат, но можно лучше";
	}
	box[0].style.display = "inline-block";
}

start();