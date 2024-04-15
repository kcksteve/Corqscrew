///Configure buttons
//Debug log
const btnLog = document.getElementById("btnLog");
const btnLogClick = () => {
    chrome.runtime.sendMessage({ msg: "debugLog" });
}
btnLog.onclick = btnLogClick;

//Update data
const btnUpdate = document.getElementById("btnUpdate");
const txtUpdateParam = document.getElementById("txtUpdateParam");
const txtUpdateValue = document.getElementById("txtUpdateValue");
const txtUpdateValueType = document.getElementById("txtUpdateValueType");
const btnUpdateClick = () => {
    if (txtUpdateParam.value != "") {
        let updateVal;
        let updateErrMsg = "";
        switch (txtUpdateValueType.value) {
            case "txt":
                updateVal = txtUpdateValue.value;
                break;
            case "num":
                updateVal = +txtUpdateValue.value;
                if (isNaN(updateVal)) {
                    updateErrMsg = "Could not use the input (" + txtUpdateValue.value + ") as a number. Please check your value and try again.";
                }
                break;
            case "obj":
                try {
                    testVal = JSON.parse(txtUpdateValue.value.replaceAll(`'`, `"`));
                    updateVal = JSON.parse(txtUpdateValue.value.replaceAll(`'`, `"`));
                }
                catch {
                    updateErrMsg = "";
                }
                break;
        }
        if (updateErrMsg === "") {
            chrome.runtime.sendMessage({ msg: "updateData", param: txtUpdateParam.value, value: updateVal });
        }
        else {
            window.alert(updateErrMsg);
        }
    }
    else {
        window.alert("Please enter a property name to make an update.");
    }
}
btnUpdate.onclick = btnUpdateClick;

//Delete Data
const btnDelete = document.getElementById("btnDelete");
const btnDeleteClick = () => {
    if (txtUpdateParam.value != "") {
        chrome.runtime.sendMessage({ msg: "deleteData", param: txtUpdateParam.value });
    }
    else {
        window.alert("Please enter a property name to delete it.");
    }
}
btnDelete.onclick = btnDeleteClick;

//Trigger component
const btnTrigger = document.getElementById("btnTrigger");
const txtTriggerName = document.getElementById("txtTriggerName");
const btnTriggerClick = () => {
    if (txtTriggerName.value != "") {
        chrome.runtime.sendMessage({ msg: "triggerComponent", name: txtTriggerName.value });
    }
    else {
        window.alert("Please enter a component name to trigger it.");
    }
}
btnTrigger.onclick = btnTriggerClick;