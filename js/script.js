'use strict';

var questions = [{
	question:"Какого числа отмечают День солидарности трудящихся?",
	answers:["Седьмого ноября","Восьмого марта","Первого мая","Четвертого июня"],
	correct:[3]
},
{
	question:"Какого вида транспорта не существует?",
	answers:["Авиационный","Городской общественный","Пешеходный","Железнодорожный"],
	correct:[3]
},
// {
// 	question:"Как называется в геометрии линия, делящая угол пополам?",
// 	answers:["Секущая","Гипотенуза","Биссектриса","Синусоида"],
// 	correct:[3]
// },
// {
// 	question:"Какого цвета волосы были у Мальвины из \"Золотого ключика\"?",
// 	answers:["Разноцветные","Розовые","Голубые","Золотые"],
// 	correct:[3]
// },
// {
// 	question:"Какое дерево характерно для саванн Африки?",
// 	answers:["Эвкалипт","Баобаб","Лиственница","Береза"],
// 	correct:[2]
// },
// {
// 	question:"От чего яблоко падает недалеко?",
// 	answers:["От дома","От Ньютона","От яблони","От забора"],
// 	correct:[3]
// },
// {
// 	question:"Где периодически происходит сокращение штатов?",
// 	answers:["В США","В бюджете","В учреждениях","В налогах"],
// 	correct:[3]
// },
// {
// 	question:"Какое ежегодное мероприятие в Рио-де-Жанейро привлекает туристов со всего мира?",
// 	answers:["Военный парад","Кинофестиваль","Экономический форум","Карнавал"],
// 	correct:[4]
// },
// {
// 	question:"Что из перечисленного Кот Матроскин не предъявлял в качестве своих документов ?",
// 	answers:["Лапы ","Усы ","Хвост ","Уши"],
// 	correct:[4]
// },
// {
// 	question:"Про кого С.Маршак написал стихотворение \"Усатый - полосатый\" ?",
// 	answers:["Про гусара","Про матроса","Про офицера","Про котенка"],
// 	correct:[4]
// },
// {
// 	question:"Что из этого не является именем известного поросенка?",
// 	answers:["Нуф-Нуф","Хрюша","Фунтик","Полтинник"],
// 	correct:[4]
// },
// {
// 	question:"Кого, предположительно, можно обнаружить в тихом омуте?",
// 	answers:["Бубей","Червей","Чертей","Угрей"],
// 	correct:[3]
// },
// {
// 	question:"От какого сладкого лакомства заболел старик Хоттабыч?",
// 	answers:["Мороженое","Лимонад","Орехи","Шоколад"],
// 	correct:[1]
// },
// {
// 	question:"Как звали пушкинского Онегина?",
// 	answers:["Александр","Евгений","Иван","Михаил"],
// 	correct:[2]
// }
];
localStorage.setItem('questions',JSON.stringify(questions));
questions = JSON.parse(localStorage.getItem("questions"));
var tmpl = _.template($("#qstns").html());
var answersCorrected = [];
var answersC = [];
var rightAnswers = 0;
$("#lodash-box").append(tmpl());
$(function () {
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

		$('button').on('click', function () {
			if ($('input:checked').length!=questions.length) {
				alert("\n\nВы ответили на " + $('input:checked').length + " из " + questions.length + "  вопросов! \n\n Закончите пожалуйста!\n\n");
			}


				answersC = $('input:checked').map(function () {
					return parseInt($(this).attr('id').split('_')[2]);

				}).get();

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
						$('#overlay-body').append("<h4 style='color:red;'>\n\nВы ответили неправильно на " +  (questions.length - rightAnswers) + " из " + questions.length + "  вопросов! \n\n</h4>");

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
						answersC=0

					})});
});
});
