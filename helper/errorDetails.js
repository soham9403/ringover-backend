const errorDetails = {
  required: ' is required.',
  invalid_mobile:'Mobile no. is invalid.',
  invalid_email:'Email Id is invalid.',
  name_is_long:"Name should be less than 80 character.",
  validation_error:'Validation error.',
  something_wrong:"Something went wrong.",
  email_exist:"Email already exist.",
  wrong_password:'Password is wrong.',
  user_not_found:'User is not registered.',
  color_not_found:'color is not registered.',
  category_not_found:'category is not registered.',
  token_tempered:"Token is temperred or user is deleted.",
  slug_exists:"Slug already exist",
  parent_customize_not_found:"Parent customize not foound.",
  page_not_found:"Page not found",
  cart_not_found:"Cart not found"
}

export const getErorr = (error_code = '') => {
  if (error_code.search('_required') != -1) {
    const field = error_code.replace('_required', '').replace('_', ' ')
    
    return (
      field.charAt(0).toUpperCase() + field.slice(1) + errorDetails.required
    )
  } else {
    return errorDetails[error_code]
  }
}
