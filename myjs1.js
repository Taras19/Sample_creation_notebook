// Write JavaScript here 

var ListScheduledAction=[]; //список запланованих подій
var ListDataScheduledAction=[];//список дат запланованих подій
var ListComplitedAction=[]; //список виконаних подій
var ListDataComplitedAction=[];//список дат виконаних подій
var ListDeleteAction=[]; //список видалених подій
var ListDataDeleteAction=[];//список дат видалених подій
var id=0; // створення змінної для присвоєння id для кнопки для видалення завдань
var idCompletedAction=0;
var addActionButton=document.querySelector(".add-action-button");
var inputTime=document.querySelector("input[type='time']");
    inputTime.value="00:00";
addActionButton.addEventListener("click",function(){
  var addActionInput=document.querySelector(".add-action-input");
  if(addActionInput.value.length>0){
    var li=document.createElement("li");
    li.classList.add("list-action");
    var spanTime=document.createElement("span");
    spanTime.classList.add("time-action");
    /* Присвоєння тексту для span time*/
    spanTime.innerHTML=inputTime.value;
    /*Вставка в список дати ListDataScheduledAction*/
    ListDataScheduledAction.push(inputTime.value);
    /* Призначення li data атрибуту з переведенням часу в хв*/
    li.setAttribute('data-time', (inputTime.value.slice(0,2)*60)+(+inputTime.value.slice(3,5)));
    inputTime.value="00:00";
    var span=document.createElement("span");
    span.classList.add("text-action");
    span.innerHTML=addActionInput.value;
    var button=document.createElement("button");
    button.classList.add("delete-action");
    /* Створюю id по якому буду знаходити батька li(для майбутнього видалення)*/
    button.id=id++;
    /* Створення та присвоєння тексту для  completed-action*/
    var completedAction=document.createElement("button");
    completedAction.classList.add("completed-action");
    completedAction.innerHTML="Подія виконана";
    completedAction.id="c"+idCompletedAction++;

    /* Додавання нової події в список за індексом button.id */
    ListScheduledAction.push(addActionInput.value);
    /* Очищення input від введених даних */
    addActionInput.value="";
    button.innerHTML="Видалення події";

    /* Вставка в li span and button */
    li.appendChild(spanTime);
    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(completedAction);

    /* Вставка li у список справ ul*/
    var listActions=document.querySelector(".list-actions");
    listActions.appendChild(li);
    /* видалення класу visible-after-js з спису при додаванні події щоб зникло "список пустий"*/
    if(listActions.classList.contains("visible-after-js")){
      listActions.classList.remove("visible-after-js");
    }
    /*Виклик функції для сортування подій у списку по даті*/
    getSort();
    /*Зміна кількості подій в number-action-value після додавання нової події*/
    var numberActionValue=document.querySelector(".number-action-value");
    numberActionValue.innerHTML=++numberActionValue.innerHTML;
    var totalNumberActionsValue=document.querySelector(".total-number-actions-value");
    totalNumberActionsValue.innerHTML=++totalNumberActionsValue.innerHTML;
    /*оновлення даних в блоці статистики для не виконаних подій*/
    var totalNumberActionsNotdoneValue=document.querySelector(".total-number-actions-notdone-value");
    totalNumberActionsNotdoneValue.innerHTML=++totalNumberActionsNotdoneValue.innerHTML;
    var totalNumberActionsNotdoneProgressIn=document.querySelector(".total-number-actions-notdone-progress-in");
    var totalNumberActionsNotdonePercent=document.querySelector(".total-number-actions-notdone-percent");
    totalNumberActionsNotdonePercent.innerHTML=totalNumberActionsNotdoneValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
    totalNumberActionsNotdonePercent.innerHTML=Math.round(+totalNumberActionsNotdonePercent.innerHTML)+"%";
    totalNumberActionsNotdoneProgressIn.style.width=parseFloat(totalNumberActionsNotdonePercent.innerHTML)+" %";
    /* оновлення даних в блоці статистики для виконаних подій*/
    var totalNumberActionsComplitedValue=document.querySelector(".total-number-actions-complited-value");
      /* звернення до .total-number-actions-complited-percent*/
    var totalNumberActionsComplitedPercent=document.querySelector(".total-number-actions-complited-percent");
      /* обрахунок % виконання виконаних завдань*/
    totalNumberActionsComplitedPercent.innerHTML=totalNumberActionsComplitedValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
    totalNumberActionsComplitedPercent.innerHTML=Math.round(+totalNumberActionsComplitedPercent.innerHTML)+"%";
      /* зміна розташуваня total-number-actions-complited-progress-in*/
    var totalNumberActionsComplitedProgressIn=document.querySelector(".total-number-actions-complited-progress-in");
    totalNumberActionsComplitedProgressIn.style.width=parseFloat(totalNumberActionsComplitedPercent.innerHTML)+"%";
    /* зміна кількості видалених подій в блоці статистики видалені події*/
    var totalNumberActionsDeleteValue=document.querySelector(".total-number-actions-delete-value");
    var totalNumberActionsDeleteProgressIn=document.querySelector(".total-number-actions-delete-progress-in");
    var totalNumberActionsDeletePercent=document.querySelector(".total-number-actions-delete-percent");
    totalNumberActionsDeletePercent.innerHTML=totalNumberActionsDeleteValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
    totalNumberActionsDeletePercent.innerHTML=Math.round(+totalNumberActionsDeletePercent.innerHTML)+"%";
    totalNumberActionsDeleteProgressIn.style.width=parseFloat(totalNumberActionsDeletePercent.innerHTML)+"%";
    
    /* Створення події для кнопки видалення завдань відбувається при створенні події*/
    var deleteAction=document.getElementById(button.id);
    deleteAction.addEventListener("click",function(){
      /*Видалення з списку запланованих подій події */
      ListDeleteAction.push(deleteAction.previousElementSibling.innerHTML);
      ListScheduledAction.splice(ListScheduledAction.indexOf(deleteAction.previousElementSibling.innerHTML),1);
      /*Видалення з списку дати запланованих подій події*/
      ListDataDeleteAction.push(deleteAction.parentElement.children[0].innerHTML);
      ListDataScheduledAction.splice(ListDataScheduledAction.indexOf(deleteAction.parentElement.children[0].innerHTML),1);
      var listActionsDelete=document.querySelector(".list-actions-delete");
      listActionsDelete.appendChild(deleteAction.parentElement);
      /**/
      if(listActionsDelete.classList.contains("visible-after-js")){
        listActionsDelete.classList.remove("visible-after-js");
      }
      if(listActions.children.length==0){
        listActions.classList.add("visible-after-js");
      }
      
      /*Зміна кількості подій в number-action-value після видалення події*/
      var numberActionValue=document.querySelector(".number-action-value");
      numberActionValue.innerHTML=--numberActionValue.innerHTML;
      var numberActionDeleteValue=document.querySelector(".number-action-delete-value");
      numberActionDeleteValue.innerHTML=++numberActionDeleteValue.innerHTML;
      /* зміна кількості видалених подій в блоці статистики видалені події*/
      var totalNumberActionsDeleteValue=document.querySelector(".total-number-actions-delete-value");
      totalNumberActionsDeleteValue.innerHTML=++totalNumberActionsDeleteValue.innerHTML;
      var totalNumberActionsDeleteProgressIn=document.querySelector(".total-number-actions-delete-progress-in");
      var totalNumberActionsDeletePercent=document.querySelector(".total-number-actions-delete-percent");
      totalNumberActionsDeletePercent.innerHTML=totalNumberActionsDeleteValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
      totalNumberActionsDeletePercent.innerHTML=Math.round(+totalNumberActionsDeletePercent.innerHTML)+"%";
      totalNumberActionsDeleteProgressIn.style.width=parseFloat(totalNumberActionsDeletePercent.innerHTML)+"%";
      /*оновлення даних в блоці статистики для не виконаних подій*/
      var totalNumberActionsNotdoneValue=document.querySelector(".total-number-actions-notdone-value");
      totalNumberActionsNotdoneValue.innerHTML=--totalNumberActionsNotdoneValue.innerHTML;
      var totalNumberActionsNotdoneProgressIn=document.querySelector(".total-number-actions-notdone-progress-in");
      var totalNumberActionsNotdonePercent=document.querySelector(".total-number-actions-notdone-percent");
      totalNumberActionsNotdonePercent.innerHTML=totalNumberActionsNotdoneValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
      totalNumberActionsNotdonePercent.innerHTML=Math.round(+totalNumberActionsNotdonePercent.innerHTML)+"%";
      totalNumberActionsNotdoneProgressIn.style.width=parseFloat(totalNumberActionsNotdonePercent.innerHTML)+"%";

    });
    /* Створення події для кнопки виконаного завдання відбувається при створенні події*/
    var completedActionEventAll=document.getElementById(completedAction.id);
    var listActionsCompleted=document.querySelector(".list-actions-completed");
    completedActionEventAll.addEventListener("click",function(){
      /* Вставка події з запланованих у викoнані*/
      listActionsCompleted.appendChild(this.parentElement);
      /**/
      if(listActionsCompleted.classList.contains("visible-after-js")){
        listActionsCompleted.classList.remove("visible-after-js");
      }
      if(listActions.children.length==0){
        listActions.classList.add("visible-after-js");
      }
      /* Зміна значень кількості запланованих та виконаних подій */
      var numberActionValue=document.querySelector(".number-action-value");
      numberActionValue.innerHTML=--numberActionValue.innerHTML;
      var numberActionCompletedValue=document.querySelector(".number-action-completed-value");
      numberActionCompletedValue.innerHTML=++numberActionCompletedValue.innerHTML;
      /* кількість загальна справ для статистики*/
      var totalNumberActionsValue=document.querySelector(".total-number-actions-value");
      /* кількість виконаних для статистики справ*/
      var totalNumberActionsComplitedValue=document.querySelector(".total-number-actions-complited-value");
      totalNumberActionsComplitedValue.innerHTML=++totalNumberActionsComplitedValue.innerHTML;
      /* звернення до .total-number-actions-complited-percent*/
      var totalNumberActionsComplitedPercent=document.querySelector(".total-number-actions-complited-percent");
      /* обрахунок % виконання виконаних завдань*/
      totalNumberActionsComplitedPercent.innerHTML=totalNumberActionsComplitedValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
      totalNumberActionsComplitedPercent.innerHTML=Math.round(+totalNumberActionsComplitedPercent.innerHTML)+"%";
      /* зміна розташуваня total-number-actions-complited-progress-in*/
      var totalNumberActionsComplitedProgressIn=document.querySelector(".total-number-actions-complited-progress-in");
      totalNumberActionsComplitedProgressIn.style.width=parseFloat(totalNumberActionsComplitedPercent.innerHTML)+"%";
      /* Видалення з списку запланованих та вставка у список виконаних для localStorage*/
      ListDataScheduledAction.splice(ListDataScheduledAction.indexOf(this.parentElement.children[0].innerHTML),1);
      ListDataComplitedAction.push(this.parentElement.children[0].innerHTML);
      ListScheduledAction.splice(ListScheduledAction.indexOf(this.parentElement.children[1].innerHTML),1);
      ListComplitedAction.push(this.parentElement.children[1].innerHTML);
      /*Сортування в списку виконаних подій*/
      //getSort();
      /*оновлення даних в блоці статистики для не виконаних подій*/
      var totalNumberActionsNotdoneValue=document.querySelector(".total-number-actions-notdone-value");
      totalNumberActionsNotdoneValue.innerHTML=--totalNumberActionsNotdoneValue.innerHTML;
      var totalNumberActionsNotdoneProgressIn=document.querySelector(".total-number-actions-notdone-progress-in");
      var totalNumberActionsNotdonePercent=document.querySelector(".total-number-actions-notdone-percent");
      totalNumberActionsNotdonePercent.innerHTML=totalNumberActionsNotdoneValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
      totalNumberActionsNotdonePercent.innerHTML=Math.round(+totalNumberActionsNotdonePercent.innerHTML)+"%";
      totalNumberActionsNotdoneProgressIn.style.width=parseFloat(totalNumberActionsNotdonePercent.innerHTML)+"%";
    });
    
  }
  else{
    alert("Подія не створена, опис події відсутній.Опишіть подію!.")
  }
  
  });

