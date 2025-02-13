import { CountryStatesProps, Field, StepsTypes } from "./types";

export const Steps : StepsTypes[] = [
    {
        label:"Bio",
        href:"/formlayout/info",
        success:true,
    },
    {
        label:"Addr.",
        href:"/formlayout/address",
        success:false,
    },
    {
        label:"Emp.",
        href:"/formlayout/employment",
        success:false,
    },
    {
        label:"Edu.",
        href:"/formlayout/education",
        success:false,
    },
    {
        label:"Skills",
        href:"/formlayout/skills",
        success:false,
    },
    {
        label:"More",
        href:"/formlayout/addinfo",
        success:false,
    },
    {
        label:"Review",
        href:"/formlayout/review",
        success:false,
    },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <F extends (...args: any[]) => any>(
    func: F,
    wait: number
  ): ((...args: Parameters<F>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<F>): void => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), wait);
    };
};



export const LocationData : CountryStatesProps = {
    India:{
        Delhi:["Delhi","Palam","Old Delhi","New Delhi"],
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
        Rajasthan: ["Jaipur", "Udaipur", "Ajmer"],
        Bihar: ["Patna", "Gaya", "Muzaffarpur"],
    },
    USA:{
        California:["Los Angeles", "San Francisco", "San Diego"],
        Texas:["Houston", "Dallas", "Austin"],
        NewYork:["New York", "Buffalo", "Rochester"],
        Florida:["Miami", "Tallahassee", "Orlando"],
        Virginia:["Richmond", "Charlottesville", "Chesapeake"],
    },
    UK:{
        London:["London", "Birmingham", "Manchester"],
        England:["Bristol", "Liverpool", "Cardiff"],
        Scotland:["Edinburgh", "Glasgow", "Aberdeen"],
        Wales:["Cardiff", "Swansea", "Neath Angon"],
    },
    Canada:{
        Ontario:["Toronto", "Ottawa", "Hamilton"],
        Quebec:["Quebec City", "Montreal", "Laval"],
        Newfoundland:["St. John's", "Saint John's", "Sherbrooke"],
        Manitoba:["Winnipeg", "Brandon", "Winnipeg"],
        Alberta:["Edmonton", "Calgary", "Red Deer"],
    },
    France:{
        Berlin:["Berlin", "Munich", "Cologne"],
        Hamburg:["Hamburg", "Düsseldorf", "Köln"],
        Bavaria:["Munich", "Hamburg", "Berlin"],
        Saxony:["Düsseldorf", "Köln", "Munich"],
        Brandenburg:["Berlin", "Hamburg", "Düsseldorf"],
    },
    Germany:{
        Frankfurt:["Frankfurt", "Munich", "Hamburg"],
        Nürnberg:["Nürnberg", "Munich", "Hamburg"],
        Bavaria:["Munich", "Hamburg", "Frankfurt"],
        Saxony:["Nürnberg", "Munich", "Hamburg"],
        Brandenburg:["Frankfurt", "Munich", "Hamburg"],
    },
};


//Years of experince
export const yoe = [
    "0 to 1 years",
    "1 to 3 years",
    "3 to 5 years",
    "5 to 7 years",
    "7 to 9 years",
    "9 to 11 years",
    "11 to 13 years",
    "13 to 15 years",
    "15 to 17 years",
    "17 to 19 years",
    "19 to 21 years",
];

//Education qualifications
export const eduField = [
    "Mathematics",
    "Science",
    "Arts",
    "Commerce",
    "Humanities",
    "Engineering",
    "Medicine",
    "Law",
    "Other",
];

//degrees
export const degree = [
    "Bachelor's",
    "Master's",
    "PhD",
    "Postgraduate",
    "Diploma",
    "Certificate",
    "Undergraduate",
    "Associate",
    "Vocational",
    "Non-degree",
    "Unspecified",
    "Other",
];

//generate random id:
export const randomId = ()=>{
    const numsChars = "123456789!@#$%&*abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id = "";
    for(let i=0; i<8; i++){
        id += numsChars.charAt(Math.floor(Math.random() * numsChars.length));
    }
    return id;
};



