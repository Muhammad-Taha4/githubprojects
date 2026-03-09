<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\MenuItem;
class MenuController extends Controller {
    public function index() {
        $items = MenuItem::whereNull('parent_id')->where('is_active', true)->orderBy('sort_order')->get();
        // Just return a flat structure for now or map it
        $menu = $items->map(function($item) {
            $children = MenuItem::where('parent_id', $item->id)->orderBy('sort_order')->get();
            $item->children = $children;
            return $item;
        });
        return response()->json(['menu' => $menu]);
    }
}