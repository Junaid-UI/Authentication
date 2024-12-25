const registerBtn = document.querySelector('#register')
const registerBtn2 = document.querySelector('#register2')
const LoginBtn = document.querySelector('#login')
const LoginBtn2 = document.querySelector('#login2')
const regForm = document.querySelector('#regForm')
const LogForm = document.querySelector('#LogForm')
const overlay = document.querySelector('#overlay')
const nameError = document.querySelector('#nameError')
const emailError = document.querySelector('#emailError')
const passwordError = document.querySelector('#passwordError')
const logEmailError = document.querySelector('#emailErrorL')
const logPasswordError = document.querySelector('#passwordErrorL')
const logLink = document.querySelector('#logLink')
const regLink = document.querySelector('#RegLink')
const showName = document.querySelector('#showName')
const showEmail = document.querySelector('#showEmail')
const proUpdateBtn = document.querySelector('#proUpdate')
const proUpdateBtn2 = document.querySelector('#proUpdate2')
const logOutBtn = document.querySelector('#logout')
const logOutBtn2 = document.querySelector('#logout2')
const updForm = document.querySelector('#UpdateForm')
const showOption = document.querySelector('#showOption')
const optionContainer = document.querySelector('#optionContainer')




let usersData = JSON.parse(localStorage.getItem('usersData')) || []

let isLogin = false

function showError(text) {
    Swal.fire({
        title: 'Error!',
        text: text,
        icon: 'error',
        confirmButtonText: 'Okay'
    })
}
function showSuccess(text) {
    Swal.fire({
        title: 'success',
        text: text,
        icon: 'success',
        confirmButtonText: 'Okay'
    })
}


function LogSuccess(text, redirectUrl) {
    Swal.fire({
        title: 'Success',
        text: text,
        icon: 'success',
        confirmButtonText: 'Okay'
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = redirectUrl;
        }
    });
}




registerBtn?.addEventListener('click',() => {
    overlay.classList.remove('hidden')
    regForm.classList.remove('hidden')
    
})

registerBtn2?.addEventListener('click',() => {
    overlay.classList.remove('hidden')
    regForm.classList.remove('hidden')
    optionContainer.classList.add('showoption')
    
})

showOption?.addEventListener('click', () => {
    optionContainer.classList.toggle('showoption')
    
    

})


regForm?.addEventListener('submit', (e) => {
    e.preventDefault()

    try {
        
        const formData = new FormData(regForm)

        const name = formData.get('name')
        const email = formData.get('email').trim().toLowerCase()
        const password = formData.get('password').trim()

        if(!name && !email && !password) {
            throw new Error('Fill All Details')
        }

        if(!name) {
            nameError.classList.remove('hidden')
            return
        }else{
            nameError.classList.add('hidden')
        }


        if(!email) {
            emailError.classList.remove('hidden')
            return
        }else{
            emailError.classList.add('hidden')
        }


        if(!password) {
            passwordError.classList.remove('hidden')
            return
        }else{
            passwordError.classList.add('hidden')
        }


        const checkEmail = usersData.find((cur) => {
            return cur.email === email
        })

        if(checkEmail) {
            throw new Error('Email Already Exist')
        }else{
            showSuccess('Register Successful')
            
        }
        

        usersData.push({name,email,password})

        localStorage.setItem('usersData', JSON.stringify(usersData))

        e.target.reset()

        regForm.classList.add('hidden')
        LogForm.classList.remove('hidden')


    } catch (error) {
        showError(error.message)
    }



    

})




LoginBtn?.addEventListener('click', () => {
    overlay.classList.remove('hidden')
    LogForm.classList.remove('hidden')
    optionContainer.classList.add('showoption')
})

LoginBtn2?.addEventListener('click', () => {
    overlay.classList.remove('hidden')
    LogForm.classList.remove('hidden')
    
})


