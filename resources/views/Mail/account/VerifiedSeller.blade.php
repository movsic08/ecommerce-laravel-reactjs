<!DOCTYPE html>
<html>

<head>
  <title>Seller Status Updated</title>
</head>

<body>
  <h1>Your status has been updated</h1>

  <p>Hello Seller,</p>
  <p>Your current status is: <strong>{{ $sellerData->is_verified == 1 ? 'Verified' : 'Not Verified' }}</strong>.</p>
  <p>Please log in to your account to complete the data update process. Once your information is up to date, you will be able to start uploading your products.</p>
</body>

</html>