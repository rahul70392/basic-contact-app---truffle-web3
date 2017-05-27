pragma solidity ^0.4.0;
contract Contacts
{
    struct Contact {
        uint index;
		uint mob;
		string name;
	}
	
	address admin = msg.sender;
	mapping (uint => Contact) Con;
	
	function addContact(uint index,uint mob, string name) returns (bool result)
	{
	    if(msg.sender != admin) return false;
	    Con[index].index=index;
	    Con [index].mob = mob;
	    Con [index].name = name;
	    return true;
	}
	
	function getContact(uint index) returns (uint,uint,string)
	{
	    return (Con[index].index,Con [index].mob ,Con [index].name);
	}
}