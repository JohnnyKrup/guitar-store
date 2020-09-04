import React, { useState } from "react"

import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils"

import "./sign-up.styles.scss"

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const { displayName, email, password, confirmPassword } = userCredentials

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert("Die beiden Passworte stimmen nicht überein.")
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      /**
       * by adding the displayName as an object {displayName}
       * it creates a key: value pair out of it
       */
      createUserProfileDocument(user, { displayName })

      // this will clear the form
      setUserCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className="sign-up">
      <h2 className="title">Ich habe noch kein Konto</h2>
      <span>Mit Email und Passwort anmelden</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          label="Benutzername"
          onChange={handleChange}
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          label="Email"
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          label="Passwort"
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          label="Passwort wiederholen"
          onChange={handleChange}
          required
        />
        <CustomButton type="submit">ANMELDEN</CustomButton>
      </form>
    </div>
  )
}

export default SignUp
