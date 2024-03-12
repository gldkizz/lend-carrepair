const form = document.querySelector('.form');
const formBtnPrev = document.querySelector('.form__btn_prev');
const formBtnNext = document.querySelector('.form__btn_next');
const formBtnSubmit = document.querySelector('.form__btn_submit');
const formTime = document.querySelector('.form__time')
const formFieldsetClient = document.querySelector('.form__fieldset_client')
const formFieldsetType = document.querySelector('.form__fieldset_type')
const formFieldsetDate = document.querySelector('.form__fieldset_date')
const formFieldsets = [formFieldsetType,formFieldsetDate,formFieldsetClient]

let currentStep = 0;

const updateFieldsetVisibility = () => {
    for(let i = 0; i < formFieldsets.length; i++){
        if (i === currentStep){
            formFieldsets[i].classList.add('form__fieldset_active');
        } else{
            formFieldsets[i].classList.remove('form__fieldset_active');
        }
    }

    if (currentStep === 0) {
        formBtnPrev.style.display = 'none'
        formBtnNext.style.display = ''
        formBtnSubmit.style.display = 'none'
        
    } else if (currentStep === formFieldsets.length - 1) {
        formBtnPrev.style.display = ''
        formBtnNext.style.display = 'none'
        formBtnSubmit.style.display = ''
    } else {
        formBtnPrev.style.display = ''
        formBtnNext.style.display = ''
        formBtnSubmit.style.display = 'none'
    }
}

const createFormTime = () => {
    formTime.style.display = 'block'
}

const handleInputForm = ({currentTarget,target}) => { // деструктуризация
    if(currentTarget.type.value && currentStep === 0){
        formBtnNext.disabled = false

        // createFormMonth()
        // createFormDay()
    }

    if(currentStep === 1) {
        if(currentTarget.day.value && target.name === 'day'){


            createFormTime()
        }

        if(currentTarget.day.value && currentTarget.time.value && target.name === 'time'){
            formBtnNext.disabled = false
        } else {
            formBtnNext.disabled = true
        }
    }

    if(currentStep === 2) {
        const inputs = formFieldsetClient.querySelectorAll('.form__input')
        let allFilled = true 

        inputs.forEach(input => {
            if (input.value.trim() === ''){
                allFilled = false
            }
        });

        formBtnSubmit.disabled = !allFilled
    }
}


const init = () => {
    formBtnNext.disabled = true
    formBtnNext.addEventListener('click', () => {
        if (currentStep < formFieldsets.length - 1){
            currentStep += 1;
            updateFieldsetVisibility()
            formBtnNext.disabled = true
            formBtnSubmit.disabled = true
        }
        })
        
    formBtnPrev.addEventListener('click', () => {
        if (currentStep > 0){
            currentStep -= 1;
            updateFieldsetVisibility()
            formBtnNext.disabled = false
        }
    })
    updateFieldsetVisibility()
    
    form.addEventListener('input', handleInputForm)
}

init()