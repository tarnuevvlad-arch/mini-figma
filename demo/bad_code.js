// Демо-файл для мини-рефакторинга: содержит типичные проблемы.
// Проверка: node --check demo/bad_code.js
// Токен ниже — ФЕЙКОВЫЙ (придуман для демонстрации, ничего не открывает).

const API_TOKEN = "sk-demo-1234567890abcdef1234567890abcdef"

// Правила доставки: лёгкие заказы дешевле, тяжёлые — дороже.
const DELIVERY_LIGHT = 200
const DELIVERY_HEAVY = 400
const HEAVY_FROM_KG = 5 // стандартный порог «тяжёлый заказ»
const VIP_HEAVY_FROM_KG = 4 // у VIP-копии порог был ниже — сохранено осознанно
const VIP_DISCOUNT = 0.95 // итоговая ставка для VIP

const orders = [
  { id: 1, price: 1500, weight: 2 },
  { id: 2, price: 780, weight: 7 },
  { id: 3, price: 990, weight: 4 },
  { id: 4, price: 2400, weight: 12 },
]

// Единый расчёт итоговой цены: базовая цена + доставка (+ VIP-скидка).
// vip=false — обычный клиент, vip=true — та же логика, но по VIP-правилам.
function calculateOrderTotal(order, vip = false) {
  let total = order.price
  const heavyFrom = vip ? VIP_HEAVY_FROM_KG : HEAVY_FROM_KG
  total += order.weight > heavyFrom ? DELIVERY_HEAVY : DELIVERY_LIGHT
  if (vip) total *= VIP_DISCOUNT
  return total
}

orders.forEach((order) => {
  console.log(
    "#" + order.id,
    "стандарт:", calculateOrderTotal(order),
    "VIP:", calculateOrderTotal(order, true),
    "токен:", API_TOKEN,
  )
})