/*START*/
/* Створення події при завантажені сторінки для заповнення к-сті подій та
створення списку подій при умові що події уже створені*/
document.addEventListener("DOMContentLoaded",function(){
  /*створення списку ЗАПЛАНОВАНИХ подій при умові що події уже створені*/
  if(localStorage.getItem("strListScheduledAction")){
    var strListScheduledAction=localStorage.getItem("strListScheduledAction");
    var strListDataScheduledAction=localStorage.getItem("strListDataScheduledAction");
    ListScheduledAction=strListScheduledAction.split("*");
    ListDataScheduledAction=strListDataScheduledAction.split("*");
    for(var i=0;i<ListScheduledAction.length;i++){
      var li=document.createElement("li");
      li.classList.add("list-action");
      var spanTime=document.createElement("span");
      spanTime.classList.add("time-action");
      spanTime.innerHTML=ListDataScheduledAction[i];
      li.setAttribute('data-time', (ListDataScheduledAction[i].slice(0,2)*60)+(+ListDataScheduledAction[i].slice(3,5)));
      var span=document.createElement("span");
      span.classList.add("text-action");
      var button=document.createElement("button");
      button.classList.add("delete-action");
      span.innerHTML=ListScheduledAction[i];
      button.innerHTML="Видалення події";
      /* Створення та присвоєння тексту для  completed-action*/
      var completedAction=document.createElement("button");
      completedAction.classList.add("completed-action");
      completedAction.innerHTML="Подія виконана";
      li.appendChild(spanTime);
      li.appendChild(span);
      li.appendChild(button);
      li.appendChild(completedAction);

      /* Вставка li у список справ ul*/
      var listActions=document.querySelector(".list-actions");
      listActions.appendChild(li);
      /*Виклик функції для сортування подій по даті*/
      //getSort();
    }
    getSort();

    /* створення події для видалення події після її відтворення з
    localstorege*/
    var deleteActions=document.querySelectorAll(".delete-action");
    for(i=0;i<deleteActions.length;i++){
      deleteActions[i].addEventListener("click",function(){
        /*Видалення з списку запланованих подій події */
        ListDeleteAction.push(this.previousElementSibling.innerHTML);
        ListScheduledAction.splice(ListScheduledAction.indexOf(this.previousElementSibling.innerHTML),1);
        ListDataDeleteAction.push(this.parentElement.children[0].innerHTML);
        ListDataScheduledAction.splice(ListDataScheduledAction.indexOf(this.parentElement.children[0].innerHTML),1);
        var listActionsDelete=document.querySelector(".list-actions-delete");
        listActionsDelete.appendChild(this.parentElement);
        /**/
        if(listActionsDelete.classList.contains("visible-after-js")){
        listActionsDelete.classList.remove("visible-after-js");
        }
        if(listActions.children.length==0){
          listActions.classList.add("visible-after-js");
        }
        /*Зміна кількості подій в number-action-value після видалення події*/
        var numberActionValue=document.querySelector(".number-action-value");
        numberActionValue.innerHTML=--numberActionValue.innerHTML;
        var numberActionDeleteValue=document.querySelector(".number-action-delete-value");
        numberActionDeleteValue.innerHTML=++numberActionDeleteValue.innerHTML;

        /* зміна кількості видалених подій в блоці статистики видалені події*/
        var totalNumberActionsDeleteValue=document.querySelector(".total-number-actions-delete-value");
        totalNumberActionsDeleteValue.innerHTML=++totalNumberActionsDeleteValue.innerHTML;
        var totalNumberActionsDeleteProgressIn=document.querySelector(".total-number-actions-delete-progress-in");
        var totalNumberActionsDeletePercent=document.querySelector(".total-number-actions-delete-percent");
        totalNumberActionsDeletePercent.innerHTML=totalNumberActionsDeleteValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
        totalNumberActionsDeletePercent.innerHTML=Math.round(+totalNumberActionsDeletePercent.innerHTML)+"%";
        totalNumberActionsDeleteProgressIn.style.width=parseFloat(totalNumberActionsDeletePercent.innerHTML)+"%";
        /*оновлення даних в блоці статистики для не виконаних подій*/
        var totalNumberActionsNotdoneValue=document.querySelector(".total-number-actions-notdone-value");
        totalNumberActionsNotdoneValue.innerHTML=--totalNumberActionsNotdoneValue.innerHTML;
        var totalNumberActionsNotdoneProgressIn=document.querySelector(".total-number-actions-notdone-progress-in");
        var totalNumberActionsNotdonePercent=document.querySelector(".total-number-actions-notdone-percent");
        totalNumberActionsNotdonePercent.innerHTML=totalNumberActionsNotdoneValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
        totalNumberActionsNotdonePercent.innerHTML=Math.round(+totalNumberActionsNotdonePercent.innerHTML)+"%";
        totalNumberActionsNotdoneProgressIn.style.width=parseFloat(totalNumberActionsNotdonePercent.innerHTML)+"%";
      });
    }

    /*створення подій для 'Подія виконана'' після її відтворення з localstorege*/
    var completedActionAll=document.querySelectorAll(".completed-action");
    for(i=0;i<completedActionAll.length;i++){
      completedActionAll[i].addEventListener("click",function(){
        var listActionsCompleted=document.querySelector(".list-actions-completed");
        listActionsCompleted.appendChild(this.parentElement);
        /**/
        if(listActionsCompleted.classList.contains("visible-after-js")){
          listActionsCompleted.classList.remove("visible-after-js");
          }
        if(listActions.children.length==0){
          listActions.classList.add("visible-after-js");
          }
        /* Видалення з списку запланованих та вставка у список виконаних для localStorage*/
        ListDataScheduledAction.splice(ListDataScheduledAction.indexOf(this.parentElement.children[0].innerHTML),1);
        ListDataComplitedAction.push(this.parentElement.children[0].innerHTML);
        ListScheduledAction.splice(ListScheduledAction.indexOf(this.parentElement.children[1].innerHTML),1);
        ListComplitedAction.push(this.parentElement.children[1].innerHTML);
        /* Зміна значень кількості запланованих та виконаних подій */
        var numberActionValue=document.querySelector(".number-action-value");
        numberActionValue.innerHTML=--numberActionValue.innerHTML;
        var numberActionCompletedValue=document.querySelector(".number-action-completed-value");
        numberActionCompletedValue.innerHTML=++numberActionCompletedValue.innerHTML;
        /**/
        /* кількість загальна справ для статистики*/
        var totalNumberActionsValue=document.querySelector(".total-number-actions-value");
        /* кількість виконаних для статистики справ*/
        var totalNumberActionsComplitedValue=document.querySelector(".total-number-actions-complited-value");
        totalNumberActionsComplitedValue.innerHTML=++totalNumberActionsComplitedValue.innerHTML;
        /* звернення до .total-number-actions-complited-percent*/
        var totalNumberActionsComplitedPercent=document.querySelector(".total-number-actions-complited-percent");
        /* обрахунок % виконання виконаних завдань*/
        totalNumberActionsComplitedPercent.innerHTML=totalNumberActionsComplitedValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
        totalNumberActionsComplitedPercent.innerHTML=Math.round(+totalNumberActionsComplitedPercent.innerHTML)+"%";
        /* зміна розташуваня total-number-actions-complited-progress-in*/
        var totalNumberActionsComplitedProgressIn=document.querySelector(".total-number-actions-complited-progress-in");
        totalNumberActionsComplitedProgressIn.style.width=parseFloat(totalNumberActionsComplitedPercent.innerHTML)+"%";
        /*оновлення даних в блоці статистики для не виконаних подій*/
        var totalNumberActionsNotdoneValue=document.querySelector(".total-number-actions-notdone-value");
        totalNumberActionsNotdoneValue.innerHTML=--totalNumberActionsNotdoneValue.innerHTML;
        var totalNumberActionsNotdoneProgressIn=document.querySelector(".total-number-actions-notdone-progress-in");
        var totalNumberActionsNotdonePercent=document.querySelector(".total-number-actions-notdone-percent");
        totalNumberActionsNotdonePercent.innerHTML=totalNumberActionsNotdoneValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
        totalNumberActionsNotdonePercent.innerHTML=Math.round(+totalNumberActionsNotdonePercent.innerHTML)+"%";
        totalNumberActionsNotdoneProgressIn.style.width=parseFloat(totalNumberActionsNotdonePercent.innerHTML)+"%";
      });
    }
  /*заповнення к-сті подій */
  var numberActionValue=document.querySelector(".number-action-value");
  numberActionValue.innerHTML=ListScheduledAction.length;
  /* зміни в блоці статистики не виконані завдання*/
  var totalNumberActionsValue=document.querySelector(".total-number-actions-value");
  totalNumberActionsValue.innerHTML=+totalNumberActionsValue.innerHTML+ListScheduledAction.length;
  
  }
  /*створення списку ВИКОНАНИХ подій при умові що події уже створені*/
  if(localStorage.getItem("strListComplitedAction")){
    var strListComplitedAction=localStorage.getItem("strListComplitedAction");
    var strListDataComplitedAction=localStorage.getItem("strListDataComplitedAction");
    ListComplitedAction=strListComplitedAction.split("*");
    ListDataComplitedAction=strListDataComplitedAction.split("*");
    for(i=0;i<ListComplitedAction.length;i++){
      var li=document.createElement("li");
      li.classList.add("list-action");
      var spanTime=document.createElement("span");
      spanTime.classList.add("time-action");
      spanTime.innerHTML=ListDataComplitedAction[i];
      li.setAttribute('data-time', (ListDataComplitedAction[i].slice(0,2)*60)+(+ListDataComplitedAction[i].slice(3,5)));
      var span=document.createElement("span");
      span.classList.add("text-action");
      span.innerHTML=ListComplitedAction[i];
      li.appendChild(spanTime);
      li.appendChild(span);
      /* Вставка li у список справ ul*/
      var listActionsCompleted=document.querySelector(".list-actions-completed");
      listActionsCompleted.appendChild(li);
      /*Виклик функції для сортування подій по даті*/
      //getSort();

    }
    var listActionCompletedAll=document.querySelectorAll(".list-actions-completed .list-action");
    var numberActionCompletedValue=document.querySelector(".number-action-completed-value");
    numberActionCompletedValue.innerHTML=listActionCompletedAll.length;
    var totalNumberActionsValue=document.querySelector(".total-number-actions-value");
    totalNumberActionsValue.innerHTML=+totalNumberActionsValue.innerHTML+ListComplitedAction.length;
  }

  /*створення списку ВИДАЛЕНИХ подій при умові що події уже створені*/
  if(localStorage.getItem("strListDeleteAction")){
    var strListDeleteAction=localStorage.getItem("strListDeleteAction");
    var strListDataDeleteAction=localStorage.getItem("strListDataDeleteAction");
    ListDeleteAction=strListDeleteAction.split("*");
    ListDataDeleteAction=strListDataDeleteAction.split("*");
    for(i=0;i<ListDeleteAction.length;i++){
      var li=document.createElement("li");
      li.classList.add("list-action");
      var spanTime=document.createElement("span");
      spanTime.classList.add("time-action");
      spanTime.innerHTML=ListDataDeleteAction[i];
      li.setAttribute('data-time', (ListDataDeleteAction[i].slice(0,2)*60)+(+ListDataDeleteAction[i].slice(3,5)));
      var span=document.createElement("span");
      span.classList.add("text-action");
      span.innerHTML=ListDeleteAction[i];
      li.appendChild(spanTime);
      li.appendChild(span);
      /* Вставка li у список справ ul*/
      var listActionsDelete=document.querySelector(".list-actions-delete");
      listActionsDelete.appendChild(li);
      /*Виклик функції для сортування подій по даті*/
      //getSort();

    }
    var listActionDeleteAll=document.querySelectorAll(".list-actions-delete .list-action");
    var numberActionDeleteValue=document.querySelector(".number-action-delete-value");
    numberActionDeleteValue.innerHTML=listActionDeleteAll.length;
    var totalNumberActionsValue=document.querySelector(".total-number-actions-value");
    totalNumberActionsValue.innerHTML=+totalNumberActionsValue.innerHTML+ListDeleteAction.length;
  }
  /*оновлення даних в блоці статистики для не виконаних подій*/
  var totalNumberActionsValue=document.querySelector(".total-number-actions-value");
  if(totalNumberActionsValue.innerHTML!=0){
    var totalNumberActionsNotdoneValue=document.querySelector(".total-number-actions-notdone-value");
    totalNumberActionsNotdoneValue.innerHTML=ListScheduledAction.length;
    var totalNumberActionsNotdoneProgressIn=document.querySelector(".total-number-actions-notdone-progress-in");
    var totalNumberActionsNotdonePercent=document.querySelector(".total-number-actions-notdone-percent");
    totalNumberActionsNotdonePercent.innerHTML=totalNumberActionsNotdoneValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
    totalNumberActionsNotdonePercent.innerHTML=Math.round(+totalNumberActionsNotdonePercent.innerHTML)+"%";
    totalNumberActionsNotdoneProgressIn.style.width=parseFloat(totalNumberActionsNotdonePercent.innerHTML)+"%";
    /* оновлення даних в блоці статистики для виконаних подій*/
    var totalNumberActionsComplitedValue=document.querySelector(".total-number-actions-complited-value");
    totalNumberActionsComplitedValue.innerHTML=ListComplitedAction.length;
      /* звернення до .total-number-actions-complited-percent*/
    var totalNumberActionsComplitedPercent=document.querySelector(".total-number-actions-complited-percent");
      /* обрахунок % виконання виконаних завдань*/
    totalNumberActionsComplitedPercent.innerHTML=totalNumberActionsComplitedValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
    totalNumberActionsComplitedPercent.innerHTML=Math.round(+totalNumberActionsComplitedPercent.innerHTML)+"%";
      /* зміна розташуваня total-number-actions-complited-progress-in*/
    var totalNumberActionsComplitedProgressIn=document.querySelector(".total-number-actions-complited-progress-in");
    totalNumberActionsComplitedProgressIn.style.width=parseFloat(totalNumberActionsComplitedPercent.innerHTML)+"%";
    /* зміна кількості видалених подій в блоці статистики видалені події*/
    var totalNumberActionsDeleteValue=document.querySelector(".total-number-actions-delete-value");
    totalNumberActionsDeleteValue.innerHTML=ListDeleteAction.length;
    var totalNumberActionsDeleteProgressIn=document.querySelector(".total-number-actions-delete-progress-in");
    var totalNumberActionsDeletePercent=document.querySelector(".total-number-actions-delete-percent");
    totalNumberActionsDeletePercent.innerHTML=totalNumberActionsDeleteValue.innerHTML/(totalNumberActionsValue.innerHTML/100);
    totalNumberActionsDeletePercent.innerHTML=Math.round(+totalNumberActionsDeletePercent.innerHTML)+"%";
    totalNumberActionsDeleteProgressIn.style.width=parseFloat(totalNumberActionsDeletePercent.innerHTML)+"%";
  }
});
/*END*/

