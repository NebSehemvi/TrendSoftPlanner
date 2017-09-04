var numOfTasks = document.getElementById("numOfTasks");//Элемент для вывода числа задач
var selbox = document.getElementById("types"); // Получаем список
var tasksGroupName = document.getElementById("tasksGroupName"); //span для вывода названия группы задач
var siteSearch = document.getElementById("search");//Поисковое поле

tasksGroupName.innerHTML= selbox.options[selbox.selectedIndex].text;
//Выгружаем данные из JSON файла
$(function(){
    $.getJSON('tasks.json', function(data) {
        var counter = 0;
        for(var i=0;i<data.tasks.length;i++){
            $('#tasksTable').append('<tr><td><img src=\'IMG\\' + data.tasks[i].type +
                            '.png\'></td><td>' + data.tasks[i].ticket +
                            '</td><td>' + data.tasks[i].tname +
                            '</td><td><img src=\'IMG\\' + data.tasks[i].priority +
                            '.png\'></td><td>' + data.tasks[i].status +
                            '</td><td>' + data.tasks[i].solution +
                            '</td><td>' + data.tasks[i].created +
                            '</td><td>' + data.tasks[i].updated +
                            '</td><td>' + data.tasks[i].deadline + 
                            '</td><td><a href=\'#edit' + i +'\'><div class="img-6"></div></a></td></tr>');
            counter++;
            }
            setTimeout(numOfTasks.innerHTML = counter, 100)
    });
});

//Фильтр
function filtrate(rownumber,counter,selValue) {
    for(var i=1;i<rownumber;i++) {
        document.getElementsByTagName("tr")[i].style.display = "none";
    
        if (siteSearch.value == "" && selValue == selbox.options[0].value) {
        //Выбрано "Все" и строка поиска пустая
        document.getElementsByTagName("tr")[i].style.display = "";
        counter++;
        } else if (siteSearch.value !== "" && selValue == selbox.options[0].value) {
        //Выбрано "Все" и строка поиска не пустая
            if (document.getElementsByTagName("tr")[i].innerHTML.match(siteSearch.value) !== null) {
                document.getElementsByTagName("tr")[i].style.display = "";
                counter++;
            }
        } else if (siteSearch.value == "" && selbox.selectedIndex > 0) {
        //Выбрано что-то из списка, но строка пустая
            if (selValue == document.getElementsByTagName("tr")[i].childNodes[4].innerHTML){
                document.getElementsByTagName("tr")[i].style.display = "";
                counter++;
            }
    
        } else if(siteSearch.value !== "" && selbox.selectedIndex > 0) {
        //Выбрано что-то из списка и строка не пустая
            if (document.getElementsByTagName("tr")[i].innerHTML.match(siteSearch.value) !== null && selValue == document.getElementsByTagName("tr")[i].childNodes[4].innerHTML) {
                document.getElementsByTagName("tr")[i].style.display = "";
                counter++;
            }
        }
        }
        setTimeout(numOfTasks.innerHTML = counter, 100);
};

selbox.oninput = function() {
    var rownumber = (document.getElementsByTagName('tr').length); //определяем число всех строк
    tasksGroupName.innerHTML= selbox.options[selbox.selectedIndex].text;
    var counter = 0;
    var selValue = selbox.options[selbox.selectedIndex].value;
        filtrate(rownumber,counter,selValue);

        for (var i=0;i<selbox.options.length;i++){
            if (selbox.selectedIndex == i) {
                document.getElementById("id"+i).style.fontWeight = "700";
            } else (document.getElementById("id"+i).style.fontWeight = "300")
        }
};
siteSearch.oninput = function() {
    var rownumber = (document.getElementsByTagName('tr').length); //определяем число всех строк
    var counter = 0;
    var selValue = selbox.options[selbox.selectedIndex].value;
        filtrate(rownumber,counter,selValue);
};


