const color1 = document.querySelector(".color-1"), color2 = document.querySelector(".color-2"), color3 = document.querySelector('.color-3'),
    color3Checkbox = document.getElementById('enableColor3'), color3Values = document.getElementById('color-3-values'), color3Icon = document.querySelector('.toggle-icon')
const clrRange1 = document.getElementById('clr1'), clrRangeValue1 = document.getElementById('range1Value'), 
    clrRange2 = document.getElementById('clr2'), clrRangeValue2 = document.getElementById('range2Value'),
    clrRange3 = document.getElementById('clr3'), clrRangeValue3 = document.getElementById('range3Value')

const pageBody = document.querySelector('body'), gradientPreview = document.querySelector('.preview'),
    isRadialBtnActive = document.querySelector('.isRadial'), resetButton = document.getElementById('reset')
let gradientDefaultDirection = 'to bottom', cssCodeText = document.getElementById("css-code")

window.onload = () => {
    resetValues()
    generateLinearGradientCode()
}

/* Para habilitar o deshabilitar el 3er color */
color3Checkbox.addEventListener('change', () => {
  const enabled = color3Checkbox.checked

  color3Values.classList.toggle('disabled', !enabled)
  color3Icon.classList.toggle('fa-minus', enabled)
  color3Icon.classList.toggle('fa-plus', !enabled)
});

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

/* Se genera el código y se aplican los estilos para la vista previa de 'linear-gradient' */
const generateLinearGradientCode = () => {
    const linearGradientCode = `linear-gradient(${gradientDefaultDirection}, ${color1.value.toUpperCase()} ${clrRange1.value}%, ${color2.value.toUpperCase()} ${clrRange2.value}%${enableColor3.checked ? `, ${color3.value.toUpperCase()} ${clrRange3.value}%` : ''})`
    cssCodeText.value = `background: ${color1.value.toUpperCase()};\nbackground: ${linearGradientCode};`
    gradientPreview.style.backgroundImage = linearGradientCode
}

/* Se genera el código y se aplican los estilos para la vista previa de 'radial-gradient' */
const generateRadialGradientCode = () => {    
    const radialGradientCode = `radial-gradient(${gradientDefaultDirection}, ${color1.value.toUpperCase()} ${clrRange1.value}%, ${color2.value.toUpperCase()} ${clrRange2.value}%${enableColor3.checked ? `, ${color3.value.toUpperCase()} ${clrRange3.value}%` : '' })`
    cssCodeText.value = `background: ${color1.value.toUpperCase()};\nbackground: ${radialGradientCode};`
    gradientPreview.style.backgroundImage = radialGradientCode
}

/* Se llama al evento 'input' cada que el valor de los rangos cambia, también verifica cuál de las funciones se llamará */
const colorInputs = document.querySelectorAll('.column input')
colorInputs.forEach(element => {
    element.addEventListener('input', () => {   
        isRadialBtnActive.classList.contains('active') ? generateRadialGradientCode() : generateLinearGradientCode()  
    })
});

resetButton.addEventListener('click', () => { 
    resetValues() 
    generateLinearGradientCode()
})

const resetValues = () => {
    color3Checkbox.checked = false
    color3Values.classList.toggle('disabled')
    clrRange1.value = clrRangeValue1.value = 25
    clrRange2.value = clrRangeValue2.value = 65  
    clrRange3.value = clrRangeValue3.value = 100
    color1.value = '#F9DC5C', color2.value = '#FFFFFF', color3.value = '#000000'
    getGradientDirection('to bottom', document.querySelector('.def'))
}

const copyCodeButton = document.getElementById('copy-code')
copyCodeButton.addEventListener('click', () => {
    cssCodeText.select()
    cssCodeText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(cssCodeText.value)
})