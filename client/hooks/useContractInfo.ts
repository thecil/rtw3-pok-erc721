import abi from "../data/mintInfo/ABI.json";

export interface ContractInterface {
    addressOrName: string;
    contractInterface: any;
    chainId: number;
}

export const useContractInfo = (): ContractInterface => {   
    return {
        addressOrName    : '0x5F4145478C910E7a3A3e39FfAD39fcc38c89cf18',
        contractInterface: abi,
        chainId          : 5
      };
};

