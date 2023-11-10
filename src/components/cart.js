import React, { Component } from "react";
import formatCurrency from "../util";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  enableCheckout = () => {
    this.setState({ showCheckout: true });
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };

    this.props.createOrder(order);
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} items in cart{" "}
          </div>
        )}
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={cartItems.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count} {"  "}
                    <button onClick={() => this.props.removeFromCart(item)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {cartItems.length > 0 && (
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button className="button primary" onClick={this.enableCheckout}>
                Proceed
              </button>
            </div>
          )}

          {this.state.showCheckout && (
            <div className="cart">
              <form onSubmit={this.createOrder}>
                <ul className="form-container">
                  <li>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      require
                      onChange={this.handleInput}
                    />
                  </li>
                  <li>
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      require
                      onChange={this.handleInput}
                    />
                  </li>
                  <li>
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      require
                      onChange={this.handleInput}
                    />
                  </li>
                  <li>
                    <button className="button primary" type="submit">
                      Checkout
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