/*START*/
/* Користувач залишає сторінку зберігаю ListScheduledAction( створенні події)
в localStorage з перетворенняи в стрічку */
window.onbeforeunload = function() {
  //return "Данные не сохранены. Точно перейти?";
  var strListScheduledAction=ListScheduledAction.join("*");
  var strListDataScheduledAction=ListDataScheduledAction.join("*");
  /**/
  var strListComplitedAction=ListComplitedAction.join("*");
  var strListDataComplitedAction=ListDataComplitedAction.join("*");
  /**/
  var strListDeleteAction=ListDeleteAction.join("*");
  var strListDataDeleteAction=ListDataDeleteAction.join("*");
  if(strListScheduledAction.length>0){
    localStorage.setItem("strListScheduledAction",strListScheduledAction);
    localStorage.setItem("strListDataScheduledAction",strListDataScheduledAction);
    /**/
    //localStorage.clear();
  }
  else{
    localStorage.removeItem("strListScheduledAction");
    localStorage.removeItem("strListDataScheduledAction");
  }
  if(strListComplitedAction.length>0){
    
    localStorage.setItem("strListComplitedAction",strListComplitedAction);
    localStorage.setItem("strListDataComplitedAction",strListDataComplitedAction);
    //localStorage.clear();
  }
  else{
    localStorage.removeItem("strListComplitedAction");
    localStorage.removeItem("strListDataComplitedAction");
  }
  if(strListDeleteAction.length>0){
    
    localStorage.setItem("strListDeleteAction",strListDeleteAction);
    localStorage.setItem("strListDataDeleteAction",strListDataDeleteAction);
    //localStorage.clear();
  }
  else{
    localStorage.removeItem("strListDeleteAction");
    localStorage.removeItem("strListDataDeleteAction");
  }
};


