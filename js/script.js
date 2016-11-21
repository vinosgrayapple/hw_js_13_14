'use strict';

var questions;
var strQuestions;

function getJSON2localStorage(qs) {

    localStorage.setItem('questions', JSON.stringify(qs));
    questions = JSON.parse(localStorage.getItem("questions"));

    $(function () {

        var tmplSelect = _.template($("#box-slect").html());
        $('#qstn_prepare').append(tmplSelect());

        $('#slect-trigger').on('change', function () {
            questions = questions.slice(0, $(this).val());
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
                    li.parent().find('input:checked').prop('checked', false).parent('li').removeClass('list-group-item-success').addClass('list-group-item-warning');
                };
            });

            /* end hendler LI */

            $('#button').on('click', function () {

                if ($('input:checked').length != questions.length) {
                    alert('\n\n                    \u0412\u044B \u043E\u0442\u0432\u0435\u0442\u0438\u043B\u0438 \u043D\u0430  ' + $('input:checked').length + '  \u0438\u0437  ' + questions.length + '   \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432! \n\n\n                    \u0417\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u0435 \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430!\n\n                    ');
                    return;
                }

                answersC = $('input:checked').map(function () {
                    return parseInt($(this).attr('id').split('_')[2]);
                }).get();
                //          console.log(answersC);
                for (var indx = 0; indx < questions.length; indx++) {
                    answersCorrected.push(questions[indx].correct[0]);
                };

                if (answersC.length === answersCorrected.length) {
                    for (var i = 0; i < answersC.length; i++) {
                        if (answersC[i] === answersCorrected[i] - 1) {
                            rightAnswers++;
                        }
                    }
                }
                if (rightAnswers === answersCorrected.length) {

                    $('#overlay-body').append('<h3 style=\'color:green;\'>\u041F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u044F\u0435\u043C \u0412\u044B \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u043E\u0442\u0432\u0435\u0442\u0438\u043B\u0438 \u043D\u0430 \u0432\u0441\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B</h3>');
                } else {
                    $('#overlay-body').append('<h4 style=\'color:firebrick;\'>\n\n                            \u0412\u044B \u043E\u0442\u0432\u0435\u0442\u0438\u043B\u0438 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u043D\u0430  ' + rightAnswers + '  \u0438\u0437  ' + questions.length + '  \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432! \n                            <br><br>\n                            \u042D\u0442\u043E ' + (rightAnswers / questions.length * 100).toFixed(1) + ' % \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432!\n\n                            </h4>');
                }

                $('#overlay').fadeIn(400, function () {
                    $('#modal_form').css('display', 'block').animate({ opacity: 1, top: '50%' }, 200);
                });
                $('#modal_close, #overlay, #btn-overlay').on('click', function () {
                    $('#modal_form').animate({ opacity: 0, top: '45%' }, 200, function () {
                        $(this).css('display', 'none');
                        $('#overlay').fadeOut(400);
                        $('input').prop('checked', false);
                        $('li').removeClass('list-group-item-success').addClass('list-group-item-warning');
                        rightAnswers = 0;
                        answersC = [];
                        answersCorrected = [];
                        $('#overlay-body').html('');
                    });
                });
            });
        });
    });
}