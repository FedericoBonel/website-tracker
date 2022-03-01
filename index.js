const leadFieldLS = "leads";
const leadsStored = JSON.parse(localStorage.getItem(leadFieldLS));
let leads = [];

// Call this when you first open the page:
leads = verifyContent(leadsStored, leads);

// Event listeners:

// This is homologous to onclick in html [kind of event to listen for, function to execute]
// Important to note that this arrow function is a shortcut for "function(){x=1}" to "() => {x=1}"

document.querySelector("#input-btn").addEventListener("click", () => {
    // Verify content is not empty
    content = document.querySelector("#input-el").value;
    if (content === "") return;
    // Store values in the variable and localStorage
    leads.push(content);
    localStorage.setItem(leadFieldLS, JSON.stringify(leads));
    // Show feedback to user
    document.querySelector("#input-el").value = "";
    renderData(leads);
});

document.querySelector("#tab-btn").addEventListener("click", () => {
    // Get the tabs
    chrome.tabs.query({currentWindow:true}, (tabs) => {
        // For each tab get its url and store it in the local variable
        for (let tab of tabs) {
            leads.push(tab.url);
        }
        localStorage.setItem(leadFieldLS, JSON.stringify(leads));
        renderData(leads);
    });

});

document.querySelector("#delete-btn").addEventListener("click", () => {
    // Empty the storage and global variable
    localStorage.setItem(leadFieldLS, JSON.stringify([]));
    leads = [];
    renderData(leads);
});



// Helper methods:

// Show the stored data in the array parameter
function renderData(array) {
    // Initialize a string to avoid accesing the dom a lot
    let listItems = "";
    for (let item of array) {
        // Template string
        listItems += `
            <li>
                <a target='_blank' href='${item}'> ${item} </a>
            </li>
            `;
    }
    // Replace all the html code inside of the ul-el to list items html code
    document.querySelector("#ul-el").innerHTML = listItems;
}

// If the leads are stored grab them
// Verify if there is content in leadsStored and if so asign it to the second parameter
function verifyContent(leadsStored, leads) {
    if (leadsStored) {
        leads = leadsStored;
        renderData(leads);
    }
    return leads;
}

