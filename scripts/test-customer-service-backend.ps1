param(
  [string]$BaseUrl,
  [string]$ChatPath,
  [string]$HealthPath,
  [string]$Query,
  [int]$Timeout = 15000,
  [switch]$HealthOnly
)

$nodeArgs = @("scripts/test-customer-service-backend.mjs", "--timeout=$Timeout")

if ($BaseUrl) {
  $nodeArgs += "--base-url=$BaseUrl"
}

if ($ChatPath) {
  $nodeArgs += "--chat-path=$ChatPath"
}

if ($HealthPath) {
  $nodeArgs += "--health-path=$HealthPath"
}

if ($Query) {
  $nodeArgs += "--query=$Query"
}

if ($HealthOnly) {
  $nodeArgs += "--health-only"
}

& node $nodeArgs
exit $LASTEXITCODE
