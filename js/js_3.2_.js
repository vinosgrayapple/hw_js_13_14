const body = document.body;
	  body.className = "hero-unit";

site = {
	header : function(){
		h4 = document.createElement('h4');
		h4.innerHTML = "Тест по программированию";
		h4.className = "text-center";
		h4.style.marginBottom = "30px";
		body.appendChild(h4);
	   },

	ol : function() {
		var ol = document.createElement('ol');
			ol.style.marginLeft = "25%";
			body.appendChild(ol);
	   },

	questions : function(d) {
		var ol = document.getElementsByTagName('ol');
		for (var i = 1; i <= d; i++) {
			var li = document.createElement('li');
				li.appendChild(document.createTextNode('Вопрос №'+i));
				ol[0].appendChild(li);	

			var	ul = document.createElement('ul');
				ul.className = "list-unstyled";
				li.appendChild(ul);			
        }
	   },
	answers: function(f) {
		const ul = document.getElementsByTagName('ul');
		const ol = document.getElementsByTagName('ol');
		for (var i = 0; i < ul.length; i++) {
		for (var j = 1; j <= f; j++) {
			var li = document.createElement('li');
			var checkbox = document.createElement('input');
				checkbox.setAttribute('type','checkbox');
				checkbox.setAttribute('id','check' + i + j);
			var label = document.createElement('label');
				label.setAttribute('for','check'  + i + j);
				label.innerHTML = 'Вариант ответа №' + j;

				li.appendChild(checkbox);
				li.appendChild(label);

				ul[i].appendChild(li);	
		}
	}

	},
	button : function() {
			var button = document.createElement('button');
			button.innerHTML = "Проверить мои результаты";
			button.className = "btn btn-info center-block";
			button.style.color = 'black';
			button.style.borderColor = 'black';
			button.style.borderRadius = '0';
			button.style.border = '2px solid';
			button.style.backgroundColor = 'darkturquoise';
			button.style.marginTop = '30px';
			body.appendChild(button);

	}
}
 



site.header();
site.ol();
site.questions(3);
site.answers(3);
site.button();








