import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, saveShippingAddress } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';


function CartScreen(props) {
    const productID = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]): 1;
    const cart = useSelector((state) => state.cart);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
      if (productID) {
        dispatch(addToCart(productID, qty));
      }
    }, [dispatch, productID, qty]);
    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id));
      };
    
      const checkoutHandler = () => {
        if(userInfo){
          var object = JSON.parse(localStorage.getItem('userInfo'));
          const shippingObject = {'fullName':object.name, 'address': object.address, 'city':object.city,'phone':object.phone,'country':object.country};
          dispatch (saveShippingAddress(shippingObject));
          props.history.push('/shipping');
        }else {
          props.history.push('/signin?redirect=cart');
          
        }
      };
    return (

        <div className="row top">
           
        <h1 className="col-0 row center">Shopping cart</h1>
           
      <div className="col-2">
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select className="min-1"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>NPR {item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : NPR:
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    );
}

export default CartScreen;