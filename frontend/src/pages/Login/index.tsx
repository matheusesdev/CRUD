import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password });

      if (response.status === 200) {
        const token = response.data.token;

        // Armazena o token no localStorage ou sessionStorage
        if (rememberMe) {
          localStorage.setItem('authToken', token);
        } else {
          sessionStorage.setItem('authToken', token);
        }

        // Redirecionar para o portal
        navigate('/portal');
      } else {
        setError('Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
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
          <button onClick={() => navigate(`/cadastro`)} className={`${styles.btn} ${styles['btn-primary']}`}>Cadastre-se</button>
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
            {error && <p className={styles.error}>{error}</p>}
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
