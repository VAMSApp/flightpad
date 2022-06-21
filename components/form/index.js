import InputComponent from './Input'
import UsernameInputComponent from './UsernameInput'
import CheckboxComponent from './Checkbox'
import ValidationErrorsComponent from './ValidationErrors'
import { Form, } from 'react-bootstrap'
import SelectInputComponent from './Select'
import TextAreaComponent from './TextArea'

export const Input = InputComponent
export const UsernameInput = UsernameInputComponent
export const Checkbox = CheckboxComponent
export const ValidationErrors = ValidationErrorsComponent
export const FormLabel = Form.Label
export const FormText = Form.Text
export const FormControl = Form.Control
export const SelectInput = SelectInputComponent
export const TextArea = TextAreaComponent

// export const Feedback = FormControl.Feedback

export default {
    Input,
    UsernameInput,
    Checkbox,
    ValidationErrors,
    FormLabel,
    FormText,
    SelectInput,
    TextArea,
}
