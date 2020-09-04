import React, { useState } from "react"

import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"

import { auth, signInWithGoogle } from "../../firebase/firebase.utils"

import "./sign-in.styles.scss"

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  })

  const { email, password } = userCredentials

  /**
   * For the sign in process with email and password
   * we need to extend this method and make it async
   * @param {*} event
   */
  const handleSubmit = async (event) => {
    /**
     * we want a custom submit handling, that's why we want
     * to prevent the deafult behavior first and then code
     * what we want the submit to do.
     */
    event.preventDefault()

    try {
      // use the firebase method to sign in, if it does not work catch the error
      await auth.signInWithEmailAndPassword(email, password)
      // if it worked, clear the form
      setUserCredentials({ email: "", password: "" })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    const { value, name } = event.target
    /**
     * if the event.target comes from the email field
     * name: email / value: what was typed in into the email field
     * same for password
     *
     * we set the property name dynamically, so that we don't
     * have to write the same code for each input field
     */
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className="sign-in">
      <h2>Ich habe bereits ein Konto</h2>
      <span>Mit Email und Passwort anmelden</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="Passwort"
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Anmelden</CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            Mit Google anmelden
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignIn
