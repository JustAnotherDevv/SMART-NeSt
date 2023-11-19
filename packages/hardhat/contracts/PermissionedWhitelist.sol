//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/*
* @title PermissionedWhitelist
* @author JustAnotherDevv
* @notice This contract can be used to store, read and modify multiple whitelists with separate permissions
* Only admin users or owner can edit any of the whitelists
*/
contract PermissionedWhitelist {
    // Owner of the deployed smart contract
    address public owner;
    // Max amount of stored whitelists
    uint256 public maxWhitelists;
    /*
    * Mapping with whitelists which contain mapping for adresses and its permissions for each whitelist separately
    * First whitelist is reserved for whitelist of admins and can only be modified by owner
    * Admins can modify permissions for other users or admins with lower permission score in the admin whitelist
    * Max permission score that can be set by any of the admins is related to this user's permission score in the admin whitelist
    */
    mapping(uint256 => mapping(address => uint256)) public whitelists;  
    // numAddressesWhitelisted would be used to keep track of how many addresses have been whitelisted
    mapping(uint256 => uint8) public numAddressesWhitelisted;
    /*
    * @dev onlyAdmin modifier
    * @dev Checks whether or not user calling the function has permission score high enough to do it or is the owner
    */
    modifier onlyAdmin(uint256 _whitelistId, address _addr, uint256 _permissionLevel) {
        require((_whitelistId == 0 && msg.sender == owner) || (_whitelistId > 0 && (whitelists[0][msg.sender] > whitelists[0][_addr] || msg.sender == _addr) && whitelists[0][msg.sender] > _permissionLevel), "Can't modify whitelist if you're not admin");
    _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
    _;
    }
    // Setting the owner of this smart contract
    constructor(uint256 _maxWhitelists) {
        owner = msg.sender;
        maxWhitelists =  _maxWhitelists;
    }
    /*
    * @notice modifyWhitelist - This function changes permissions of given address for specific whitelist
    * @dev Can only be called by the admins with permissions higher than third parameter `_permissionLevel`
    * @param _whitelistId - ID of the whitelist to modify
    * @param _addr - Address for which permissions should be changed
    * @param _permissionLevel - New permission score for selected whitelist
     */
    function modifyWhitelist(uint256 _whitelistId, address _addr, uint256 _permissionLevel ) public onlyAdmin(_whitelistId, _addr, _permissionLevel) {
        require(_whitelistId <= maxWhitelists, "Can't set permissions for whitelist that's out of scope");
        whitelists[_whitelistId][_addr] = _permissionLevel;
        if (_permissionLevel != 0) {
            numAddressesWhitelisted[_whitelistId] += 1;
        } else {
            numAddressesWhitelisted[_whitelistId] -= 1;
        }
    }
    /*
    * @notice changeWhitelistsAmount - This function changes max amount of stored whitelists
    * @dev Can only be called by the owner 
    * @param _maxWhitelists - new amount of whitelists
     */
    function changeWhitelistsAmount(uint256 _maxWhitelists ) public onlyOwner {
        maxWhitelists = _maxWhitelists;
    }
}