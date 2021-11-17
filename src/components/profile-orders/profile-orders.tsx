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
  const handleOpenModal = (e: SyntheticEvent) => {
    setModalIsOpen(true);
  }
  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

  useEffect(() => {
    const token = getCookie('token')?.replace('Bearer ', '');
    console.log(token)
    dispatch(orderWsConnectionStart(`${wsUrl}?token=${token}`));
    return () => {
      dispatch(orderWsConnectionClosed());
    }
  }, [dispatch]);

  console.log(orders);
  return (
    <>
      <div className={`${profileOrdersStyle.profile__orders} mt-8 custom-scroll`}>

      </div>
      {modalIsOpen && (
        <Modal onClose={handleCloseModal}>
          <FeedDetails/>
        </Modal>)
      }
    </>

  )
}