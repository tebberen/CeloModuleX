// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTAccess is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 public currentPrice;
    string private _baseTokenURI;

    mapping(address => bool) public hasMinted;

    event NFTMinted(address indexed user, uint256 indexed tokenId, uint256 pricePaid);
    event PriceUpdated(uint256 newPrice);
    event FundsWithdrawn(address indexed to, uint256 amount);

    constructor(
        uint256 initialPrice,
        string memory metadataURI,
        address initialOwner
    ) ERC721("CeloModuleX Premium Pass", "CMP") Ownable(initialOwner) {
        currentPrice = initialPrice;
        _baseTokenURI = metadataURI;
    }

    function mintNFT() external payable {
        require(!hasMinted[msg.sender], "Already minted");
        require(msg.value >= currentPrice, "Insufficient payment");

        hasMinted[msg.sender] = true;
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

        emit NFTMinted(msg.sender, tokenId, msg.value);
    }

    function updateNFTPrice(uint256 newPrice) external onlyOwner {
        currentPrice = newPrice;
        emit PriceUpdated(newPrice);
    }

    function withdraw(address payable to, uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        to.transfer(amount);
        emit FundsWithdrawn(to, amount);
    }

    function getNFTPrice() external view returns (uint256) {
        return currentPrice;
    }

    function hasNFT(address user) external view returns (bool) {
        return balanceOf(user) > 0;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
