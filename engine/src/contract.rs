use alloy::sol;

sol! {
    #[sol(rpc)]
    #[derive(Debug)]
    contract SilaIntegrityCore {
        event TransactionVerified(
            address indexed caller,
            uint16 indexed mcc,
            uint256 amount,
            string label,
            bool approved
        );

        function verifyExpenditure(uint16 mcc, uint256 amount, string calldata label) external returns (bool);
        function meritWhitelist(uint16 mcc) external view returns (bool);
        function categoryName(uint16 mcc) external view returns (string memory);
        function approvedCount() external view returns (uint256);
        function blockedCount() external view returns (uint256);
        function administrator() external view returns (address);
    }
}
