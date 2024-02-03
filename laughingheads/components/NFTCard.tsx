import { FC } from 'react';
import { ThirdwebNftMedia, useNFT, useContract, Web3Button } from '@thirdweb-dev/react';

interface NFTCard {
    tokenID: number;
}

const NFTCard: FC<NFTCard> = ({ tokenID }) => {
    const laughingheadAddress = "0xDb0BAB07577a66bE8B84080bC0E2dAF9586127D8";
    const stakingAddress = "0x55f69326524C26cE18A122B8fD96b23446Ba8aEE";

    const { contract: laughingheadsContract } = useContract(laughingheadAddress, "edition");
    const { contract: stakingContract } = useContract(stakingAddress);
    const { data: nft } = useNFT(laughingheadsContract, tokenID);

    async function withdraw(nftID: string) {
        await stakingContract.call("withdraw", [nftID]);
    }
    return (
        <>
            {nft && (
                <div>
                    <h3>{nft.metadata.name}</h3>
                    {nft.metadata && (
                        <ThirdwebNftMedia
                            metadata={nft.metadata}
                        />
                    )}
                    <Web3Button
                        contractAddress={stakingAddress}
                        action={() => withdraw(nft.metadata.id)}
                    >Unstake</Web3Button>
                </div>
            )}
        </>
    )