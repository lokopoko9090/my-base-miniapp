const connectBtn = document.getElementById("connectBtn");
const walletAddress = document.getElementById("walletAddress");

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask not found. Please install it first.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    walletAddress.textContent = "✅ Connected: " + address;
    connectBtn.textContent = "Connected";

    const baseChain = {
      chainId: "0x2105",
      chainName: "Base Mainnet",
      nativeCurrency: { name: "Base Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://mainnet.base.org"],
      blockExplorerUrls: ["https://basescan.org"],
    };

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: baseChain.chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [baseChain],
        });
      }
    }
  } catch (err) {
    console.error(err);
    alert("Wallet connection failed.");
  }
}

connectBtn.addEventListener("click", connectWallet);
