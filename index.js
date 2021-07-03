// keeps track of the user and their balance
class Account {

  constructor(username) {
    this.username = username;
    // this.balance = 0;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    // add up all transaction objects in the array
    for (let i of this.transactions) {
      balance += i.value;
    }
    return balance;
  }
  // for every new transaction, push into 'transactions' array
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

// keeps track of each transaction and its details
class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  // update the balance in the account
  commit() {
    // check if the transaction is allowed
    if (!this.isAllowed()) {
      return false;
    }
    // track the time of each transaction
    this.time = new Date();
    // add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }
}

// adds money to balance
class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
  // deposits are always allowed
  isAllowed() {
    return true;
  }
}

// takes away money from balance
class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }
  // check if account balance is sufficient for withdrawal
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

// create new user account with username passed as arg
const myAccount = new Account("snow-patrol");
console.log(`Snow Patrol's starting balance: $${myAccount.balance}`)

// this transaction should not affect balance (cannot subtract from 0)
t = new Withdrawal(1, myAccount);
console.log(t.commit());
console.log(myAccount.balance);

// new instance of a Deposit object, amount passed as arg
t0 = new Deposit(120.00, myAccount);
// finalizes and applies transaction to the account's balance
console.log('Transaction 0:', t0.commit());

// new instance of a Withdrawal object, amount passed as arg
t1 = new Withdrawal(50.25, myAccount);
// finalizes and applies transaction to the account's balance
console.log('Transaction 1:', t1.commit());

t2 = new Withdrawal(9.99, myAccount);
console.log('Transaction 2:', t2.commit());

// prints remaining balance after withdrawals and deposits are made
console.log(`Snow Patrol's ending balance: $${myAccount.balance}`)
// prints transaction details of user's account
console.log('Account Transaction History: ', myAccount.transactions);
