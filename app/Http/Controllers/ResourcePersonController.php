<?php

namespace App\Http\Controllers;

use App\Models\ResourcePerson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResourcePersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resource_persons = ResourcePerson::select("id", "name", "position", "profile")->latest()->paginate(25);
        // dd($resource_persons);
        return Inertia::render('Event', ['addEvent' => null, "resourcePersons" => $resource_persons]);
    }

    public function indexJson()
    {
        $resource_persons = ResourcePerson::select("id", "name", "position", "profile")->latest()->paginate(25);
        // dd($resource_persons);
        return response()->json($resource_persons);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'max:255'],
            'position' => ['required'],
        ]);

        try {
            $filename = null;
            if($request->profile && $request->profile['response'])
            {
                $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->profile["data"]["base64"]));
                $filename = 'image_' . time() . '.'.$request->profile["data"]["extension"];

                Storage::disk('public')->put('profile/'.$filename, $imageData);

                $imagePath = public_path('app/public/profile/' . $filename);
                if(!$imagePath)
                    return back()->withErrors('file', $imagePath);
                else $filename = '/storage/profile/'.$filename;
            }

            DB::transaction(function () use ($request, $filename) {
                ResourcePerson::create([
                    'name' => $request->name,
                    'position' => $request->position,
                    'profile' => $filename??null
                ]);
            });

            return back();

        } catch (\Throwable $th) {
            return $th;
        }
    }

    public function update(Request $request, ResourcePerson $resourcePerson)
    {
        try {
            function isBase64($string) {
                if (preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $string) && base64_decode($string, true) !== false) {
                    return true;
                } else {
                    return false;
                }
            }
            
            $filename = $resourcePerson->profile;
            if(isBase64($request->profile["data"]["base64"])) {
                $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->profile["data"]["base64"]));
                $filename = 'image_' . time() . '.'.$request->profile["data"]["extension"];
    
                Storage::disk('public')->put('profile/'.$filename, $imageData);
    
                $imagePath = public_path('app/public/profile/' . $filename);
                if(!$imagePath)
                    return back()->withErrors('file', $imagePath);
                else $filename = '/storage/profile/'.$filename;
            }
    
            $resourcePerson->name = $request->name;
            $resourcePerson->position = $request->position;
            $resourcePerson->profile = $filename;
            $resourcePerson->save();

            return back();

        } catch (\Throwable $th) {
            return dd($th);
        }
    }

    public function searchResourcePerson(Request $request)
    {
        try {
            $search = ResourcePerson::search($request->search)->paginate(25);

            return response()->json($search);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }
    }

    public function destroy(ResourcePerson $resourcePerson)
    {
        try {
            DB::transaction(function () use ($resourcePerson) {
                $resourcePerson->delete();
            });

            return redirect()->back();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th->getMessage());
        }
    }
}
