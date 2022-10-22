import React, { useEffect, useMemo, useState } from "react";
import { useContractInfo } from "../../hooks/useContractInfo";

import { useAccount, useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import LayoutMint from "../layout/LayoutMint";
import MintContainer from "../container/MintContainer";
import { MintConnectBtn } from "./MintConnectBtn";
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
  const { address, isConnected } = useAccount();
  const contractInterface = useContractInfo();

  const onMintSucess = (url: string) => {
    setShowSuccessModal(true);
    setMintTransUrl(url);
  };

  const { data: totalSupply, refetch: fetchTotalSupply } = useContractRead({
    ...contractInterface,
    functionName: "totalSupply",
    cacheTime: Infinity,
    enabled: false,
  });

  useEffect(() => {
    if (!isConnected) setStage(MintUiStages.connect);
    if (isConnected) {
      fetchTotalSupply();
      setStage(MintUiStages.mint);
    }
  }, [isConnected, fetchTotalSupply]);

  const content = useMemo(() => {
    switch (stage) {
      case MintUiStages.loading:
        return <h2>Loading</h2>;

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
