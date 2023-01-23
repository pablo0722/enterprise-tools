import DailyMeeting from "@/modules/daily_meeting/src/App.vue";
import ScrumPoker from "@/modules/scrum_poker/src/App.vue";
const tools = [
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
//# sourceMappingURL=tools.js.map