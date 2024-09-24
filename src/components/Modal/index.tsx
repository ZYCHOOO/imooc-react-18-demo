/*
 * @Date: 2024-09-24 15:18:59
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-24 22:20:52
 * @FilePath: /react-learn/huanlegou/src/components/Modal/index.tsx
 */
import { useState, forwardRef, useImperativeHandle } from 'react';
import './style.scss';

export type ModalRefType = {
  showModal: (message: string) => void
}

const Modal = forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  useImperativeHandle(ref, () => {
    return {
      showModal(message: string) {
        setModalVisible(true);
        setMessage(message);
        setTimeout(() => {
          setModalVisible(false);
        }, 1500);
      }
    }
  }, [])

  return modalVisible ? (
    <div className="modal">
      <div className="modal-text">{ message }</div>
    </div>
  ) : null;
})

export default Modal;