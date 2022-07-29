import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { APP_NAME } from "../config/app";
import config from "../config/firebase";
import Cookies from 'js-cookie';
import Seo from "../components/Seo";
import Alert from "../components/Alert";
import { initializeApp } from "firebase/app";

const initForm = {
  email: '', password: ''
}

const Home = () => {
  const router = useRouter();

  const [form, setForm] = useState(initForm);
  const [error, setError] = useState(false);

  const app = initializeApp(config);
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
    <>
      <Seo title={'Welkom'} description={'Welkom terug op My Admin. Login om verder te gaan.'} />
      <div className='mt-20'>
        <section className='intro'>
          <h1 className="text-3xl mb-5">Welkom terug</h1>
          <p>Welkom terug op {APP_NAME}! Login met uw gegevens om door te gaan.</p>
        </section>
        <section>
          <form onSubmit={handleSubmit}>
            {error && <Alert
              description={'Onjuist e-mailadres/wachtwoord'}
              iconClass={'error'}
            />}
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
    </>
  )
}

export default Home;

export async function getServerSideProps(context) {
  const { fb_admin_uid } = context.req.cookies;
  const isTokenValid = fb_admin_uid === process.env.FB_ADMIN_UID;

  if (isTokenValid) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard'
      },
      props: {},
    }
  }

  return {
    props: {},
  }
}