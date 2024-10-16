// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract SecretNFT is ERC721, Ownable {
    uint256 private _nextTokenId;
    // event tokens_of_owner(uint256[] tokensOfOwner);
    // event debt(uint256 debt);
    // event lastPaid(uint256 lastPaid);


    struct TokenMetadata {
        uint256 cost;
        uint256 maxDebt;
        uint256 lastPaid;
        uint256 tokenId;
        string nftName;
        string nftDescription;
        string nftImage;
        string nftCategory;
    }

    mapping(uint256 => TokenMetadata) private _tokenMetadata;


    constructor(address admin)
        ERC721("SecretNFT", "sNFT") Ownable(admin)
    {}
    
    function _baseURI() internal pure override returns (string memory) {
        return "";
    }
    

    function safeMint(address to, uint256 tokenCost, uint256 tokenMaxdebt, string memory nName, string memory nDescription, string memory nImage, string memory nCategory) public {
    uint256 tokenId = _nextTokenId++;
    _safeMint(to, tokenId);
    _setTokenMetadata(tokenId, tokenCost, tokenMaxdebt, block.timestamp, nName, nDescription, nImage, nCategory);
    // _setTokenURI(tokenId, uri);
    }

    function _exists(uint256 tokenId) internal view returns (bool)  {
        address owner = ownerOf(tokenId);
        return owner != address(0);
    }
    function _setTokenMetadata(
        uint256 tokenId,
        uint256 cost,
        uint256 maxDebt,
        uint256 lastPaid,
        string memory nName,
        string memory nDescription,
        string memory nImage,
        string memory nCategory
    ) internal {
        require(_exists(tokenId), "ERC721Metadata: Metadata set of nonexistent token");

        // Store the metadata in the mapping
        _tokenMetadata[tokenId] = TokenMetadata({
            cost: cost,
            maxDebt : maxDebt,
            lastPaid : lastPaid
            tokenId : tokenId,
            nftName : nName,
            nftDescription : nDescription,
            nftImage : nImage,
            nftCategory : nCategory
        });
    }

    function _getDebt(uint256 tokenId) public view returns (uint256){
       return ((block.timestamp - _tokenMetadata[tokenId].lastPaid) * _tokenMetadata[tokenId].cost)/4;
        
    }

    function _repayDebt(uint256 tokenId, address payable recipient) public payable {

        require(ownerOf(tokenId) == msg.sender, "Caller is not the owner of the NFT");
        require(_getDebt(tokenId) > 0, "Debt already repaid");
        recipient.transfer(_getDebt(tokenId));
        _tokenMetadata[tokenId].lastPaid = block.timestamp;
    }

    function _getLastPaid(uint256 tokenId) public view returns(uint256){
        // emit lastPaid(_tokenMetadata[tokenId].lastPaid);
        return (_tokenMetadata[tokenId].lastPaid);
    }

    function _getcost(uint256 tokenId) public view returns(uint256){
        return (_tokenMetadata[tokenId].cost);
    }


    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        if (tokenCount == 0) {
            return tokenIds; // Return an empty array if no tokens
        } else {
            uint256 index = 0;
            for (uint256 i = 0; i < _nextTokenId; i++) {
                try this.ownerOf(i) {
                    if (ownerOf(i) == owner) {
                        tokenIds[index] = i;
                        index++;
                    }
                } catch {
                    // This catch block is intentionally left empty.
                    // If ownerOf(i) reverts, then the token does not exist, so do nothing.
                }
            }
            // Resize the array to remove unused elements
            uint256[] memory actualTokenIds = new uint256[](index);
            for (uint256 j = 0; j < index; j++) {
                actualTokenIds[j] = tokenIds[j];
            }
            return actualTokenIds;
        }
    }

    function totalSupply() public view returns (uint256) {
        return _nextTokenId;
    }

    // The following functions are overrides required by Solidity.
    // function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    //     return super.tokenURI(tokenId);
    // }

    // function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
    //     return super.supportsInterface(interfaceId);
    // }*/
}
