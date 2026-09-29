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

// Единый расчёт итоговой цены: базовая цена + доставка (+ VIP-скидка).
// vip=false — обычный клиент, vip=true — та же логика, но по VIP-правилам.
function calculateOrderTotal(order, vip = false) {
  let total = order.price
  const heavyFrom = vip ? 4 : 5
  total += order.weight > heavyFrom ? 400 : 200
  if (vip) total *= 0.95
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
