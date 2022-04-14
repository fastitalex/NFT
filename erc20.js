
// Step2:偵測是否有安裝metamask, 如果有就設定web3的provider (metamaks提供的provider是window.ethereum)
var w3;
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    w3 = new Web3(window.ethereum);
  }


// 你的token合約地址
web_token_addr = "0x343dd156f0ad1089afe21eb81da2a70449a02923" 

// Step3: token的ABI
const simplified_abi =  [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "tokenName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenSymbol",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_tokenOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "_balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "_name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "_symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowence",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approval",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "target",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "mintedAmount",
                "type": "uint256"
            }
        ],
        "name": "mintToken",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "swapToken",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

 
const loginButton = document.querySelector('.login');
const burnButton = document.querySelector('.btnBurn');
const mintButton = document.querySelector('.btnMint');
const swapButton = document.querySelector('.btnSwap');

// 設定login的功能
loginButton.addEventListener('click', () => {
  getAccount();
  getContractInfo();
});

// 設定btnBurn的功能
burnButton.addEventListener('click', () => {
    burnToken();
   
  });

  // 設定login的功能
  mintButton.addEventListener('click', () => {
    mintToken();
  });

  // 設定swap的功能
  swapButton.addEventListener('click', () => {
    swap();
  });

var currentAcc;
// login的功能，讀取帳戶內的資訊
async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  currentAcc = accounts[0];
  loginButton.innerHTML = currentAcc;
}

// 呼叫合約裡的函式，該函式只讀取合約資訊，不寫入合約內容, 無需gas fee
function getContractInfo(){
  
  // 產生該合約的實體
  my_contract = new w3.eth.Contract(simplified_abi, web_token_addr);

  // 執行合約的 totalSupply() 函式
  my_contract.methods.totalSupply().call(function(error, result) {
    if (error) {
        console.log(error);
    } else {
        document.getElementById("totalsupply").innerHTML = result / 1e8 ;
    }});

  my_contract.methods.symbol().call(function(error, result) {
    if (error) {
         console.log(error);
      } else {
         document.getElementById("tokenname").innerHTML = result ;
      }});

  my_contract.methods.owner().call(function(error, result) {
      if (error) {
          console.log(error);
      } else {
          console.log(loginButton.value);
          if(result.toLowerCase() == loginButton.value.toLowerCase()){
               document.getElementById("identification").innerHTML = "你的身份是： Owner" ;
               burnButton.disabled = false;
               mintButton.disabled = false;
               swapButton.disabled = true;
           }else{
             document.getElementById("identification").innerHTML = "你的身份是： Guest" ;
               burnButton.disabled = true;
               mintButton.disabled = true;
               swapButton.disabled = false;
        }
    }});
}


// 呼叫合約裡的函式，該函式會寫入合約內容，需要gas fee
function burnToken() {

    my_contract = new w3.eth.Contract(simplified_abi, web_token_addr);
   
    var burnAmount = document.getElementById("burnAmount").value;
    const userAddress = loginButton.innerHTML;
    console.log(userAddress);


    var txnObject = {
          from: userAddress
        };
    my_contract.methods.burn(burnAmount).send(txnObject, function(error, result) {
      if (error) {
         console.log(error);
      } else {
         // if successful, do something 
      }});  
    
  }


function mintToken() {
    weth_contract = new w3.eth.Contract(simplified_abi, web_token_addr);
    var mintAmount = document.getElementById("mintAmount").value;
    const userAddress = loginButton.innerHTML;
    var txnObject = {
      from: userAddress, 
    };
    weth_contract.methods.mintToken(userAddress, mintAmount)
    .send(txnObject, function(error, result) {
      if (error) {
          console.log(error);
      } else {
          console.log("mint:", result);
      }}); 
  
  }



function swap(){
    ethAmount = document.getElementById("swapAmount").value * 10**18; 
    weth_contract = new w3.eth.Contract(simplified_abi, web_token_addr);
    
    const userAddress = loginButton.innerHTML;
    var txnObject = {
      from: userAddress, 
      value: ethAmount
    };
    weth_contract.methods.swapToken()
    .send(txnObject, function(error, result) {
      if (error) {
          console.log(error);
      } else {
          console.log("swap:", result);
      }}); 
}



// 切換帳戶時，會觸發 accountsChanged 的事件
window.ethereum.on('accountsChanged', (accounts) => {
    console.log('account changed');
    if (!accounts.length) {
        loginButton.innerHTML = "連接metamask";
      //  getAccount();
    }else{
        loginButton.innerHTML = accounts[0];

        my_contract = new w3.eth.Contract(simplified_abi, web_token_addr);
        my_contract.methods.owner().call(function(error, result) {
            if (error) {
                console.log(error);
            } else {       
                if(result.toLowerCase() == accounts[0].toLowerCase()){
                    document.getElementById("identification").innerHTML = "你的身份是： Owner" ;
                    burnButton.disabled = false;
                    mintButton.disabled = false;
                    swapButton.disabled = true;
                }else{
                    document.getElementById("identification").innerHTML = "你的身份是： Guest" ;
                    burnButton.disabled = true;
                    mintButton.disabled = true;
                    swapButton.disabled = false;
                }
                
            }
        });
    }
});

