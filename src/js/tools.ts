import DailyMeeting from "@/modules/daily_meeting/src/App.vue";
import ScrumPoker from "@/modules/scrum_poker/src/App.vue";

type tool_t = {
  id: number;
  name: string;
  query: string;
  link: string;
  cmpName: string;
  cmp: any;
};

const tools: tool_t[] = [
  {
    id: 1,
    name: "Daily Meeting",
    query: "daily_meeting",
    link: "/",
    cmpName: "DailyMeeting",
    cmp: DailyMeeting,
  },
  {
    id: 2,
    name: "Scrum Poker",
    query: "scrum_poker",
    link: "/",
    cmpName: "ScrumPoker",
    cmp: ScrumPoker,
  },
];

export default tools;
