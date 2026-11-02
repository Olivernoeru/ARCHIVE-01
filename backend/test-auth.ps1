$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc5MTgxNjI3NSwiZXhwIjoxNzkyNDIxMDc1fQ.uS0L81u8QJGgNzLdhe1GdoeT6778lP1Uzzo6EwSS1m4"

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$body = @"
{
  "email": "newemail@example.com"
}
"@

$response = Invoke-WebRequest -Uri 'http://localhost:5000/api/auth/profile' -Method PUT -Headers $headers -Body $body -UseBasicParsing
$response.Content