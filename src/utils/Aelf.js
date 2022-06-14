import environment from './config';

const aelfEnv = environment("tdvw");
const defaultPrivateKey = aelfEnv.defaultPrivateKey;
const endpoint = aelfEnv.nodeUrl;

const aelfAcademyContractName = 'AElf.ContractNames.AelfAcademyContract';
const appName = 'Aelf Academy';

const getNightaelfInstance =  new Promise((resolve, reject) => {
      getNightly().then(
        (result) => {
          const aelf = new window.NightElf.AElf({
            // Enter your test address in this location
            httpProvider: [
              endpoint
            ],
            appName
          });      
          resolve(aelf);
        }
      )
    setTimeout(() => {
        reject(  
          {        
            error: 200001,
            message: 'timeout / can not find NightElf / please install the extension'
        });
    }, 1000);
  
});



// connectChain -> Login -> initContract -> call contract methods
// getNightaelfInstance.then(
//   result => {
//       const aelf = result;
//       //perform action
//   },
//   error => {
//     alert(error.message);
//   }
//   );



  export function getChainStatus() {
    getNightaelfInstance.then(
      result => {
          const aelf = result;
          //perform action
          aelf.chain.getChainStatus((error, result) => {
            console.log('>>>>>>>>>>>>> getChainStatus >>>>>>>>>>>>>');
            console.log(error, result);
            return result.ChainId;
        });
      },
      error => {
        alert(error.message);
      });
}

  export function Login() {
    getNightaelfInstance.then(
      result => {
          const aelf = result;
          //perform action
          aelf.chain.getChainStatus((error, result) => {
            console.log('>>>>>>>>>>>>> getChainStatus >>>>>>>>>>>>>');
            console.log(error, result);
          const chainId =  result.result.ChainId;
          if (!chainId) {
            alert('Error connecting to chain.');
            return;
          }
          console.log('login....');
          aelf.login({
            appName,
            chainId: chainId,
            payload: {
              method: 'LOGIN',
              contracts: [{
                chainId: chainId,
                contractAddress: aelfEnv.contractAddress,
                contractName: aelfEnv.contractName,
                description: 'AelfAcademy smartcontract',
                github: ''
              }]
            }
          }, (err, result) => {
            console.log('>>>>>>> login >>>>>>>>>>>>', err, result);
            const wallet = JSON.parse(result.detail);
            return wallet;
          });
        });
      },
      error => {
        alert(error.message);
      });
     };


  export function InitializeContract1() {
    getNightaelfInstance.then(
      result => {
          const aelf = result;
          //perform action
          aelf.chain.getChainStatus((error, result) => {
            // console.log('>>>>>>>>>>>>> getChainStatus >>>>>>>>>>>>>');
            // console.log(error, result);
          const chainId =  result.result.ChainId;
          if (!chainId) {
            alert('Error connecting to chain.');
            return;
          }
          // console.log('login....');
          aelf.login({
            appName,
            chainId: chainId,
            payload: {
              method: 'LOGIN',
              contracts: [{
                chainId: chainId,
                contractAddress: aelfEnv.contractAddress,
                contractName: aelfEnv.contractName,
                description: 'AelfAcademy smartcontract',
                github: ''
              }]
            }
          }, (err, result) => {
            // console.log('>>>>>>> login >>>>>>>>>>>>', err, result);
            const wallet = JSON.parse(result.detail);
            // console.log(wallet);
            if (!wallet) {
              alert('Click Login to connect wallet to Aelf Academy');
              return;
            }
        
            aelf.chain.contractAt(
              aelfEnv.contractAddress,
              wallet,
              (error, result) => {
                // console.log('>>>>>>>>>>>>> contractAtAsync >>>>>>>>>>>>>');
                // console.log(error, result);
                window.Contract = result;
                // console.log(result);
              }
            );
          });
        });
      },
      error => {
        alert(error.message);
      });
     };

  export function InitializeTokenContract() {
    getNightaelfInstance.then(
      result => {
          const aelf = result;
          //perform action
          aelf.chain.getChainStatus((error, result) => {
            console.log('>>>>>>>>>>>>> getChainStatus >>>>>>>>>>>>>');
            console.log(error, result);
          const chainId =  result.result.ChainId;
          if (!chainId) {
            alert('Error connecting to chain.');
            return;
          }
          console.log('login....');
          aelf.login({
            appName,
            chainId: chainId,
            payload: {
              method: 'LOGIN',
              contracts: [{
                chainId: chainId,
                contractAddress: aelfEnv.contractAddress,
                contractName: aelfEnv.contractName,
                description: 'AelfAcademy smartcontract',
                github: ''
              }]
            }
          }, (err, result) => {
            console.log('>>>>>>> login >>>>>>>>>>>>', err, result);
            const wallet = JSON.parse(result.detail);
            if (!wallet) {
              alert('Click Login to connect wallet to Aelf Academy');
              return;
            }
        
            aelf.chain.contractAtAsync(
              aelfEnv.contractAddress,
              wallet,
              (error, result) => {
                console.log('>>>>>>>>>>>>> contractAtAsync >>>>>>>>>>>>>');
                console.log(error, result);
                window.Contract = result;
              }
            );
          });
        });
      },
      error => {
        alert(error.message);
      });
     };

  // export function InitializeContract(){
    
  //   const wallet = Login();
  //   if (!wallet) {
  //     alert('Click Login to connect wallet to Aelf Academy');
  //     return;
  //   }

  //   aelf.chain.contractAt(
  //     helloWorldAddress,
  //     wallet,
  //     (error, result) => {
  //       console.log('>>>>>>>>>>>>> contractAtAsync >>>>>>>>>>>>>');
  //       console.log(error, result);
  //       window.helloWorldC = result;
  //     }
  //   );
  // };

  export function PerformACall() {
    if (!window.Contract) {
      alert('not yet initialized');
      return;
    }
    window.Contract.GetAcademyInfo.call((err, result) => {
      console.log(err, result);
      alert(result.Value);
    });
  };

//the above should be tied to getting chain status


 function getNightly() {
    if(window.NightElf){
      return  Promise.resolve(window.NightElf);
    }
    if (window.document.readyState === "complete"){
      return  Promise.reject("no aelf extension");
    } else {
      const extensionPromise = new Promise(
        resolve => {
          window.addEventListener(
            "load",
            // "readystatechange",
            function handleWindowStateChange(){
              resolve(window.NightElf);
            }
          )
        }
      );
      return (extensionPromise);
    }
    
}








