<?php

namespace App\Http\Controllers\PDFExport;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AttendancePDFController extends Controller
{
    public function view() {
        return view('PDFExport/Attendance');
    }
}
