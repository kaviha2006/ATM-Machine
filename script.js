// Initialize accounts storage if not present
if (!localStorage.getItem("accounts")) {
  localStorage.setItem("accounts", JSON.stringify({}));
}

// Helper to get all accounts
function getAccounts() {
  return JSON.parse(localStorage.getItem("accounts"));
}

// Helper to save all accounts
function saveAccounts(accounts) {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

// Login
function login() {
  const pin = document.getElementById("pin").value.trim();
  let accounts = getAccounts();

  if (!pin) {
    document.getElementById("error").innerText = "❌ Please enter a PIN!";
    return;
  }

  // 👉 Create a new account only if the pin doesn't exist
  if (!accounts[pin]) {
    accounts[pin] = { balance: 5000, transactions: [] }; // initial balance = 5000
    saveAccounts(accounts);
  }

  // Save current user session
  localStorage.setItem("currentPIN", pin);

  // Redirect to menu
  window.location.href = "menu.html";
}

// Get current logged-in account
function getAccount() {
  let accounts = getAccounts();
  let pin = localStorage.getItem("currentPIN");
  return accounts[pin];
}

// Save current account changes
function saveAccount(acc) {
  let accounts = getAccounts();
  let pin = localStorage.getItem("currentPIN");
  accounts[pin] = acc;
  saveAccounts(accounts);
}

// Function to display current balance (used on all pages)
function showBalance() {
  const acc = getAccount();
  if (document.getElementById("currentBalance")) {
    document.getElementById("currentBalance").innerText = `Your Balance: ₹${acc.balance}`;
  }
  if (document.getElementById("balance")) {
    document.getElementById("balance").innerText = `Your Balance: ₹${acc.balance}`;
  }
}

// Withdraw
function withdraw() {
  let amt = parseInt(document.getElementById("withdrawAmount").value);
  let acc = getAccount();

  if (amt > 0 && amt <= acc.balance) {
    acc.balance -= amt;
    acc.transactions.push(`Withdraw: ₹${amt}`);
    saveAccount(acc);

    document.getElementById("message").innerText =
      `✅ Withdrawn ₹${amt} | New Balance: ₹${acc.balance}`;

    // ✅ Update balance live
    showBalance();

    // ✅ Clear input field
    document.getElementById("withdrawAmount").value = "";
  } else {
    document.getElementById("message").innerText = "❌ Invalid or Insufficient Balance!";
  }
}

// Deposit
function deposit() {
  let amt = parseInt(document.getElementById("depositAmount").value);
  let acc = getAccount();

  if (amt > 0) {
    acc.balance += amt;
    acc.transactions.push(`Deposit: ₹${amt}`);
    saveAccount(acc);

    document.getElementById("message").innerText =
      `✅ Deposited ₹${amt} | New Balance: ₹${acc.balance}`;

    // ✅ Update balance live
    showBalance();

    // ✅ Clear input field
    document.getElementById("depositAmount").value = "";
  } else {
    document.getElementById("message").innerText = "❌ Invalid Amount!";
  }
}

// ✅ Run showBalance automatically on page load
window.onload = function () {
  showBalance();
};
