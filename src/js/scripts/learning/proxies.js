export const ProxyHelper = (function () {

      // internal state for #inputname field
      const User = {
        id: '', //inputname
        name: ''
      };

      const LoginUser = {
        //form: '',
        nationalCode: new Array(10),
        email: '',
        doInfoChange: false,
        userName: '',
        password: '',

      }

      // bind input to object
      const inputNamedChange = function (obj) {
        if (!obj) return; // || !myObject.id || !myObject.name) return;
        Object.keys(obj).forEach(key => {
            const input = document.getElementsByName(key)[0];
            if (input)
              input.addEventListener('input', function (e) {
                obj[key] = input.value;
                console.log(obj);
              });
          });
        }

        // bind input to object
        const inputChange = function (myObject) {
          if (!myObject || !myObject.id) return;

          const input = document.getElementById(myObject.id);
          if (input)
            input.addEventListener('input', function (e) {
              myObject.name = input.value;
              console.log(myObject.name);
            });
        }

        // proxy handler
        const inputHandler = {
          set: function (target, prop, newValue) {
            if (prop == 'name' && target.id) {
              // update object property
              target[prop] = newValue;
              console.log(`Setting ${prop} from ${target[prop]} to ${newValue}`);
              // update input field value
              const input = document.getElementById(target.id);
              if (input)
                input.value = newValue;
              return true;
            } else return false;
          }
        }


        // create a profiling Proxy
        function makeProfiler(target) {

          const
            count = {},
            handler = {

              get: function (target, name) {
                if (name in target) {

                  count[name] = (count[name] || 0) + 1;
                  return target[name];
                }
              }
            };

          return {
            proxy: new Proxy(target, handler),
            count: count
          }
        };



        return {
          inputChange: inputChange,
          inputHandler: inputHandler,
          makeProfiler: makeProfiler,
          inputNamedChange,
          user: User,
          loginUser: LoginUser
        }
        // create proxy

      })();
