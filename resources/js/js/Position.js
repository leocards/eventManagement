const PositionsTitles = [
    //"Regional Program Management Office"
    {name: "Division Chief"},
    {name: "Project Development Officer III"},
    {name: "Family Development Session Focal/Specialist"},
    {name: "Risk Management and Quality Assurance Focal"},
    {name: "Regional Beneficiary Data Officer"},
    {name: "Compliance Verification Officer"},
    {name: "Grievance Redress Officer"},
    {name: "Financial Analyst II"},
    {name: "Financial Analyst III"},
    {name: "Project Development Officer I"},
    {name: "Information Communication and Technology Administrator"},
    {name: "Regional Monitoring and Evaluation Officer"},
    {name: "Regional Training Specialist II"},
    {name: "Regional Training Specialist"},
    {name: "Institutional Partnership Development Officer"},
    {name: "Administrative Officer II"},
    {name: "Administrative Assistant II"},
    {name: "Administrative Assistant"},
    {name: "Administrative Assistant III"},
    {name: "Regional Case Management Focal"},
    {name: "Case Management Technical Support"},
    {name: "Regional Gender and Development Officer"},
    {name: "Regional Indigenous Peoples Focal"},
    {name: "Project Development Officer II"},
    //"Provincial Operations Office"
    {name: "Provincial Link"},
    {name: "Social Welfare Officer III"},
    {name: "Cluster Beneficiary Data Officer"},
    {name: "Provincial Monitoring and Evaluation Officer"},
    {name: "Cluster Compliance Verification Officer"},
    {name: "Provincial Grievance Officer"},
    {name: "Systems Support Staff"},
    {name: "Systems Coordinator"},
    {name: "Provincial Roving Bookkeeper"},
    {name: "Provincial Administrative Assistant II"},
    {name: "Administrative Aide IV"},
    //"Municipal Operations Office"
    {name: "City/Municipal Link"},
    {name: "Social Welfare Assistant"},
    {name: "City/Municipal Roving Bookeeper"},
];

export const provinces = [
    { name: "RPMO" },
    { name: "Davao City" },
    { name: "Davao Del Norte" },
    { name: "Davao Del Sur" },
    { name: "Davao Oriental" },
    { name: "Davao De Oro" },
    { name: "Davao Occidental" },
];

export const municipalities = {
    [provinces[1].name]: [
        { name: "Operations Office of Agdao District" },
        { name: "Operations Office of Baguio District" },
        { name: "Operations Office of Buhangin A District" },
        { name: "Operations Office of Buhangin B District" },
        { name: "Operations Office of Bunawan District" },
        { name: "Operations Office of Calinan District" },
        { name: "Operations Office of Marilog District" },
        { name: "Operations Office of Paquibato District" },
        { name: "Operations Office of Poblacion District" },
        { name: "Operations Office of Talomo A District" },
        { name: "Operations Office of Talomo B District" },
        { name: "Operations Office of Toril District" },
        { name: "Operations Office of Tugbok District" }
    ],
    [provinces[2].name]: [
        { name: "Municipal Operations Office of Asuncion" },
        { name: "Municipal Operations Office of Braulio E. Dujali" },
        { name: "Municipal Operations Office of Carmen" },
        { name: "City Operations Office of Island Garden City of Samal" },
        { name: "Municipal Operations Office of Kapalong" },
        { name: "Municipal Operations Office of New Corella" },
        { name: "City Operations Office of Panabo" },
        { name: "Municipal Operations Office of San Isidro" },
        { name: "Municipal Operations Office of Sto Tomas" },
        { name: "City Operations Office of Tagum" },
        { name: "Municipal Operations Office of Talaingod" }
    ],
    [provinces[3].name]: [
        { name: "Municipal Operations Office of Bansalan" },
        { name: "City Operations Office of Digos" },
        { name: "Municipal Operations Office of Hagonoy" },
        { name: "Municipal Operations Office of Kiblawan" },
        { name: "Municipal Operations Office of Magsaysay" },
        { name: "Municipal Operations Office of Malalag" },
        { name: "Municipal Operations Office of Matanao" },
        { name: "Municipal Operations Office of Padada" },
        { name: "Municipal Operations Office of Sta Cruz" },
        { name: "Municipal Operations Office of Sulop" }
    ],
    [provinces[4].name]: [
        { name: "Municipal Operations Office of Banaybanay" },
        { name: "Municipal Operations Office of Baganga" },
        { name: "Municipal Operations Office of Boston" },
        { name: "Municipal Operations Office of Caraga" },
        { name: "Municipal Operations Office of Cateel" },
        { name: "Municipal Operations Office of Governor Generoso" },
        { name: "Municipal Operations Office of Lupon" },
        { name: "Municipal Operations Office of Manay" },
        { name: "City Operations Office of Mati" },
        { name: "Municipal Operations Office of San Isidro" },
        { name: "Municipal Operations Office of Tarragona" }
    ],
    [provinces[5].name]: [
        { name: "Municipal Operations Office of Compostela" },
        { name: "Municipal Operations Office of Laak" },
        { name: "Municipal Operations Office of Mabini" },
        { name: "Municipal Operations Office of Maco A" },
        { name: "Municipal Operations Office of Maco B" },
        { name: "Municipal Operations Office of Maragusan" },
        { name: "Municipal Operations Office of Mawab" },
        { name: "Municipal Operations Office of Monkayo" },
        { name: "Municipal Operations Office of Montevista" },
        { name: "Municipal Operations Office of Nabunturan" },
        { name: "Municipal Operations Office of New Bataan" },
        { name: "Municipal Operations Office of Pantukan" }
    ],
    [provinces[6].name]: [
        { name: "Municipal Operations Office of Don Marcelino" },
        { name: "Municipal Operations Office of Jose Abad Santos - South" },
        { name: "Municipal Operations Office of Jose Abad Santos-  North" },
        { name: "Municipal Operations Office of Sarangani" },
        { name: "Municipal Operations Office of Malita" },
        { name: "Municipal Operations Office of Sta Maria" }
    ]
}

export const roles = [
    { name: "Employee" },
    { name: "Admin" },
    { name: "Super Admin" }
];

export const roles2 = [
    { name: "Employee" }
];

export default PositionsTitles;