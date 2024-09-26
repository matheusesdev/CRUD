import React, { useState } from 'react';
import styles from './Login.module.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@fortawesome/fontawesome-free/css/all.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  const faleConosco = () => {
    window.location.href = '/faleconosco';
  };

  return (
    <div className={styles.container}>
      <a className={styles.voltar} href="/">
        <i className="bi bi-arrow-left-short"></i>
      </a>
      <div className={`${styles.content} ${styles['first-content']}`}>
        <div className={styles['first-column']}>
          <h2 className={`${styles.title} ${styles['title-primary']}`}>Olá!</h2>
          <p className={`${styles.description} ${styles['description-primary']}`}>Você ainda não possui cadastro?</p>
          <p className={`${styles.description} ${styles['description-primary']}`}>Entre já em contato conosco</p>
          <button onClick={faleConosco} className={`${styles.btn} ${styles['btn-primary']}`}>Fale Conosco</button>
        </div>

        <div className={styles['second-column']}>
          <h2 className={`${styles.title} ${styles['title-second']}`}>Faça seu Login</h2>
          <p className={`${styles.description} ${styles['description-second']}`}>Use seu email:</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles['label-input']} htmlFor="login">
              <i className="far fa-envelope icon-modify"></i>
              <input
                type="email"
                name="login"
                placeholder="Insira seu email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </label>
            <label className={styles['label-input']} htmlFor="senha">
              <i className="fas fa-lock icon-modify"></i>
              <input
                type="password"
                name="senha"
                placeholder="Insira sua Senha"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </label>
            <label className={styles['checkbox-container']}>
              Lembrar de mim
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <span className={styles.checkmark}></span>
            </label>
            <a className={styles.password} href="/redef">Esqueceu sua senha?</a>
            <button type="submit" className={`${styles.btn} ${styles['btn-second']}`}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
