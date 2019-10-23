import { escapeForHTML } from './common/utils';
import { ProxyHelper as proxy } from './learning/proxies';
export default function() {
  const state = {
    form: '',
    nationalCode: new Array(10),
    email: '',
    doInfoChange: false,
    userName: '',
    password: '',
    repeatedpasswor: '',
  };

  const _dom = {
    empty: 'js-empty-field',
    invalid: 'js-invalid-field',
    editInfoInputs: 'edit-login-info-input',
  };

  let id_inputs = [];
  let form = null;
  let mail_input = null;
  var pass,
    repeatPass,
    userName = null;

  document.addEventListener('DOMContentLoaded', function() {
    proxy.inputNamedChange(state);
    document
      .querySelectorAll('.form-1char')
      .forEach(el => id_inputs.push(el.getElementsByTagName('input')[0]));
    form = document.getElementById('information_form');
    mail_input = document.getElementById('mail_input');
    pass = document.getElementById('password');
    repeatPass = document.getElementById('confirm_password');
    userName = document.getElementById('user_name');

    // Bind national code custom behaviour
    if (id_inputs.length)
      id_inputs.forEach(input => {
        input.addEventListener('keypress', focusNext);
        input.addEventListener('keydown', focusPrevios);
        input.addEventListener('input', inputCharCheck);
        input.addEventListener('keypress', validateNcInput);
      });

    // sniff  input event on the entire form
    form.addEventListener('input', () => {
      let target = event.target;
      setTimeout(() => validationOnSubmit(), 0);
      if (event.target.tagName === 'INPUT') {
        //console.log(state.getNationalCode())
        switch (target.type) {
          case 'checkbox':
            var editInfoInputs = document.querySelectorAll(
              '.' + _dom.editInfoInputs
            );
            if (target.checked) {
              editInfoInputs.forEach(input =>
                input.setAttribute('required', '')
              );
              checkPasswordsAreValidate();
              state.doInfoChange = true;
            } else {
              editInfoInputs.forEach(input => {
                input.removeAttribute('required');
                input.setCustomValidity('');
              });
              state.doInfoChange = false;
            }
            break;
          case 'email':
            if (target.value === '')
              target.setCustomValidity('وارد نمودن کد ملی الزامیست');
            if (target.value !== '' && target.validity.typeMismatch)
              target.setCustomValidity('ايميل نامعتبر است.');
            if (!target.validity.typeMismatch) target.setCustomValidity('');
            break;
        }
      }
    });

    // bind submit button
    // form.onsubmit = function () {

    // }
    document
      .getElementById('submit_login_information')
      .addEventListener('click', async () => {
        //event.preventDefault();
        var isFormValid = true;
        if (validateNcInput()) {
          if (!validateFakeNationalCode()) {
            return;
          }
        } else return;
        validationOnSubmit();

        // remove html and reduce injection vulnerability
        document.querySelectorAll('.js-input-selector').forEach(el => {
          if (!el.checkValidity()) {
            //console.log(el);
            isFormValid = false;
          }
          el.value ? (el.value = escapeForHTML(el.value)) : false;
        });

        if (isFormValid) {
          event.preventDefault();
          event.stopImmediatePropagation();
          const isUserNameValidate = await checkUserNameAvability();

          if (isUserNameValidate === 1) {
            setUserNameValidation(true);
            if (form.checkValidity()) {
              document.getElementById(
                'nationalCode'
              ).value = state.nationalCode.slice().join('');
              // document.getElementById(
              //     'nationalCode'
              // ).text = state.nationalCode.slice().join('');
              form.submit();
            }
          } else {
            setUserNameValidation(false);
            //userName.setCustomValidity("نام کاربری تکراری می باشد");
            //userName.focus();
            //form.checkValidity();
            let notif = document.getElementById('form_Notification');
            notif.innerHTML = userName.validationMessage;
            (notif.style = 'display'), 'block';
            setTimeout(() => (notif.style = 'display:none'), 3500);
          }
        }
        // else
        //     console.log("form not valid")
      });
  });

  function validateNcInput() {
    let isFull = true;
    id_inputs.forEach(input => {
      if (input.value === '') {
        //input.setAttribute("required", "");
        //input.setCustomValidity("وارد نمودن کد ملی الزامیست");
        isFull = false;
      } else {
        input.removeAttribute('required');
        input.setCustomValidity('');
      }
    });

    if (!isFull) {
      id_inputs[9].setCustomValidity('وارد نمودن کد ملی الزامیست');
      id_inputs[9].setAttribute('required', '');
    }
    //console.log(isFull ? "national code isFull" : "empty national code")
    return isFull;
  }

  //bind submit button
  function validationOnSubmit() {
    //console.log(mail_input.value)
    if (mail_input.value === '') {
      mail_input.setAttribute('required', '');
      mail_input.setCustomValidity('وارد نمودن ایمیل الزامی میباشد');
      //return false;
    }

    if (!validateNcInput()) return;

    if (state.doInfoChange) {
      // console.log(userName.text)

      if (state.userName !== '') {
        userName.setCustomValidity('');
        checkPasswordsAreValidate();
      } else {
        userName.setCustomValidity(
          'جهت تغییر رمز نام کاربری خود را وارد نمایید'
        );
        return false;
      }
    }
  }

  const checkUserNameAvability = () => {
    return 1;
    // new Promise(function(resolve, reject) {
    //   //console.log(state.userName)
    //   fetch(`/api/Account/UserNameAlreadyExists?userName=${state.userName}`)
    //     .then(response => response.json())
    //     .then(result => resolve(result));
    // });
  };
  function checkPasswordsAreValidate() {
    if (pass.value && repeatPass.value)
      if (pass.value !== repeatPass.value) {
        pass.setCustomValidity('مقادیر وارد شده برای رمز منطبق نمیباشند');
        repeatPass.setCustomValidity('مقادیر وارد شده برای رمز منطبق نمیباشند');
      } else {
        pass.setCustomValidity('');
        repeatPass.setCustomValidity('');
      }
    else {
      pass.setCustomValidity('جهت تغییر رمز ،مقادیر مشخص شده را وارد نمایید');
      repeatPass.setCustomValidity(
        'جهت تغییر رمز، مقادیر مشخص شده را وارد نمایید'
      );
    }
  }

  function setUserNameValidation(TRUE = false) {
    if (TRUE) {
      userName.setCustomValidity('');
      //return true;
    } else {
      userName.setCustomValidity('نام کاربری تکراری می باشد');
      //console.log("user not avalable");
      //return false;
    }
  }

  function inputCharCheck() {
    let elem = event.target;
    elem.value = elem.value.replace(/[^0-9]/g, '');
  }

  function focusNext() {
    let elem = event.target;
    var temp = elem.value;
    var x = event.which || event.keyCode;
    // alert (x);
    if (x > 47 && x < 58) {
      elem.value = null;
      elem.value = String.fromCharCode(x);
      elem.id < 9
        ? document.getElementById(Number(elem.id) + 1).focus()
        : false;
      //console.log(elem.id)
      state.nationalCode[elem.id] = elem.value;
    } else {
      //console.log(elem.id)
      elem.value = temp;
      state.nationalCode[elem.id] = temp;
    }
  }

  function focusPrevios() {
    let elem = event.target;
    //  var temp = elem.value;
    var x = event.which || event.keyCode;
    // alert(x);
    if (x == 8) {
      elem.id > 0
        ? document.getElementById(Number(elem.id) - 1).focus()
        : false;
      elem.value = elem.text = '';
    } else if (x == 46) {
      //console.log(elem.id)
      elem.value = elem.text = '';
    }
  }

  function validateFakeNationalCode() {
    let code = state.nationalCode.slice().join(''); //.reverse().join("");
    //console.log(code)
    if (code.length == 10) {
      if (NCodeValidityChecker(code)) {
        //console.log("right")
        id_inputs.forEach(el => el.setCustomValidity(''));
        return true;
      } else {
        //console.log("wrong")
        id_inputs[9].setCustomValidity('کد ملی وارد شده صحیح نمی باشد');
        return false;
      }
    } else return false;
  }

  function NCodeValidityChecker(code) {
    var L = code.length;
    if (
      L < 8 ||
      parseInt(code, 10) == 0 ||
      code == '0000000000' ||
      code == '1111111111' ||
      code == '2222222222' ||
      code == '3333333333' ||
      code == '4444444444' ||
      code == '5555555555' ||
      code == '6666666666' ||
      code == '7777777777' ||
      code == '8888888888' ||
      code == '9999999999'
    )
      return false;
    code = ('0000' + code).substr(L + 4 - 10);
    if (parseInt(code.substr(3, 6), 10) == 0) return false;
    var c = parseInt(code.substr(9, 1), 10);
    var s = 0;
    for (var i = 0; i < 9; i++) s += parseInt(code.substr(i, 1), 10) * (10 - i);
    s = s % 11;
    return (s < 2 && c == s) || (s >= 2 && c == 11 - s);
  }
}
