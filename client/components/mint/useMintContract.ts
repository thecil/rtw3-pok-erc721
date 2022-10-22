import { useEffect, useMemo, useState } from "react";
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite
} from "wagmi";
import { useContractInfo } from "../../hooks/useContractInfo";

export const useMintContract = () => {
    const tokenUri = "https://ipfs.filebase.io/ipfs/QmaTWMaqQ8XuvYynZW7DmLL8NcLXPa5ywQdavSgU6gNoY3"
    // contract state
    const { address, isConnected } = useAccount();
    const contractInterface = useContractInfo();

    // wagmi prepareContractWrite config for 'whitelistMint'
    const { config } = usePrepareContractWrite({
        ...contractInterface,
        functionName: "safeMint",
        args: [address, tokenUri],
        overrides: {
            from: address,
            gasLimit: "300000"
        }
    });

    const safeMint = useContractWrite({
        ...config
    });

    // show total minted
    useEffect(() => {

    }, []);

    return {
        safeMint,
    };
};