//skills assets
export const skillsData : Field = {
    Computer_Science : {
        Software_Development : [
            "SDE-1",
            "SDE-2",
            "SDE-3",
            "Lead Developer",
            "Senior Software Developer",
            "Lead Software Developer",
            "Senior Software Developer",
            "Technical Architect",
            "Project Manager",
            "Senior Project Manager",
            "DevOps Engineer",
        ],
        Web_Development : [
            "Frontend Developer",
            "Senior Frontend Developer",
            "Lead Frontend Developer",
            "React.js Developer",
            "NEXT.js Developer",
            "Vue.js Developer",
            "Angular Developer",
            "Node.js Developer",
            "Full Stack Developer",
            "Lead Full Stack Developer",
            "Senior Full Stack Developer",
            "Software Engineer",
            "Senior Software Engineer",
            "Lead Software Engineer",
            "Senior Software Engineer",
            "UI/UX Designer",
        ],
        Data_Science : [
            "Data Scientist",
            "Senior Data Scientist",
            "Lead Data Scientist",
            "Machine Learning Engineer",
            "Deep Learning Engineer",
            "Natural Language Processing Engineer",
            "Artificial Intelligence Engineer",
            "Senior Artificial Intelligence Engineer",
            "Lead Artificial Intelligence Engineer",
        ],
        Blockchain : [
            "Blockchain Developer",
            "Senior Blockchain Developer",
            "Lead Blockchain Developer",
            "Smart Contract Developer",
            "Decentralized Application Developer",
            "Blockchain Engineer",
            "Senior Blockchain Engineer",
            "Lead Blockchain Engineer",
            "Blockchain Architect",
        ],
        Cybersecurity : [
            "Cybersecurity Engineer",
            "Senior Cybersecurity Engineer",
            "Lead Cybersecurity Engineer",
            "Network Security Engineer",
            "Security Analyst",
            "Senior Security Analyst",
            "Lead Security Analyst",
            "Penetration Tester",
            "Senior Penetration Tester",
        ],
        DevOps : [
            "DevOps Engineer",
            "Senior DevOps Engineer",
            "Lead DevOps Engineer",
            "Continuous Integration Engineer",
        ],
    },
    Medical:{
        Healthcare_Technology : [
            "Clinical Researcher",
            "Senior Clinical Researcher",
            "Lead Clinical Researcher",
            "Clinical Informatics Specialist",
            "Clinical Data Scientist",
            "Senior Clinical Data Scientist",
            "Lead Clinical Data Scientist",
            "Medical Informatics Specialist",
            "Medical Informatics Engineer",
            "Senior Medical Informatics Engineer",
            "Lead Medical Informatics Engineer",
            "Medical Device Engineer",
            "Senior Medical Device Engineer",
            "Lead Medical Device Engineer",
        ],
        Medicine:[
           " General Practitioner (GP)",
           "Specialist (Cardiologist, Neurologist, etc.)",
           "Surgeon",
           "Medical Researcher"
        ],
        Nursing:[
            "Registered Nurse (RN)",
            "Nurse Practitioner (NP)",
            "Clinical Nurse Specialist (CNS)",
            "Nurse Anesthetist"
        ],
        Pharmacy:[
            "Pharmacist",
            "Pharmacy Technician",
            "Pharmacy Manager",
            "Pharmacy Associate",
            "Pharmacy Technician",
        ]
    },
    Engineering:{
        civil:[
            "Structural Engineer",
            "Geotechnical Engineer",
            "Transportation Engineer"
        ],
        electrical:[
            "Electrical Engineer",
            "Instrumentation Engineer",
            "Power Systems Engineer"
        ],
        mechanical:[
            "Mechanical Engineer",
            "Automotive Engineer",
            "Industrial Engineer"
        ],
    },
    Business:{
        Finance:[
            "Financial Analyst",
            "Financial Manager",
            "Investment Banker",
            "Quantitative Analyst",
            "Risk Manager"
        ],
        Marketing:[
            "Marketing Manager",
            "Marketing Specialist",
            "Advertising Manager",
            "Public Relations Manager",
            "Media Manager"
        ],
        Administration:[
            "Human Resources Manager",
            "Finance Manager",
            "Finance Analyst",
            "Project Manager",
            "Senior Project Manager"
        ],
        Operations:[
            "Operations Manager",
            "Supply Chain Manager",
            "Logistics Manager",
            "Customer Service Manager",
            "Quality Assurance Manager"
        ],
        Legal:[
            "Legal Manager",
            "Legal Advisor",
            "Attorney",
            "Tax Manager",
            "Public Relations Manager"
        ],
    },
    Arts:{
        Art_History:[
            "Artist",
            "Painter",
            "Sculptor",
            "Architect",
            "Photographer"
        ],
        Music:[
            "Musician",
            "Songwriter",
            "Composer",
            "Arranger",
            "Band Leader"
        ],
        Theater:[
            "Actor",
            "Director",
            "Screenwriter",
            "Cinematographer",
            "Costume Designer"
        ],
        Dance:[
            "Dancer",
            "Choreographer",
            "Ballet Teacher",
            "Dance Instructor",
            "Dance Studio Manager"
        ],
        Writing:[
            "Writer",
            "Editor",
            "Proofreader",
            "Translator",
            "Publisher"
        ],
        Performing_Arts:[
            "Musician",
            "Dancer",
            "Theater Artist",
            "Writer",
            "Film Director"
        ],
    },
};

