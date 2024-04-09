<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

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
            "gender" => ['required', 'in:Male,Female'],
            "employment_status" => ['required', 'in:Regular,Contractual']
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
                    "gender" => $request->gender,
                    "profile" => $filename ?? null,
                    "password" => Hash::make("12345678"),
                    "status" => "Active",
                    "employment_status" => $request->employment_status,
                    "role" => $request->user_type ?? "Employee",
                ]);
            });

            return redirect()->back()->with("success", true);
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors("Error", $th->getMessage());
        }
    }

    public function view(User $user) 
    {
        return response()->json($user);
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
            "gender" => ['required', 'in:Male,Female'],
            "employment_status" => ['required', 'in:Regular,Contractual']
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
            if ($request->profile && $request->profile['response'] && isBase64($request->profile["data"]["base64"])) {
                $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->profile["data"]["base64"]));
                $filename = 'image_' . time() . '.' . $request->profile["data"]["extension"];

                Storage::disk('public')->put('profile/' . $filename, $imageData);

                $imagePath = public_path('app/public/profile/' . $filename);
                if (!$imagePath)
                    return back()->withErrors('file', $imagePath);
                else $filename = '/storage/profile/' . $filename;
            }

            DB::transaction(function () use ($request, $user, $filename) {
                User::where('id', $user->id)
                ->update([
                    "first_name" => $request->first_name,
                    "last_name" => $request->last_name,
                    "birthday" => $request->birthday,
                    "email" => $request->email,
                    "contact" => $request->contact,
                    "address" => $request->address,
                    "position" => $request->position,
                    "province" => $request->province,
                    "gender" => $request->gender,
                    "profile" => $filename ?? "/storage/profile/profile.png",
                    "password" => Hash::make("12345678"),
                    "status" => !$request->status ? "Active" : $request->status,
                    "employment_status" => $request->employment_status,
                    "role" => $request->user_type ?? "Employee",
                ]);
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
            $filter = $request->filter??'';
            $search = $request->search??'';
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
                ->where('status', 'Active')
                ->when($filter, function ($query) use ($filter) {
                    $query->where('province', $filter);
                })
                ->when($filterEmployment, function ($query) use ($filterEmployment) {
                    $query->where('employment_status', $filterEmployment);
                })
                ->latest()
                ->paginate(25);

            return response()->json($search);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }
    }
}
