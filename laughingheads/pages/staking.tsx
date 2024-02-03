import { useContract, useAddress, useOwnedNFTs, ThirdwebNftMedia, Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const address = useAddress();

    const stakingAddress = "0x55f69326524C26cE18A122B8fD96b23446Ba8aEE";
    const laughingheadAddress = "0xDb0BAB07577a66bE8B84080bC0E2dAF9586127D8";

    const { contract: laughingheadsContract } = useContract(laughingheadAddress, "edition");
    const { contract: stakingContract } = useContract(stakingAddress);

    const { data: myLHNFTs } = useOwnedNFTs(laughingheadsContract, address);

    async function stakeNFT(nftID: string) {
        if (!address || !laughingheadsContract || !stakingContract) return;

        const isApproved = await laughingheadsContract.isApproved(address, stakingAddress);
        if (!isApproved) {
            await laughingheadsContract.setApprovalForAll(stakingAddress, true);
        }

        // Assuming the second argument should be the quantity and it's always 1 for staking an individual NFT
        await stakingContract.call("stake", [nftID, 1]);
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Stake your NFTs</h1>
                <p>Stake your laughingHeads to earn Kek</p>
                <br />
                <h1>My LaughingHeads</h1>
                <div className={styles.grid}>
                    {myLHNFTs?.map((nft) => (
                        <div key={nft.id} className={styles.nftCard}>
                            <h3>{nft.metadata.name}</h3>
                            <ThirdwebNftMedia
                                metadata={nft.metadata}
                                height="100px"
                                width="100px"
                            />
                            <Web3Button
                                contractAddress={stakingAddress}
                                action={() => stakeNFT(nft.metadata.id)}
                            >
                                Stake LaughingHead
                            </Web3Button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
