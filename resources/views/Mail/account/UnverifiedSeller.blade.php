<!DOCTYPE html>
<html>

<head>
  <title>Seller Status Update</title>
</head>

<body>
  <h1>Your account status have been changed!/h1>

    <p>Hello user,</p>
    <p>Your status is now {{ $data->is_verified == 1 ? 'Verified' : 'Not Verified' }}.</p>
    <p>{{ $data->message }}</p>
</body>

</html>