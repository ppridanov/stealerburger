import React, {SyntheticEvent} from 'react';
import profileStyles from "../../pages/profile/profile.module.css";
import profileOrdersStyle from "./profile-orders.module.css";
import {ProfileMenu} from "../profile-menu/profile-menu";
import {FeedItem} from "../feed-item/feed-item";
import Modal from "../modal/modal";
import {FeedDetails} from "../feed-details/feed-details";
import {useHistory} from "react-router-dom";

export const ProfileOrders = () => {
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const handleOpenModal = (e: SyntheticEvent) => {
    // e.preventDefault();
    // history.replace(`/profile/orders/${e.currentTarget.getAttribute('id')}`);
    setModalIsOpen(true);
  }
  const handleCloseModal = () => {
    setModalIsOpen(false);
  }
  return (
    <>
      <div className={`${profileOrdersStyle.profile__orders} mt-8 custom-scroll`}>
        <FeedItem openModal={handleOpenModal}/>
        <FeedItem openModal={handleOpenModal}/>
        <FeedItem openModal={handleOpenModal}/>
        <FeedItem openModal={handleOpenModal}/>
        <FeedItem openModal={handleOpenModal}/>
      </div>
      {modalIsOpen && (
        <Modal onClose={handleCloseModal}>
          <FeedDetails/>
        </Modal>)
      }
    </>

  )
}