import { MentorModel } from 'src/mentor/mentor.model';
import { StreamModel } from 'src/stream/stream.model';
import { TaskModel } from 'src/task/task.model';

export class CourseModel {
  title: string;
  tasks: TaskModel[];
  streams: StreamModel[];
  mentors: MentorModel[];
}
