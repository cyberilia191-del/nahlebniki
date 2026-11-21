'use strict';
const dishes = [
  {id:'pastrami',category:'Сэндвичи',name:'Пастрами на гриле',price:490,weight:'320 г',description:'Томлёная говядина, чеддер, маринованные огурчики и горчичный соус.',tag:'ХИТ',icon:'star'},
  {id:'cheese',category:'Сэндвичи',name:'Тройной чиз',price:350,weight:'250 г',description:'Чеддер, моцарелла и гауда между двумя ломтиками золотистого хлеба.',tag:'3 СЫРА',tone:'light'},
  {id:'chicken',category:'Сэндвичи',name:'Криспи чикен',price:390,weight:'290 г',description:'Курица в хрустящей панировке, свежий салат и острый соус чили.',tag:'ОСТРОЕ',tone:'dark',icon:'flame'},
  {id:'smash',category:'Бургеры',name:'Смэшбургер',price:430,weight:'280 г',description:'Говяжья котлета с корочкой, чеддер и огурчики в мягкой булочке.'},
  {id:'bacon',category:'Бургеры',name:'Двойной бекон',price:550,weight:'370 г',description:'Две говяжьи котлеты, хрустящий бекон, чеддер и дымный соус.'},
  {id:'fries',category:'Закуски',name:'Картофель фри',price:170,weight:'150 г',description:'Золотистые ломтики картофеля с морской солью.'},
  {id:'onions',category:'Закуски',name:'Луковые кольца',price:190,weight:'140 г',description:'Сладкий лук в хрустящем золотистом кляре.'},
  {id:'lemonade',category:'Напитки',name:'Лимонад',price:160,weight:'400 мл',description:'Лимонный сок, газированная вода и лёд.'},
  {id:'sauce',category:'Соусы',name:'Спайси-соус',price:60,weight:'40 г',description:'Сливочный соус с чили и копчёной паприкой.'}
];
const shapes = {
 home:'<path d="m2.5 10.7 9.5-8 9.5 8M5 9v11h5v-6h4v6h5V9"/>',
 map:'<path d="m2.5 5.5 6-2.5 7 3 6-2.5v15l-6 2.5-7-3-6 2.5zM8.5 3v15m7-12v15"/>',
 person:'<circle cx="12" cy="7.5" r="3.8"/><path d="M4 21v-2c0-3.2 3.5-5.4 8-5.4s8 2.2 8 5.4v2"/>',
 heart:'<path d="M20.4 4.9a5.3 5.3 0 0 0-7.5 0l-.9.9-.9-.9a5.3 5.3 0 0 0-7.5 7.5L12 21l8.4-8.6a5.3 5.3 0 0 0 0-7.5Z"/>',
 bread:'<path fill="currentColor" stroke="none" d="M1.5 9C.5 5.9 4.8 2.4 10.2 2.3c3.6-.8 10.5 1.2 12 5.5.9 2.4-.2 4.3-2.2 5v6.1c0 1.2-.9 2.1-2 2.1H5c-1.3 0-2.1-.9-2.1-2.2v-6.7C2.1 11.7 1.7 10.4 1.5 9Z"/><path stroke="#151515" stroke-width="2.3" d="m6 7 2.5 3m2.3-4.3 2.7 3.2m2.4-2.1 2 2.3M6 16.8h10.6"/>',
 star:'<path fill="currentColor" stroke="none" d="m12 1.5 3.1 6.4 7 .9-5 5 1.2 6.9-6.3-3.4-6.2 3.4 1.1-6.9-5-5 7-.9z"/>',
 pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.4"/>',
 bag:'<path d="M4.5 7.5h15l1 13h-17l1-13Z"/><path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 sandwich:'<path d="m2 14 16-10 4 10H2Zm1 3 3-1 4 2 4-2 4 1 3-1v4H3zM9 11l2-1m4-2 1 1"/>',
 burger:'<path d="M3 10a9 7 0 0 1 18 0H3Zm0 4 3-1 4 2 4-2 3 1 4-1M3 17h18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z"/>',
 fries:'<path d="m4 9 2 12h12l2-12c-5 4-11 4-16 0ZM6 10V3h3v8m1 1V2h3v10m2-1V5h3v5"/>',
 drink:'<path d="M5 8h14l-2 13H7L5 8ZM4 8h16M13 8l2-6h4"/>',
 sauce:'<ellipse cx="12" cy="9" rx="9" ry="4"/><path d="m3 9 3 8c1.5 3 10.5 3 12 0l3-8M8 8c2-1 5-1 7 0"/>',
 flame:'<path d="M13 2c1 5-4 5-2 10 2-1 3-3 4-5 1 3 5 5 4 9a7 7 0 0 1-14-1c0-4 4-7 4-9 0 3 2 3 2 3s2-3 2-7Z"/>',
 trash:'<path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/>',
 check:'<path d="m4 12 5 5L20 6"/>',back:'<path d="m15 4-8 8 8 8"/>',
 truck:'<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>'
};
function icon(name){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+shapes[name]+'</svg>'}
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
const assets = Object.fromEntries(dishes.map(d=>[d.id,'assets/'+d.id+'.jpg']));
const cats = [['Всё меню','grid'],['Сэндвичи','sandwich'],['Бургеры','burger'],['Закуски','fries'],['Напитки','drink'],['Соусы','sauce']];
const $=s=>document.querySelector(s);
const cartKey='nahlebniki.cart.v1',contactKey='nahlebniki.contact.v1';
function read(key){try{return JSON.parse(localStorage.getItem(key))||{}}catch{return {}}}
function write(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
function getCart(){const saved=read(cartKey);return Object.fromEntries(dishes.filter(d=>Number.isInteger(saved[d.id])&&saved[d.id]>0).map(d=>[d.id,Math.min(saved[d.id],99)]))}
let cart=getCart(),selected='Всё меню',screen='',draft={};
const favoritesKey = 'nahlebniki.favorites.v1';
function readFavorites() {
 const saved = read(favoritesKey);
 return new Set(dishes.filter(dish => Array.isArray(saved) && saved.includes(dish.id)).map(dish => dish.id));
}
let favorites = readFavorites();
let favoritesOnly = false;
const panel=$('#panel'),body=$('#panel-body');
const price=n=>new Intl.NumberFormat('ru-RU').format(n)+' ₽';
const total=()=>dishes.reduce((sum,d)=>sum+d.price*(cart[d.id]||0),0);
const qty=()=>Object.values(cart).reduce((a,b)=>a+b,0);
function stepper(d){return '<div class="stepper"><button data-do="minus" data-id="'+d.id+'" aria-label="Убрать одну порцию, '+d.name+'">'+icon('minus')+'</button><output aria-label="Количество">'+cart[d.id]+'</output><button data-do="plus" data-id="'+d.id+'" aria-label="Добавить ещё, '+d.name+'" '+(cart[d.id]>=99?'disabled':'')+'>'+icon('plus')+'</button></div>'}
function addButton(d,hero=false){return cart[d.id]?stepper(d):'<button class="'+(hero?'primary':'add-square')+'" data-do="plus" data-id="'+d.id+'" aria-label="Добавить в корзину, '+d.name+'">'+icon('plus')+(hero?'В корзину':'')+'</button>'}
function renderCategories(){$('#categories').innerHTML=cats.map(([name,symbol])=>'<button class="category" data-cat="'+name+'" aria-pressed="'+(name===selected)+'">'+icon(symbol)+name+'</button>').join('')}
function favoriteButton(dish) {
 return `<button class="favorite-heart" data-favorite="${dish.id}" aria-label="Избранное — ${dish.name}" aria-pressed="${favorites.has(dish.id)}">${icon('heart')}</button>`;
}
function renderMenu(){
 const visible = dishes.filter(dish =>
   (selected === 'Всё меню' || selected === dish.category) && (!favoritesOnly || favorites.has(dish.id))
 );
 $('#favorite-filter').setAttribute('aria-pressed', favoritesOnly);
 $('#favorites-empty').hidden = visible.length > 0;
 $('#empty-title').textContent = favorites.size ? 'В этой категории нет избранного' : 'Пока нет избранного';
 $('#products').innerHTML=visible.map(d=>'<article class="product"><div class="photo"><img src="'+assets[d.id]+'" alt="'+d.name+'" loading="lazy">'+(d.tag?'<span class="label '+(d.tone||'')+'">'+(d.icon?icon(d.icon):'')+d.tag+'</span>':'')+favoriteButton(d)+'</div><div class="product-body"><div class="product-title"><h3>'+d.name+'</h3><span class="weight">'+d.weight+'</span></div><p>'+d.description+'</p><div class="buy-row"><strong class="price">'+price(d.price)+'</strong>'+addButton(d)+'</div></div></article>').join('');
 $('#hero-add').innerHTML=addButton(dishes[0],true);$('#cart-count').textContent=qty();
}
const appNav = $('.app-nav');
const tabButtons = Array.from(appNav.querySelectorAll('[data-tab]'));
function selectTab(name) {
 const index = tabButtons.findIndex(button => button.dataset.tab === name);
 tabButtons.forEach((button, i) => {
   if (i === index) button.setAttribute('aria-current', 'page');
   else button.removeAttribute('aria-current');
 });
 appNav.style.setProperty('--tab-index', index);
 appNav.classList.toggle('map-active', name === 'pickup');
}
function currentMenuTab() {
 return $('#menu').getBoundingClientRect().top <= 80 ? 'catalog' : 'home';
}
function openPanel(title, view) {
 screen = view;
 $('#panel-title').textContent = title;
 const withNav = ['cart', 'pickup', 'profile'].includes(view);
 panel.classList.toggle('with-nav', withNav);
 if (withNav) {
   if (appNav.parentElement !== panel) panel.append(appNav);
   selectTab(view);
 }
 appNav.hidden = !withNav;
 if (!panel.open) {
   panel.showModal();
   document.body.classList.add('modal');
 }
 panel.scrollTop = 0;
}
function openMenuTab(name) {
 if (panel.open) panel.close();
 const y = name === 'catalog' ? window.scrollY + $('#menu').getBoundingClientRect().top - 12 : 0;
 window.scrollTo({top: y, behavior: 'instant'});
 selectTab(name);
}
function showPickup() {
 openPanel('Где забрать заказ', 'pickup');
 body.innerHTML = `<div class="pickup-banner" aria-hidden="true"></div>
 <div class="info"><section><p class="pickup-place">${icon('pin')}Смоленск</p>
 <h3>Сэндвич-шоп «Нахлебники»</h3><p class="panel-copy">Точный адрес точки самовывоза пока не указан.</p></section>
 <section><h3>Самовывоз к выбранному времени</h3>
 <p class="panel-copy">Добавьте блюда в корзину. При оформлении выберите «Самовывоз», день и время получения.</p></section></div>
 <button class="primary full" data-do="menu">Перейти в каталог</button>`;
}
function showCart(){
 openPanel('Корзина','cart');
 if(!qty()){body.innerHTML='<div class="empty">'+icon('bag')+'<h3>Корзина пока пуста</h3><p class="panel-copy">Добавьте блюдо из меню.</p><button class="primary" data-do="menu">К меню</button></div>';return}
 body.innerHTML=dishes.filter(d=>cart[d.id]).map(d=>'<div class="cart-row"><img src="'+assets[d.id]+'" alt=""><div><h3>'+d.name+'</h3>'+stepper(d)+'</div><div class="row-end"><strong>'+price(d.price*cart[d.id])+'</strong><button class="remove" data-do="remove" data-id="'+d.id+'" aria-label="Удалить '+d.name+'">'+icon('trash')+'</button></div></div>').join('')+'<div class="total">Итого<strong>'+price(total())+'</strong></div><button class="primary full" data-do="checkout">Перейти к оформлению</button><p class="note">Демо-заказ · Без списания средств</p>';
}
function showInfo(){openPanel('Доставка и самовывоз','info');body.innerHTML='<div class="info"><section><h3>'+icon('truck')+'Доставка по Смоленску</h3><p class="panel-copy">Выберите день и время, затем укажите улицу, дом и квартиру. В демо доставка бесплатная.</p></section><section><h3>'+icon('bag')+'Самовывоз</h3><p class="panel-copy">Выберите время получения в сэндвич-шопе «Нахлебники» в Смоленске.</p></section><section><h3>Демонстрационный режим</h3><p class="panel-copy">Заказ оформляется только на этом устройстве. Деньги не списываются, а ресторан не получает заявку.</p></section></div><button class="primary full" data-do="menu">Перейти в меню</button>'}
const moscowNow=()=>new Date(Date.now()+3*3600000);
const isoDay=date=>date.toISOString().slice(0,10);
function availableDays(){const now=moscowNow();return Array.from({length:8},(_,i)=>isoDay(new Date(now.getTime()+86400000*i))).filter(d=>slots(d).length)}
function slots(day){const start=Date.parse(day+'T00:00:00+03:00');return Array.from({length:48},(_,i)=>i*30).filter(m=>start+m*60000>=Date.now()+30*60000).map(m=>String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0'))}
function dayLabel(day){return new Date(day+'T12:00:00Z').toLocaleDateString('ru-RU',{day:'numeric',month:'long',timeZone:'Europe/Moscow'})}
function storeDraft(){const f=$('#checkout');if(f)draft=Object.fromEntries(new FormData(f))}
function updateMode(){const delivery=$('input[name=mode]:checked').value==='delivery';$('#address-field').hidden=!delivery;$('#address').disabled=!delivery;$('#address').required=delivery;$('#pickup-note').hidden=delivery}
function updateTimes(preferred){const times=slots($('#day').value);$('#time').innerHTML=times.map(t=>'<option>'+t+'</option>').join('');if(times.includes(preferred))$('#time').value=preferred;$('#time').setCustomValidity('')}
const contactFields = `<label class="field">Имя<input name="name" autocomplete="given-name" placeholder="Как к вам обращаться" maxlength="80" required></label><label class="field">Телефон<input type="tel" name="phone" autocomplete="tel" placeholder="+7 (___) ___-__-__" maxlength="24" required></label><label class="field">E-mail<input type="email" name="email" autocomplete="email" placeholder="Для уведомлений об оплате" maxlength="160" required></label>`;
function showProfile() {
 openPanel('Профиль', 'profile');
 body.innerHTML = `<form id="profile"><h3 class="subhead">Ваши контакты</h3>
 <p class="panel-copy">Эти данные хранятся на устройстве и подставляются в заказ.</p>
 ${contactFields}<button class="primary full" type="submit">Сохранить</button>
 <p class="profile-feedback" role="status"></p></form>`;
 const saved = read(contactKey);
 for (const key of ['name', 'phone', 'email']) {
   $('#profile').elements[key].value = typeof saved[key] === 'string' ? saved[key] : '';
 }
}
function validateContacts(form) {
 const {name, phone} = form.elements;
 name.setCustomValidity(name.value.trim() ? '' : 'Укажите имя.');
 const digits = phone.value.replace(/\D/g, '');
 const valid = /^[+\d\s()\-]+$/.test(phone.value) && digits.length >= 10 && digits.length <= 15;
 phone.setCustomValidity(valid ? '' : 'Укажите номер телефона с кодом города или страны.');
}
function saveContacts(form) {
 const contacts = {};
 for (const key of ['name', 'phone', 'email']) contacts[key] = form.elements[key].value.trim();
 write(contactKey, contacts);
 return contacts;
}
function showCheckout(){
 if(!qty()){showCart();return}
 openPanel('Оформление заказа','checkout');
 body.innerHTML='<button class="back" data-do="cart">'+icon('back')+' В корзину</button><form id="checkout"><fieldset><legend>Как получить</legend><div class="mode-group"><label><input type="radio" name="mode" value="delivery" checked><span>'+icon('truck')+' Доставка</span></label><label><input type="radio" name="mode" value="pickup"><span>'+icon('bag')+' Самовывоз</span></label></div></fieldset><label class="field" id="address-field">Адрес в Смоленске<input name="address" id="address" autocomplete="street-address" maxlength="240" placeholder="Улица, дом, квартира" required></label><p class="note" id="pickup-note" hidden>Самовывоз из сэндвич-шопа «Нахлебники», Смоленск.</p><div class="split"><label class="field">День<select name="day" id="day" required></select></label><label class="field">Время (МСК)<select name="time" id="time" required></select></label></div><h3 class="subhead">Ваши контакты</h3>'+contactFields+'<label class="field">Способ оплаты<select name="payment"><option value="card">Картой при получении</option><option value="cash">Наличными при получении</option></select></label><div class="checkout-total"><div class="total">Итого<strong>'+price(total())+'</strong></div><p class="note">Демо-заказ сохраняется на этом устройстве. Оплата не взимается.</p><button class="primary full" type="submit">Оформить демо-заказ</button></div></form>';
 const f=$('#checkout'),previous=Object.assign({},read(contactKey),draft);
 for(const key of ['address','name','phone','email','payment'])if(typeof previous[key]==='string')f.elements[key].value=previous[key];
 f.elements.mode.value=previous.mode==='pickup'?'pickup':'delivery';updateMode();
 const days=availableDays();$('#day').innerHTML=days.map(day=>'<option value="'+day+'">'+(day===isoDay(moscowNow())?'Сегодня, ':'')+dayLabel(day)+'</option>').join('');
 if(days.includes(previous.day))$('#day').value=previous.day;updateTimes(previous.time);
}
function confirmOrder(f){
 const data=Object.fromEntries(new FormData(f));
 validateContacts(f);
 if (!f.elements.address.disabled) f.elements.address.setCustomValidity(data.address.trim() ? '' : 'Укажите адрес.');
 if(!slots(data.day).includes(data.time)){updateTimes();$('#time').setCustomValidity('Выберите новое время получения.')}
 if(!f.reportValidity())return;
 if(!qty()){showCart();return}
 const sum=total(),order={number:String(Date.now()).slice(-6),mode:data.mode,day:data.day,time:data.time,payment:data.payment,amount:sum,items:{...cart},address:data.address||''};
 write('nahlebniki.last-order.v1',order);saveContacts(f);
 cart={};write(cartKey,cart);draft={};renderMenu();openPanel('Заказ оформлен','receipt');
 body.innerHTML='<div class="receipt"><span class="receipt-mark">'+icon('check')+'</span><h3>Демо-заказ № '+order.number+'</h3><p class="panel-copy">Заказ оформлен на этом устройстве. Деньги не списаны, заявка в ресторан не отправлена.</p><dl id="summary"></dl><button class="primary full" data-do="menu">Вернуться в меню</button></div>';
 const rows=[['Получение',data.mode==='delivery'?'Доставка':'Самовывоз'],[data.mode==='delivery'?'Адрес':'Место',data.mode==='delivery'?data.address:'«Нахлебники», Смоленск'],['Ко времени',dayLabel(data.day)+', '+data.time+' МСК'],['Оплата',data.payment==='card'?'Картой при получении':'Наличными при получении'],['Итого',price(sum)]];
 rows.forEach(([label,value])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;$('#summary').append(dt,dd)});
}
function changeCart(action,id,button){
 const place=button.closest('#panel-body')?body:button.closest('#hero-add')?$('#hero-add'):$('#products');
 const dish=dishes.find(d=>d.id===id);if(!dish)return;
 const next=action==='remove'?0:Math.max(0,Math.min(99,(cart[id]||0)+(action==='plus'?1:-1)));if(next)cart[id]=next;else delete cart[id];
 write(cartKey,cart);renderMenu();if(screen==='cart')showCart();
 $('#status').textContent=dish.name+' — '+next+' шт. В корзине на '+price(total());
 const replacement=place.querySelector('[data-id="'+id+'"][data-do="'+action+'"]')||place.querySelector('[data-id="'+id+'"]')||place.querySelector('button');
 replacement?.focus({preventScroll:true});
}
document.addEventListener('click',e=>{
 const tab = e.target.closest('[data-tab]');
 if (tab) {
   const name = tab.dataset.tab;
   if (name === 'cart') showCart();
   else if (name === 'pickup') showPickup();
   else if (name === 'profile') { if (screen !== 'profile') showProfile(); }
   else openMenuTab(name);
   return;
 }
 if (e.target.closest('#favorite-filter')) {
   favoritesOnly = !favoritesOnly;
   renderMenu();
   return;
 }
 const heart = e.target.closest('[data-favorite]');
 if (heart) {
   const id = heart.dataset.favorite;
   const hearts = Array.from(document.querySelectorAll('[data-favorite]'));
   const index = hearts.indexOf(heart);
   const wasSaved = favorites.has(id);
   if (wasSaved) favorites.delete(id);
   else favorites.add(id);
   write(favoritesKey, Array.from(favorites));
   renderMenu();
   const remaining = document.querySelectorAll('[data-favorite]');
   const next = remaining[Math.min(index, remaining.length - 1)] || $('#favorite-filter');
   next.focus({preventScroll:true});
   const dish = dishes.find(item => item.id === id);
   $('#status').textContent = dish.name + (wasSaved ? ' — убрано из избранного' : ' — добавлено в избранное');
   return;
 }
 const cat=e.target.closest('[data-cat]');if(cat){selected=cat.dataset.cat;renderCategories();renderMenu();$('#categories [aria-pressed=true]').focus({preventScroll:true});return}
 const button=e.target.closest('[data-do]');if(!button)return;
 const action=button.dataset.do;
 if(['plus','minus','remove'].includes(action)){changeCart(action,button.dataset.id,button);return}
 if(action==='cart'){storeDraft();showCart()}
 if(action==='checkout')showCheckout();
 if(action==='info')showInfo();
 if(action==='close'){storeDraft();panel.close()}
 if(action==='menu')openMenuTab('catalog');
});
document.addEventListener('change',e=>{if(e.target.name==='mode')updateMode();if(e.target.id==='day')updateTimes();if(e.target.id==='time')e.target.setCustomValidity('')});
document.addEventListener('input',e=>{if (['checkout','profile'].includes(e.target.form?.id)) e.target.setCustomValidity(''); if(e.target.form?.id==='profile') $('.profile-feedback').textContent='';});
document.addEventListener('submit', e => {
 const form = e.target;
 e.preventDefault();
 if (form.id === 'checkout') confirmOrder(form);
 if (form.id === 'profile') {
   validateContacts(form);
   if (!form.reportValidity()) return;
   Object.assign(draft, saveContacts(form));
   $('.profile-feedback').textContent = 'Контакты сохранены';
 }
});
panel.addEventListener('click',e=>{if(e.target===panel&&e.clientX<panel.getBoundingClientRect().left){storeDraft();panel.close()}});
panel.addEventListener('cancel',storeDraft);
panel.addEventListener('close', () => {
 if (panel.open) return;
 screen = '';
 document.body.classList.remove('modal');
 document.body.insertBefore(appNav, panel);
 appNav.hidden = false;
 selectTab(currentMenuTab());
});
const menuObserver = new IntersectionObserver(() => {
 if (!panel.open) selectTab(currentMenuTab());
}, {rootMargin: '-80px 0px 0px 0px', threshold: 0});
menuObserver.observe($('.hero'));

window.addEventListener('storage',e=>{if(e.key===cartKey||e.key===null){cart=getCart();renderMenu();if(screen==='cart')showCart();if(screen==='checkout'){storeDraft();showCheckout()}}});
window.addEventListener('storage', event => {
 if (event.key === favoritesKey || event.key === null) {
   favorites = readFavorites();
   renderMenu();
 }
});
renderCategories();renderMenu();
