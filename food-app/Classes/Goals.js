import { Payment } from "./Payment";

class Goals {
    constructor (payment=new Payment(), avoid=avoidOptions, less=lessOfOptions, more=moreOfOptions) {
        this.payment = payment;
        this.avoid = avoid;
        this.less = less;
        this.more = more;
    }
}

const lessOfOptions = {'Sodium/Salt': false, 'Saturated Fat': false, 'Added Sugars': false, 'Animal Meats': false}
const moreOfOptions = {'Fruits': false, 'Vegetables': false, 'Fish': false, 'Whole Grains': false, 'Plant Proteins': false}
const avoidOptions = {'Wheat': false, 'Cow\'s Milk': false, 'Eggs': false, 'Fish': false, 'Shrimp': false, 'Lobster': false, 'Crab': false, 'Corn': false, 'Soy': false, 'Beef': false, 'Pork': false, 'Chicken': false, 'Peanuts': false, 'Other Nuts': false, 'Animal Products': false}

export { Goals, lessOfOptions, moreOfOptions, avoidOptions };