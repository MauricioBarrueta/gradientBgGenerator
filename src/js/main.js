const color1 = document.querySelector(".color-1"), color2 = document.querySelector(".color-2"), color3 = document.querySelector('.color-3')
const clrRange1 = document.getElementById('clr1'), clrRangeValue1 = document.getElementById('range1Value'), 
    clrRange2 = document.getElementById('clr2'), clrRangeValue2 = document.getElementById('range2Value'),
    clrRange3 = document.getElementById('clr3'), clrRangeValue3 = document.getElementById('range3Value')

const pageBody = document.querySelector('body'), gradientPreview = document.querySelector('.preview'),
    isRadialBtnActive = document.querySelector('.isRadial'), resetButton = document.getElementById('reset'), divColor3 = document.querySelector('.div-color3')
let gradientDefaultDirection = 'to bottom', cssCodeText = document.getElementById("css-code")

window.onload = () => {
    divColor3.classList.add('disabled')
    resetValues()
    generateLinearGradientCode()
}

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

const isThirdColorChecked = document.getElementById('thirdColorEnabled')
/* Se genera el código y se aplican los estilos para la vista previa de 'linear-gradient' */
const generateLinearGradientCode = () => {
    isThirdColorChecked.checked ? (color3Value = `, ${color3.value.toUpperCase()} ${clrRange3.value}%`, divColor3.classList.remove('disabled')) 
        : (color3Value = '', divColor3.classList.add('disabled'))

    let linearGradientCode = `linear-gradient(${gradientDefaultDirection}, ${color1.value.toUpperCase()} ${clrRange1.value}%, ${color2.value.toUpperCase()} ${clrRange2.value}%${color3Value})`    
    cssCodeText.value = `background: ${color1.value.toUpperCase()};\nbackground: ${linearGradientCode};`
    gradientPreview.style.backgroundImage = linearGradientCode
}

/* Se genera el código y se aplican los estilos para la vista previa de 'radial-gradient' */
const generateRadialGradientCode = () => {
    isThirdColorChecked.checked ? (color3Value = `, ${color3.value.toUpperCase()} ${clrRange3.value}%`, divColor3.classList.remove('disabled')) 
        : (color3Value = '', divColor3.classList.add('disabled'))
    
    let radialGradientCode = `radial-gradient(${gradientDefaultDirection}, ${color1.value.toUpperCase()} ${clrRange1.value}%, ${color2.value.toUpperCase()} ${clrRange2.value}%${color3Value})`
    cssCodeText.value = `background: ${color1.value.toUpperCase()};\nbackground: ${radialGradientCode};`
    gradientPreview.style.backgroundImage = radialGradientCode
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

resetButton.addEventListener('click', () => { 
    resetValues() 
    generateLinearGradientCode()
})

const resetValues = () => {
    clrRange1.value = clrRangeValue1.value = 0, clrRange2.value = clrRangeValue2.value = 75, clrRange3.value = clrRangeValue3.value = 100  
    color1.value = '#ED254E', color2.value = '#465362', color3.value = '#000000'
    isThirdColorChecked.checked = false
}

const copyCodeButton = document.getElementById('copy-code')
copyCodeButton.addEventListener('click', () => {
    cssCodeText.select()
    cssCodeText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(cssCodeText.value)
})