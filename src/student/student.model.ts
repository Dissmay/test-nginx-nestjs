import { CourseModel } from 'src/course/course.model';
import { MentorModel } from 'src/mentor/mentor.model';
import { StreamModel } from 'src/stream/stream.model';

export class StudentModel {
  name: string;
  surname: string;
  email: string;
  fullName: string;
  socialLinks: string[];
  defaultChanel: string;
  bills: string[]; // should make an entity
  streams: StreamModel[];
  courses: CourseModel[];
  mentors: MentorModel[];
}
