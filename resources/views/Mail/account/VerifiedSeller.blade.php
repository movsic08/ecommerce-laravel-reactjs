<!DOCTYPE html>
<html>

<head>
  <title>Seller Status Updated</title>
</head>

<body>
  <h1>Your status has been updated</h1>

  <p>Hello Seller,</p>
  <p>Your status is now {{ $sellerData->is_verified == 1 ? 'Verified' : 'Not Verified' }}.</p>
</body>

</html>