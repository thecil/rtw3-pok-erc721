import React from "react";
import { Modal } from "react-bootstrap";
import styles from "./MintSuccessModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const closeIcon = <FontAwesomeIcon icon={faTimesCircle} />;

export interface MintSuccessModalProps
  extends React.ComponentPropsWithRef<typeof Modal> {
  transactionUrl: string;
}

export const MintSuccessModal: React.FC<MintSuccessModalProps> = ({
  transactionUrl,
  ...props
}) => {
  const { onHide } = props || {};

  return (
    <Modal {...props} centered>
      <Modal.Body className={styles.modal}>
        <div className="d-flex justify-content-end">
          <span className={styles.closeSpan} onClick={() => onHide && onHide()}>
            {closeIcon}
          </span>
        </div>
        <div className={styles.wrapper}>
          <video autoPlay loop muted className={styles.goldTicket}>
            <source src="/video/au_video.mp4" />
          </video>

          <h1 className={styles.title}>MINT SUCCESSFUL</h1>
          <p>WELCOME ALCHEMY CHALLENGES!</p>
          {transactionUrl && (
            <>
              <p>Etherscan transaction link:</p>
              <a
                href={transactionUrl}
                target="_blank"
                className={styles.link}
                rel="noreferrer"
              >
                {transactionUrl}
              </a>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};
