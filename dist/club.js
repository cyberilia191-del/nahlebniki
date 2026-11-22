'use strict';

const clubKey = 'nahlebniki.club.demo.v1';
const startingPoints = 90;
const pointsPerOrder = 30;
const clubLevels = [
  {name:'Первый ломтик', orders:0},
  {name:'Свой на гриле', orders:2},
  {name:'Мастер фокаччи', orders:5},
  {name:'Шеф шопа', orders:10}
];
const clubGifts = [
  {id:'sauce', cost:60}, {id:'lemonade', cost:100}, {id:'fries', cost:120},
  {id:'onions', cost:150}, {id:'cheese', cost:240}, {id:'pastrami', cost:320}
].map(gift => ({...gift, name:dishes.find(dish => dish.id === gift.id).name}));
const pointForms = new Intl.PluralRules('ru');
const numberFormat = new Intl.NumberFormat('ru');
const noticeDate = new Intl.DateTimeFormat('ru', {day:'numeric', month:'long', year:'numeric', timeZone:'Europe/Moscow'});
let inMemoryEvents = [];
let storageAvailable = true;
let pendingGift = null;

function quantityLabel(n, one, few, many) {
  const word = {one, few}[pointForms.select(n)] || many;
  return numberFormat.format(n) + ' ' + word;
}
const pointsText = n => quantityLabel(n, 'балл', 'балла', 'баллов');
const ordersText = n => quantityLabel(n, 'демо-заказ', 'демо-заказа', 'демо-заказов');
function loadClubEvents() {
  if (!storageAvailable) return inMemoryEvents;
  try {
    const raw = localStorage.getItem(clubKey);
    if (!raw) return [];
    const records = JSON.parse(raw);
    if (!Array.isArray(records)) return [];
    return records.filter(event => event && typeof event.id === 'string' && /^[\w-]+$/.test(event.id)
      && Number.isFinite(event.at) && !isNaN(new Date(event.at).valueOf())
      && (event.type === 'joined' || event.type === 'order' || (event.type === 'gift' && clubGifts.some(g => g.id === event.gift))));
  } catch { return inMemoryEvents; }
}
function clubStats(events) {
  const orders = events.filter(event => event.type === 'order');
  const gifts = events.filter(event => event.type === 'gift');
  const spent = gifts.reduce((sum, event) => sum + clubGifts.find(gift => gift.id === event.gift).cost, 0);
  const balance = startingPoints + orders.length * pointsPerOrder - spent;
  const level = clubLevels.filter(tier => orders.length >= tier.orders).length - 1;
  return {orders, gifts, balance, level};
}
async function changeClub(edit) {
  const save = () => {
    const events = loadClubEvents();
    if (!edit(events)) return false;
    inMemoryEvents = events;
    if (storageAvailable) {
      try { localStorage.setItem(clubKey, JSON.stringify(events)); }
      catch { storageAvailable = false; }
    }
    refreshClub(events);
    return true;
  };
  // Serialise balance checks and writes when two tabs redeem at the same time.
  let lockAcquired = false;
  try {
    if (navigator.locks) return await navigator.locks.request(clubKey, () => {
      lockAcquired = true;
      return save();
    });
  } catch (error) {
    if (lockAcquired || error.name !== 'SecurityError') throw error;
  }
  return save();
}
function addClubEvent(event) {
  return changeClub(events => {
    if (events.some(item => item.id === event.id)) return false;
    events.push({...event, at:Date.now()});
    return true;
  });
}
function recordClubOrder(order) {
  if (!order || !order.number || !lastOrderItems(order).length) return;
  const legacyId = 'previous-' + String(order.number).replace(/\W/g,'') + '-' + String(order.day || '').replace(/\W/g,'');
  return addClubEvent({id:'order-' + (order.clubId || legacyId), type:'order', mode:order.mode});
}
function achievements(stats) {
  return [
    {title:'Первый заказ', description:'Оформить один демо-заказ.', icon:'sandwich', done:stats.orders.length > 0},
    {title:'Свои у стойки', description:'Выбрать самовывоз и оформить демо-заказ.', icon:'bag', done:stats.orders.some(order => order.mode === 'pickup')},
    {title:'Первый подарок', description:'Обменять демо-баллы на блюдо из меню.', icon:'gift', done:stats.gifts.length > 0}
  ];
}
function updateClubCover(events, stats) {
  $('#cover-balance').textContent = numberFormat.format(stats.balance);
  $('.bonus-chip').setAttribute('aria-label', 'Клуб НАХЛЕБНИКОВ, демо-баланс ' + pointsText(stats.balance));
  const unread = events.filter(event => !event.read).length;
  $('#unread-dot').hidden = !unread;
  $('.bell-button').setAttribute('aria-label', unread ? 'Уведомления, непрочитанных ' + unread : 'Уведомления');
}
function levelCard(tier, index, stats) {
  const active = index === stats.level;
  const locked = index > stats.level;
  const status = active ? 'Текущий уровень' : locked ? 'Закрытый уровень' : 'Пройденный уровень';
  const detail = active
    ? `<div class="card-points">${icon('gift')} ${pointsText(stats.balance)}</div>`
    : `<div class="level-condition">${icon(locked ? 'lock' : 'check')}${locked ? 'Для открытия — ' : 'Открыт за '}${ordersText(tier.orders)}</div>`;
  return `<article class="level-card ${active ? 'current' : ''}" aria-label="${tier.name}, ${status}">
    <p class="level-status"><span>Демо</span>${status}</p><h3>${tier.name}</h3>
    <div class="level-mascot" aria-hidden="true"></div>${detail}</article>`;
}
function updateLevelControls() {
  const rail = $('#level-rail');
  if (!rail) return;
  $('#level-prev').disabled = rail.scrollLeft < 2;
  $('#level-next').disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
}
function drawClub(stats, preservePosition = false) {
  const oldLeft = preservePosition ? $('#level-rail')?.scrollLeft : undefined;
  const next = clubLevels[stats.level + 1];
  const completed = achievements(stats).filter(item => item.done).length;
  const progress = next
    ? `<h3>До уровня «${next.name}»</h3><p>Осталось оформить ${ordersText(next.orders - stats.orders.length)}.</p>
       <progress value="${stats.orders.length}" max="${next.orders}" aria-label="Прогресс до следующего демо-уровня"></progress>`
    : '<h3>Все уровни открыты</h3><p>Ты достиг высшего демо-уровня клуба.</p>';
  body.innerHTML = `<div class="level-rail" id="level-rail" tabindex="0" aria-label="Демо-уровни клуба">${clubLevels.map((tier, i) => levelCard(tier,i,stats)).join('')}</div>
    <div class="level-tools"><span>Уровни клуба · демо</span><div><button id="level-prev" data-level-step="-1" aria-label="Предыдущий уровень">${icon('back')}</button>
    <button id="level-next" data-level-step="1" aria-label="Следующий уровень">${icon('chevron')}</button></div></div>
    <section class="club-progress">${progress}<small>На старте ${pointsText(startingPoints)}. Каждый демо-заказ приносит ещё ${pointsText(pointsPerOrder)}.</small></section>
    <div class="club-links"><button data-club="achievements"><i>${icon('trophy')}</i><strong>Достижения</strong><small>Открыто ${completed} из 3</small></button>
    <button data-club="gifts"><i>${icon('gift')}</i><strong>Обменять бонусы</strong><small>Подарки из меню</small></button></div>`;
  const rail = $('#level-rail');
  if (oldLeft != null) rail.scrollLeft = oldLeft;
  else rail.scrollLeft = rail.children[stats.level].offsetLeft - rail.firstElementChild.offsetLeft;
  rail.addEventListener('scroll', updateLevelControls, {passive:true});
  updateLevelControls();
}
function drawAchievements(stats) {
  body.innerHTML = `<p class="club-caption">Достижения демо-клуба</p><div class="achievement-list">${achievements(stats).map(item =>
    `<article class="achievement ${item.done ? 'achieved' : ''}"><i>${icon(item.icon)}</i><div><h3>${item.title}</h3><p>${item.description}</p><small>${item.done ? 'Получено' : 'Пока закрыто'}</small></div></article>`
  ).join('')}</div>`;
}
function drawGifts(stats) {
  const confirmation = pendingGift;
  if (confirmation) {
    const gift = confirmation.gift;
    const missing = gift.cost - stats.balance;
    body.innerHTML = `<article class="exchange-card"><img src="${assets[gift.id]}" alt="${gift.name}"><p class="club-caption">Демо-обмен</p><h3>${gift.name}</h3>
      <p>Баланс — <b>${pointsText(stats.balance)}</b>. Стоимость — <b>${pointsText(gift.cost)}</b>.</p>
      <p>${missing > 0 ? 'Для обмена нужно ещё ' + pointsText(missing) + '.' : 'После обмена останется ' + pointsText(stats.balance - gift.cost) + '.'}</p>
      <button class="primary full" data-club="redeem" ${missing > 0 ? 'disabled' : ''}>Списать ${pointsText(gift.cost)}</button>
      <button class="exchange-cancel" data-club="gifts">Отмена</button></article>`;
    return;
  }
  body.innerHTML = `<div class="gifts-balance"><span>Демо-баланс</span><strong>${icon('gift')}${pointsText(stats.balance)}</strong></div>
    <p class="club-note">Демо-обмен сохраняется на этом устройстве.</p>
    <div class="gifts-grid">${clubGifts.map(gift => {
      const shortage = gift.cost - stats.balance;
      return `<article class="gift-card"><img src="${assets[gift.id]}" alt="" loading="lazy"><div><h3>${gift.name}</h3>
        <strong>${pointsText(gift.cost)}</strong><button data-gift="${gift.id}" ${shortage > 0 ? 'disabled' : ''}>${shortage > 0 ? 'Ещё ' + pointsText(shortage) : 'Обменять'}</button></div></article>`;
    }).join('')}</div>`;
}
function noticeText(event) {
  if (event.type === 'joined') return ['Добро пожаловать в клуб', 'Стартовый демо-баланс — ' + pointsText(startingPoints) + '. Подарки уже можно посмотреть в клубе.'];
  if (event.type === 'order') return ['Баллы за демо-заказ', 'К демо-балансу добавлено ' + pointsText(pointsPerOrder) + '. Заказ учтён в прогрессе уровня.'];
  const gift = clubGifts.find(item => item.id === event.gift);
  return ['Демо-обмен завершён', gift.name + ' — списано ' + pointsText(gift.cost) + '.'];
}
function drawNotifications(events) {
  if (!events.length) {
    body.innerHTML = `<div class="empty-notices">${icon('bell')}<p>Пока нет уведомлений</p></div>`;
    return;
  }
  body.innerHTML = `<div class="notices">${[...events].reverse().map(event => {
    const [title, copy] = noticeText(event);
    const date = new Date(event.at);
    return `<button class="notice" data-notice="${event.id}" aria-pressed="${Boolean(event.read)}">
      <span class="notice-title">${title}</span><span>${copy}</span><time datetime="${date.toISOString()}">${noticeDate.format(date)}</time>
      ${event.read ? '' : '<i class="notice-dot"><span class="sr">Непрочитано</span></i>'}</button>`;
  }).join('')}</div>`;
}
function refreshClub(events = loadClubEvents()) {
  const stats = clubStats(events);
  updateClubCover(events, stats);
  if (!panel.open) return;
  if (screen === 'club') drawClub(stats, true);
  if (screen === 'club-achievements') drawAchievements(stats);
  if (screen === 'club-gifts' || screen === 'club-exchange') drawGifts(stats);
  if (screen === 'club-notifications') drawNotifications(events);
}
function showClubView(view) {
  const titles = {club:'Клуб НАХЛЕБНИКОВ', achievements:'Достижения', gifts:'Обменять бонусы', notifications:'Уведомления', exchange:'Подтвердить обмен'};
  if (view !== 'exchange') pendingGift = null;
  openPanel(titles[view], view === 'club' ? 'club' : 'club-' + view);
  if (view === 'club') {
    drawClub(clubStats(loadClubEvents()));
    addClubEvent({id:'welcome', type:'joined'});
  } else refreshClub();
  $('.club-back').focus({preventScroll:true});
}
async function redeemGift(button) {
  if (!pendingGift || button.disabled) return;
  const request = pendingGift;
  button.disabled = true;
  const success = await changeClub(events => {
    if (events.some(event => event.id === request.id) || clubStats(events).balance < request.gift.cost) return false;
    events.push({id:request.id, at:Date.now(), type:'gift', gift:request.gift.id});
    return true;
  });
  if (screen !== 'club-exchange' || pendingGift !== request) return;
  showClubView('gifts');
  const result = document.createElement('p');
  result.className = 'exchange-result';
  result.setAttribute('role','status');
  result.textContent = success ? 'Демо-обмен сохранён. ' + request.gift.name + ' — списано ' + pointsText(request.gift.cost) + '.' : 'Баланс обновился. Проверь стоимость подарка.';
  body.prepend(result);
}
document.addEventListener('click', async event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.levelStep) {
    const rail = $('#level-rail');
    const interval = rail.children[1].offsetLeft - rail.children[0].offsetLeft;
    rail.scrollBy({left:Number(button.dataset.levelStep) * interval, behavior:motion()});
    return;
  }
  const gift = clubGifts.find(item => item.id === button.dataset.gift);
  if (gift) {
    if (clubStats(loadClubEvents()).balance < gift.cost) { refreshClub(); return; }
    pendingGift = {id:'gift-' + newLocalId(), gift};
    showClubView('exchange');
    return;
  }
  if (button.dataset.notice) {
    await changeClub(events => {
      const notice = events.find(item => item.id === button.dataset.notice);
      if (!notice || notice.read) return false;
      notice.read = true;
      return true;
    });
    if (screen === 'club-notifications') body.querySelector('[data-notice="' + button.dataset.notice + '"]')?.focus({preventScroll:true});
    return;
  }
  const view = button.dataset.club;
  if (!view) return;
  if (view === 'back') {
    if (screen === 'club-exchange') showClubView('gifts');
    else if (screen === 'club-gifts' || screen === 'club-achievements') showClubView('club');
    else panel.close();
  } else if (view === 'redeem') await redeemGift(button);
  else showClubView(view);
});
window.addEventListener('storage', event => {
  if (event.key === clubKey || event.key === null) {
    inMemoryEvents = [];
    refreshClub();
  }
});
window.addEventListener('resize', updateLevelControls);
window.addEventListener('shop-order-saved', event => recordClubOrder(event.detail));
refreshClub();
recordClubOrder(read(lastOrderKey));
