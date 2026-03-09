<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class AdminBannerController extends Controller
{
    public function index()
    {
        return Banner::orderBy('sort_order', 'asc')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'subtitle' => 'nullable',
            'link' => 'nullable',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('banners', 'public');
            $data['image'] = 'http://localhost:8000/storage/' . $path;
        }
        
        $banner = Banner::create($data);
        return response()->json($banner, 201);
    }

    public function update(Request $request, Banner $banner)
    {
        $data = $request->all();
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('banners', 'public');
            $data['image'] = 'http://localhost:8000/storage/' . $path;
        }
        
        unset($data['_method']);
        
        $banner->update($data);
        return response()->json($banner);
    }

    public function destroy(Banner $banner)
    {
        $banner->delete();
        return response()->json(['message' => 'deleted']);
    }
}