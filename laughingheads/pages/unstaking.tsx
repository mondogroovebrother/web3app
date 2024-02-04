import { useContract, useAddress, useOwnedNFTs, ThirdwebNftMedia, Web3Button, useContractRead } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import NFTCarda from "../components/NFTCard.tsx";

const Home: NextPage = () => {
    const address = useAddress();

    const stakingAddress = "0x55f69326524C26cE18A122B8fD96b23446Ba8aEE";
    const laughingheadAddress = "0xDb0BAB07577a66bE8B84080bC0E2dAF9586127D8";

    const { contract: laughingheadsContract } = useContract(laughingheadAddress, "edition");
    const { contract: stakingContract } = useContract(stakingAddress);

    const { data: myLHNFTs } = useOwnedNFTs(laughingheadsContract, address);
    const { data: StakedLHNFTs } = useContractRead(stakingContract, "getStakeInfo", [address]);

    async function stakeNFT(nftID: string) {
        if (!address) return;

        const isApproved = await laughingheadsContract?.isApproved(
            address,
            stakingAddress
        );

        if (!isApproved) {
            await laughingheadsContract.setApprovalForAll(stakingAddress, true);
        }

        await stakingContract.call("withdraw", [nftID], 1)
    }
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>UnStake your NFTs</h1>
                <div className={styles.grid}>
                    {StakedLHNFTs  && StakedLHNFTs[0].map((stakedNFT: BigNumber) => (
                        <div key={stakedNFT.toString()}>
                            <NFTCarda tokenID={stakedNFT.toNumber()} />
                        
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
