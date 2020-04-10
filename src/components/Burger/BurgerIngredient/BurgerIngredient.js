import React, {Component} from 'react';
import styles from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render() {
        let ingredient;

        switch (this.props.type) {
            case 'bread-bottom':
                ingredient = <div className={styles.breadBottom}/>;
                break;
            case 'bread-top':
                ingredient = (
                    <div className={styles.breadTop}>
                        <div className={styles.seeds1}/>
                        <div className={styles.seeds2}/>
                    </div>
                );
                break;
            case 'bacon':
                ingredient = <div className={styles.bacon}/>;
                break;
            case 'cheese':
                ingredient = <div className={styles.cheese}/>;
                break;
            case 'meat':
                ingredient = <div className={styles.meat}/>;
                break;
            case 'salad':
                ingredient = <div className={styles.salad}/>;
                break;
            default:
                ingredient = null;
                break;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;
