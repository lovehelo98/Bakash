import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, deliverOrder, paidOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET, ORDER_PAID_RESET
} from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const payOrder = useSelector((state) => state.orderPaid);
  const {
    loading: loadingPaid,
    error: errorPaid,
    success: successPaid,
  } = payOrder;

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !order ||
     successPaid ||
      successDeliver ||
      (order && order._id !== orderId)
    ){ dispatch({type: ORDER_PAID_RESET}); 
    dispatch({ type: ORDER_DELIVER_RESET});
    dispatch(detailsOrder(orderId));
  } else {
    if (!order.isPaid) {
      
    }}
   
  
  
  }, [dispatch, order, orderId,  successPaid, successDeliver,]);

    const deliverHandler = () => {
      dispatch(deliverOrder(order._id));
    };
    const paidHandler = () => {
      dispatch(paidOrder(order._id));
    };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.phone},
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
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
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x NPR {item.price} = NPR {item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>NPR {order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>NPR {order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>NPR {order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>NPR {order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              
                {!order.Paid && (
                  <li>
                <div className="row center">
                    <strong>Please Pay the Amount On</strong>
                </div>
                <div className="row">
                <div>
                    <strong>{order.paymentMethod} ID:</strong>
                  </div>
                  <div>
                    <strong>9845963682</strong>
                  </div>
                </div>
              </li>
                )}
                 {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Order delivered
                  </button>
                </li>
              )}
               {userInfo.isAdmin && !order.isPaid && (
                <li>
                  {loadingPaid && <LoadingBox></LoadingBox>}
                  {errorPaid && (
                    <MessageBox variant="danger">{errorPaid}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={paidHandler}
                  >
                    Order Paid
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}