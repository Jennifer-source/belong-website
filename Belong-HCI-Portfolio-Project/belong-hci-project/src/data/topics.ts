import type { Topic, TopicCategory } from "../types";

export const topicCategories: TopicCategory[] = [
  { id: "everyday-life", label: "Everyday Life" },
  { id: "transport", label: "Transport" },
  { id: "university", label: "University" },
  { id: "culture", label: "Culture" },
  { id: "documents", label: "Documents" },
  { id: "communication", label: "Communication" },
];

/**
 * "Explain this" content.
 *
 * Structure mirrors the signature interaction: WHAT IT IS → WHY IT MATTERS →
 * WHAT YOU NEED TO DO → WHAT USUALLY HAPPENS NEXT → WHEN TO ASK A HUMAN.
 *
 * Representative demo content: deliberately generic about countries and
 * institutions, with variation notes where rules differ locally. Replace or
 * extend with locally verified guidance before any real deployment.
 */
export const topics: Topic[] = [
  {
    id: "residence-card",
    title: "Residence card",
    category: "documents",
    summary: "An ID card that proves you're allowed to live and study here.",
    intro:
      "If your programme lasts longer than a short exchange, you'll usually be asked to register for a residence permit or card shortly after arriving.",
    whatItIs:
      "An official card (or digital record) confirming your right to reside in the country for the length of your studies. It's separate from your passport and often needed for everyday admin like housing, banking, and phone contracts.",
    whyItMatters:
      "Without it you may be blocked from signing a lease, opening a bank account, or getting a local SIM. Many deadlines for registering are measured in weeks, not months, so it's usually one of the first things to sort out.",
    whatYouNeedToDo: [
      "Check your admission or welcome email for the registration deadline — universities usually spell it out.",
      "Gather the documents your university's international office lists, typically passport, admission letter, and proof of funds or enrolment.",
      "Book the appointment through the official portal or at the campus service point — walk-in slots are rare.",
      "Attend the appointment, then keep the temporary confirmation you're given until the card arrives.",
    ],
    whatHappensNext:
      "Processing commonly takes a few weeks. You'll keep a proof-of-application document in the meantime — carry it, not your passport, once the card is on the way.",
    whenToAskSomeone:
      "If you can't find your deadline, can't gather a required document, or your appointment is scheduled after the deadline, contact the international office the same week. They handle this daily and can usually intervene.",
    universityGuidance:
      "Your university's arrival guide lists the exact documents, booking portal, and deadlines for your situation — the international office email is in your admission letter.",
    variesNote:
      "Names, timelines, and required documents vary a lot between countries and institutions. This overview is general context only.",
    level: "involved",
    keywords: ["residence", "permit", "ID", "registration", "city hall", "alien"],
  },
  {
    id: "transport-card",
    title: "Transport card",
    category: "transport",
    summary: "A prepaid tap-on/tap-off card for buses, trains, and metro.",
    intro:
      "Most cities use a rechargeable contactless card for public transport. It usually saves money and queueing compared with single paper tickets.",
    whatItIs:
      "A contactless card (or phone app) you top up with credit or a pass. You tap it at gates or readers when entering — and sometimes when leaving — vehicles and stations.",
    whyItMatters:
      "Single tickets are usually the most expensive option, and inspectors issue on-the-spot fines if you travel without valid fare — even by accident. A card also removes the small stress of finding a ticket machine each time.",
    whatYouNeedToDo: [
      "Buy a card at a station machine, kiosk, or transit app, usually for a small refundable deposit.",
      "Top it up at machines, shops, or in the app — many students start with a weekly pass to learn the system.",
      "Tap in at the start of every trip; check whether your city also requires tapping out.",
      "Look up whether students get a discounted pass — most systems have one, and the savings are significant.",
    ],
    whatHappensNext:
      "After a few days the network starts to feel routine. Once you know your usual route, a monthly or semester pass is typically cheaper than pay-as-you-go.",
    whenToAskSomeone:
      "Ask station staff if a machine rejects your card or a fine seems wrong. For the student discount, ask at your university's transport or student services desk — eligibility rules are often specific.",
    universityGuidance:
      "Student services publish which transit providers offer student discounts and what proof of enrolment they need.",
    variesNote:
      "Card names and tap-in/tap-out rules differ by city. Some systems work directly with contactless bank cards.",
    level: "starter",
    keywords: ["transport", "bus", "metro", "train", "IC", "Oyster", "Suica", "fare"],
  },
  {
    id: "campus-etiquette",
    title: "Campus etiquette",
    category: "culture",
    summary: "The unwritten rules of seminars, offices, and shared spaces.",
    intro:
      "Every university has expectations that are rarely written down. Getting a feel for them early removes a lot of second-guessing.",
    whatItIs:
      "Shared norms about things like punctuality, addressing lecturers, email formality, eating in class, queueing, and how much to speak in seminars. Nobody quizzes you on them — they're noticed quietly.",
    whyItMatters:
      "Most cross-cultural friction comes from mismatched expectations rather than intent. Knowing the local defaults helps you choose deliberately instead of worrying after the fact.",
    whatYouNeedToDo: [
      "Observe your first seminar before deciding how to participate — when people arrive, how they address staff, when they speak.",
      "Mirror the formality of staff emails: how they sign off is a good template for how you should.",
      "Ask one classmate directly about something you noticed — 'is it normal to…?' is a normal question here too.",
      "Forgive yourself quickly for the first misstep; it happens to everyone, in every direction.",
    ],
    whatHappensNext:
      "Within a few weeks the defaults become familiar, and you'll start noticing where your own habits differ — which is the interesting part, not a failure.",
    whenToAskSomeone:
      "If you're unsure whether something you did (or want to do) is appropriate — emailing a professor, asking for an extension, declining an invitation — a peer guide or your programme coordinator can give you a straight answer.",
    universityGuidance:
      "Most universities publish a student charter or conduct code — it's the closest thing to these norms in writing.",
    variesNote:
      "Norms differ between countries, universities, and even departments. Treat these as patterns to check locally, not rules.",
    level: "everyday",
    keywords: ["etiquette", "norms", "seminar", "email", "professor", "polite"],
  },
  {
    id: "bank-account",
    title: "Opening a bank account",
    category: "everyday-life",
    summary: "A local account makes rent, scholarships, and part-time work possible.",
    intro:
      "For anything beyond cash — housing deposits, stipends, part-time jobs — you'll almost certainly need a local bank account.",
    whatItIs:
      "An account with a local bank (or licensed fintech) that gives you a local IBAN or account number, a debit card, and a way to receive and pay money without international fees.",
    whyItMatters:
      "Many landlords, employers, and scholarship offices only pay into local accounts. Card payments and direct debits for phone or utilities usually need one too.",
    whatYouNeedToDo: [
      "Compare student offers — many banks waive fees for students and have English-language onboarding.",
      "Check the required documents before you go: passport, enrolment certificate, and often your registered address.",
      "Book or walk into a branch depending on the bank; some are app-only.",
      "Ask specifically how long the card takes to arrive and how to pay before it does.",
    ],
    whatHappensNext:
      "Approval usually takes days to a couple of weeks. You'll often be able to receive money before the physical card arrives — the account details come first.",
    whenToAskSomeone:
      "If two branches give you different answers, or a document is 'missing' but you can't produce it (some countries have no equivalent), ask your international office — they know which banks are experienced with international students.",
    universityGuidance:
      "International offices usually keep a list of banks that other students have used successfully, sometimes with English-language support.",
    variesNote:
      "Anti-money-laundering checks differ widely; a few countries are notably harder for students without a permanent address yet.",
    level: "involved",
    keywords: ["bank", "account", "IBAN", "debit", "salary", "deposit"],
  },
  {
    id: "course-registration",
    title: "Course registration",
    category: "university",
    summary: "How you actually sign up for classes — and why timing matters.",
    intro:
      "In many universities, attending a class isn't the same as being registered for it. Registration is a separate step, with real deadlines.",
    whatItIs:
      "The formal process of enrolling in specific courses through the university's system, often during a defined window with capacity limits.",
    whyItMatters:
      "Unregistered attendance can mean no credit, no exam seat, and sometimes no access to the online course space. Popular courses can fill within minutes of the window opening.",
    whatYouNeedToDo: [
      "Find your registration window in the academic calendar — write it down with a time, not just a date.",
      "Prepare a first-choice and a backup list of courses before the window opens.",
      "Register the moment the window opens if possible; don't wait to 'see how the first week feels'.",
      "Check your confirmation — a green tick in the system, not a timetable, is what counts.",
    ],
    whatHappensNext:
      "There's usually an add/drop period after the window where you can still swap courses. After it closes, changes need a coordinator's approval.",
    whenToAskSomeone:
      "If a required course is full, email the course coordinator — registration caps are sometimes raised. If the system shows an error about prerequisites, contact your programme office before the window closes.",
    universityGuidance:
      "The academic calendar and your programme handbook define registration windows, add/drop rules, and waitlist policies exactly.",
    variesNote:
      "Systems, windows, and waitlist rules vary by university. Some use a bidding or priority-points system instead of first-come-first-served.",
    level: "involved",
    keywords: ["registration", "enrolment", "courses", "credits", "add", "drop"],
  },
  {
    id: "student-email",
    title: "Official email etiquette",
    category: "communication",
    summary: "Writing to staff and offices so you get a fast, useful reply.",
    intro:
      "Most university communication runs on email. A clear, complete first message usually gets an answer in a day; a vague one can bounce for a week.",
    whatItIs:
      "The local norms for writing to lecturers and administrative offices: a specific subject line, a short body with the ask up front, your full name and student ID, and a polite sign-off.",
    whyItMatters:
      "Staff handle dozens of messages a day. Messages that make the question and context easy to find get answered first — this is about making things easy for the reader, not about perfect formality.",
    whatYouNeedToDo: [
      "Use a subject line like 'Question about deadline — Jane Doe, student ID 12345'.",
      "Put the actual question in the first two sentences, with any deadline mentioned.",
      "Include your full name, programme, and student ID in the signature block.",
      "Allow a few working days before a gentle follow-up; avoid messaging multiple offices at once.",
    ],
    whatHappensNext:
      "Most offices reply within 2–3 working days. If a week passes without an answer, a polite follow-up referencing your first email is completely normal.",
    whenToAskSomeone:
      "For urgent, personal, or complicated matters (illness, immigration, appeals), email is the wrong channel — go to the office's drop-in hours or call. The email can confirm what was agreed.",
    universityGuidance:
      "Faculty handbooks often include email conventions for staff contact; some departments publish templates.",
    level: "everyday",
    keywords: ["email", "etiquette", "professor", "office", "message", "formal"],
  },
  {
    id: "health-insurance",
    title: "Health insurance",
    category: "documents",
    summary: "What coverage you need and how to prove it before it's asked for.",
    intro:
      "Health insurance is usually mandatory for students — and the proof is needed for registration, residence permits, or both.",
    whatItIs:
      "Either public/state coverage, a student plan through your university, or private insurance — depending on country, visa type, and age. Your certificate is a document you may need to show repeatedly.",
    whyItMatters:
      "Without valid coverage, registration can be blocked and a single doctor's visit can cost more than a semester of premiums. Emergency care still happens — the bill comes later, and it's large.",
    whatYouNeedToDo: [
      "Find out which category applies to you in your admission pack — public, university plan, or private.",
      "Save your insurance certificate as a PDF on your phone and a photo in your gallery.",
      "Learn how to use it: which clinics are in-network, whether you pay first and claim back, and the emergency number.",
      "Check whether dependents or travel outside the country are covered, if either applies to you.",
    ],
    whatHappensNext:
      "Once registered, renewals are usually automatic with your enrolment. Keep the certificate until you graduate or your status changes.",
    whenToAskSomeone:
      "If your country of origin has a social-security agreement with your host country, the rules can be genuinely confusing — ask the international office rather than guessing. For coverage questions, call the insurer directly.",
    universityGuidance:
      "Your admission pack names the exact insurance requirement for your visa/enrolment status; the international office verifies it.",
    variesNote:
      "Systems range from fully public to fully private. The details depend on nationality, age, and income as well as the country.",
    level: "involved",
    keywords: ["insurance", "health", "doctor", "clinic", "coverage", "EHIC"],
  },
  {
    id: "phone-sim",
    title: "Getting a phone plan",
    category: "everyday-life",
    summary: "A local number unlocks banking codes, deliveries, and group chats.",
    intro:
      "A local phone number is quietly load-bearing: verification codes, delivery apps, class group chats, and often your bank all depend on it.",
    whatItIs:
      "A prepaid or contract SIM (or eSIM) from a local provider, giving you a domestic number and data.",
    whyItMatters:
      "Foreign numbers often can't receive local verification codes, and roaming is expensive. Most students switch to a local prepaid plan in the first week and keep their home number active on WhatsApp.",
    whatYouNeedToDo: [
      "Start with prepaid — no contract, top up as needed, available at supermarkets and kiosks.",
      "Check whether your phone is unlocked and supports a local eSIM before travelling if you can.",
      "Compare student or starter bundles; data amounts and fair-use rules vary a lot.",
      "Register the SIM if required — some countries need ID at purchase.",
    ],
    whatHappensNext:
      "Prepaid works well for most of a first semester. If you stay longer, contract plans with better rates usually require a local bank account and registered address.",
    whenToAskSomeone:
      "If a shop sells you a SIM that won't activate, return to the same shop rather than troubleshooting alone — activation problems are common and staff can usually fix them on the spot.",
    universityGuidance:
      "University IT pages sometimes list recommended providers and student deals — worth checking before buying.",
    variesNote:
      "eSIM support, registration requirements, and prices vary widely by country and provider.",
    level: "starter",
    keywords: ["SIM", "phone", "mobile", "prepaid", "eSIM", "number"],
  },
  {
    id: "classroom-participation",
    title: "Participating in seminars",
    category: "culture",
    summary: "Why speaking up matters here — and how to start small.",
    intro:
      "In many academic cultures, students are expected to speak in class, ask questions, and sometimes disagree respectfully. If that isn't your habit, it can feel unnatural at first.",
    whatItIs:
      "The expectation (often graded) that students contribute to discussion: answering questions, offering viewpoints, and treating disagreement as normal academic behaviour rather than conflict.",
    whyItMatters:
      "Participation can be part of your grade, and staff read silence as disengagement even when it's a different communication culture. The good news: there are low-stakes ways to begin.",
    whatYouNeedToDo: [
      "Prepare one question or comment before each seminar — having it written removes the pressure of inventing it live.",
      "Start with questions rather than opinions; asking is always safe, answering comes next.",
      "Use simple framing phrases: 'Could you say more about…', 'From my context, I'd see it as…'.",
      "Let your own background be an asset — perspectives from other systems are usually welcomed, not judged.",
    ],
    whatHappensNext:
      "Most students find that after 3–4 seminars, speaking once feels routine. Contribution expectations are usually explicit in the syllabus — check it in week one.",
    whenToAskSomeone:
      "If participation is graded and your style isn't fitting, talk to the lecturer in office hours early in the term — adjustments and alternative formats are more common than students expect.",
    universityGuidance:
      "Course syllabi state how participation is assessed — check it in week one rather than inferring.",
    level: "everyday",
    keywords: ["seminar", "participation", "discussion", "speaking", "class"],
  },
  {
    id: "recycling-rules",
    title: "Waste & recycling rules",
    category: "everyday-life",
    summary: "Sorting rules that locals absorb by osmosis — spelled out plainly.",
    intro:
      "Many cities take waste separation seriously, and getting it wrong can upset neighbours or building managers more than most small mistakes.",
    whatItIs:
      "Local rules for separating waste — packaging, paper, organic, glass by colour, residual — with specific bags, bins, and collection days that differ by district.",
    whyItMatters:
      "It's one of the few daily rules where mistakes are visible to others, and buildings sometimes label bins only in the local language. Sorting correctly is also a small, reliable way to feel settled.",
    whatYouNeedToDo: [
      "Ask your building manager or a housemate for the building's system in week one — people expect the question.",
      "Find your district's collection calendar online or on the bins themselves.",
      "Learn the 3–4 categories your building actually uses; don't memorise the national system yet.",
      "Buy the correct bags if your district requires specific ones — supermarkets stock them.",
    ],
    whatHappensNext:
      "Within two weeks it becomes muscle memory. Bottles sometimes carry a deposit you get back at machines in supermarkets — worth checking, it adds up.",
    whenToAskSomeone:
      "If a neighbour or manager comments on your sorting, ask them directly what's expected — the conversation is a better outcome than a silent rule you'll keep breaking.",
    universityGuidance:
      "If you live in university housing, the housing office publishes the building's exact rules and collection days.",
    variesNote:
      "Rules are hyper-local: districts, and sometimes individual buildings, differ.",
    level: "starter",
    keywords: ["waste", "recycling", "bins", "trash", "deposit", "bottle"],
  },
  {
    id: "office-hours",
    title: "Office hours",
    category: "university",
    summary: "One-to-one time with lecturers that almost nobody uses enough.",
    intro:
      "Lecturers set aside weekly time to answer questions one-to-one. It's free, expected, and one of the most underused resources in universities.",
    whatItIs:
      "Scheduled hours when staff are available for student questions — about course content, assignments, feedback, or broader academic guidance. Some universities call them consultation hours.",
    whyItMatters:
      "Ten minutes with the person who grades your work often resolves what hours of guessing can't. It also builds the relationship that matters for references, projects, and advice later.",
    whatYouNeedToDo: [
      "Find where office hours are listed — the course page or the syllabus.",
      "Come with one or two specific questions rather than 'can I ask you something?'.",
      "Arrive on time; some staff keep sign-up sheets or take bookings by email.",
      "It's fine to ask about the course, your progress, or academic direction — that's what the time is for.",
    ],
    whatHappensNext:
      "You'll typically leave with a clearer next step than from any email chain. Going once early in the term makes going again much easier.",
    whenToAskSomeone:
      "This *is* the human step — use it when self-service materials stop making sense, when feedback confuses you, or when you're deciding something bigger than one assignment.",
    universityGuidance:
      "Office hours and consultation times are listed on course pages and in syllabi — locations and booking rules differ by department.",
    level: "everyday",
    keywords: ["office hours", "lecturer", "consultation", "professor", "questions"],
  },
  {
    id: "making-friends",
    title: "How people actually meet here",
    category: "culture",
    summary: "Realistic paths to friendship — slower than expected, that's normal.",
    intro:
      "In many countries, friendships form slowly through repeated, low-key contact — shared courses, clubs, jobs. The first month can feel quiet; that's the norm, not a sign you're doing it wrong.",
    whatItIs:
      "The local rhythm of social life: how people go from classmates to acquaintances to friends, what invitations mean, and which contexts (clubs, events, shared meals) actually produce connection.",
    whyItMatters:
      "Misreading the pace is one of the most common sources of early loneliness. Knowing the expected rhythm lets you settle in without concluding something is wrong with you.",
    whatYouNeedToDo: [
      "Choose one recurring activity (club, language exchange, sports) rather than many one-off events — repetition is what builds familiarity.",
      "Accept small invitations even when tired; the second meeting is where friendships start.",
      "Suggest something specific and small: coffee after class, not 'we should hang out sometime'.",
      "Be patient with yourself — most students report the social side taking a full term, not a week.",
    ],
    whatHappensNext:
      "By mid-term most students have a small circle from one or two recurring contexts. Depth comes later than breadth — and that's the usual order.",
    whenToAskSomeone:
      "If the quiet weeks are weighing on you, that's exactly what peer guides and community events are for — and wellbeing services exist for the heavier versions of this feeling. Neither is an overreaction.",
    universityGuidance:
      "Student unions and international student associations publish club directories and term calendars — the formal paths in.",
    level: "everyday",
    keywords: ["friends", "loneliness", "social", "clubs", "belonging"],
  },
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}
