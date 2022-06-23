import environment from './config';
import {fetchDataFromIpfs} from './Ipfs'

const aelfEnv = environment("tdvw");
const defaultPrivateKey = aelfEnv.defaultPrivateKey;
const endpoint = aelfEnv.nodeUrl;

const aelfAcademyContractName = 'AElf.ContractNames.AelfAcademyContract';
const appName = 'Aelf Academy';


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
        reject({        
            error: 200001,
            message: 'timeout / can not find NightElf / please install the extension'
        });
    }, 3000);
  
});


  export function login() {     
      return new Promise((resolve, reject) => {
        try{
          let aelf;
          getNightaelfInstance.then(
            (res) =>{
              aelf = res;
                aelf.chain.getChainStatus((error, result) => {
                  if(result.error!==0){
                    reject({Message: 'Error connecting to chain.'});
                  }
                  const chainId =  result.result.ChainId;
                  if (!chainId) {            
                    reject({Message: 'Error connecting to chain.'});
                  }
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
                    const wallet = JSON.parse(result.detail);
                    if (!wallet) {
                      reject({Message: 'Click Login to connect wallet to Aelf Academy'})
                    }                
                    aelf.chain.contractAt(
                      aelfEnv.contractAddress,
                      wallet,
                      (error, result) => {
                        window.Contract = result;
                        resolve(wallet.address);
                      }
                    );
                  });
              })          
            },
            (err) => {
                reject({Message: "Please install Aelf Extension and try again" });
            })   
        } catch(e){
            reject(e);
        }
      })      
    } 
  

  export function loginOriginal() {
    getNightaelfInstance.then(
      result => {
          const aelf = result;
          aelf.chain.getChainStatus((error, result) => {
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
            const wallet = JSON.parse(result.detail);
            if (!wallet) {
              alert('Click Login to connect wallet to Aelf Academy');
              return;
            }
        
            aelf.chain.contractAt(
              aelfEnv.contractAddress,
              wallet,
              (error, result) => {
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

 
//the above should be tied to getting chain status


/**
 * Registers a learner on the dApp
 * @param {string} username - learner's username 
 * @returns {Promise} a resolved promise containing the status of the transaction and the logs
 * or a rejected promise containing the error message
 * 
 */
export async function addLearner(username){
  if (!window.Contract) {
    return Promise.reject('Login to Aelf First');
  }
  try{
    return new  Promise((resolve, reject) => {
      window.Contract.AddLearner({
        value: username
      }, (error, result) => {
        if(result.error!==0) {
          const message = result.errorMessage.message;
            return reject({
              Message: message}
            );
        } else {
          try {
             const txId = result.result.TransactionId;
            // return resolve(getResult(txId));
            getResult(txId).then(
              (res) => { return resolve(res)},
              (err) => {return reject(err)}
            )
          } catch(e){
              reject(e)
          }
        }
      });
    })
  } catch(e){
      return e
  }
}

/**
 * Adds a new course
 * @param {submissionReward: number, moderationReard: number, level: number, contentUrl: string, courseTitle: string} courseInput 
 * @returns {Promise} a resolved promise containing the status of the transaction and the logs
 * or a rejected promise containing the error message
 * @type {(courseInput: {submissionReward: number, moderationReward: number, level: number, contentUrl: string, courseTitle: string})}
 */
export async function addCourse(courseInput){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  try{
    return new  Promise((resolve, reject) => {
      window.Contract.AddCourse(courseInput, 
        (error, result) => {
        if(result.error!==0) {
          const message = result.errorMessage.message;
            return reject({
              Message: message}
            );
        } else {
          try {
            const txId = result.result.TransactionId;
            resolve(getResult(txId));
          } catch(e){
              reject(e)
          }
        }
      });
    })
  } catch(e){
      return e
  }
}

/**
 * Adds a chief moderator
 * @param {{address: String, username: string}} addUserInput 
 * @returns {Promise} a resolved promise containing the status of the transaction and the logs
 * or a rejected promise containing the error message
 * @type {(addUserInput: {address: String, username: string} => Promise)}
 */
export async function addChiefModerator(addUserInput){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  try{
    return new  Promise((resolve, reject) => {
      window.Contract.AddChiefModerator(addUserInput, 
        (error, result) => {
        if(result.error!==0) {
          const message = result.errorMessage.message;
            return reject({
              Message: message}
            );
        } else {
          try {
            const txId = result.result.TransactionId;
            resolve(getResult(txId));
          } catch(e){
              reject(e)
          }
        }
      });
    })
  } catch(e){
      return e
  }
}

/**
 * Adds an admin
 * @param {{address: String, username: string}} addUserInput 
 * @returns {Promise} a resolved promise containing the status of the transaction and the logs
 * or a rejected promise containing the error message
 * @type {(addUserInput: {address: String, username: string} => Promise)}
 */
export async function addAdmin(addUserInput){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  try{
    return new  Promise((resolve, reject) => {
      window.Contract.AddAdmin(addUserInput, 
        (error, result) => {
        if(result.error!==0) {
          const message = result.errorMessage.message;
            return reject({
              Message: message}
            );
        } else {
          try {
            const txId = result.result.TransactionId;
            resolve(getResult(txId));
          } catch(e){
              reject(e)
          }
        }
      });
    })
  } catch(e){
      return e
  }
}

/**
 * Submits response to a quest
 * @param {{courseId: number, submissionUrl: string}} submitChallengeInput  
 * @returns {Promise} a resolved promise containing the status of the transaction and the logs
 * or a rejected promise containing the error message
 * @type {(submitChallengeInput: {courseId: number, submissionUrl: string} => Promise)}
 */
 export async function submitChallenge(submitChallengeInput){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  try{
    return new  Promise((resolve, reject) => {
      window.Contract.SubmitChallenge(submitChallengeInput, 
        (error, result) => {
        if(result.error!==0) {
          const message = result.errorMessage.message;
            return reject({
              Message: message}
            );
        } else {
          try {
            const txId = result.result.TransactionId;
            resolve(getResult(txId));
          } catch(e){
              reject(e)
          }
        }
      });
    })
  } catch(e){
      return e
  }
}

/**
 * Moderate  a learner's submission to a quest
 * @param {{courseId: number, learnerId : number, isApproved : bool}} moderateChallengeInput  
 * @returns {Promise} a resolved promise containing the status of the transaction and the logs
 * or a rejected promise containing the error message
 * @type {(moderateChallengeInput: {courseId: number, learnerId : number, isApproved : bool} => Promise)}
 */
 export async function moderateChallenge(moderateChallengeInput){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  try{
    return new  Promise((resolve, reject) => {
      window.Contract.ModerateChallenge(moderateChallengeInput, 
        (error, result) => {
        if(result.error!==0) {
          const message = result.errorMessage.message;
            return reject({
              Message: message}
            );
        } else {
          try {
            const txId = result.result.TransactionId;
            resolve(getResult(txId));
          } catch(e){
              reject(e)
          }
        }
      });
    })
  } catch(e){
      return e
  }
}

/**
 * Handles donation of fund to the academy
 * @param {number} amount - amount of elf being donated
 * @returns {Promise} a resolved Promise object containint the status of the transaction and the logs of the transaction
 * or a rejected promise containing the error message
 * 
 */
 export async function FundAcademy(amount){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  try{
    return new  Promise((resolve, reject) => {
      window.Contract.FundAcademy({
        value: amount
      }, (error, result) => {
        if(result.error!==0) {
          const message = result.errorMessage.message;
            return reject({
              Message: message}
            );
        } else {
          try {
            const txId = result.result.TransactionId;
            resolve(getResult(txId));
          } catch(e){
              reject(e)
          }
        }
      });
    })
  } catch(e){
      return e
  }
}





export async function getResult(txId){ 
    try{
      const aelf = await getNightaelfInstance;
      setTimeout(() => {
        return new Promise((resolve, reject) => {
          aelf.chain.getTxResult(txId, (err, result) => {
            if(result.error!==0){
              const message = result.errorMessage.message;
                return reject({
                  Message: message}
                );
            }
            if(result.result.Status==='NOTEXISTED' && result.result.Transaction === null){
              return reject("Action failed!");            
            } 
            else {
              const {Status, Logs} =  result.result
              return resolve({Status, Logs});
            }
          });
        })
      }, 1000);

    } catch(e) {
      alert(e);
    }
}

export function getAcademyInfo() {
  if (!window.Contract) {
    alert('Login with Aelf Extension');
    return;
  }
  return new Promise((resolve, reject) => {
      window.Contract.GetAcademyInfo.call('',
        (error, result) => {
            if(result.error===0){
              const response = result.result;
              var academyInfo = {
                owner: response.owner,
                balance: response.balance,
                admins: response.admins.users,
                chiefModerators: response.chiefModerators.users
              }
              resolve(academyInfo);
            }
            else{
              const {Code, Message} = result.errorMessage.message;
              reject({
                Code, Message}
              );
            }
        }
      )
  })
}


export function getLearners() {
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  return new Promise((resolve, reject) =>{
    window.Contract.GetLearners.call((err, result) => {
      if(result.error === 0){
        resolve(result.result.users);
      }
      else {
        const {Code, Message} = result.errorMessage.message;
        reject({
          Code, Message}
        );
      }
    });
  })
 
};

export function getUserInfo(address){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  return new Promise((resolve, reject) =>{
    window.Contract.GetUserInfo.call(
      address,
      (err, result) => {
      if(result.error === 0){
        resolve(result.result);
      }
      else {
        const {message} = result.errorMessage;
        reject({
          message}
        );
      }
    });
  })
}

export function getCourse(courseId){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  return new Promise((resolve, reject) =>{
    window.Contract.GetCourse.call(
      {value: courseId},
      (err, result) => {
      if(result.error === 0){
        resolve(result.result);
      }
      else {
        const {Code, Message} = result.errorMessage.message;
        reject({
          Code, Message}
        );
      }
    });
  })
}


export function getAllCourses(){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  return new Promise((resolve, reject) =>{
    window.Contract.GetCourses.call(
      (err, result) => {
      if(result.error === 0){
       const courses = result.result.courseList;
       console.log(courses);
       const courseList = [];   
       courses.forEach(course => {
          if(course.courseId==='1'){
            //correct error I committed during testing, TODO remember to remove after deploying a new contract
            course.contenturl = 'https://ipfs.io/ipfs/QmWeN3ttqoXJCPttynVBpZa3QE1e5TR9wuFqjPH6K99cSU';
          }
          fetchDataFromIpfs(course.contenturl).then(
            (res)=> {              
              const finalCourseObj= {
                courseId : course.courseId,
                submissionReward: course.submissionReward,
                moderationReward: course.moderationReward,
                level: course.level,
                introduction: res.data.introduction,
                toc: res.data.toc,
                challengeDescription: res.data.challengeDescription,
                content: res.data.challengeDescription,
                courseTitle: course.courseTitle ,
              }  
              if(course.courseId ==='3'){
                finalCourseObj.introduction = 'This course aims to help you setup your local system for smartcontract development on Aelf blockchain protocol.';
              }            
              courseList.push(finalCourseObj);
            }
          )

       });
       resolve(courseList);
      }
      
      else {
        const {Code, Message} = result.errorMessage.message;
        reject({
          Code, Message}
        );
      }
    });
  })
}


export function getCourseSubmission(courseId){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  return new Promise((resolve, reject) =>{
    window.Contract.GetCourseSubmission.call(
      {value: courseId},
      (err, result) => {
      if(result.error === 0){
        resolve(result.result);
      }
      else {
        const {Code, Message} = result.errorMessage.message;
        reject({
          Code, Message}
        );
      }
    });
  })
}

export function getLearnerSubmission(learnerAddress){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  return new Promise((resolve, reject) =>{
    window.Contract.GetLearnerSubmission.call(
      learnerAddress,
      (err, result) => {
      if(result.error === 0){
        resolve(result.result);
      }
      else {
        const {Code, Message} = result.errorMessage.message;
        reject({
          Code, Message}
        );
      }
    });
  })
}

export function getFundingHistory(){
  if (!window.Contract) {
    alert('not yet initialized');
    return;
  }
  return new Promise((resolve, reject) =>{
    window.Contract.GetFundingHistory.call(
      (err, result) => {
      if(result.error === 0){
        resolve(result.result);
      }
      else {
        const {Code, Message} = result.errorMessage.message;
        reject({
          Code, Message}
        );
      }
    });
  })
}



