import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    // here we get something like {meat: 2} and we want to transform it into an array with 2x <BurgerIngredient type="meat"/>
    // we need to use .flatMap, otherwise we would get an array of arrays like [[<BurgerIngredient type="meat"/>, <BurgerIngredient type="meat"/>]]
    // also don't forget to include unique key attribute!
    let ingredients = Object.keys(props.ingredients)
        .flatMap(ingredient => [...Array(props.ingredients[ingredient])]
            .map((_, index) => <BurgerIngredient key={ingredient + index} type={ingredient}/>));

    if (!ingredients.length) {
        ingredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles.burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default Burger;
