- The Figma designs allow for login with either username or email, but the API only authenticates logins via email
- Inconsistent use of green (& its variants) in the Figma designs
- The data returned by the API is not consistent with what was expected from the GOOGLE DOC documentation file [here](https://docs.google.com/document/d/1EkJDWWDLzp-2TBZjBOan1BIyf-1yk9k974s7LtPeJ1w/edit)
- - Specifically, the `data` object returned by the API from `/api/v1/base/profile`
- The user's profile picture returned in `data.avatar` does not resolve into an image. It is a URL to an image that does not exist 
- There's no provision in the Figma designs for an input field where the user can provide a link to their profile picture
- THe avatar upload functionality is not implemented in the API

___
#### Test user:
> email: jg@user.com
> password: jGalaxy123