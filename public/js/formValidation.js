function testSubmit()
{
  var name = document.getElementsByName('contact-form')[0]["Name"];
  var email = document.getElementsByName('contact-form')[0]["Email"];
  var subject = document.getElementsByName('contact-form')[0]["Subject"];
  var message = document.getElementsByName('contact-form')[0]["Message"];

  if(name.value === '' || email.value === '' ||
     subject.value === '' || message.value === '')
  {
    alert('Not allowed!!');
    return false;
  }
  return true;
}

function submitForm()
{
  console.log('called submit function')
  if(testSubmit())
  {
    document.getElementsByName('contact-form')[0].submit(); //first submit
    document.getElementsByName('contact-form')[0].reset(); //and then reset the form values
  }
}
