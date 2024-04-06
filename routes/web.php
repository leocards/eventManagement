<?php

use App\Exports\AccomplishmentExport;
use App\Exports\AttendanceExport;
use App\Exports\CBUExport;
use App\Exports\FeedbackReportExport;
use App\Exports\QualitativeAssessmentExport;
use App\Exports\ResourcePersonExport;
use App\Http\Controllers\AccomplishmentReportController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Auth\SecurityQuestionController;
use App\Http\Controllers\CBUController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Dummy\DummyEventController;
use App\Http\Controllers\EvaluationReportController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PrintController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResourcePersonController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\UserController;
use App\Models\Event;
use App\Models\EventParticipants;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    if(Auth::check()) {
        return redirect()->route('dashboard');
    }
    return Inertia::render('Welcome', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
})->name('/');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(DashboardController::class)->group(function () {
        Route::get('/dashboard', 'index')->name('dashboard');
        
        Route::get('/events-all-json', 'getAllEvents')->name('calendar.events');
        
        Route::get('/search-upcoming', 'searchUpcomingEvent')->name('event.upcoming.search');
        
        Route::get('/activities', 'activities')->name('dashboard.activities');

        Route::get('/activity', 'getActivity')->name('dashboard.activity');

        Route::get('/active-events', 'activeEvents')->name('dashboard.active_events');
    });

    Route::controller(SecurityQuestionController::class)->group(function () {
        Route::get('/security-question', 'index')->name('security');

        Route::post('/security-question', 'store')->name('security.store');
        Route::post('/security-question/update/{sq1}/{sq2}/{sq3}', 'update')->name('security.update');
    });

    Route::get('/temporary/event-code', function (Request $request) {
        $event = Event::find($request->event)->first();
        $exp_date = date('F j, Y g:i a', $request->expires);

        return Inertia::render('TemporaryLink', ['code' => $request->code, 'title' => $event->title, 'session' => $request->session, 'expire' => $exp_date]);
    })->name('temporary.link');
});

Route::middleware(['auth', 'verified', 'role:Admin,Super Admin'])->group(function () {
    /* EVENT AND RESOURCE PERSON ROUTE */
    Route::prefix('event')->group(function () {
        // EVENT
        Route::controller(EventController::class)->group(function () {
            Route::get('/', 'index')->name('event');
            Route::get('/json', 'indexJson')->name('event.json');
            Route::get('/edit/{event}', 'editEvent')->name('event.edit');
            Route::get('/search', 'searchEvent')->name('event.search');
            Route::get('/event-people/{event?}', 'getEventRPParticipant')->name('event.rp_p');
            Route::get('/generate-copy-code/{event}', 'generateCopyCode')->name('event.generate');

            Route::post('/new', 'store')->name('event.new');
            Route::post('/update/{event}', 'updateEvent')->name('event.update');
            Route::post('/delete/{event}', 'destroy')->name('event.delete');
            Route::post('/remarks/{event}', 'addRemarks')->name('event.add.remarks');
        });
        
        // RESOURCE PERSON
        Route::controller(ResourcePersonController::class)->group(function () {
            Route::prefix('resource_person')->group(function () {
                Route::get('/', 'index')->name('rp');
                Route::get('/json', 'indexJson')->name('rp.json');
                Route::get('/search', 'searchResourcePerson')->name('rp.search');

                Route::post('/new', 'store')->name('rp.new');
                Route::post('/update', 'update')->name('rp.update');
                Route::post('/delete/{resourcePerson}', 'destroy')->name('rp.delete');
            });
        });
    });

    // EMPLOYEE
    Route::prefix("employee")->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('/', 'index')->name('employee');
            Route::get('/json', 'indexJson')->name('employee.json');
            Route::get('/view/{user?}', 'view')->name('employee.view');
            Route::get('/search', 'searchUser')->name('employee.search');
            Route::get('/all-employees', 'getAllEmployees')->name('employee.all');
            
            Route::post('/create', 'store')->name('employee.new');
            Route::post('/update/{user}', 'update')->name('employee.update');
            Route::post('/delete/{user}', 'destroy')->name('employee.delete');
        });
    });

    // ATTENDANCE
    Route::prefix('attendance')->group(function () {
        Route::controller(AttendanceController::class)->group(function () {
            Route::get('/', 'index')->name('attendance');

        });
    });

    // PRINT
    Route::prefix('print')->group(function () {
        Route::controller(PrintController::class)->group(function () {
            Route::get('/attendance', 'printAttendance')->name('print.attendance');
            Route::get('/cbu', 'printCBU')->name('print.cbu');
            Route::get('/cbu-event-year', 'getEmployeeTrainingsCBU')->name('cbu-monitoring.empTrainigs');
            Route::get('/accomplishment', 'printAccomplishment')->name('print.accomplishment');
            Route::get('/consolidated/{event}', 'printConsolidated')->name('print.consolidated');
            Route::get('/assessment/{event}', 'printQualiAssessment')->name('print.assessment');
            Route::get('/resource_person_ratings/{rp}/{event}', 'printResourcePersonRatings')->name('print.rp_ratings');
            Route::get('/charts/{event}', 'printCharts')->name('print.charts');
        });
    });

    // CBU
    Route::prefix('cbu-monitoring')->group(function () {
        Route::controller(CBUController::class)->group(function () {
            Route::get('/', 'index')->name('cbu-monitoring');
            Route::get('/cbu-year', 'indexJson')->name('cbu-monitoring.json');
            Route::get('/cbu-events', 'eventsPerYear')->name('cbu-monitoring.events');
        });
    });

    // REPORTS
    Route::prefix('reports')->group(function () {
        Route::get('/', function () {
            return redirect()->route('reports.evaluation');
        })->name('reports');

        // EVALUATION
        Route::prefix('evaluation')->group(function () {
            Route::controller(EvaluationReportController::class)->group(function () {
                Route::get('/', 'index')->name('reports.evaluation');
                Route::get('/charts-data/{event}', 'eventsEvaluationData')->name('report.chartsData');
                Route::get('/rp-charts-data/{event}/{rp}', 'getRpRatingSummary')->name('report.rp_chartData');
                Route::get('/rp-evaluation-rates/{event}/{rp}', 'rpEvaluatioRates')->name('report.rp_evaluation');
                Route::get('/consolidated-evaluation-rates/{event}', 'getConsolidatedData')->name('report.consolidated');
                Route::get('/assessment-evaluation-rates/{event}', 'getQualitativeData')->name('report.assessment');
            });
        });

        // ACCOMPLISHMENT
        Route::controller(AccomplishmentReportController::class)->group(function () {
            Route::get('/accomplishment', 'index')->name('reports.accomplishment');
            Route::get('/accomplishment-data', 'accomplishmentData')->name('reports.accomplishment.data');
        });
    });
    
    // EXCEL EXPORT
    Route::prefix('excel-export')->group(function () {
        // ATTENDANCE
        Route::get('/attendance/{id?}', function ($id = null) {
            return Excel::download(new AttendanceExport($id), 'Attendance Summary Report.xlsx');
        })->name('export.attendance');

        // CBU
        Route::get('/cbu/{year}', function (Request $request) {
            return Excel::download(new CBUExport($request->year), 'CBU Training Monitoring.xlsx');
        })->name('export.cbu'); 

        // ACCOMPLISHMENT
        Route::get('/accomplishment/{year}/{quarter}', function (Request $request, $year, $quarter) {
            $reviewed = new stdClass;
            $approved = new stdClass;
            if($request->query('reviewedby') && $request->query('approvedby')) {
                $reviewed = (object) $request->query('reviewedby');
                $reviewed->date = Carbon::parse($reviewed->date)->format('F d, Y');
                $approved = (object) $request->query('approvedby');
                $approved->date = Carbon::parse($approved->date)->format('F d, Y');
            }

            return Excel::download(new AccomplishmentExport($year, $quarter, $reviewed, $approved), 
            'IDCB Accomplishment Report.xlsx');
        })->name('export.accomplishment');

        // FEEDBACK CONSOLIDATION/ TRAINING ASSESSMET
        Route::get('/feedbackreport/{event_id?}', function ($event_id = null) {
            if(!$event_id) return back();

            return Excel::download(new FeedbackReportExport($event_id), 'Feedback Report Consolidation_Training Evaluation.xlsx');
        })->name('export.feedbackreport');

        // QUALITATIVE ASSESSMENT
        Route::get('/qualitativeassessment/{event_id?}', function ($event_id = null) {
            if(!$event_id) return back();
            
            return Excel::download(new QualitativeAssessmentExport($event_id), 'Feedback Report Consolidation_Qualitative Assessment.xlsx');
        })->name('export.qualitativeassessment');

        // RESOURCE PERSON ASSESSMENT
        Route::get('/rpassessment/{event_id?}/{rp?}', function ($event_id = null, $rp = null) {
            if(!$event_id||!$rp) return back();
            
            return Excel::download(new ResourcePersonExport($event_id, $rp), 'Feedback Report Consolidation_Qualitative Assessment.xlsx');
        })->name('export.resourceperson');
    });
});