LogForm?.addEventListener('submit', (e) => {
    e.preventDefault()

    try {
        const formData = new FormData(LogForm)

        const email = formData.get('email').trim().toLowerCase()
        const password = formData.get('password').trim()

        const userExist = usersData.find((cur) => {
            return cur.email === email
        })

        

        if(!email && !password) {
            throw new Error('Fill All Details')
        }

        if(!email) {
            logEmailError.classList.remove('hidden')
            logEmailError.textContent = 'Please enter your email'
            return
        }

        if(!password) {
            logPasswordError.classList.remove('hidden')
            logPasswordError.textContent = 'Please enter your password'
            return
        }


        if (!userExist) {
            logEmailError.classList.remove('hidden');
            logEmailError.textContent = 'Email does not exist';
            return;
        }


        if(userExist.email !== email) {
            logEmailError.classList.remove('hidden')
            return
            
        }

        if(userExist.password !== password) {
            logPasswordError.classList.remove('hidden')
            return
        }
        
        if(userExist.email === email && userExist.password === password) {
            isLogin = true
            localStorage.setItem('isLogin' , JSON.stringify(isLogin))
            localStorage.setItem('logEmail', email)
            LogSuccess('Login Successful', './dashboard.html')
            
        }
        
        

        
            
        

    } catch (error) {
        showError(error.message)
        console.log(error);
        
    }
})





function showUserDetails() {
    const isLoginStatus = JSON.parse(localStorage.getItem('isLogin'))

    
    if(isLoginStatus) {

        const userLogEmail = localStorage.getItem('logEmail')
        
        
        
        

        const userLogData = usersData.find((usr) => usr.email ===  userLogEmail)
        
        
        
        
        if(userLogData) {
            if(showName) {
                showName.textContent = `Name : ${userLogData.name}`
            }
            if(showEmail) {
                showEmail.textContent = `Name : ${userLogData.email}`
            }
        }
    
    }
}

showUserDetails()


logLink?.addEventListener('click', (e) => {
    e.preventDefault()
    regForm.classList.add('hidden')
    LogForm.classList.remove('hidden')
})
regLink?.addEventListener('click', (e) => {
    e.preventDefault()
    LogForm.classList.add('hidden')
    regForm.classList.remove('hidden')
})

proUpdateBtn?.addEventListener('click', () => {
    overlay.classList.remove('hidden')
    updForm.classList.remove('hidden')
})
proUpdateBtn2?.addEventListener('click', () => {
    overlay.classList.remove('hidden')
    updForm.classList.remove('hidden')
})

logOutBtn?.addEventListener('click', () => {
    isLogin = false
    localStorage.setItem('isLogin' , JSON.stringify(isLogin))
    location.href = './index.html'
})
logOutBtn2?.addEventListener('click', () => {
    location.href = './index.html'
    localStorage.setItem('isLogin' , JSON.stringify(isLogin))
})

updForm?.addEventListener('submit', (e) => {
    e.preventDefault()
   
    
    try {

        const isLoginStatus = localStorage.getItem('logEmail')
        console.log('isLoginStatus --- update time ', isLoginStatus);
        
        const oldUserDataIndex = usersData.findIndex((usr) => usr.email === isLoginStatus)
        console.log('oldUserDataIndex',oldUserDataIndex);
        

        if(oldUserDataIndex === -1) {
            throw new Error('User not found for update')
        }

        
        const formData = new FormData(updForm)
        const name = formData.get('name')
        const email = formData.get('email').trim().toLowerCase()
        const password = formData.get('password')

        const updateData = {}

        if(email) {
            updateData['email'] = email
            
        }
        if(name) {
            updateData['name'] = name
            
        }
        if(password) {
            updateData['password'] = password
            
        }

    


        if(Object.keys(updateData).length !== 0) {
            usersData[oldUserDataIndex] = {...usersData[oldUserDataIndex] , ...updateData}
            localStorage.setItem('usersData', JSON.stringify(usersData))

            console.log('usersData',usersData);
            

            if(updateData.email) {

                localStorage.setItem('logEmail',updateData.email)
                console.log("logEmail : okya");
            }
                
            showUserDetails()
            showSuccess(`( ${( Object.keys(updateData) )} ) update successful`)
        }else {
            throw new Error('No fields to update')
        }
        

        updForm.classList.add('hidden')
        overlay.classList.add('hidden')
        optionContainer.classList.add('showoption')


        

        
            
            


        
    } catch (error) {
        showError(error.message)
        console.log(error);
        
    }

})










