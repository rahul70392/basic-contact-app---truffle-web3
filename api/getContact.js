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
	fetch: function (req, res, next) {
		start();
		var self = this;
		var index = parseInt(req.body.index);
		var record;
		Contact.deployed().then(function (instance) {
			contact = instance;
			return contact.getContact.call(index, { from: account });
		}).then(function (response) {
			// var status = '';
			// if (response[3] == true) {
			// 	status = 'Pass';
			// }
			// if (response[3] == false) {
			// 	status = 'Fail';
			// }
			console.log(response);
			console.log(response[1].c[0]);
			res.json({ message: "Success", index: response[0].c[0], mobile: response[1].c[0], name: response[2]})
		}).catch(function (e) {
			res.json({ message: "Failure", Error: e, errorMessage: errorMessage })
		});
	},
}