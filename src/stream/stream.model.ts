import { CourseModel } from 'src/course/course.model';
import { StudentModel } from 'src/student/student.model';
export class StreamModel {
  title: string;
  startDateTime: Date;
  isActive: boolean;
  students: StudentModel[];
  course: CourseModel;
}
