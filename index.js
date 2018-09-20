// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  meals(){
    let meals = this.deliveries().map(delivery => delivery.meal());
    let uniqueMeal = [...new Set(meals)];
    return uniqueMeal;
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  // version 1
  //   meals(){
  //     let newArray = [];
  //     for (const delivery of this.deliveries()) {
  //       newArray.push(delivery.meal());
  //     }
  //     return newArray;
  //   }
  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

  // version 1
  // totalSpent(){
  //   let total = 0;
  //   for (const meal of this.meals()){
  //     total += meal.price
  //   }
  //   return total;
  // }

  totalSpent(){
    return this.meals().reduce((total, meal) => total + meal.price, 0);
  }
}

class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

// version 1
//   customers(){
//     let newArray = [];
//     for (const delivery of this.deliveries()){
//       newArray.push(delivery.customer());
//     }
//     return newArray;
//   }
  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }

  static byPrice(){
    return store.meals.sort( function(obj1, obj2) {
      return obj2.price - obj1.price;
    })
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer(){
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}
