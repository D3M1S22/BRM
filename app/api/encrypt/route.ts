import { SecretNetworkClient, Wallet, MsgExecuteContract } from "secretjs";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  
  console.log("Request received", request.body);
  const wallet = new Wallet("rubber similar enhance brave plunge clean shop dawn frozen visual once cabbage");

  const secretjs = new SecretNetworkClient({
    chainId: "pulsar-3",
    url: "https://api.pulsar3.scrttestnet.com",
    wallet: wallet,
    walletAddress: wallet.address,
  });


  const mintMsg = new MsgExecuteContract({
    sender: wallet.address,
    contract_address: "<your_contract_address>",
    code_hash: "<your_contract_code_hash>", // optional but way faster
    msg: {
      execute_store_confidential_metadata: {
        input_values: JSON.stringify({
          owner: wallet.address,
          token_id: "1",  // or any specific token_id you are using
          private_metadata: {
            nft_name: "Luxury Item NFT",
            nft_description: "This NFT represents a real-world luxury item.",
            nft_image: "https://your-image-url.com/image.png",
            nft_category: "Luxury",
          },
        }),
        task: { /* Your task structure here */ },
        input_hash: "<your_input_hash>",  // Provide the hash if applicable
      },
    },
    sent_funds: [], // optional
  });
  let tx_hash = "";
  try {
    const tx = await secretjs.tx.broadcast([mintMsg], {
      gasLimit: 200_000,
    });
    tx_hash = tx.transactionHash;
  } catch (error) {
    console.error(error);
    return Response.json({ status: 500, body: `Failed to mint NFT\n wallet_address: ${wallet.address}\nerror message: ${error}` });
  }

  return NextResponse.json( {status:200, body: `NFT minted successfully ${tx_hash}` });
}
