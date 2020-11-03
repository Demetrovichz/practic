const deadline = '2020-11-31';


function GetTimeRemaning(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor(t / (1000 * 60 * 60) % 24),
        min = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': min,
        'seconds': seconds
    };
} // Функция которая просчитывает сколько нам осталоась до переменной дедлайн (Можно изменить переменную или аргументы при вызове функции)


function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
} // Функцию добавляющая ноль если в дате что - то меньше 10


function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(UpdateClock, 1000);
    UpdateClock();

    function UpdateClock() {
        const t = GetTimeRemaning(endtime);
        days.innerHTML = getZero(t.days)
        hours.innerHTML = getZero(t.hours)
        minutes.innerHTML = getZero(t.minutes)
        seconds.innerHTML = getZero(t.seconds)

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }


    }
} // SetClock вставляет наши данные в селекторы , после SetLocka сразу вызвана функция чтобы не ждать задержку в 1с. Update Clocl работает с интервалом в 1с , так как там задан интервал

setClock('.timer', deadline);



const ModalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');

console.log(modalCloseBtn);



ModalTrigger.forEach(items => {
    items.addEventListener("click", () => {

        // modal.classList.toggle('show');
        // document.body.style.overflow = 'hidden';
        OpenModal();

    });

});


modalCloseBtn.addEventListener("click", (event) => {
    CloseModal();
}); //Закрытие крестом модального окна



modal.addEventListener('click', (e) => {
    if (e.target == modal) {
        CloseModal();
    }

}); // Закрытие модального окна при клике за область окна


function CloseModal() {
    modal.classList.toggle('show');
    document.body.style.overflow = '';
}


function OpenModal() {
    if (!modal.classList.contains('show')) {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearTimeout(ModalTimerid);
    }
}



document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
        CloseModal();
    }
});


function ShowModalScroll() {
    console.log('test');
    if (pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        OpenModal();
    }
    removeEventListener("scroll", ShowModalScroll);

}

window.addEventListener("scroll", ShowModalScroll);



// console.log(document.documentElement.getBoundingClientRect);



const ModalTimerid = setTimeout(ShowModalScroll, 3000);



//selectMenuBtns - Переменная с кнопками 



const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');







// function ContentVisibl(i) {
//     tabsContent.forEach(item => {
//         console.log(item)
//     });

// }



function HideTabContent() {
    tabsContent.forEach(item => {
        item.style.display = 'none';
    });


    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}



function ShowContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
}



HideTabContent();
ShowContent(0);


tabsParent.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                HideTabContent();
                ShowContent(i);
                console.log(i);
            }
        });
    }
});






const parentMenu = document.querySelector('.menu__field');

// // 

// const Menu = document.createElement("div class=menu__item");



class MenuList {
    constructor(image, subtitle, about, cost, parentSelector, ...classes) {
        this.image = image;
        this.subtitle = subtitle;
        this.about = about;
        this.cost = cost;
        this.classes = classes;
        this.transfer = 27.2;
        this.parentSelector = document.querySelector(parentSelector);
        this.ChangeToUAH();
    }

    ChangeToUAH() {
        this.cost = Math.ceil(this.cost * this.transfer);
    }

    render() {
        const element = document.createElement('div');

        if (this.classes.length == 0) {
            this.element = 'menu__item'
            element.classList.add(this.element);
        }
        this.classes.forEach(className => element.classList.add(className));
        element.innerHTML = ` 
        <img src="${this.image}" alt="elite">
        <h3 class="menu__item-subtitle">${this.subtitle}"</h3>
        <div class="menu__item-descr">${this.about}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
            `;


        this.parentSelector.append(element);

    }
}


new MenuList(
    'img/tabs/elite.jpg',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    9,
    '.menu .container',
    'menu__item',
    'big'
).render();


const Dsa = new MenuList('img/tabs/elite.jpg',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    1,
    '.menu__field .container');

console.log(Dsa.parentSelector);

Dsa.render();




const log = function(a, b, c, ...spread) {
    console.log(a, b, c, spread);
}


log('basic', 'rest', 'operator', 'dsds', 'ds', 'dsa', 'das', 'dsa', 'dasw');


console.log('bca');
//forms

const message = {

    loading: 'загрузка',
    succes: 'Спасибо скоро свяжем',
    failure: 'Что-то не так'

};

const forms = document.querySelectorAll('form');

forms.forEach(item => {
    PostData(item);
});

function PostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusMesage = document.createElement('div');
        statusMesage.classList.add('status');
        statusMesage.textContent = message.loading;
        form.append(statusMesage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');

        request.setRequestHeader('Content-type', 'multipart/form-data')

        const formData = new FormData(form);

        request.send(formData);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response)
                statusMesage.textContent = message.succes;
            } else {
                statusMesage.textContent = message.failure;
            }
        });
    });
}