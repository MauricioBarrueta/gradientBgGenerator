const divColor3 = document.querySelector('.div-color3')
window.onload = () => {
    divColor3.classList.add('disabled')
    resetValues()
    generateLinearGradientCode()
}

const pageBody = document.querySelector('body')

const color1 = document.querySelector(".color-1"), color2 = document.querySelector(".color-2"), color3 = document.querySelector('.color-3')
const clrRange1 = document.getElementById('clr1'), clrRangeValue1 = document.getElementById('range1Value'), 
    clrRange2 = document.getElementById('clr2'), clrRangeValue2 = document.getElementById('range2Value'),
    clrRange3 = document.getElementById('clr3'), clrRangeValue3 = document.getElementById('range3Value')

let gradientDefaultDirection = 'to bottom', cssCodeText = document.getElementById("css-code")
const gradientPreview = document.querySelector('.preview')

const isRadialBtnActive = document.querySelector('.isRadial')
/* Se obtiene la direccion de acuerdo al botón seleccionado y verifica cuál función se tiene que llamar */
const getGradientDirection = (direction, clickedBtn) => {
    let directionButtons = document.querySelectorAll(".direction button");   
    directionButtons.forEach(element => {
        element.classList.remove('active')
    });   
    clickedBtn.classList.add('active');
    gradientDefaultDirection = direction;

    isRadialBtnActive.classList.contains('active') ? generateRadialGradientCode() : generateLinearGradientCode()    
}

let cardTitle = document.querySelector('.card-title'), color3Value = ''
const isThirdColorChecked = document.getElementById('thirdColorEnabled')

/* Se genera el código y se aplican los estilos para la vista previa de 'linear-gradient' */
const generateLinearGradientCode = () => {
    isThirdColorChecked.checked ? (color3Value = `, ${color3.value} ${clrRange3.value}%`, divColor3.classList.remove('disabled')) 
        : (color3Value = '', divColor3.classList.add('disabled'))
    cardTitle.innerHTML = 'Linear Gradient'

    cssCodeText.value = `background: ${color1.value};\nbackground: linear-gradient(${gradientDefaultDirection}, ${color1.value} ${clrRange1.value}%, ${color2.value} ${clrRange2.value}%${color3Value});`
    pageBody.style.background = `${color1.value}`
    pageBody.style.backgroundImage = `linear-gradient(${gradientDefaultDirection}, ${color1.value} ${clrRange1.value}%, ${color2.value} ${clrRange2.value}%${color3Value})`
    gradientPreview.style.backgroundImage = `linear-gradient(${gradientDefaultDirection}, ${color1.value} ${clrRange1.value}%, ${color2.value} ${clrRange2.value}%${color3Value})`
}

/* Se genera el código y se aplican los estilos para la vista previa de 'radial-gradient' */
const generateRadialGradientCode = () => {
    isThirdColorChecked.checked ? (color3Value = `, ${color3.value} ${clrRange3.value}%`, divColor3.classList.remove('disabled')) 
        : (color3Value = '', divColor3.classList.add('disabled'))
    cardTitle.innerHTML = 'Radial Gradient'
    
    cssCodeText.value = `background: ${color1.value};\nbackground: radial-gradient(${gradientDefaultDirection}, ${color1.value} ${clrRange1.value}%, ${color2.value} ${clrRange2.value}%${color3Value});`
    pageBody.style.background = `${color1.value}`
    pageBody.style.backgroundImage = `radial-gradient(${gradientDefaultDirection}, ${color1.value} ${clrRange1.value}%, ${color2.value} ${clrRange2.value}%${color3Value})`
    gradientPreview.style.backgroundImage = `radial-gradient(${gradientDefaultDirection}, ${color1.value} ${clrRange1.value}%, ${color2.value} ${clrRange2.value}%${color3Value})`
}

/* Se llama al evento 'input' cada que el valor de los rangos cambia, también verifica cuál de las funciones se llamará */
const colorInputs = document.querySelectorAll('.colors input')
colorInputs.forEach(element => {
    element.addEventListener('input', () => {   
        isRadialBtnActive.classList.contains('active') ? generateRadialGradientCode() : generateLinearGradientCode()  
    })
});

/* Llama a la función, dependiendo cúal botón esta activo, cada que el estado del checkbox cambia */
isThirdColorChecked.addEventListener('change', () => {
    isRadialBtnActive.classList.contains('active') ? generateRadialGradientCode() : generateLinearGradientCode()  
})

const resetValues = () => {
    clrRange1.value = clrRangeValue1.value = 0
    clrRange2.value = clrRangeValue2.value = 50
    clrRange3.value = clrRangeValue3.value = 100  
    color1.value = '#ED254E', color2.value = '#465362', color3.value = '#000000'
    isThirdColorChecked.checked = false
}

const copyCodeButton = document.getElementById('copy-code')
copyCodeButton.addEventListener('click', () => {
    cssCodeText.select()
    cssCodeText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(cssCodeText.value)
})