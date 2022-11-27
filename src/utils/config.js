const DEFAULT_PRIV_KEY = process.env.REACT_APP_DEFAULT_PRIV_KEY;
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const DEFAULT_ADDRESS = process.env.REACT_APP_CONTRACT_OWNER_ADDRESS;

function environment(env) {
    switch (env) {
      case "tdvw":
        return {
          networkId: "tdvw",
          nodeUrl: "https://tdvw-test-node.aelf.io",
          contractAddress: CONTRACT_ADDRESS,
          explorerUrl: "https://explorer.aelf.io/",
          defaultPrivateKey: DEFAULT_PRIV_KEY,
          contractName: "Aelf Academy",
          defaultAddress: DEFAULT_ADDRESS,
          tokenContractName: 'AElf.ContractNames.Token',
          address: {
            prefix: 'ELF',
            suffix: 'AELF'
          },
          tokenSymbol: 'ELF',
          chainId: "tDVW"
        };
        case "local":
            return {
                networkId: "local",
                nodeUrl: "http://127.0.0.1:1235",
                contractAddress: '2WHXRoLRjbUTDQsuqR5CntygVfnDb125qdJkudev4kVNbLhTdG',
                explorerUrl: "https://explorer.aelf.io/",
                defaultPrivateKey: DEFAULT_PRIV_KEY,
                defaultAddress: DEFAULT_ADDRESS,
                contractName: "Aelf Academy",
                tokenContractName: 'AElf.ContractNames.Token',
                address: {
                  prefix: 'ELF',
                  suffix: 'AELF'
                },
                tokenSymbol: 'ELF',
              };
      
      default:
        throw Error(`Unknown environment '${env}'.`);
    }
  }
  
  export default environment;