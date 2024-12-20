---

# User Registration API

![Alt text](./assets/image.png)
![Alt text](./assets/image2.png)


This is a simple Node.js application that allows users to sign up with an email and password. It includes email validation via Arcjet, which checks for disposable, invalid, and emails without MX records. If a user already exists or the email fails validation, the request will be rejected. The app uses session management and basic logging via Morgan.

## Features

- **User Registration:** Allows users to register with email and password.
- **Arcjet Email Validation:** Validates emails to block disposable or invalid email addresses.
- **Session Management:** Uses express-session to handle user sessions.
- **Logging:** Utilizes Morgan for HTTP request logging.

## Technologies Used

- **Node.js** (Backend JavaScript runtime)
- **Express.js** (Web framework)
- **Arcjet** (Email validation API)
- **dotenv** (Environment variable management)
- **morgan** (HTTP request logging)
- **express-session** (Session management)

## Setup & Installation

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)
- Arcjet API Key (Sign up at [Arcjet](https://arcjet.com) to get your API key)

### 1. Clone the repository

```bash
git clone https://github.com/SharonSebastian32/email-securtiy-notification.git
cd email-security-notification
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory of the project and add the following:

```bash
SECRET=your-secret-key  # A secret key for session management
ARCJET_KEY=your-arcjet-api-key  # Your Arcjet API Key
ARCJET_ENV= development # this one is compulsory one add this in local .env file
PORT=3000  # The port on which the server will run
```

Replace `your-secret-key` and `your-arcjet-api-key` with your own values.

### 4. Start the server

```bash
npm start
```

The server will be running on `http://localhost:3000`.

## API Endpoints

### `POST /signup`

This endpoint allows users to register with an email and password.

#### Request Body:

- `email`: The email address of the user (string).
- `password`: The password for the user account (string).

#### Example Request:

```bash
POST /signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Response:

- If the user does not exist and the email is valid, the response will be:
- You can get diposed email from https://temp-mail.org/

  ```json
  {
    "message": "User registered successfully",
    "email": "user@example.com"
  }
  ```

- If the email is disposable, invalid, or has no MX records, the response will be:

  ```json
  {
    "error": "Forbidden",
    "reason": "Invalid or disposable email"
  }
  ```

- If the user already exists, the response will be:

  ```json
  {
    "message": "User already exists"
  }
  ```

### `GET /`

This endpoint returns a simple "Ok Done" response to check if the server is running.

#### Example Response:

```text
Ok Done
```

## How the Email Validation Works

The email validation is performed using **Arcjet**'s API. It checks the following:

- **Disposable Emails:** Rejects emails from temporary email providers.
- **Invalid Emails:** Rejects emails that don't exist or are malformed.
- **No MX Records:** Rejects emails that don't have MX (Mail Exchange) records, meaning they can't receive emails.

If any of these checks fail, the API will return a `403 Forbidden` response.

## Logging

Morgan is used for logging HTTP requests. You can see the logs in the console, which help monitor incoming requests and responses.

## Session Management

The app uses **express-session** for session handling. A session is created when the user interacts with the application, allowing for potential future use of features like authentication or user-specific data.

## Contributing

Feel free to fork the repository, create an issue, or open a pull request. Any contributions to improve this app are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

```
THANK YOU TEAM Arcjet)-> for Such an Application 👌👌
```

This `README.md` provides clear instructions on how to install, run, and use the app, as well as a brief explanation of the Arcjet integration and the email validation logic. Feel free to modify it according to your project's specific needs!
