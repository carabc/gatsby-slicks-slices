import calculatePizzaPrice from "./calculatePizzaPrice";
import formatMoney from "./formatMoney";

export default function calculateOrderTotal(order, pizzas) {

    // 1. loop over every single item in the pizzas
    return order.reduce((acc, singleOrder) => {
        const pizza = pizzas.find(singlePizza => singlePizza.id === singleOrder.id);
        
        // 2. calc the total for that pizza
        // 3. add that total to the running total
        return acc + calculatePizzaPrice(pizza.price, singleOrder.size);
    }, 0);

    


}