<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\SectionContent;
use Illuminate\Http\Request;
class SectionController extends Controller {
    public function show($section) {
        return response()->json(SectionContent::where('section', $section)->get()->pluck('value', 'key'));
    }
    public function update(Request $request, $section) {
        foreach($request->all() as $key => $value) {
            SectionContent::updateOrCreate(['section' => $section, 'key' => $key], ['value' => is_array($value) ? json_encode($value) : $value]);
        }
        return response()->json(['success' => true]);
    }
}