// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title SilaIntegrityCore
/// @notice Programmable money rule engine for Thai temple donation transparency.
///         Approves expenditures whose Merchant Category Code (MCC) is on the
///         on-chain "merit" whitelist; reverts otherwise.
contract SilaIntegrityCore {
    address public administrator;

    mapping(uint16 => bool) public meritWhitelist;
    mapping(uint16 => string) public categoryName;

    uint256 public approvedCount;
    uint256 public blockedCount;

    event TransactionVerified(
        address indexed caller,
        uint16 indexed mcc,
        uint256 amount,
        string label,
        bool approved
    );
    event MeritAdded(uint16 indexed mcc, string name);
    event MeritRemoved(uint16 indexed mcc);

    modifier onlyAdmin() {
        require(msg.sender == administrator, "SILA: NOT_ADMIN");
        _;
    }

    constructor() {
        administrator = msg.sender;

        _addMerit(4900, "Utilities");
        _addMerit(8211, "Education");
        _addMerit(8062, "Hospitals");
        _addMerit(5411, "Groceries");
        _addMerit(8398, "Charitable Organizations");
    }

    function verifyExpenditure(uint16 mcc, uint256 amount, string calldata label)
        external
        returns (bool)
    {
        if (meritWhitelist[mcc]) {
            approvedCount += 1;
            emit TransactionVerified(msg.sender, mcc, amount, label, true);
            return true;
        }

        blockedCount += 1;
        emit TransactionVerified(msg.sender, mcc, amount, label, false);
        revert("SILA_PROTOCOL: NON_MERIT_EXPENDITURE_DETECTED");
    }

    function addMerit(uint16 mcc, string calldata name) external onlyAdmin {
        _addMerit(mcc, name);
    }

    function removeMerit(uint16 mcc) external onlyAdmin {
        meritWhitelist[mcc] = false;
        emit MeritRemoved(mcc);
    }

    function _addMerit(uint16 mcc, string memory name) internal {
        meritWhitelist[mcc] = true;
        categoryName[mcc] = name;
        emit MeritAdded(mcc, name);
    }
}
