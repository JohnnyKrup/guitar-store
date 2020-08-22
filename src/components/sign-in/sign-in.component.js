import React from "react"
import FormInput from "../form-input/form-input.component"
import "./sign-in.styles.scss"
import CustomButton from "../custom-button/custom-button.component"

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
    }
  }

  handleSubmit = (event) => {
    /**
     * we want a custom submit handling, that's why we want
     * to prevent the deafult behavior first and then code
     * what we want the submit to do.
     */
    event.preventDeafult()

    this.setState({ email: "", password: "" })
  }

  handleChange = (event) => {
    const { value, name } = event.target
    /**
     * if the event.target comes from the email field
     * name: email / value: what was typed in into the email field
     * same for password
     *
     * we set the property name dynamically, so that we don't
     * have to write the same code for each input field
     */
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className="sign-in">
        <h2>Ich habe bereits ein Konto</h2>
        <span>Mit Email und Passwort anmelden</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Passwort"
            required
          />

          <CustomButton type="submit">Anmelden</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignIn
