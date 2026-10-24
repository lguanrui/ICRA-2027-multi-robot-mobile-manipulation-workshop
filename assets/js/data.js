/* =====================================================================
   Workshop data. Edit this file; index.html renders it. No build step.

   Speakers / organizers
     photo:  "media/people/<slug>.jpg"  (square, at least 400 px). Leave ""
             and the card shows the person's initials instead.
     url:    homepage; the name becomes a link when it is set.
     talk:   talk title once known (shown in italics under the name).
     status: "confirmed" or "tentative" (tentative shows a badge).

   Schedule
     kind:   "talk" | "contrib" (posters, lightning talks) |
             "discuss" (panel, breakouts, roadmap) | "other" (breaks, remarks).
             The kind sets the color in the day-at-a-glance strip.

   Dates
     Use "TBA" until a date is fixed, e.g. { label: "Submission deadline", date: "Mar 15, 2027" }.
   ===================================================================== */

window.WORKSHOP = {
  workshopDate: "May 24 or 28, 2027",  // ICRA holds workshops on Mon 24 or Fri 28 May; set the exact day once assigned
  venue: "COEX, Seoul, Korea",
  timezone: "local time (KST, UTC+9)",
  contact: { name: "Moju Zhao", user: "chou", domain: "dragon.t.u-tokyo.ac.jp" },
  submitUrl: "",                     // submission portal; the button turns on when this is set

  speakers: [
    { name: "Giuseppe Loianno", affiliation: "University of California, Berkeley", topic: "Aerial robotics, perception", status: "confirmed", url: "https://arplaboratory.github.io/", photo: "media/people/giuseppe-loianno.jpg", talk: "" },
    { name: "Claire Dune", affiliation: "Université Laval", topic: "Underwater robotics, perception, learning", status: "confirmed", url: "https://norlab.ulaval.ca/people/c_dune/", photo: "media/people/claire-dune.jpg", talk: "" },
    { name: "Sihao Sun", affiliation: "Delft University of Technology", topic: "Aerial robotics, decentralized control", status: "confirmed", url: "https://sihaosun.github.io/", photo: "media/people/sihao-sun.jpg", talk: "" },
    { name: "Rui Fukui", affiliation: "The University of Tokyo", topic: "Modular robots, hardware, control", status: "confirmed", url: "http://www.ra-laboratory.com/r/", photo: "media/people/rui-fukui.jpg", talk: "" },
    { name: "Changjoo Nam", affiliation: "Sogang University", topic: "Task allocation, game theory", status: "confirmed", url: "https://sites.google.com/site/changjoonam/", photo: "media/people/changjoo-nam.jpg", talk: "" },
    { name: "Hao Zhang", affiliation: "University of Massachusetts Amherst", topic: "Field robotics", status: "confirmed", url: "https://hcr.cs.umass.edu/people/hzhang/", photo: "media/people/hao-zhang.jpg", talk: "" },
    { name: "Jeannette Bohg", affiliation: "Stanford University", topic: "Robot learning", status: "confirmed", url: "https://web.stanford.edu/~bohg/", photo: "media/people/jeannette-bohg.jpg", talk: "" },
    { name: "Sabine Hauert", affiliation: "University of Bristol", topic: "", status: "confirmed", url: "https://hauertlab.com/", photo: "media/people/sabine-hauert.jpg", talk: "" },
    { name: "Martin Azkarate", affiliation: "European Space Agency", topic: "Space robotics, in-orbit assembly", status: "tentative", url: "", photo: "", talk: "" }
  ],

  organizers: [
    { name: "Javier Alonso-Mora", affiliation: "Delft University of Technology, The Netherlands", url: "https://autonomousrobots.nl", photo: "media/people/javier-alonso-mora.jpg" },
    { name: "Moju Zhao", affiliation: "The University of Tokyo, Japan", url: "https://www.dragon.t.u-tokyo.ac.jp/author/moju-zhao/", photo: "media/people/moju-zhao.jpg" },
    { name: "Sihao Sun", affiliation: "Delft University of Technology, The Netherlands", url: "https://sihaosun.github.io/", photo: "media/people/sihao-sun.jpg" },
    { name: "Guanrui Li", affiliation: "Worcester Polytechnic Institute, USA", url: "https://lguanrui.github.io", photo: "media/people/guanrui-li.jpg" }
  ],

  // Tentative program from the proposal. Times are local.
  schedule: [
    { start: "09:00", end: "09:05", title: "Opening remarks", kind: "other" },
    { start: "09:05", end: "10:05", title: "Invited session I", detail: "Three talks", kind: "talk" },
    { start: "10:05", end: "11:05", title: "Poster session I", detail: "With coffee break", kind: "contrib" },
    { start: "11:05", end: "12:05", title: "Contributed lightning talks", detail: "A short spotlight for every accepted contribution", kind: "contrib" },
    { start: "12:05", end: "12:50", title: "Lunch break", kind: "other" },
    { start: "12:50", end: "13:50", title: "Invited session II", detail: "Three talks", kind: "talk" },
    { start: "13:50", end: "14:50", title: "Poster session II", detail: "With coffee break", kind: "contrib" },
    { start: "14:50", end: "15:50", title: "Invited session III", detail: "Three talks", kind: "talk" },
    { start: "15:50", end: "16:05", title: "Coffee break", kind: "other" },
    { start: "16:05", end: "17:05", title: "Panel discussion", detail: "Cross-domain bottlenecks and research priorities", kind: "discuss" },
    { start: "17:05", end: "17:25", title: "Breakout discussions", detail: "Shared bottlenecks, embodiment-specific constraints, challenge tasks", kind: "discuss" },
    { start: "17:25", end: "17:35", title: "Community roadmap", detail: "Rapporteurs report back; open discussion", kind: "discuss" },
    { start: "17:35", end: "17:40", title: "Closing remarks", kind: "other" }
  ],

  dates: [
    { label: "Call for contributions", date: "TBA" },
    { label: "Submission deadline", date: "TBA" },
    { label: "Notification", date: "TBA" },
    { label: "Camera-ready and poster", date: "TBA" },
    { label: "Workshop", date: "May 24 or 28, 2027" }
  ]
};
