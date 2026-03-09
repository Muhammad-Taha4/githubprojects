<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
class OrderController extends Controller {
    public function index(Request $request) {
        return response()->json($request->user()->orders()->latest()->get());
    }
    public function store(Request $request) {
        $order = Order::create([
            'user_id' => $request->user()->id,
            'total' => $request->total,
            'shipping_address' => json_encode($request->shipping_address),
            'items' => json_encode($request->items),
            'payment_method' => $request->payment_method,
            'status' => 'pending'
        ]);
        return response()->json($order, 201);
    }
    public function show(Request $request, $id) {
        return response()->json($request->user()->orders()->findOrFail($id));
    }
}