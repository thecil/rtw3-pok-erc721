import React, { useEffect, useMemo, useState } from "react";
import { useContractInfo } from "../../hooks/useContractInfo";
import { useAccount } from "wagmi";
import LayoutMint from "../layout/LayoutMint";
import MintContainer from "../container/MintContainer";
import { MintSuccessModal } from "./MintSuccessModal";
import { MintForm } from "./MintForm";
import Spinner from "react-bootstrap/Spinner";

const MintUiStages = {
  error: -1,
  loading: 0,
  connect: 1,
  mint: 2,
};

const MintController: React.FC = () => {
  const [stage, setStage] = useState(MintUiStages.loading);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mintTransUrl, setMintTransUrl] = useState("");
  const { isConnected } = useAccount();

  const onMintSucess = (url: string) => {
    setShowSuccessModal(true);
    setMintTransUrl(url);
  };

  useEffect(() => {
    if (!isConnected) setStage(MintUiStages.connect);
    if (isConnected) {
      setStage(MintUiStages.mint);
    }
  }, [ isConnected ]);

  const content = useMemo(() => {
    switch (stage) {
      case MintUiStages.loading:
        return <Spinner animation="border" variant="light" />;

      case MintUiStages.error:
        <div>Error</div>;
        break;

      case MintUiStages.connect:
        return (
          <div className="py-36">
            <h1>Please Connect a Wallet first</h1>
          </div>
        );

      case MintUiStages.mint:
        return <MintForm onMintSucess={onMintSucess} />;

      default:
        <div />;
    }
  }, [stage]);

  return (
    <LayoutMint
      title="Alchemy - ERC721 Mint"
      description="Alchemy - ERC721 Mint"
    >
      <MintContainer>
        {content}
        <MintSuccessModal
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
          transactionUrl={mintTransUrl}
        />
      </MintContainer>
    </LayoutMint>
  );
};

export default MintController;
