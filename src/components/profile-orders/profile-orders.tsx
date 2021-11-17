import React, {SyntheticEvent, useEffect} from 'react';
import profileOrdersStyle from "./profile-orders.module.css";
import {FeedItem} from "../feed-item/feed-item";
import Modal from "../modal/modal";
import {FeedDetails} from "../feed-details/feed-details";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types";
import {orderWsConnectionClosed, orderWsConnectionStart} from "../../services/actions/orders";
import {wsUrl} from "../../utils/constants";
import {getCookie} from "../../utils/funcs";

export const ProfileOrders = () => {
  const {orders, wsConnected} = useSelector((state: RootState) => state.orderData);
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const [orderId, setOrderId] = React.useState<string | null>(null)
  const handleOpenModal = (e: SyntheticEvent) => {
    setOrderId(e.currentTarget.id);
    setModalIsOpen(true);
  }
  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

  useEffect(() => {
    const token = getCookie('token')?.replace('Bearer ', '');
    dispatch(orderWsConnectionStart(`${wsUrl}?token=${token}`));
    return () => {
      dispatch(orderWsConnectionClosed());
    }
  }, [dispatch]);

  return (
    <>
      <div className={`${profileOrdersStyle.profile__orders} mt-8 custom-scroll`}>
        {wsConnected && orders.length === 0 && (<h1>У вас нет заказов.</h1>)}
        {wsConnected && orders.map((item, index) => <FeedItem data={item} openModal={handleOpenModal} key={index} />)}
      </div>
      {modalIsOpen && (
        <Modal onClose={handleCloseModal}>
          <FeedDetails orderId={orderId}/>
        </Modal>)
      }
    </>

  )
}