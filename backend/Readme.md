# User Registration API

## Endpoint

### Register New User

**URL**

```http
POST /users/register
```

**Description**

Creates a new user account in the system. The endpoint validates user input, hashes the password using bcrypt, stores the user in MongoDB, and returns a JWT authentication token along with the created user information.

---

## Request Body

### Content-Type

```http
Content-Type: application/json
```

### Required Fields

| Field     | Type   | Required | Description                                         |
| --------- | ------ | -------- | --------------------------------------------------- |
| firstname | String | Yes      | User's first name (minimum 3 characters)            |
| lastname  | String | No       | User's last name (minimum 3 characters if provided) |
| email     | String | Yes      | Valid email address                                 |
| password  | String | Yes      | Password with minimum 8 characters                  |

### Example Request

```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

---

## Successful Response

### Status Code

```http
201 Created
```

### Response Body

```json
{
    "token": "jwt_token_here",
    "user": {
        "_id": "6854b4a8b7f0f1f9d8f4a123",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john@example.com",
        "createdAt": "2026-06-20T10:00:00.000Z",
        "updatedAt": "2026-06-20T10:00:00.000Z"
    }
}
```

---

## Validation Rules

### First Name

* Required
* Must contain at least 3 characters

Example:

```json
{
    "firstname": "Joh"
}
```

---

### Email

* Required
* Must be a valid email address

Valid Example:

```json
{
    "email": "john@example.com"
}
```

Invalid Example:

```json
{
    "email": "johnexample.com"
}
```

---

### Password

* Required
* Minimum length: 8 characters

Valid Example:

```json
{
    "password": "password123"
}
```

Invalid Example:

```json
{
    "password": "12345"
}
```

---

## Error Responses

### Validation Error

**Status Code**

```http
400 Bad Request
```

**Response**

```json
{
    "errors": [
        {
            "msg": "Invalid email",
            "path": "email"
        }
    ]
}
```

---

### Missing Required Fields

**Status Code**

```http
400 Bad Request
```

**Response**

```json
{
    "message": "All fields are required"
}
```

---

### Internal Server Error

**Status Code**

```http
500 Internal Server Error
```

**Response**

```json
{
    "message": "Internal Server Error"
}
```

---

## Security Features

* Passwords are hashed using bcrypt before storage.
* Password field is excluded from query results using `select: false`.
* JWT token is generated upon successful registration.
* JWT token expires after 7 days.

---

## User Schema

```javascript
{
    fullname: {
        firstname: String,
        lastname: String
    },
    email: String,
    password: String,
    socketId: String
}
```
 