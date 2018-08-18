# entrance-task-2-2

##  Проект
### Запуск
```
npm i
npm start
```

### Тестирование stylelint
```
npm test
```

### Автоматизация проекта

Атоматизация происходит с использование `gulp`.
+ `gulp-sass` компилирует `.scss` файлы в единый `style.css`
+ `autoprefixer` и `gulp-postcss` добавляют префиксы для браузеров
+ `browser-sync` позволяет следить за изменениями
 `.html` и `.scss` файлов
 
 Данный минимальный набор пакетов позволяет комфортно вести разработку.
 
###  Сторонние библиотеки
В проекте используются:
+  `normalize.css` для унификация встроенных стилей
+ Полифил [Smoothscroll](https://github.com/iamdustan/smoothscroll) для работы `scroll-behavior`. 
Согласно [caniuse](https://caniuse.com/#search=scroll-behavior), данное свойство нативно поддерживает только firefox и chrome
   

### Комментарии к проекту (ToDo)
+ Подразумевается, что «Крутилка» `circle-toggle` работает с помощбю SVG. Она может быть активировна, 
используя селектор `.circle-toggle__value` и свойства
`stroke-dasharray` и `stroke-dashoffset`. К сожалению, «докрутить» ее я не успел.
+ Визуализация стрелок листания управляется с помощью селекторов
`summary__control-button--show` и `card-control__button --next-active --prev-active`.
Сама реализация листания есть, кроме смена состояния кнопок.
