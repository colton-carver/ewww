"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import Head from "next/head"
import styles from "../../styles/Admin.module.css"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    })

    if (result.error) {
      setError("Invalid username or password")
    } else {
      router.replace("/admin")
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login - Alice in Greekland</title>
      </Head>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1>Admin Login</h1>
          <form onSubmit={handleSubmit}>
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

