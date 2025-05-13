import classes from './Modal.module.scss';
import { useEffect } from 'react';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => unknown;
  heading: string;
}
export default function Modal({ children, onClose, heading }: ModalProps) {

  console.log("Modal was clicked");
  const onBackgroundClick = () => {
    console.log('Clicked background');
    onClose();
  };

  const onContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    console.log('clicked content');
  };

  useEffect(() => {
    const escapeKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', escapeKeyPress);
    return () => document.removeEventListener('keydown', escapeKeyPress);
  }, []);

  return (
    <div className={classes.modalbackground} onClick={onBackgroundClick}>
      <div className={classes.modalcontent} onClick={onContentClick}>
        <div className={classes.modalheading}>
          <h2>{heading}</h2>{' '}
          <button
            style={{ padding: 0, backgroundColor: 'transparent' }}
            onClick={() => onClose()}
          >
            X
          </button>
        </div>
        <div className={classes.modal_content_inner}>{children}</div>
      </div>
    </div>
  );
}