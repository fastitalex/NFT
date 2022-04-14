/* Moralis init code */
const serverUrl = "https://p8ufse8ptlmc.usemoralis.com:2053/server";
const appId = "1CSY6cJPR3JYDoeSsWKPfcR39BZBXGQqvPRPp8iR";
Moralis.start({ serverUrl, appId });

imgR = "https://img.onl/SJedc8";
imgSR = "https://img.onl/YLzAnk";
imgSSR = "https://img.onl/KPQpU5";
imgSSRPLUS = "https://img.onl/bRSpc";
imgArr = ["", imgSSRPLUS, imgSSR, imgSR, imgR];
nft_contr_addr = "0xdd01d2d2b2a3b2a2d39e5e7ee6e6e6a3bf6e1471";

const mintButton = document.getElementById('btn-nft'); 
const loginButton = document.getElementById("btn-login");
const logoutButton = document.getElementById("btn-logout");

loginButton.onclick = login;
logoutButton.onclick = logOut;
mintButton.onclick = mintNft;

mintButton.disabled = true;



/* TODO: Add Moralis Authentication code */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
      })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
          document.getElementById("btn-login").innerHTML = user.get('ethAddress');
          getNFT();
        
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  
  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
    var img = document.getElementById("tokenid");
    img.style.display = "none";
    loginButton.innerHTML = "metamask login";
    document.getElementById("welcome").style.display = "none";
  }
 
  

  async function getNFT(){
    let user = Moralis.User.current();
    if(user){
      const options = { chain: "rinkeby", address: user.get("ethAddress"), token_address: nft_contr_addr };
      const myNFTs = await Moralis.Web3API.account.getNFTsForContract(options)
      .then(function(myNFTs) {
        console.log("myNFTs:", myNFTs.result[0].token_id);
        var tokenID = myNFTs.result[0].token_id
        var img = document.getElementById("tokenid");
        img.setAttribute("src", imgArr[tokenID]);
        img.style.display = "inline";
        mintButton.disabled = true
        document.getElementById("welcome").style.display = "inline";

      })
      .catch(function(err){
        console.log(err); 
        mintButton.disabled = false;
      });
    }
  }

  async function mintNft() {
    console.log("mintNFT");
    const ABI = [{
			"inputs": [],
			"name": "mintForMember",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		}];

    const options = {
      chain: "rinkeby",
      contractAddress: nft_contr_addr,
      functionName: "mintForMember",
      abi: ABI,
      msgValue: Moralis.Units.ETH("0.1"),
    };

    let user = Moralis.User.current();
    if (user) {
      const transaction  = await Moralis.executeFunction(options);
      console.log(transaction.hash);     
      await transaction.wait(5);
      
      getNFT();

    }
    
    
  }
 
  async function showTotal(){
   
    const ABI = [{
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
		}]; // Add ABI of 0xd52B38Ee9978B074399d448B8935970BB701BcEf

    const options = {
      chain: "rinkeby",
      address: "0xe5F0a3e310E3357ea30790BB74a3C712859B4229",
      function_name: "balanceOf",
      abi: ABI,
      params: { account: "0x640bf5DfcE6F2Cb085E0234F21514FaE02452BA6" },
    };
    const balanceOf = await Moralis.Web3API.native.runContractFunction(options)
    .then(function(balanceOf){
      document.getElementById("total").innerHTML = balanceOf / 10**18;
    })
    .catch(function(error){
      console.log(error);
    });

  }

  async function burnToken(){
   
    const ABI = [{
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
		}]; // Add ABI of 0xe5F0a3e310E3357ea30790BB74a3C712859B4229


    //var burnVol = bigInt("1e10");

    const options = {
      chain: "rinkeby",
      contractAddress: "0xe5F0a3e310E3357ea30790BB74a3C712859B4229",
      functionName: "burn",
      abi: ABI,
      params: { _value: 10**10 },
    };

    let user = Moralis.User.current();
    if (user) {
      const transaction  = await Moralis.executeFunction(options)
      .then(function(transaction){
        document.getElementById("burn").innerHTML = transaction.hash ;
      })
      .catch(function(error){
        console.log(error);
      });
    }
   
  }

