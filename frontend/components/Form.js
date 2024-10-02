import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';



// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}


const isFormValid = Yup.object().shape({
  fullName: Yup.string()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required('Full name is required'),
  size: Yup.string()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
    .required('Size is required'),
});

const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

export default function Form() {
  const [formState, setFormState] = useState({
    fullName: '',
    size: '',
    toppings: []
  });

  const [errorState, setErrorState] = useState({
    fullName: '',
    size: '',
  });

  const [submitEnabled, setSubmitEnabled] = useState(false); // for controlling the submit button status

  const [formSuccess, setFormSuccess] = useState(''); // state for success submit message
  const [formError, setFormError] = useState(''); // state for error submit message

  return (
    <form>
      <h2>Order Your Pizza</h2>
      {true && <div className='success'>Thank you for your order!</div>}
      {true && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" value={formState.fullName} onChange={(e) => setFormState({ ...formState, fullName: e.target.value })} />
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" onChange={(e) => setFormState({ ...formState, size: e.target.value })}>
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        {toppings.map((topping) => (
          <label key={topping.topping_id}>
            <input
              name={topping.text}
              type="checkbox"
              checked={formState.toppings.includes(topping.topping_id)} 
              onChange={(e) => {
                if (e.target.checked) {
                  setFormState({ ...formState, toppings: [...formState.toppings, topping.topping_id] }); 
                } else {
                  setFormState({ ...formState, toppings: formState.toppings.filter(t => t !== topping.topping_id) }); 
                }
              }}
            />
            {topping.text}<br />
          </label>
        ))}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" disabled={!submitEnabled} />
    </form>
  )
}
