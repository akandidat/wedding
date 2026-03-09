<?php
// Настройки Telegram
$token = "8606294591:AAEd-USitJFB7cMv_GsQsN_waHjKOwnhER8";
$chat_id = "-1003845728595"; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim(strip_tags($_POST['name'] ?? ''));
    $attendance = trim(strip_tags($_POST['attendance'] ?? ''));
    
    if ($attendance === "Не смогу") {
        $message = "😔 <b>Отказ от приглашения</b>\n";
        $message .= "👤 <b>Имя:</b> {$name}\n";
        $message .= "❌ Не сможет присутствовать.";
    } else {
        $partner = !empty($_POST['partner']) ? trim(strip_tags($_POST['partner'])) : "Нет";
        $kids = trim(strip_tags($_POST['kids'] ?? 'Нет'));
        $kids_count = !empty($_POST['kids_count']) ? trim(strip_tags($_POST['kids_count'])) : "0";

        $message = "✅ <b>Новое подтверждение!</b>\n";
        $message .= "👤 <b>Имя:</b> {$name}\n";
        $message .= "💍 <b>Придет:</b> {$attendance}\n";
        $message .= "👥 <b>Спутник:</b> {$partner}\n";
        $message .= "👶 <b>С детьми:</b> {$kids} (Кол-во: {$kids_count})";
    }

    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    $data = [
        'chat_id' => $chat_id,
        'text' => $message,
        'parse_mode' => 'html'
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $res = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code == 200) {
        echo "OK";
    } else {
        http_response_code(500);
        echo "Error: " . $res;
    }
} else {
    http_response_code(403);
    echo "Access Denied";
}
?>