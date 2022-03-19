import { CourseModel } from 'src/course/course.model';

export class TaskModel {
  course: CourseModel;
  title: string;
  description: string;
  links: string[];
  dateTimeOffset: Date;
}
