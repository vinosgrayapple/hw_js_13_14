'use strict';
var questions;
var strQuestions;

/*====get_JSON from file======*/

function getJSON2localStorage(qs){
	localStorage.setItem('questions',JSON.stringify(qs));
}
/*============================*/ 
// console.log('localStorage====\n',localStorage.getItem("questions"));

questions = JSON.parse(localStorage.getItem("questions"));
var tmplSelect = _.template($("#box-slect").html());
$('#qstn_prepare').append(tmplSelect());
$(function () {

$('#slect-trigger').on('change', function() {
questions = questions.slice(0,$(this).val())
$(this).parent().hide();
var tmpl = _.template($("#qstns").html());
var answersCorrected = [];
var answersC = [];
var rightAnswers = 0;
$("#lodash-box").append(tmpl());
/* ========jQuery=======  */ 

/* begin hendler LI */ 

	$('li>label').on('click', function () {

		var li = $(this).parent('li');

		if (li.is(".list-group-item-warning")) {
				li.removeClass('list-group-item-warning').addClass('list-group-item-success');
		} else {
				li.removeClass('list-group-item-success').addClass('list-group-item-warning');
		};

		if ($(this).prev('input').is(':not(:checked)')) {
				li.parent().find('input:checked').prop('checked',false).parent('li').removeClass('list-group-item-success').addClass('list-group-item-warning');
		};

	});

/* end hendler LI */ 

		$('#button').on('click', function () {

			if ($('input:checked').length!=questions.length) {
				alert("\n\nВы ответили на " + $('input:checked').length + " из " + questions.length + "  вопросов! \n\n Закончите пожалуйста!\n\n");
				return;
			}


			answersC = $('input:checked').map(function () {
					return parseInt($(this).attr('id').split('_')[2]);

				}).get();
// 			console.log(answersC);
				for (var indx = 0; indx < questions.length; indx++){
					answersCorrected.push(questions[indx].correct[0]);
				};

				if (answersC.length === answersCorrected.length) {
					for (var i = 0; i < answersC.length; i++) {
						if (answersC[i] === answersCorrected[i]-1) {
							rightAnswers++;
						}
					}
				}
				if (rightAnswers === answersCorrected.length){

					$('#overlay-body').append("<h3 style='color:green;'>Поздравляем Вы правильно ответили на все вопросы</h3>");

				} else {
						$('#overlay-body').append("<h4 style='color:firebrick;'>\n\nВы ответили правильно на " +  (rightAnswers) + " из " + questions.length + "  вопросов! \n\n<br><br> Это " +(rightAnswers/questions.length*100).toFixed(1) + " % правильных ответов!</h4>");

				}

				$('#overlay').fadeIn(400, function(){
					$('#modal_form').css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
			});
			$('#modal_close, #overlay, #btn-overlay').on('click', function(){
				$('#modal_form').animate({opacity: 0, top: '45%'}, 200,
					function(){
						$(this).css('display', 'none');
						$('#overlay').fadeOut(400);
						$('input').prop('checked',false);
						$('li').removeClass('list-group-item-success').addClass('list-group-item-warning');
						rightAnswers=0;
						answersC=[];
						answersCorrected=[];
						$('#overlay-body').html('');

					})});
});

});

});
