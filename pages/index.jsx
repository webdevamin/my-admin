import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import config from "../config/firebase";
import Cookies from 'js-cookie';
import Seo from "../components/Seo";
import Alert from "../components/Alert";
import { initializeApp } from "firebase/app";
import Lottie from "lottie-react";
import admin from "/public/admin.json";

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
        Cookies.set('fb_admin_uid', user.uid);
        router.push('/dashboard');
      }
    });
  }, [auth, router]);

  return (
    <>
      <Seo title={'Welkom'} description={'Welkom terug op My Admin. Login om verder te gaan.'} />
      <div className='h-screen -my-8 flex flex-col justify-center py-10'>
        <div className="w-10/12 mx-auto">
          <Lottie animationData={admin} loop={true} />
        </div>
        <div className="mt-8">
          <section className="mb-7 text-center">
            <h1 className="mb-2">
              Welkom op My Admin
            </h1>
            <p>Login om verder te gaan</p>
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