<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserLog;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use stdClass;

class UserController extends Controller
{
    public function index()
    {
        $employees = User::select("id", "first_name", "last_name", "province", "position", "profile", "status", "role")
            ->when(Auth::user()->role != "Super Admin", function ($query) {
                $query->where('role', 'Employee');
            })
            ->when(Auth::user()->role == "Super Admin", function ($query) {
                $query->where('id', '!=', Auth::id());
            })
            ->latest()
            ->paginate(25);

        return Inertia::render("Employee", [
            "initialEmployeeList" => $employees
        ]);
    }

    public function indexJson(Request $request)
    {
        $employees = User::select("id", "first_name", "last_name", "province", "position", "profile", "status", "role")
            ->when(!$request->has('isTrainee'), function ($query) {
                $query->when(Auth::user()->role != "Super Admin", function ($query) {
                    $query->where('role', 'Employee');
                })
                ->when(Auth::user()->role == "Super Admin", function ($query) {
                    $query->where('id', '!=', Auth::id());
                });
            })
            ->when($request->has('isTrainee'), function ($query) {
                $query->where('role', 'Employee');
            })
            ->when($request->filter != "All" && $request->has('filter'), function ($query) use ($request) {
                $query->where('province', "$request->filter");
            })
            ->where('status', 'Active')
            ->latest()
            ->paginate(25);

        return response()->json($employees);
    }

    public function getAllEmployees()
    {
        return response()->json(
            User::select("id", "first_name", "last_name", "province", "position", "profile", "status")
                ->latest()
                ->where('role', 'Employee')->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            "first_name" => ['required', 'max:255'],
            "last_name" => ['required', 'max:255'],
            "birthday" => ['required', 'date'],
            "email" => ["required", 'email', 'unique:users,email'],
            "contact" => ['required', 'max:11', 'starts_with:09'],
            "address" => ['required'],
            "position" => ['required'],
            "province" => ['required'],
            "municipality" => ['exclude_if:province,RPMO', 'required'],
            "gender" => ['required', 'in:Male,Female'],
            "employment_status" => ['required', 'in:Regular,Contractual,Contract of Service']
        ],[
            "gender" => "The sex field is required",
            "municipality" => "The City/Municipality/Sub-district field is required",
            "position" => "The position/designation field is required",
        ]);

        try {
            $filename = null;
            if ($request->profile && $request->profile['response']) {
                $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->profile["data"]["base64"]));
                $filename = 'image_' . time() . '.' . $request->profile["data"]["extension"];

                Storage::disk('public')->put('profile/' . $filename, $imageData);

