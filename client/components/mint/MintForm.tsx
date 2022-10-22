import { toast } from "react-toastify";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { ethers } from "ethers";

export interface MintFormProps {
  // eslint-disable-next-line no-unused-vars
  onMintSucess: (transactionUrl: string) => void;
}

export const MintForm: React.FC<MintFormProps> = ({
  onMintSucess
}) => {
  return (
    <div>
        <h1>I'm Minting Form</h1>
    </div>
  );
};
