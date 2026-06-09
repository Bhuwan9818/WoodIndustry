<?php
/**
 * WoodCraft Pallets – Enquiry Form Handler
 * File: enquiry.php
 *
 * Setup:
 *  1. Upload to same folder as contact.html
 *  2. Update $config values below (email, SMTP settings)
 *  3. Set RECAPTCHA_SECRET if using Google reCAPTCHA (optional)
 */

// ─── CONFIGURATION ────────────────────────────────────────────────
$config = [
    'to_email'     => 'enquiry@woodcraftpallets.com',   // ← Your enquiry email
    'to_name'      => 'WoodCraft Pallets Enquiries',
    'from_email'   => 'noreply@woodcraftpallets.com',   // ← Your domain email
    'from_name'    => 'WoodCraft Pallets Website',
    'subject_prefix' => '[Website Enquiry]',
    'allowed_origin' => 'https://www.woodcraftpallets.com', // ← Your domain
    'rate_limit'   => true,        // Enable simple rate limiting
    'rate_limit_sec' => 60,        // Min seconds between submissions from same IP
    'max_message_len' => 2000,     // Max characters for message field
];

// ─── HEADERS ──────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// ─── CORS / METHOD CHECK ──────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// ─── RATE LIMITING (session-based, simple) ────────────────────────
if ($config['rate_limit']) {
    session_start();
    $now = time();
    $lastSubmit = $_SESSION['wcp_last_submit'] ?? 0;
    if (($now - $lastSubmit) < $config['rate_limit_sec']) {
        http_response_code(429);
        echo json_encode(['status' => 'error', 'message' => 'Please wait before submitting again.']);
        exit;
    }
}

// ─── SANITIZE INPUT ────────────────────────────────────────────────
function sanitize(string $input, int $maxLen = 255): string {
    $clean = trim($input);
    $clean = strip_tags($clean);
    $clean = htmlspecialchars($clean, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    return substr($clean, 0, $maxLen);
}

function sanitizeEmail(string $input): string {
    return filter_var(trim($input), FILTER_SANITIZE_EMAIL);
}

// ─── COLLECT & VALIDATE ────────────────────────────────────────────
$errors = [];

$name     = sanitize($_POST['name'] ?? '');
$company  = sanitize($_POST['company'] ?? '');
$email    = sanitizeEmail($_POST['email'] ?? '');
$phone    = sanitize($_POST['phone'] ?? '');
$product  = sanitize($_POST['product'] ?? '');
$quantity = sanitize($_POST['quantity'] ?? '');
$location = sanitize($_POST['location'] ?? '');
$message  = sanitize($_POST['message'] ?? '', $config['max_message_len']);
$consent  = isset($_POST['consent']) ? true : false;

// Required field validation
if (strlen($name) < 2) $errors[] = 'Valid name is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email address is required.';
if (strlen($phone) < 7) $errors[] = 'Valid phone number is required.';
if (empty($product)) $errors[] = 'Please select a product.';
if (empty($quantity)) $errors[] = 'Please select a quantity.';
if (!$consent) $errors[] = 'You must consent to be contacted.';

// Anti-spam: honeypot check (add hidden field 'website' in form if desired)
if (!empty($_POST['website'] ?? '')) {
    // Bot detected — silently succeed
    echo json_encode(['status' => 'success', 'message' => 'Enquiry received.']);
    exit;
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'errors' => $errors]);
    exit;
}

// ─── BUILD EMAIL ───────────────────────────────────────────────────
$subject = $config['subject_prefix'] . ' ' . $product . ' – ' . $name;

$emailBody = "
=================================================================
  NEW PRODUCT ENQUIRY – WoodCraft Pallets Website
=================================================================

CUSTOMER DETAILS:
-----------------
Name:     {$name}
Company:  " . ($company ?: '(Not provided)') . "
Email:    {$email}
Phone:    {$phone}

ENQUIRY DETAILS:
----------------
Product Interested In: {$product}
Quantity Required:     {$quantity}
Delivery Location:     " . ($location ?: '(Not specified)') . "

ADDITIONAL REQUIREMENTS:
------------------------
" . ($message ?: '(None provided)') . "

=================================================================
  Submission Details
=================================================================
Date/Time: " . date('d M Y, H:i:s T') . "
IP Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "
User Agent: " . substr($_SERVER['HTTP_USER_AGENT'] ?? 'unknown', 0, 200) . "
=================================================================

Please respond to this customer within 24 hours.
Reply to: {$name} <{$email}>
";