                $imagePath = public_path('app/public/profile/' . $filename);
                if (!$imagePath)
                    return back()->withErrors('file', $imagePath);
                else $filename = '/storage/profile/' . $filename;
            }

            DB::transaction(function () use ($request, $filename) {
                User::create([
                    "first_name" => $request->first_name,
                    "last_name" => $request->last_name,
                    "birthday" => $request->birthday,
                    "email" => $request->email,
                    "contact" => $request->contact,
                    "address" => $request->address,
                    "position" => $request->position,
                    "province" => $request->province,
                    "municipality" => $request->municipality,
                    "ip_affiliation" => $request->ip_affiliation??null,
                    "gender" => $request->gender,
                    "profile" => $filename ?? null,
                    "password" => Hash::make("12345678"),
                    "status" => "Active",
                    "employment_status" => $request->employment_status,
                    "role" => $request->user_type ?? "Employee",
                ]);

                if($request->isAdmin) {
                    UserLog::create([
                        "user_id" => Auth::id(),
                        "description" => "added new employee: ".$request->first_name.' '.$request->last_name
                    ]);
                }
            });

            return redirect()->back()->with("success", true);
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors("Error", $th->getMessage());
        }
    }

    public function view(User $user) 
    {
        if($user->profile) {
            $original = $user->profile;
            $path = public_path($user->profile);
    
            if (!file_exists($path)) {
                $user->profile = null;
            }
    
            $fileContents = file_get_contents($path);
    
            $base64Image = base64_encode($fileContents);
    
            $ext = pathinfo($path, PATHINFO_EXTENSION);
    
            $extList = collect(['jpg' => 'jpg', 'jpeg' => 'jpeg', 'png' => 'png', 'svg+xml' => 'svg+xml']);
    
            $user->profile = collect([
                "response" => true,
                "data" => collect([
                    "base64" => 'data:image/'.$extList[$ext].';base64,'.$base64Image,
                    "extension" => $ext,
                    "size" => $this->formatBytes(filesize($path)),
                    "original" => $original
                ])
            ]);
        }

        return response()->json($user);
    }

    private function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        // Uncomment one of the following alternatives
        // $bytes /= pow(1024, $pow);
        $bytes /= (1 << (10 * $pow));

        return round($bytes, $precision) . ' ' . $units[$pow];
    }

    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            "first_name" => ['required', 'max:255'],
            "last_name" => ['required', 'max:255'],
            "birthday" => ['required', 'date'],
            "email" => ["required", 'email', Rule::unique('users')->ignore($user->id)],
            "contact" => ['required', 'max:11', 'starts_with:09'],
            "address" => ['required'],
            "position" => ['required'],
            "province" => ['required'],
            "municipality" => ['exclude_if:province,RPMO', 'required'],
            "gender" => ['required', 'in:Male,Female'],
            "employment_status" => ['required', 'in:Regular,Contractual,Contract of Service']
        ], [
            "gender" => "The sex field is required",
            "municipality" => "The City/Municipality/Sub-district field is required",
            'position' => 'The position/designation field is required',
        ]);
        $validator->validate();
        
        try {
            function isBase64($string) {
                if (!preg_match('/^data:image\/[a-z]+;base64,/', $string)) {
                    return false;
                } else {
                    return true;
                }
            }

            $filename = null;
            if(!Arr::has($request->profile, 'data.original')) {
                if ($request->profile && $request->profile['response'] && isBase64($request->profile["data"]["base64"])) {
                    $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->profile["data"]["base64"]));
                    $filename = 'image_' . time() . '.' . $request->profile["data"]["extension"];
    
                    Storage::disk('public')->put('profile/' . $filename, $imageData);
    
                    $imagePath = public_path('app/public/profile/' . $filename);
                    if (!$imagePath)
                        return back()->withErrors('file', $imagePath);
                    else $filename = '/storage/profile/' . $filename;
                }
            }

            DB::transaction(function () use ($request, $user, $filename) {
                $userUpdate = User::find($user->id);
                $userUpdate->first_name = $request->first_name;
                $userUpdate->last_name = $request->last_name;
                $userUpdate->birthday = $request->birthday;
                $userUpdate->email = $request->email;
                $userUpdate->contact = $request->contact;
                $userUpdate->address = $request->address;
                $userUpdate->position = $request->position;
                $userUpdate->province = $request->province;
                $userUpdate->municipality = $request->municipality;
                $userUpdate->ip_affiliation = $request->ip_affiliation??null;
                $userUpdate->gender = $request->gender;
                $userUpdate->profile = $filename ?? $user->profile;
                $userUpdate->status = !$request->status ? "Active" : $request->status;
                $userUpdate->employment_status = $request->employment_status;
                $userUpdate->role = $request->user_type ?? "Employee";

                $updatedAttributes = [];
                foreach ($userUpdate->getDirty() as $attribute => $value) {
                    $key = $attribute;

                    if(Str::contains($attribute, '_')) {
                        $key = Str::title(Str::replace('_', ' ', $attribute));
                    } else {
                        if($attribute == "position") {
                            $key = "Position/Designation";
                        }else if($attribute == "municipality") {
                            $key = "City/Municipality/Sub-district";
                        }else if($attribute == "ip_affiliation") {
                            $key = "IP Affiliation";
                        }else if($attribute == "role") {
                            $key = "User Role";
                        } else {
                            $key = Str::ucfirst($attribute);
                        }
                    }

                    $updatedAttributes[] = '- <b>'.$key.':</b> Before <i>\''.$user->$attribute??'None'.'\'</i>, After <i>\''.$value??'None'.'\'</i>';
                }

                $updatedAttributes = implode("\n", $updatedAttributes);

                $userUpdate->save();

                if($request->isAdmin) {
                    UserLog::create([
                        "user_id" => Auth::id(),
                        "description" => "updated employee details: ".$request->first_name.' '.$request->last_name.
                        ".\nThe following changes were made: \n".$updatedAttributes
                    ]);
                }
            });

            return redirect()->back()->with("success", true);
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors("Error", $th->getMessage());
        }
    }

    public function destroy(User $user)
    {
        try {
            DB::transaction(function () use ($user) {
                $user->delete();
            });

            return redirect()->back();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th->getMessage());
        }
    }

    public function searchUser(Request $request)
    {
        try {
            $filter = $request->filter??($request->filterAreaOfAssign??'');
            $search = $request->search??'';
            $filterDes = $request->filterByDesignation??($request->filterDesignation??'');
            $filterEmployment = $request->filterEmployment??'';
            
            $search = User::select("id", "first_name", "last_name", "email", "province", "position", "profile", "status", "role")
                ->when($search, function ($query) use ($search) {
                    $query->where('first_name', 'LIKE', "%$search%")
                         ->orWhere('last_name', 'LIKE', "%search%")
                         ->orWhere('email', 'LIKE', "%search%");
                })
                ->when(Auth::user()->role == "Admin", function ($query) {
                    $query->where('role', 'Employee');
                })
                ->when(Auth::user()->role == "Super Admin", function ($query) use ($request) {
                    $query->where('id', '!=', Auth::id())
                        ->when($request->isTrainee, function ($query) {
                            $query->where('role', 'Employee');
                        });
                })
                ->when($filter && $filter != 'All', function ($query) use ($filter) {
                    $query->where('province', $filter);
                })
                ->when($filterEmployment, function ($query) use ($filterEmployment) {
                    if($filterEmployment == "Regular" || $filterEmployment == "Contract of Service") {
                        $filter = $filterEmployment != "Regular" ? ["Contract of Service", "Contractual"] : ["Regular"];
                        $query->whereIn('employment_status', $filter);
                    } else {
                        $filter = $filterEmployment == "Active Status"? ["Active"] : ["Resigned", "Non-renewal"];
                        $query->whereIn('status', $filter);
                    }
                })
                ->when($filterDes && $filterDes != 'All', function ($query) use ($filterDes) {
                    $query->where('position', $filterDes);
                })
                ->latest()
                ->paginate(25);

            return response()->json($search);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }
    }

    function userUpdatesChecker($old, $new) {
        return $old !== $new;
    }
}
