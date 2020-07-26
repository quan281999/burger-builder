import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios-orders';
import classes from './ContactData.module.css';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {updateObject, checkValidity} from "../../shared/utility";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    numeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                valid: true
            },
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementID in this.state.orderForm) {
            formData[formElementID] = this.state.orderForm[formElementID].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputID) => {
        const updatedFormElement  = updateObject(this.state.orderForm[inputID], {
            value: event.target.value,
            touched: true
        });
        if (updatedFormElement.validation) {
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        }
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputID]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputID in updatedOrderForm) {
            if (updatedOrderForm[inputID].valid) {
                formIsValid = true;
            } else {
                formIsValid = false;
                break;
            }
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const inputsArr = [];
        for (let key in this.state.orderForm) {
            inputsArr.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        const inputsEl = inputsArr.map(input => {
            return (
            <Input 
                elementType={input.config.elementType} 
                elementConfig={input.config.elementConfig} 
                value={input.config.value}
                key={input.id}
                invalid={!input.config.valid}
                shouldValidate={input.config.validation}
                touched={input.config.touched}
                changed={(event) => this.inputChangedHandler(event, input.id)}></Input>
            );
        })
        let form = (
            <form onSubmit={this.orderHandler}>
                {inputsEl}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner></Spinner>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.tokenId,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));