import { RedisClient } from "../../../shared/redis";
import { EVENT_STUDENT_CREATED, EVENT_STUDENT_UPDATED } from "./student.constants";
import { StudentService } from "./student.service";

const initStudentEvents = () => {
    RedisClient.subscribe(EVENT_STUDENT_CREATED, async (e: string) => {
        const data = JSON.parse(e);
        console.log("🚀 ~ file: student.events.ts:8 ~ RedisClient.subscribe ~ data:", data)
        await StudentService.createStudentFromEvent(data);
    });

    RedisClient.subscribe(EVENT_STUDENT_UPDATED, async (e: string) => {
        const data = JSON.parse(e);

        await StudentService.updateStudentFromEvent(data);
    });
};

export default initStudentEvents;