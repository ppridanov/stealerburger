import React, {SyntheticEvent} from 'react';
import feedStyles from './feed.module.css';
import Modal from "../../components/modal/modal";
import {FeedDetails} from "../../components/feed-details/feed-details";
import {FeedItem} from "../../components/feed-item/feed-item";


export const Feed = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const handleOpenModal = (e: SyntheticEvent) => {
    setModalIsOpen(true);
  }
  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

  return (
    <>
      <div className={`container pl-5 pr-5`}>
        <div className={`main__container`}>
          <div className={feedStyles.feeds__container}>
            <h1 className="text text_type_main-large mt-10 text_colo">Лента заказов</h1>
            <div className={`${feedStyles.feeds} mt-5`}>
              <FeedItem openModal={handleOpenModal} />
            </div>
          </div>
          <div className={`${feedStyles.feed__info}`}>
            <div className={feedStyles.feed__board}>
              <ul className={feedStyles.feed__completed}>
                <li className={`text text_type_main-default mb-6`}>Готовы:</li>
                <li className={`text text_type_digits-default text_color_success mb-2`}>034533</li>
                <li className={`text text_type_digits-default text_color_success mb-2`}>034533</li>
                <li className={`text text_type_digits-default text_color_success mb-2`}>034533</li>
                <li className={`text text_type_digits-default text_color_success mb-2`}>034533</li>
                <li className={`text text_type_digits-default text_color_success mb-2`}>034533</li>
              </ul>
              <ul className={feedStyles.feed__inProgress}>
                <li className={`text text_type_main-default mb-6`}>В работе:</li>
                <li className={`text text_type_digits-default mb-2`}>034538</li>
                <li className={`text text_type_digits-default mb-2`}>034538</li>
                <li className={`text text_type_digits-default mb-2`}>034538</li>
              </ul>
            </div>
            <div className="feed__allCount mt-15">
              <p className={`text text_type_main-default`}>Выполнено за все время:</p>
              <p className={`text text_type_digits-large text_color_primary ${feedStyles.feed__mainTitle}`}>28 752</p>
            </div>
            <div className="feed__todayCount mt-15">
              <p className={`text text_type_main-default`}>Выполнено за сегодня:</p>
              <p className={`text text_type_digits-large  text_color_primary ${feedStyles.feed__mainTitle}`}>138</p>
            </div>
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <Modal onClose={handleCloseModal}>
          <FeedDetails />
        </Modal>)
      }
    </>
  )
}