Route::middleware(['auth', 'role:Employee', 'verified'])->group(function () {
    Route::prefix("trainee")->group(function () {
        Route::controller(AttendanceController::class)->group(function () {
            Route::get('/attendance', 'index')->name('trainee.attendance');
            Route::get('/evaluation/{event}', 'evaluation')->name("trainee.evaluation");

            Route::post('/time-in', 'setTimeIn')->name("trainee.timeIn");
            Route::post('/evaluation/{event}', 'storeEvaluation')->name('trainee.save_evaluation');
        });

        Route::controller(TrainingController::class)->group(function () {
            Route::get('/trainings', 'index')->name('trainee.trinings');

        });

        Route::controller(DashboardController::class)->group(function () {
            Route::get('/all-notifications', 'Notifications')->name('trainee.allNotification');
            Route::get('/all-notifications/json', 'NotificationJson')->name('trainee.allNotification.json');
        });

        Route::get('/inactive/{user}', [CBUController::class, 'checkEmployeeInactivity']);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/image/upload', [ProfileController::class, 'updateProfilePicture'])
        ->name('profile.picture.update');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('ignore-security-notice', [ProfileController::class, 'ignoreNotice'])->name('profile.ignore');
});

// Route::get('/excel-export', function (Request $request) {
//     $acc = new ResourcePersonExport(5,1);

//     return $acc->view();
// });

Route::get('/foo/{year}/{quarter}', function($year, $quarter) {
    $eval = new AccomplishmentExport($year, $quarter, (object) [
        "name" => "Jonathan James Cyd",
        "position" => "Training specialist II",
        "date" => "2024-04-05"
    ], (object) [
        "name" => "Jonathan James Cyd",
        "position" => "Training specialist II",
        "date" => "2024-04-05"
    ]);
    $event = Event::find(5);
    return $eval->view();
});

Route::get('/test/{event}', [EvaluationReportController::class, 'getActivityRatingSummary']);

// Route::get('/add-dummy-event', [DummyEventController::class, 'index']);
require __DIR__.'/auth.php';
