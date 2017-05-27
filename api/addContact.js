var address = require('../address.js');
var contract = require('truffle-contract');
var contact_artifacts = require('../build/contracts/Contacts.json');

var Contact = contract(contact_artifacts);


var accounts;
var account;

var errorMessage = "";
function start() {
	var self = this;
	Contact.setProvider(web3.currentProvider);
	web3.eth.getAccounts(function (err, accs) {
		if (err != null) {
			errorMessage = "There was an error fetching your accounts.";
			return;
		}
		if (accs.length == 0) {
			errorMessage = "Couldn't get any accounts! Make sure your Ethereum client is configured correctly.";
			return;
		}
		accounts = accs;
		account = accounts[0];
	});
}


module.exports = {
	save: function (req, res, next) {
		start();
		var self = this;
		var index = parseInt(req.body.index);
		var name = req.body.name;
		var mobile = parseInt(req.body.mobile);
		// var status = req.body.status;
		var record;
		Contact.deployed().then(function (instance) {
			contact = instance;
			return contact.addContact(index, mobile, name, { from: account, gas: 200000 });
		}).then(function () {
			res.json({ message: "Success" });
			}).catch(function (e) {
			res.json({ message: "Failure", Error: e, errorMessage: errorMessage })
		});
	}
}