class Account {
    div_signup = document.querySelector(".signup-modal")
    inpt_signupname = document.getElementById("signup-name")
    inpt_signuppassword = document.getElementById("signup-password")
    btn__signup_save = document.getElementById("signup-btn")
    btn__login_save = document.getElementById("login-btn")
    inpt_loginname = document.getElementById("login-name")
    inpt_loginpassword = document.getElementById("login-password")
    spn_error = document.getElementById("error")
    div_account_manage = document.querySelector(".account-manage")
    spn_account_id = document.getElementById("account-id")
    spn_balance = document.getElementById("balance")
    modal_addmoney = document.querySelector(".addmoney-modal")
    btn_toggleAddmoney = document.getElementById("toggle-addmoneyModal")
    btn_addmoney_goback = document.getElementById("addmoney-goback")
    btn_addmoney = document.getElementById("addmoney-btn")
    inpt_addmoney_amount = document.getElementById("addmoney-amount")
    modal_withdraw = document.querySelector(".withdraw-modal")
    btn_toggleWithdraw = document.getElementById("toggle-withdrawModal")
    btn_withdraw_goback = document.getElementById("withdraw-goback")
    btn_withdraw = document.getElementById("withdraw-btn")
    inpt_withdraw_amount = document.getElementById("withdraw-amount")
    spn_withdraw_error = document.getElementById("withdraw-error")
    btn_logout = document.getElementById("logout")
    
    accounts = []

    newAccount(accountData) {
        this.accounts.push({...accountData, account_number: Number(this.accounts.length) + 1, balance: 0 })
        this.div_signup.classList.toggle("hide")
    }

    login(name, password) {
        const account = this.accounts.filter((account) => account.name === name)
        if(account.length > 0) {
            this.div_account_manage.classList.toggle("hide")
            this.spn_account_id.innerHTML = account[0].account_number
            this.spn_balance.innerHTML = Number(account[0].balance)+" TL"
        } else {
            this.spn_error.innerHTML = "Başarısız"
        }
    }

    toggleAddmoney() {
        this.modal_addmoney.classList.toggle("hide")
    }

    addMoney() {
        let newBalance = 0;
        const currentAccount = this.accounts.filter((item) => Number(item.account_number) === Number(this.spn_account_id.innerHTML))
        const moneyAdd = { ...currentAccount[0], balance: Number(currentAccount[0].balance) + Number(this.inpt_addmoney_amount.value) }
        newBalance = Number(currentAccount[0].balance) + Number(this.inpt_addmoney_amount.value);
        const deleteOldAccount = this.accounts.filter((item) => Number(item.account_number) !== Number(this.spn_account_id.innerHTML))
        this.accounts = deleteOldAccount;
        this.accounts.push(moneyAdd)
        this.spn_balance.innerHTML = newBalance+" TL"
        this.toggleAddmoney()
    }

    toggleWithdraw() {
        this.modal_withdraw.classList.toggle("hide")
    }

    withdraw() {
        let newBalance = 0;
        const currentAccount = this.accounts.filter((item) => Number(item.account_number) === Number(this.spn_account_id.innerHTML))
        if(Number(currentAccount[0].balance) < Number(this.inpt_withdraw_amount.value)) {
            this.spn_withdraw_error.innerHTML = "Bu kadar paranız yok."
            return
        }
        const moneyAdd = { ...currentAccount[0], balance: Number(currentAccount[0].balance) - Number(this.inpt_withdraw_amount.value) }
        newBalance = Number(currentAccount[0].balance) - Number(this.inpt_withdraw_amount.value);
        const deleteOldAccount = this.accounts.filter((item) => Number(item.account_number) !== Number(this.spn_account_id.innerHTML))
        this.accounts = deleteOldAccount;
        this.accounts.push(moneyAdd)
        this.spn_balance.innerHTML = newBalance+" TL"
        this.toggleWithdraw()
    }

    logout() {
        this.div_account_manage.classList.toggle("hide")
    }

}
class Welcome {
    divapp = document.getElementById("app")
    btn__signup = document.getElementById("signup")
    signup_modal = document.querySelector(".signup-modal")
    btn_goback = document.querySelector(".goback")

    toggleSignUpModal() {
            this.signup_modal.classList.toggle("hide")
    }

}
class App {
    constructor() {
        const welcome = new Welcome()
        welcome.btn__signup.addEventListener("click", () => {
            welcome.toggleSignUpModal()
        })
        welcome.btn_goback.addEventListener("click", () => {
            welcome.toggleSignUpModal()
        })
        
        const account = new Account()
        account.btn__signup_save.addEventListener("click", () => {
            account.newAccount({ name: account.inpt_signupname.value, password: account.inpt_signuppassword.value })
        })

        account.btn__login_save.addEventListener("click", () => {
            account.login(account.inpt_loginname.value, account.inpt_loginpassword.value)
        })
        
        account.btn_toggleAddmoney.addEventListener("click", () => {
            account.toggleAddmoney()
        })
        
        account.btn_addmoney_goback.addEventListener("click", () => {
            account.toggleAddmoney()
        })

        account.btn_addmoney.addEventListener("click", () => {
            account.addMoney()
        })

        account.btn_toggleWithdraw.addEventListener("click", () => {
            account.toggleWithdraw()
        })

        account.btn_withdraw_goback.addEventListener("click", () => {
            account.toggleWithdraw()
        })

        account.btn_withdraw.addEventListener("click", () => {
            account.withdraw()
        })

        account.btn_logout.addEventListener("click", () => {
            account.logout()
        })

    }
}

const app = new App()