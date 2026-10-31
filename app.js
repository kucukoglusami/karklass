const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  menu.setAttribute('aria-label', expanded ? 'Menüyü kapat' : 'Menüyü aç');
  navigation.classList.toggle('open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Menüyü aç');
  navigation.classList.remove('open');
}));
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  document.querySelectorAll('.car-card').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
  });
}));
const pickup = document.querySelector('#pickup');
const dropoff = document.querySelector('#return');
const localDate = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const today = new Date();
const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate()+1);
pickup.min = localDate(today); pickup.value = localDate(today);
dropoff.min = pickup.value; dropoff.value = localDate(tomorrow);
pickup.addEventListener('change', () => {
  dropoff.min = pickup.value;
  if (dropoff.value < pickup.value) dropoff.value = pickup.value;
});
document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!pickup.value || !dropoff.value || pickup.value < pickup.min || dropoff.value < pickup.value) return;
  const format = value => value.split('-').reverse().join('.');
  const message = `Merhaba KarKlass Rent a Car, Karaman Merkez için ${format(pickup.value)} – ${format(dropoff.value)} tarihleri arasında araç kiralamak istiyorum. Müsait araçlar ve fiyatlar hakkında bilgi alabilir miyim?`;
  window.open(`https://wa.me/905306087068?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
document.querySelector('#year').textContent = today.getFullYear();

// Include the selected travel dates in model-specific quote requests.
function refreshCarLinks() {
 document.querySelectorAll('[data-car]').forEach(link => {
 const valid = pickup.value && dropoff.value && pickup.value >= pickup.min && dropoff.value >= pickup.value;
 const dates = valid ? ' ' + pickup.value.split('-').reverse().join('.') + ' – ' + dropoff.value.split('-').reverse().join('.') + ' tarihleri için' : '';
 link.href = 'https://wa.me/905306087068?text=' + encodeURIComponent('Merhaba KarKlass Rent a Car,' + dates + ' ' + link.dataset.car + ' kiralamak istiyorum. Müsaitlik ve fiyat bilgisi alabilir miyim?');
 });
}
pickup.addEventListener('change', refreshCarLinks);
dropoff.addEventListener('change', refreshCarLinks);
refreshCarLinks();
