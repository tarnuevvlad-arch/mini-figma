// Демо-файл для мини-рефакторинга: содержит типичные проблемы.
// Проверка: node --check demo/bad_code.js
// Токен ниже — ФЕЙКОВЫЙ (придуман для демонстрации, ничего не открывает).

const API_TOKEN = "sk-demo-1234567890abcdef1234567890abcdef"

const orders = [
  { id: 1, price: 1500, weight: 2 },
  { id: 2, price: 780, weight: 7 },
  { id: 3, price: 990, weight: 4 },
  { id: 4, price: 2400, weight: 12 },
]

// Первая копия расчёта: для обычных клиентов
function totalPriceStandard(order) {
  let total = order.price
  if (order.weight > 5) {
    total = total + 400
  } else {
    total = total + 200
  }
  return total
}

// Вторая копия: «для VIP», скопирована и чуть-чуть дописана.
// Порог веса тут 4, а в копии выше — 5. Классический разнос копипасты.
function totalPriceVip(order) {
  let total = order.price
  if (order.weight >= 4) {
    total = total + 400
  } else {
    total = total + 200
  }
  total = total * 0.95
  return total
}

// Мёртвый код: осталась от старой версии отчётов. Никто её не вызывает.
function buildOldReportLine(order) {
  const line = order.id + ") " + order.price + " руб., " + order.weight + " кг"
  return line
}

orders.forEach((order) => {
  console.log(
    "#" + order.id,
    "стандарт:", totalPriceStandard(order),
    "VIP:", totalPriceVip(order),
    "токен:", API_TOKEN,
  )
})
