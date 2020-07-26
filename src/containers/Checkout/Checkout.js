import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
// import * as actions from '../../store/actions/index';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let checkoutSummary = <Redirect to='/'></Redirect>;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ?  <Redirect to='/'></Redirect> : null;
            checkoutSummary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinueHandler}></CheckoutSummary>
                    <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}></Route> 
                </div>
                
            );
        }
        return checkoutSummary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);