/*Сортування подій по даті в списку запланованих подій по data-time на li*/
function getSort(){
  var listActions=document.querySelector(".list-actions-scheduled");
  var listAction=document.querySelectorAll(".list-actions-scheduled .list-action");
//var step=0;
  var step1=0;
  while(step1!=listAction.length-1){
    for(var step=0;step<=listAction.length-2;step++){
    
      if(+listAction[step].getAttribute("data-time")>+listAction[step+1].getAttribute("data-time")){
        listActions.insertBefore(listAction[step+1], listAction[step]);
        listAction=document.querySelectorAll(".list-actions-scheduled .list-action");
      }
    
    }
  step1=step1+1;
  }
}

/* додавання події для розгортання списку подій*/
var containerActionTitleAll=document.querySelectorAll(".container-action-title");
    for(var k=0;k<containerActionTitleAll.length;k++){
    containerActionTitleAll[k].addEventListener("click",function(){
      //var listActions=document.querySelector(".list-actions");
      this.nextElementSibling.classList.toggle("open");
      //alert(this.nextElementSibling.children.length);
      if(this.nextElementSibling.children.length==0){
        //alert(this.nextElementSibling.children.length);
        this.nextElementSibling.classList.add("visible-after-js");
        //console.log(this.nextElementSibling.children);
      }
      else{
        this.nextElementSibling.classList.remove("visible-after-js");
      }
      });
    }
