function setStatus(message) {
	var status = document.getElementById("status");
	status.innerHTML = message;
};


function save() {
	var self = this;
	var index = parseInt(document.getElementById("index").value);
	var name = document.getElementById("name").value;
	var mobile = parseInt(document.getElementById("mobile").value);
	var status;
	
	this.setStatus("Saving Record... (please wait)");
	axios.post('/api/addcontact', {
		index: index,
		name: name,
		mobile: mobile
	}).then(function (response) {
		self.setStatus("Record Saved !");
	}).catch(function (e) {
		self.setStatus("Error saving record; see log." + e);
	});
}

function fetch() {
	var self = this;
	var index = parseInt(document.getElementById("indexOut").value);
	axios.post('/api/getcontact', {
		index: index
	}).then(function (response) {
		var table = document.getElementById("table");
		var html = '';
		html += '<tr>';
		html += '<td>' + response.data.index + '</td>';
		html += '<td>' + response.data.name + '</td>';
		html += '<td>' + response.data.mobile + '</td>';
		html += '</tr>';
		table.innerHTML = html;
		self.setStatus("Record Fetched.");
	}).catch(function (e) {
		self.setStatus("Error fetching record." + e);
	});
}
