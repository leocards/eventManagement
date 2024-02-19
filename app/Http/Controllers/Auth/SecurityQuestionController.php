<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\SecurityQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class SecurityQuestionController extends Controller
{

    public function index()
    {
        try {
            $sq_answers = SecurityQuestion::where('user_id', Auth::id())->get(['id', 'question', 'answer']);

            return response()->json($sq_answers);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 400);
            //throw $th;
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            "sq1.question" => ['required'],
            "sq2.question" => ['required'],
            "sq3.question" => ['required'],
            "sq1.answer" => ['required_with:sq1.question'],
            "sq2.answer" => ['required_with:sq2.question'],
            "sq3.answer" => ['required_with:sq3.question']
        ], [
            "sq1.answer" => "The answer field is required.",
            "sq1.question" => "The security question #1 field is required.",
            "sq2.answer" => "The answer field is required.",
            "sq2.question" => "The security question #2 field is required.",
            "sq3.answer" => "The answer field is required.",
            "sq3.question" => "The security question #3 field is required.",
        ]);

        try {

            DB::transaction(function () use ($request) {

                SecurityQuestion::create([
                    "user_id" => Auth::id(),
                    "question" => $request->sq1['question'],
                    "answer" => $request->sq1['answer']
                ]);

                SecurityQuestion::create([
                    "user_id" => Auth::id(),
                    "question" => $request->sq2['question'],
                    "answer" => $request->sq2['answer']
                ]);

                SecurityQuestion::create([
                    "user_id" => Auth::id(),
                    "question" => $request->sq3['question'],
                    "answer" => $request->sq3['answer']
                ]);
            });

            return redirect()->back()->with("message", "Security question created sucessfully");
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th->getMessage());
        }
    }

    public function update(Request $request, SecurityQuestion $sq1, SecurityQuestion $sq2, SecurityQuestion $sq3)
    {
        $request->validate([
            "sq1.question" => ['required'],
            "sq2.question" => ['required'],
            "sq3.question" => ['required'],
            "sq1.answer" => ['required_with:sq1.question'],
            "sq2.answer" => ['required_with:sq2.question'],
            "sq3.answer" => ['required_with:sq3.question']
        ], [
            "sq1.answer" => "The answer field is required.",
            "sq1.question" => "The security question #1 field is required.",
            "sq2.answer" => "The answer field is required.",
            "sq2.question" => "The security question #2 field is required.",
            "sq3.answer" => "The answer field is required.",
            "sq3.question" => "The security question #3 field is required.",
        ]);

        try {

            DB::transaction(function () use ($request, $sq1, $sq2, $sq3) {
                $sq1->question = $request->sq1['question'];
                $sq1->answer = $request->sq1['answer'];
                $sq1->save();

                $sq2->question = $request->sq2['question'];
                $sq2->answer = $request->sq2['answer'];
                $sq2->save();

                $sq3->question = $request->sq3['question'];
                $sq3->answer = $request->sq3['answer'];
                $sq3->save();
            });

            return redirect()->back()->with("message", "Security question updated sucessfully");
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th->getMessage());
        }
    }
}
