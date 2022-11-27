import axios from "axios";
import { NotificationSuccess, NotificationError } from '../components/Notification';
import { toast } from 'react-toastify';

//uploads to ipfs 
export function uploadDataToIpfs(inputData) {
    const data = JSON.stringify({
        "pinataOptions": {
          "cidVersion": 1
        },
        "pinataContent": {
            "toc": inputData.toc,
            "introduction": inputData.introduction,
            "challengeDescription": inputData.challengeDescription,
            "content": inputData.content
        }
      });
    const config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer `+ process.env.REACT_APP_STORAGE_API_JWT
    },
    data : data
    };

//    try {
//         const added = await axios(config);
//         console.log(added);
//         return `https://ipfs.io/ipfs/${added.data.IpfsHash}`;   
//    } catch (e) {
//         toast(<NotificationError text={e.message}/>)
//    }  

        return new Promise((resolve, reject) => {
            axios(config).then((res)=> resolve(`https://ipfs.io/ipfs/${res.data.IpfsHash}`))
                         .catch((e)=> reject({Message : e.message}))
        });
}



// get the data from IPFS
export const fetchDataFromIpfs = async (ipfsUrl) => {
    try {
        if (!ipfsUrl) return null;
        const data = await axios.get(ipfsUrl);
        return data;
    } catch (e) {
        toast(<NotificationError text={e.Message}/>)

    }
};