//role-based-skill-data
export const skillsByRole = {
  // Software Development Roles
  "SDE-1": [
     "Java" ,
     "JavaScript" ,
     "Data Structures" ,
     "Algorithms" ,
  ],
  "SDE-2": [
     "System Design" ,
     "Microservices" ,
     "AWS" ,
     "Kubernetes" ,
  ],
  "SDE-3": [
     "Scalability" ,
     "Distributed Systems" ,
     "API Design" ,
     "Database Optimization" ,
  ],
  "Lead Developer": [
     "Technical Leadership" ,
     "Project Management" ,
     "Code Reviews" ,
  ],

  // Web Development Roles
  "Frontend Developer": [
     "HTML" ,
     "CSS" ,
     "JavaScript" ,
     "React" ,
     "TypeScript" ,
     "Redux" ,
     "Next.js" ,
  ],
  "Backend Developer": [
     "Node.js" ,
     "Express.js" ,
     "MongoDB" ,
     "SQL" ,
  ],
  "Full Stack Developer": [
     "React" ,
     "Node.js" ,
     "MongoDB" ,
     "GraphQL" ,
  ],

  // Data Science Roles
  "Data Scientist": [
     "Python" ,
     "Pandas" ,
     "TensorFlow" ,
     "Scikit-Learn" ,
  ],
  "Machine Learning Engineer": [
     "Deep Learning" ,
     "Neural Networks" ,
     "Reinforcement Learning" ,
  ],

  // Cybersecurity Roles
  "Cybersecurity Engineer": [
     "Ethical Hacking" ,
     "Penetration Testing" ,
     "Cryptography" ,
  ],
  "Security Analyst": [
     "Threat Modeling" ,
     "SIEM" ,
     "Vulnerability Assessment" ,
  ],

  // DevOps Roles
  "DevOps Engineer": [
     "Docker" ,
     "Kubernetes" ,
     "AWS" ,
     "Terraform" ,
     "CI/CD Pipelines" ,
  ],

  // Blockchain Roles
  "Blockchain Developer": [
     "Solidity" ,
     "Ethereum" ,
     "Smart Contracts" ,
  ],

  // Medical Roles
  "Clinical Researcher": [
     "Medical Data Analysis" ,
     "Clinical Trials" ,
  ],
  "Pharmacist": [
     "Pharmaceutical Science" ,
     "Drug Formulation" ,
  ],

  // Engineering Roles
  "Structural Engineer": [
     "Structural Analysis" ,
     "AutoCAD" ,
  ],
  "Electrical Engineer": [
     "Circuit Design" ,
     "Power Systems" ,
  ],
  "Mechanical Engineer": [
     "Thermodynamics" ,
     "CAD Design" ,
  ],

  // Business Roles
  "Financial Analyst": [
     "Investment Analysis" ,
     "Financial Modeling" ,
  ],
  "Marketing Manager": [
     "SEO" ,
     "Content Marketing" ,
  ],

  // Arts Roles
  "Writer": [
     "Creative Writing" ,
     "Editing" ,
  ],
  "Musician": [
     "Music Theory" ,
     "Composition" ,
  ],
  "Actor": [
     "Stage Performance" ,
     "Screen Acting" ,
  ],
};


//language data
export const language = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Russian",
    "Italian",
    "Portuguese",
    "Turkish",
    "Arabic",
    "Korean",
    "Vietnamese",
    "Danish",
    "Dutch",
    "Swedish",
    "Norwegian",
    "Finnish",
    "Greek",
    "Hindi",
    "Polish",
    "Portugese",
    "Romanian",
    "Slovak",
    "Slovenian",
    "Thai",
    "Ukrainian",
    "Indonesian",
    "Malay",
    "Turkish",
    "Tagalog",
    "Czech",
    "Slovak",
    "Estonian",
    "Latvian",
];

export const communications = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Fluent",
    "Native",
];

export const problemSolving = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Pro",
    "Master",
];


//get address information;

export const getLatLng =async ()=>{
    if(!navigator.geolocation) return null;
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return { 
        lat: position.coords.latitude, 
        lng: position.coords.longitude
    };
};

export const getAddress = async (lat : number, lng : number) => {
    try {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=c3a2175dbfe14dca8055b974528b8ea8`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return data.results[0]; // Adjust as per the actual API response structure
        } else {
            console.log('No results found.');
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};


//preferences location data
export const getPreferenceLocation = [
    "Bengaluru", 
    "Hyderabad", 
    "Pune",
    "Chennai", 
    "Gurugram", 
    "Noida", 
    "Mumbai", 
    "Kolkata", 
    "Ahmedabad", 
    "Thiruvananthapuram", 
    "Coimbatore", 
    "Jaipur", 
    "Indore", 
    "Bhubaneswar", 
    "Kochi",
    "Nagpur", 
    "Mangalore", 
    "Chandigarh", 
    "Visakhapatnam", 
    "Lucknow",
    "Delhi", 
    "Puducherry", 
    "Vadodara", 
    "Surat", 
    "Trivandram",
    "Vijayawada", 
    "Patna", 
    "Bhopal", 
    "Vadnagar", 
    "Udaipur",
];