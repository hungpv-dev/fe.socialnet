import React, { useEffect, useState } from 'react';
import styles from '@/components/css/PopupComponent.module.scss';

export const PopupDeleteMessage = ({ onClose, onDeleteForMe, onDeleteForAll, me }) => {
    const [deleteOption, setDeleteOption] = useState('forMe');

    const checkOption = () => {
        if (me) {
            setDeleteOption('forMe');
        } else {
            setDeleteOption('forAll');
        }
    };

    useEffect(() => {
        checkOption();
    }, [me]);
    const handleDelete = () => {
        if (deleteOption === 'forAll') {
            onDeleteForMe();
        } else {
            onDeleteForAll();
        }
    };
    
    const handleOverlayClick = (e) => {
        if (e.target.className === styles.overlay) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.popup}>
                <header className={styles.header}>
                    <h4>Thu hồi tin nhắn này ở phía ai?</h4>
                    <button onClick={onClose} className={styles.closeButton}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </header>
                <div className={styles.content}>
                    <div className={styles.radioGroup}>
                        {me && (
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    value="forMe"
                                    checked={deleteOption === 'forMe'}
                                    onChange={() => setDeleteOption('forMe')}
                                    className={styles.radioInput}
                                />
                                <span className={styles.radioText}>Thu hồi với mọi người</span>
                            </label>
                        )}
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="forAll"
                                checked={deleteOption === 'forAll'}
                                onChange={() => setDeleteOption('forAll')}
                                className={styles.radioInput}
                            />
                            <span className={styles.radioText}>Thu hồi với bạn</span>
                        </label>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button onClick={onClose} className={styles.cancelButton}>Hủy</button>
                    <button onClick={handleDelete} className={styles.deleteButton}>Gỡ</button>
                </div>
            </div>
        </div>
    );
};