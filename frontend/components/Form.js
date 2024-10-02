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

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [formSuccess, setFormSuccess] = useState(''); 
  const [formError, setFormError] = useState(''); 

  const [sizeChanged, setSizeChanged] = useState(false); // Track if size has been changed

  useEffect(() => {
    // Validate form on state change
    const validateForm = async () => {
      try {
        await isFormValid.validate(formState, { abortEarly: false });
        setErrorState({ fullName: '', size: '' });
        setSubmitEnabled(true);
      } catch (err) {
        const errors = {};
        err.inner.forEach(error => {
          errors[error.path] = error.message;
        });
        setErrorState(errors);
        setSubmitEnabled(false);
      }
    };
    validateForm();
  }, [formState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitEnabled) {
      setFormSuccess(`Thank you for your order, ${formState.fullName}! Your ${formState.size === 'S' ? 'Small' : formState.size === 'M' ? 'Medium' : 'Large'} pizza with ${formState.toppings.length > 0 ? formState.toppings.length + ' toppings' : 'no toppings'} is on the way.`);
      setFormError('');
      
      // Reset form state and error state
      setFormState({ fullName: '', size: '', toppings: [] }); // Reset size to empty string
      setErrorState({ fullName: '', size: '' }); // Reset error state
      setSizeChanged(false); // Reset size changed state
    } else {
      setFormError('Please fix the errors before submitting.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {formSuccess && <div className='success'>{formSuccess}</div>}
      {formError && <div className='failure'>{formError}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" value={formState.fullName} 
            onChange={(e) => {
              setFormState({ ...formState, fullName: e.target.value.trim() }); // Trim whitespace
              // No need to track touched state
            }} 
          />
        </div>
        {formState.fullName && errorState.fullName && <div className='error'>{errorState.fullName}</div>} 
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" value={formState.size} onChange={(e) => {
              const newSize = e.target.value;
              setFormState({ ...formState, size: newSize });
              setSizeChanged(true); // Mark size as changed

              // Show error if changing from a valid size to empty
              if (newSize === '') {
                setErrorState((prev) => ({ ...prev, size: validationErrors.sizeIncorrect }));
              } else {
                setErrorState((prev) => ({ ...prev, size: '' })); // Clear error if valid size is selected
              }
            }}>
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {sizeChanged && formState.size === '' && errorState.size && <div className='error'>{errorState.size}</div>} 
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
      <input type="submit" disabled={!submitEnabled} />
    </form>
  )
}
