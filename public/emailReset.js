const newPasswordRequestButton = document.getElementById('newPasswordRequestButton')
newPasswordRequestButton.addEventListener(click, sendMail)
const sendMail = () => {
    const mailAdress = 'hunternancym@gmail.com'
    
    const subject = encodeURIComponent("This is my subject")
    const body = encodeURIComponent('hi')
    const  link= `mailto:${mailAdress}&subject=${subject}&body=${body}`
    window.location.href = link;
  }
  
  //document.getElementById('exampleInputEmail1').value