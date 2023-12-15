<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Temporary Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #ffffff;
            background-color: #083344;
            padding: 1.55rem 3.125rem
        }

        p {
            color: #666666;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 3px;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Academic Support</h2>
        <p>Hello Admin,</p>
        <p>Your new password is: <strong>{{ $new_password }}</strong></p>
        <p>Please log in using this Password.</p>        
    </div>

</body>
</html>
