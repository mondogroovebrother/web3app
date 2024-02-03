import { useContract, useAddress, ThirdwebNftMedia, Web3Button, useOwnedNFTs } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const address = useAddress();
    const stakingAddress = "0x55f69326524C26cE18A122B8fD96b23446Ba8aEE";
    const laughingheadAddress = "0xDb0BAB07577a66bE8B84080bC0E2dAF9586127D8";

    const { contract: laughingheadsContract } = useContract(laughingheadAddress, "edition");
    const { contract: stakingContract } = useContract(stakingAddress);

    // Assuming you have a function to fetch the staked NFTs information. This will need to be adjusted based on your actual smart contract.
    const { data: myStakedNFTs } = useOwnedNFTs(stakingContract, address);  

    async function withdraw(nftID) {
        // Implementation for unstaking your NFT
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>UnStake your NFTs</h1>
                <div className={styles.grid}>
                    {myStakedNFTs?.map((nft, index) => (
                        <div key={index} className={styles.nftCard}>
                            <ThirdwebNftMedia
                                metadata={nft.metadata}
                                height="100px"
                                width="100px"
                            />
                            <div>
                                <h3>{nft.metadata.name}</h3>
                            </div>
                            <Web3Button
                                contractAddress={stakingAddress}
                                action={() => withdraw(nft.metadata.id)}
                                className={styles.saleButton} // Ensure you have appropriate CSS for this button
                            >
                                UnStake NFT
                            </Web3Button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
