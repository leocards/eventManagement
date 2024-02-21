<?php

namespace App\Http\Controllers\Dummy;

use App\Http\Controllers\Controller;
use App\Http\Controllers\EventController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DummyEventController extends Controller
{
    public function index()
    {
        try {
            $event = new EventController();

            $event_list = $this->events();

            DB::transaction(function () use ($event, $event_list) {
                $event_list->each(function($item) use ($event) {
                    $request = new Request();
                    foreach($item as $attribute => $value)
                    {
                        $request->merge([$attribute => $value]);
                    }
                    $event->store($request);
                });
            });

            return response()->json('success');
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }
        return response()->json($this->events());
    }

    function generateDates($count)
    {
        $dates = new Collection();
        $currentDate = Carbon::tomorrow();
        $availableDates = new Collection();

        // Populate available dates pool
        while ($availableDates->count() <= $count) {
            $availableDates->push($currentDate->copy()->format('Y-m-d'));
            $currentDate->addDay();
        }

        // Generate random dates from available dates pool
        $availableDates->each(function ($date) use (&$dates, $availableDates, $count) {
            $isRange = rand(0, 1);

            if ($isRange) {
                // Randomly determine end date within 1 to 7 days range
                $endDate = Carbon::parse($date, 'Asia/Manila')->addDays(rand(1, 7))->format('Y-m-d');

                // Check if date range conflicts with existing dates
                $conflict = $dates->first(function ($existingDate) use ($date, $endDate) {
                    return ($date >= $existingDate["start"] && $date <= $existingDate["end"]) ||
                        ($endDate >= $existingDate["start"] && $endDate <= $existingDate["end"]);
                });

                if ($conflict === null) {
                    // Add date range to list
                    $dates->push([
                        "start" => $date,
                        "end" => $endDate,
                        "isRange" => true,
                        "timeIn" => "08:30",
                        "timeInCutoff" => "08:45",
                        "timeOut" => "16:00",
                        "timeOutCutoff" => "16:15"
                    ]);
                }
            } else {
                // Check if single date conflicts with existing date ranges
                $conflict = $dates->first(function ($existingDate) use ($date) {
                    return $existingDate["isRange"] && $date >= $existingDate["start"] && $date <= $existingDate["end"];
                });

                if ($conflict === null) {
                    // Add single date to list
                    $dates->push([
                        "start" => $date,
                        "end" => null,
                        "isRange" => false,
                        "timeIn" => "08:30",
                        "timeInCutoff" => "08:45",
                        "timeOut" => "16:00",
                        "timeOutCutoff" => "16:15"
                    ]);
                }
            }

            // Remove selected date from available dates pool
            $availableDates = $availableDates->reject(function ($availableDate) use ($date) {
                return $availableDate === $date;
            });

            // Break loop if desired count is reached
            return $dates->count() < $count;
        });

        return $dates;
    }
    
    function events()
    {
        $events = collect([]);
        $dates = $this->generateDates(100);
        $platform = collect([ "Face-to-face", "Virtual" ]);
        $venues = collect([
            'Convention Center',
            'Stadium Arena',
            'Hotel Ballroom',
            'Conference Hall',
            'Community Center',
            'Amphitheater',
            'Art Gallery',
            'Botanical Garden',
            'Museum',
            'Public Park',
            'Beachfront',
            'Rooftop Lounge',
            'Historic Mansion',
            'Sports Complex',
            'University Campus',
            'Golf Course',
            'Cruise Ship',
            'Vineyard',
            'Farmstead',
            'Warehouse Space',
            'Restaurant',
            'Brewery',
            'Nightclub',
            'Theater',
            'Yacht Club',
            'Zoo',
            'Ski Resort',
            'Country Club',
            'Airport Hangar',
            'Race Track',
            'Botanical Conservatory',
            'Wildlife Sanctuary',
            'Ski Lodge',
            'Waterfront Pier',
            'Science Center',
            'Planetarium',
            'Observatory',
            'Equestrian Center',
            'Mansion Garden',
            'Music Hall',
            'Ice Skating Rink',
            'Aquarium',
            'Ranch',
            'Cavern',
            'Banquet Hall',
            'Campground',
            'Library',
            'Arcade',
            'Bowling Alley',
            'Yoga Studio',
            'Transelvania'
        ]);
        $eventTitles = collect([
            'Annual Gala Dinner',
            'Tech Conference 2024',
            'Art Exhibition Opening',
            'Startup Pitch Competition',
            'Leadership Summit',
            'Music Festival',
            'Fashion Show',
            'Film Screening & Discussion',
            'Networking Mixer',
            'Charity Auction',
            'Entrepreneur Workshop',
            'Fitness Bootcamp',
            'Cooking Class & Tasting',
            'Book Launch Party',
            'Health & Wellness Retreat',
            'Environmental Awareness Seminar',
            'Career Fair',
            'Educational Webinar Series',
            'Photography Workshop',
            'Cultural Diversity Celebration',
            'Science Fair',
            'Gardening Club Meeting',
            'Writing Retreat',
            'Youth Empowerment Forum',
            'Artisan Market',
            'Film Festival',
            'International Food Expo',
            'Musician Showcase',
            'Comedy Night',
            'Mindfulness Meditation Session',
            'Investment Symposium',
            'Parenting Seminar',
            'Virtual Reality Experience Demo',
            'Sustainability Conference',
            'Artificial Intelligence Summit',
            'Outdoor Adventure Retreat',
            'Financial Planning Workshop',
            'History Lecture Series',
            'DIY Craft Workshop',
            'Entrepreneurship Panel Discussion',
            'Fashion Design Masterclass',
            'Healthcare Innovation Forum',
            'Leadership Development Seminar',
            'Travel Photography Expedition',
            'Language Exchange Meetup',
            'Fitness Challenge Event',
            'Film Noir Screening',
            'Tech Hackathon',
            'Community Service Day',
            'Startup Pitch Competition II',
            'Leadership Summit II'
        ]);
        $eventObjectives = collect([
            'To foster networking opportunities among professionals in the industry',
            'To educate attendees on the latest trends and innovations in the field',
            'To promote collaboration and partnerships between businesses',
            'To raise funds for a specific charitable cause or organization',
            'To showcase local talent in the arts and entertainment industry',
            'To provide a platform for startups to pitch their ideas to investors',
            'To celebrate cultural diversity and promote inclusivity',
            'To offer hands-on learning experiences through workshops and demonstrations',
            'To inspire creativity and artistic expression',
            'To facilitate discussions on pressing social or environmental issues',
            'To recognize and honor achievements in the field',
            'To provide mentorship and guidance to aspiring entrepreneurs',
            'To promote health and wellness practices',
            'To encourage community engagement and activism',
            'To introduce new products or services to potential customers',
            'To offer professional development opportunities for attendees',
            'To spark dialogue and debate on relevant topics',
            'To foster a sense of belonging and camaraderie among participants',
            'To attract tourism and boost the local economy',
            'To empower individuals to make positive changes in their lives',
            'To create memorable experiences for attendees',
            'To facilitate knowledge sharing and exchange of ideas',
            'To inspire action towards environmental sustainability',
            'To provide entertainment and enjoyment for the community',
            'To promote a healthy lifestyle and fitness culture',
            'To facilitate career advancement opportunities for attendees',
            'To encourage creativity and innovation in problem-solving',
            'To provide resources and support for personal growth and development',
            'To raise awareness about important social issues',
            'To foster a sense of community and belonging',
            'To celebrate achievements and milestones',
            'To promote cross-cultural understanding and appreciation',
            'To provide a platform for thought leaders to share insights and expertise',
            'To offer opportunities for skill-building and learning new techniques',
            'To encourage collaboration and teamwork among participants',
            'To create memorable experiences for attendees',
            'To facilitate discussions on industry challenges and solutions',
            'To promote the importance of lifelong learning',
            'To inspire and motivate attendees to pursue their passions',
            'To foster connections between individuals with shared interests',
            'To provide exposure and visibility for emerging artists and creators',
            'To create awareness about a particular cause or issue',
            'To promote the benefits of technology and innovation',
            'To encourage participation in community initiatives',
            'To provide a platform for individuals to share their stories and experiences',
            'To showcase best practices and success stories in the field',
            'To foster a sense of belonging and support for marginalized communities',
            'To facilitate team-building activities and strengthen interpersonal relationships among participants',
            'To provide a platform for artists to showcase their work and connect with potential buyers or collaborators',
            'To offer guidance and resources for personal finance management and wealth-building strategies'
        ]);
        $rpLists = collect([
            ["id" => 1],
            ["id" => 2],
            ["id" => 3],
            ["id" => 4],
            ["id" => 5],
            ["id" => 6],
            ["id" => 7],
            ["id" => 8]
        ]);
        $participants = collect([
            ["id" => 3],
            ["id" => 4],
            ["id" => 5],
            ["id" => 6],
            ["id" => 7],
            ["id" => 8],
            ["id" => 9],
            ["id" => 10],
            ["id" => 11],
            ["id" => 12],
            ["id" => 13],
            ["id" => 14],
            ["id" => 15],
            ["id" => 16],
            ["id" => 17],
            ["id" => 18],
            ["id" => 19],
            ["id" => 20],
            ["id" => 21],
            ["id" => 22],
            ["id" => 23],
            ["id" => 24],
            ["id" => 25],
            ["id" => 26],
        ]);

        $dates->each(function ($item, $key) use ($events, $platform, $venues, $eventTitles, $eventObjectives, $rpLists, $participants) {
            if($key == 10) return false;

            $randomRpNumber = rand(2, 8);
            $eventPlatform = $platform->random();
            $events->push([
                "platform" => $eventPlatform,
                "venue" => $eventPlatform == "Virtual"? "https://www.youtube.com" : $venues[$key],
                "title" => $eventTitles[$key],
                "objective" => $eventObjectives[$key],
                "fund" => rand(100000, 500000),
                "resourcePerson" => $randomRpNumber,
                "rp_list" => $rpLists->take($randomRpNumber)->toArray(),
                "trainee_list" => ["list" => $participants->toArray()],
                "date" => [
                    "start" => $item["start"],
                    "end" => $item["end"],
                    "isRange" => $item["isRange"],
                ],
                "timeIn" => $item["timeIn"],
                "timeInCutoff" => $item["timeInCutoff"],
                "timeOut" => $item["timeOut"],
                "timeOutCutoff" => $item["timeOutCutoff"],
            ]);
        });
        
        return $events;
    }
}
