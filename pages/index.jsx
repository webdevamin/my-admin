import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APP_NAME } from "../config/app";
import app from "../config/firebase";
import Cookies from 'js-cookie';

const initForm = {
  email: '', password: ''
}

const Home = () => {
  const router = useRouter();
  const [form, setForm] = useState(initForm);
  const [error, setError] = useState(false);
  const auth = getAuth(app);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => setError(false))
      .catch((err) => {
        setError(true);

        console.log(err.code)
        console.log(err.message)
      })

    setForm(initForm);
  }

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!Cookies.get('fb_admin_uid')) {
          Cookies.set('fb_admin_uid', user.uid);
        }
        router.push('/dashboard');
      }
    });
  }, [auth, router]);

  return (
    <div className='mt-20'>
      <section className='intro'>
        <h1 className="text-3xl mb-5">Welkom terug</h1>
        <p>Welkom terug op {APP_NAME}! Login met uw gegevens om door te gaan.</p>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          {
            error && (
              <div className='error'>
                <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation"
                  className='error_icon' />
                <p className="error_text" role="alert">
                  Onjuiste e-mailadres/wachtwoord
                </p>
              </div>
            )
          }
          <div>
            <div className="input_container">
              <label htmlFor="email">
                Email address
              </label>
              <input type="email" name="email" id="email" required
                placeholder='E-mailadres' value={form.email}
                onChange={handleChange} />
            </div>
            <div className="input_container">
              <label htmlFor="password">
                Password
              </label>
              <input type="password" name="password" id="password" required
                placeholder='Wachtwoord' value={form.password}
                onChange={handleChange} />
            </div>
          </div>

          <div>
            <button type="submit" className='btn_shadow'>
              <span>Inloggen</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Home;