// ─── HTML EMAIL VERSION ────────────────────────────────────────────
$htmlBody = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'><title>New Enquiry</title></head>
<body style='font-family: Arial, sans-serif; color: #333; max-width: 640px; margin: 0 auto;'>
  <div style='background: #2C1810; padding: 24px 32px;'>
    <h1 style='color: #fff; font-size: 20px; margin: 0;'>⬡ WoodCraft Pallets</h1>
    <p style='color: rgba(255,255,255,0.7); font-size: 13px; margin: 4px 0 0;'>New Website Enquiry</p>
  </div>
  <div style='background: #C8922A; padding: 16px 32px;'>
    <h2 style='color: #fff; font-size: 16px; margin: 0;'>Product: {$product}</h2>
    <p style='color: rgba(255,255,255,0.85); font-size: 13px; margin: 4px 0 0;'>Quantity: {$quantity}</p>
  </div>
  <div style='padding: 32px; background: #fff;'>
    <table style='width: 100%; border-collapse: collapse;'>
      <tr>
        <td style='padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #888; width: 140px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;'>Name</td>
        <td style='padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;'>{$name}</td>
      </tr>
      " . ($company ? "<tr>
        <td style='padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;'>Company</td>
        <td style='padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;'>{$company}</td>
      </tr>" : '') . "
      <tr>
        <td style='padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;'>Email</td>
        <td style='padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;'><a href='mailto:{$email}' style='color: #C8922A;'>{$email}</a></td>
      </tr>
      <tr>
        <td style='padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;'>Phone</td>
        <td style='padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;'><a href='tel:{$phone}' style='color: #C8922A;'>{$phone}</a></td>
      </tr>
      " . ($location ? "<tr>
        <td style='padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;'>Delivery Location</td>
        <td style='padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;'>{$location}</td>
      </tr>" : '') . "
    </table>
    " . ($message ? "
    <div style='margin-top: 24px; padding: 20px; background: #f9f5f0; border-radius: 8px; border-left: 4px solid #C8922A;'>
      <h4 style='margin: 0 0 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #888;'>Additional Requirements</h4>
      <p style='margin: 0; font-size: 14px; line-height: 1.6;'>{$message}</p>
    </div>" : '') . "
  </div>
  <div style='padding: 20px 32px; background: #f0ebe3; font-size: 12px; color: #888;'>
    <p style='margin: 0;'>Submitted: " . date('d M Y, H:i T') . " · IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "</p>
    <p style='margin: 8px 0 0;'>Please reply to this customer within 24 hours.</p>
  </div>
</body>
</html>
";

// ─── SEND EMAIL ────────────────────────────────────────────────────
$boundary = md5(time());
$headers  = implode("\r\n", [
    "From: {$config['from_name']} <{$config['from_email']}>",
    "Reply-To: {$name} <{$email}>",
    "X-Mailer: PHP/" . phpversion(),
    "MIME-Version: 1.0",
    "Content-Type: multipart/alternative; boundary=\"{$boundary}\"",
]);

$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $emailBody . "\r\n\r\n";
$body .= "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $htmlBody . "\r\n\r\n";
$body .= "--{$boundary}--";

$sent = mail(
    $config['to_email'],
    $subject,
    $body,
    $headers
);

// ─── AUTO-REPLY TO CUSTOMER ────────────────────────────────────────
if ($sent) {
    $autoReplySubject = "Thank you for your enquiry – WoodCraft Pallets";
    $autoReplyBody = "Dear {$name},

Thank you for reaching out to WoodCraft Pallets!

We have received your enquiry for: {$product} ({$quantity}).

Our team will review your requirements and get back to you within 24 business hours with a detailed quote and any follow-up questions.

In the meantime, feel free to reach us directly:
📞 Phone / WhatsApp: +91-98765-43210
✉️ Email: enquiry@woodcraftpallets.com
⏰ Business Hours: Monday–Saturday, 9:00 AM – 6:00 PM IST

Thank you for considering WoodCraft Pallets.

Warm regards,
The WoodCraft Pallets Team
---
WoodCraft Pallets
Industrial Area, Sector 5, Delhi – 110001
www.woodcraftpallets.com";

    $autoHeaders = implode("\r\n", [
        "From: {$config['to_name']} <{$config['to_email']}>",
        "Reply-To: {$config['to_email']}",
        "X-Mailer: PHP/" . phpversion(),
        "Content-Type: text/plain; charset=UTF-8",
    ]);

    mail($email, $autoReplySubject, $autoReplyBody, $autoHeaders);
}

// ─── RATE LIMIT UPDATE ─────────────────────────────────────────────
if ($config['rate_limit'] && isset($_SESSION)) {
    $_SESSION['wcp_last_submit'] = time();
}

// ─── OPTIONAL: LOG TO FILE ─────────────────────────────────────────
$logFile = __DIR__ . '/enquiry-log.txt';
$logEntry = date('Y-m-d H:i:s') . " | {$name} | {$email} | {$phone} | {$product} | {$quantity}" . PHP_EOL;
@file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);

// ─── RESPONSE ──────────────────────────────────────────────────────
if ($sent) {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Enquiry sent successfully. We will contact you within 24 hours.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Mail server error. Please contact us directly at enquiry@woodcraftpallets.com']);
}
?>
