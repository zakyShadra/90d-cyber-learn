import phase0 from "./phases/00-tools.js";
import phase1 from "./phases/01-net.js";
import phase2 from "./phases/02-sec.js";
import phase3 from "./phases/03-linux.js";
import phase4 from "./phases/04-python.js";
import phase5 from "./phases/05-traffic.js";
import phase6 from "./phases/06-git.js";
import phase7 from "./phases/07-elk.js";
import phase8 from "./phases/08-cloud.js";
import phase9 from "./phases/09-review.js";
import phase10 from "./phases/10-hacking.js";
import phase11 from "./phases/11-career.js";

const ALL = [
  phase0,
  phase1,
  phase2,
  phase3,
  phase4,
  phase5,
  phase6,
  phase7,
  phase8,
  phase9,
  phase10,
  phase11,
];

// Diurutkan berdasarkan nomor fase supaya urutan file impor di atas tidak berpengaruh.
export const ROADMAP = ALL.slice().sort((a, b) => a.number - b.number);
