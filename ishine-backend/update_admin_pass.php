<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;
$u = User::where('email', 'admin@ishine.com')->first();
if ($u) {
    $u->password = Hash::make('admin123');
    $u->save();
    echo "Updated\n";
} else {
    echo "User not found\n";
}
