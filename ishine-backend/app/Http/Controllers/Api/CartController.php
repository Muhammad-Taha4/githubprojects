<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
class CartController extends Controller {
    public function index(Request $request) {
        return response()->json([]); // Simplified for this mockup
    }
    public function store(Request $request) {
        return response()->json(['success'=>true]);
    }
    public function update(Request $request, $id) {
        return response()->json(['success'=>true]);
    }
    public function destroy($id) {
        return response()->json(['success'=>true]);
    }
}