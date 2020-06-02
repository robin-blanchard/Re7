import React from "react";

import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

function ImageModal(props) {
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        <Image src={props.photo ? props.photo : "https://icons-for-free.com/iconfiles/png/512/bakery+svglinecolor+recipe+book-1319964872908984700.png"} style={{ width: "100%" }} />
      </Modal.Body>
    </Modal>
  );
}

export default ImageModal;
