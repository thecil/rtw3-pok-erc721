import { toast } from "react-toastify";
import React, { useState } from "react";
import { Form, Row, Col, Image } from "react-bootstrap";
import { ButtonPrimary } from "../button/ButtonPrimary";
import { useMintContract } from "./useMintContract";
import Link from "next/link";
import { Modal } from "../modal/Modal";

export interface MintFormProps {
  // eslint-disable-next-line no-unused-vars
  onMintSucess: (transactionUrl: string) => void;
}

export const MintForm: React.FC<MintFormProps> = ({ onMintSucess }) => {
  const { safeMint } = useMintContract();
  const [mintingInProgress, setMintingInProgress] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onMintClicked = async (e: any) => {
    e.preventDefault();
    setMintingInProgress(true);
    if (!safeMint.writeAsync) {
      toast.error("Minting not ready");
      setMintingInProgress(false);
      return;
    }

    try {
      const pending = safeMint.writeAsync();
      toast.promise(pending, {
        pending: "Sending mint transaction",
        success: "Mint transaction sent!",
        error: "Error sending mint transaction",
      });

      let status;
      let hash: string;

      const confirmation = (await pending).wait(2);
      toast.promise(confirmation, {
        pending: "Waiting for 2 confirmations",
        success: "Confirmed!",
        // eslint-disable-next-line key-spacing
        error: "Mint transaction error",
      });
      setShowModal(true);
      const trans = await confirmation;
      console.log("confirmed trans:", { trans });
      status = trans.status;
      hash = trans.transactionHash;

      if (status && typeof onMintSucess === "function") {
        const url = `https://goerli.etherscan.io/tx/${hash}`;
        onMintSucess(url);
      } else {
        toast.error("Mint transaction failed");
      }
    } catch (error) {
      console.log("mintForm::", { error });
      toast.error("Error while minting");
    }
    setMintingInProgress(false);
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <Modal
          text={"Minting Modal"}
          close={() => setShowModal(false)}
          className="bg-neutral-800"
          bg={"black"}
        >
          <div className="w-max m-2 mx-auto">
            <h2 className="text-center text-white">
              Your NFT is beeing minted!
            </h2>
            <p className="text-center text-white">Please wait...</p>
          </div>
          <div className="w-max h-max overflow-hidden mx-auto">
            <video autoPlay loop muted className="w-96 h-96 rounded">
              <source src="/video/au_video.mp4" />
            </video>
          </div>
        </Modal>
      )}
      <Form onSubmit={onMintClicked}>
        <div className="mb-4">
          <h1 className="text-xl">Click the button below to mint your NFT</h1>
        </div>
        <Row className="pt-3">
          <Col>
            <div className="flex flex-col space-y-4 justify-center">
              <Image
                className="w-80 h-80 self-center"
                src="/img/alchemyNFT.png"
                alt="Alchemy NFT"
              />
              <ButtonPrimary
                type="submit"
                text={mintingInProgress ? "Minting..." : "Mint"}
                disabled={mintingInProgress ? true : false}
              />
            </div>
          </Col>
          <Col className="mt-3">
            <h3>Read more about this project:</h3>
            <Link href="https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy#modify-and-deploy-your-erc721-contract-with-remix-ide">
              <a target="_blank" className="text-blue-400 text-sm">
                How to Develop an NFT Smart Contract (ERC721) with Alchemy
              </a>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
